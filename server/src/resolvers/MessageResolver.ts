import { AuthContext } from "../types";
import { Chat, ChatUser, Event, Message, MessageViewLog } from "../entities/Message";
import { isAuth } from "../middleware/isAuth";
import { Arg, Ctx, Field, Int, Mutation, ObjectType, Query, Resolver, Root, Subscription, UseMiddleware, createUnionType } from "type-graphql";
import { FieldError } from "./common";
import { v4 as uuidv4 } from "uuid";
import { Block, Follow, User, UserDeviceToken } from "../entities/User";
import { mergeAndDeduplicateArrays } from "../helpers/mergeAndDeduplicateArrays";
import { MessageStatus } from "../helpers/enums";
import { MessageNotification } from "../entities/Notification";
import { In, Repository } from "typeorm";
import appDataSource from "../dataSource";
import { pubSub } from "../helpers/createPubSub";
import { Notification as FirebaseNotification } from "firebase-admin/messaging";
import { sendPushNotifications } from "../helpers/notifications";

@ObjectType()
export class ChatResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => Chat, { nullable: true })
    chat?: Chat | null;

    @Field(() => String, { nullable: true })
    status?: string;
}

export const MessageOrEvent = createUnionType({
    name: "MessageOrEvent",
    description: "Message or Event type",
    types: () => [Message, Event] as const,
    resolveType: (value) => {
        if (value && ("content" in value)) {
            return Message;
        }
        if (value && ("eventType" in value)) {
            return Event;
        }

        return null;
    },
});

@Resolver(Chat)
export class ChatResolver {
    private readonly chatRepository: Repository<Chat>;
    private readonly userRepository: Repository<User>;
    private readonly followRepository: Repository<Follow>;
    private readonly messageRepository: Repository<Message>;
    private readonly eventRepository: Repository<Event>;
    private readonly chatUserRepository: Repository<ChatUser>;
    private readonly messageNotificationRepository: Repository<MessageNotification>;
    private readonly blockRepository: Repository<Block>;

    constructor() {
        this.chatRepository = appDataSource.getRepository(Chat);
        this.userRepository = appDataSource.getRepository(User);
        this.followRepository = appDataSource.getRepository(Follow);
        this.messageRepository = appDataSource.getRepository(Message);
        this.eventRepository = appDataSource.getRepository(Event);
        this.chatUserRepository = appDataSource.getRepository(ChatUser);
        this.messageNotificationRepository = appDataSource.getRepository(MessageNotification);
        this.blockRepository = appDataSource.getRepository(Block);
    }

    @Query(() => [Chat])
    @UseMiddleware(isAuth)
    async chats(
        @Ctx() { payload }: AuthContext
    ): Promise<Chat[]> {
        const chats = await this.chatRepository.find({ relations: ["users", "messages", "events"], order: { updatedAt: "DESC" } });
        const userChats: Chat[] = [];

        if (payload) {
            for (const chat of chats) {
                const me = chat.users.find(user => user.userId === payload.id);
                
                if (me && ((chat.type === "group" && chat.users.some(obj => obj.userId === payload.id)) || (chat.type === "chat" && chat.creatorId === payload.id && me.inside) || (chat.type === "chat" && chat.users.some(obj => obj.userId === payload.id) && me.inside && chat.visible))) {
                    userChats.push(chat);
                }
            }
        }

        return userChats;
    }

    @Subscription(() => Chat, {
        topics: "NEW_CHAT",
        filter: ({ payload, args }) => {
            const me = payload.users.find((user: ChatUser) => user.userId === args.userId);

            return (payload.users.some((obj: ChatUser) => obj.userId === args.userId) && me.inside) || (payload.creatorId === args.userId && me.inside);
        },
    })
    newChat(@Arg("userId", () => Int, { nullable: true }) _userId: number, @Root() chat: Chat): Chat {
        return chat;
    }

    @Subscription(() => Chat, {
        topics: "EDITED_CHAT_INFO",
        filter: async ({ payload, args }) => {
            const chatRepository = appDataSource.getRepository(Chat);
            const chat = await chatRepository.findOne({ where: { chatId: args.chatId }, relations: ["users"] });

            if (chat) {
                return chat.users.some((obj: ChatUser) => obj.userId === args.userId) && payload.chatId === args.chatId;
            } else {
                return false;
            }
        },
    })
    editedChat(@Arg("userId", () => Int, { nullable: true }) _userId: number, @Arg("chatId", { nullable: true }) _chatId: string, @Root() chat: Chat): Chat {
        return chat;
    }

    @Query(() => Chat, { nullable: true })
    @UseMiddleware(isAuth)
    async findChat(
        @Arg("chatId", { nullable: true }) chatId: string,
        @Ctx() { payload }: AuthContext
    ) {
        if (!payload) {
            return null;
        } else {
            const chat = await this.chatRepository.findOne({ where: { chatId }, relations: ["users", "messages", "events"] });
            
            if (!chat) {
                return null;
            } else {
                const isIdInArray = chat.users.some(obj => obj.userId === payload.id);

                if (isIdInArray) {
                    return chat;
                } else {
                    return null;
                }
            }
        }
    }

    @Query(() => [User])
    @UseMiddleware(isAuth)
    async usersToMessage(
        @Ctx() { payload }: AuthContext
    ) {
        if (payload) {
            const follow = await this.followRepository.find({ where: { userId: payload.id } });
            let followers: User[] = [];
            let user;

            await Promise.all(
                follow.map(async (item) => {
                    user = await this.userRepository.findOne({ where: { id: item.followerId } });
                    if (user) {
                        followers.push(user);
                    }
                })
            );

            const everyoneUsers = await this.userRepository.find({ where: { userSettings: { incomingMessages: "everyone" } } });

            const users = mergeAndDeduplicateArrays(followers, everyoneUsers);

            const filteredUsers = users.filter((item) => item.id !== payload.id);

            const blockActions = await this.blockRepository.find({ where: { userId: payload.id } });

            const blockedAccounts = blockActions.map((item) => item.blockedId);

            return filteredUsers.filter((item) => !blockedAccounts.includes(item.id));
        } else {
            return [];
        }
    }

    @Query(() => MessageOrEvent, { nullable: true })
    @UseMiddleware(isAuth)
    async latestMessageOrEvent(
        @Arg("chatId", { nullable: true }) chatId: string,
        @Ctx() { payload }: AuthContext
    ) {
        const chat = await this.chatRepository.findOne({ where: { chatId }, relations: ["users", "messages", "events"] });
        let result = null;

        if (payload) {
            if (!chat) {
                result = null;
            } else {
                const me = chat.users.find(chatUser => chatUser.userId === payload.id);
    
                if (me) {
                    const messages = await this.messageRepository.find({ where: { chat: { chatId } }, relations: ["chat"], order: { createdAt: "ASC" } });
                    const visibleMessages = messages.filter((message) => !me.hiddenMessagesIds.includes(message.id));
                    const events = await this.eventRepository.find({ where: { chat: { chatId } }, relations: ["chat"], order: { createdAt: "ASC" } });
                    const results = [...events, ...visibleMessages];

                    let filteredResults = [];
    
                    for (const result of results) {
                        if (me.inside) {
                            if (result.createdAt >= me.joinedChat) {
                                filteredResults.push(result);
                            }
                        } else {
                            if (result.createdAt <= me.lastExit) {
                                filteredResults.push(result);
                            }
                        }
                    }
    
                    filteredResults.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
                    
                    result = filteredResults[filteredResults.length - 1];
                } else {
                    result = null;
                }
            }
        }

        return result;
    }

    @Mutation(() => ChatResponse)
    @UseMiddleware(isAuth)
    async createChatOrGroup(
        @Arg("type") type: string,
        @Arg("userIds", () => [Int]) userIds: number[],
        @Ctx() { payload }: AuthContext,
        @Arg("chatImage", () => String, { nullable: true }) chatImage?: string,
        @Arg("chatTitle", () => String, { nullable: true }) chatTitle?: string,
    ): Promise<ChatResponse> {
        let status = "";
        let chat;

        if (!payload) {
            status = "You're not authenticated.";
        } else {
            const existingChats = await this.chatRepository.find({ where: { type }, relations: ["users"] });

            let existingChatId = undefined;

            if (type === "chat") {
                for (const parent of existingChats) {
                    const childIds = parent.users.map((child: ChatUser) => child.userId);
                    const id = userIds[0];

                    if (childIds.includes(payload.id) && childIds.includes(id)) {
                        existingChatId = parent.id;
                    }
                }
            }

            if (!existingChatId || type === "group") {
                const users: ChatUser[] = [];

                await Promise.all(
                    userIds.map(async (id) => {
                        const user = await this.userRepository.findOne({ where: { id } });
                        
                        if (user) {
                            const chatUser = await this.chatUserRepository.create({
                                role: "user",
                                userId: user.id,
                                joinedChat: new Date(),
                                inside: true,
                            }).save();

                            users.push(chatUser);
                        }
                    })
                );

                const me = await this.userRepository.findOne({ where: { id: payload.id } });

                if (me) {
                    const meChatUser = await this.chatUserRepository.create({
                        role: type === "chat" ? "user" : "admin",
                        userId: me.id,
                        joinedChat: new Date(),
                        inside: true,
                    }).save();

                    users.push(meChatUser);
                }

                if (type === "chat") {
                    chat = await this.chatRepository.create({
                        chatId: uuidv4(),
                        creatorId: payload.id,
                        type,
                        users,
                    }).save();
                } else if (type === "group" && (users.length > 2 && users.length <= 100)) {
                    chat = await this.chatRepository.create({
                        chatId: uuidv4(),
                        creatorId: payload.id,
                        type,
                        chatImage,
                        chatTitle,
                        users,
                        visible: true,
                    }).save();

                    const newChat = await this.chatRepository.findOne({ where: { chatId: chat.chatId }, relations: ["users", "messages", "events"] });

                    if (newChat) {
                        pubSub.publish("NEW_CHAT", newChat);
                    }

                    if (me) {
                        const chatUsers = users.filter(user => user.userId !== me.id);

                        for (const chatUser of chatUsers) {
                            const user = await this.userRepository.findOne({ where: { id: chatUser.userId } });
                            
                            if (user) {
                                const event = await this.eventRepository.create({
                                    userId: user.id,
                                    eventType: "chat",
                                    eventMessage: `${me.firstName} ${me.lastName} added ${user.firstName} ${user.lastName} to the group.`,
                                    chat: await this.chatRepository.findOne({ where: { chatId: chat.chatId } }) as Chat,
                                    createdAt: new Date(),
                                }).save();
            
                                pubSub.publish("NEW_MESSAGE_OR_EVENT", event);
                            }
                        }
                    }
                }
            } else {
                chat = await this.chatRepository.findOne({ where: { id: existingChatId, type }, relations: ["users"] });
                
                if (chat) {
                    const tempMe = chat.users.find(user => user.userId === payload.id);

                    if (tempMe) {
                        if (!tempMe.inside) {
                            tempMe.inside = true;
                            tempMe.joinedChat = new Date();

                            await tempMe.save();
                        }

                        if (!chat.visible) {
                            chat.visible = true;
                            await chat.save();
                        }
                    }
                }
            }
        }

        return {
            chat,
            status,
        };
    }

    @Mutation(() => ChatResponse)
    @UseMiddleware(isAuth)
    async addNewUsersToGroup(
        @Arg("chatId") chatId: string,
        @Arg("userIds", () => [Int]) userIds: number[],
        @Ctx() { payload }: AuthContext,
    ): Promise<ChatResponse> {
        let status = "";

        if (!payload) {
            status = "You're not authenticated.";
        } else {
            const existingChat = await this.chatRepository.findOne({ where: { chatId }, relations: ["users"] });

            if (existingChat && existingChat.type === "group") {
                let users: ChatUser[] = [];
                let actualUsers: User[] = [];

                await Promise.all(
                    userIds.map(async (id) => {
                        const user = await this.userRepository.findOne({ where: { id } });
                        const existingChatUser = existingChat.users.find((chatUser) => chatUser.userId === id);
                        
                        if (user) {
                            if (!existingChatUser) {
                                const chatUser = await this.chatUserRepository.create({
                                    role: "user",
                                    userId: user.id,
                                    joinedChat: new Date(),
                                    inside: true,
                                }).save();
    
                                users.push(chatUser);
                            } else {
                                existingChatUser.inside = true;
                                existingChatUser.joinedChat = new Date();

                                await existingChatUser.save();
                            }

                            actualUsers.push(user);
                        }
                    })
                );

                existingChat.users.push(...users);
                await existingChat.save();

                pubSub.publish("ADDED_CHAT_USERS", actualUsers);

                const me = await this.userRepository.findOne({ where: { id: payload.id } });
                
                if (me) {
                    for (const chatUser of actualUsers) {                    
                        const event = await this.eventRepository.create({
                            userId: chatUser.id,
                            eventType: "chat",
                            eventMessage: `${me.firstName} ${me.lastName} added ${chatUser.firstName} ${chatUser.lastName} to the group.`,
                            chat: await this.chatRepository.findOne({ where: { chatId } }) as  Chat,
                            createdAt: new Date(),
                        }).save();
    
                        pubSub.publish("NEW_MESSAGE_OR_EVENT", event);
                    }
                }

                const publishedChat = await this.chatRepository.findOne({ where: { chatId }, relations: ["users", "messages", "events"] });

                if (publishedChat) {
                    pubSub.publish("NEW_CHAT", publishedChat);
                }

                status = "Users added to the group.";
            } else {
                status = "Can't find the chat."
            }
        }

        return {
            status,
        };
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteOrAbandonChatOrGroup(
        @Arg("type") type: string,
        @Arg("chatId") chatId: string,
        @Ctx() { payload }: AuthContext,
    ): Promise<Boolean> {
        if (!payload) {
            return false;
        }

        const chat = await this.chatRepository.findOne({ where: { chatId, type }, relations: ["users"] });
        const user = await this.userRepository.findOne({ where: { id: payload.id } });

        if (!chat || !user) {
            return false;
        } else {
            const me = chat.users.find(chatUser => chatUser.userId === user.id);
            const otherChatUsers = chat.users.filter(chatUser => chatUser.userId !== user.id);

            const chatUsers = [];

            for (const chatUser of otherChatUsers) {
                const user = await this.userRepository.findOne({ where: { id: chatUser.userId } });

                if (user) {
                    chatUsers.push(chatUser);
                }
            }

            if (me && (me.role === "user" || (me.role === "admin" && (chatUsers.every((user) => user.inside === false) || chatUsers.some(obj => obj.role === "admin"))))) {
                me.inside = false;
                me.role = "user";
                await me.save();

                if (chat.type === "group") {
                    const event = await this.eventRepository.create({
                        userId: user.id,
                        eventType: "chat",
                        eventMessage: `${user.firstName} ${user.lastName} left the group.`,
                        chat: await this.chatRepository.findOne({ where: { chatId } }) as Chat,
                        createdAt: new Date(),
                    }).save();

                    me.lastExit = event.createdAt;
                    await me.save();

                    pubSub.publish("NEW_MESSAGE_OR_EVENT", event);
                    pubSub.publish("DELETED_CHAT_USER", user);
                    pubSub.publish("EDITED_CHAT_USER", me);
                }

                if (chat.users.every((user) => user.inside === false)) {
                    const chatToDelete = await this.chatRepository.findOne({ where: { chatId } });
                    
                    if (chatToDelete) {
                        await this.chatUserRepository.delete({ chat: chatToDelete });
                        await this.messageRepository.delete({ chat: chatToDelete });
                        await this.eventRepository.delete({ chat: chatToDelete });
                        await this.chatRepository.delete({ chatId, type });
                    }

                    await this.messageNotificationRepository.delete({
                        chatId,
                        itemType: In(["message", "event"]),
                    });
                }

                return true;
            } {
                return false;
            }
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async removeUserFromGroup(
        @Arg("chatId") chatId: string,
        @Arg("userId", () => Int) userId: number,
        @Ctx() { payload }: AuthContext,
    ): Promise<Boolean> {
        const chat = await this.chatRepository.findOne({ where: { chatId, type: "group" }, relations: ["users"] });
        const user = await this.userRepository.findOne({ where: { id: userId } });

        if (!payload) {
            return false;
        }

        if (!chat || !user) {
            return false;
        } else {
            const me = chat.users.find(chatUser => chatUser.userId === payload.id);
            const chatUser = chat.users.find(chatUser => chatUser.userId === user.id);

            if (me && me.role === "admin" && chatUser) {
                chatUser.inside = false;
                chatUser.role = "user";
                await chatUser.save();
                
                const meUser = await this.userRepository.findOne({ where: { id: me.userId } });

                if (meUser) {
                    const event = await this.eventRepository.create({
                        userId: user.id,
                        eventType: "chat",
                        eventMessage: `${user.firstName} ${user.lastName} has been removed from the group by ${meUser.firstName} ${meUser.lastName}.`,
                        chat: await this.chatRepository.findOne({ where: { chatId } }) as Chat,
                        createdAt: new Date(),
                    }).save();

                    chatUser.lastExit = event.createdAt;
                    await chatUser.save();

                    pubSub.publish("NEW_MESSAGE_OR_EVENT", event);
                    pubSub.publish("DELETED_CHAT_USER", user);
                    pubSub.publish("EDITED_CHAT_USER", chatUser);

                    return true;
                } else {
                    return false;
                }
            } {
                return false;
            }
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async changeUserRole(
        @Arg("chatId") chatId: string,
        @Arg("userId", () => Int) userId: number,
        @Arg("role", { nullable: true }) role: string,
        @Ctx() { payload }: AuthContext,
    ): Promise<Boolean> {
        const chat = await this.chatRepository.findOne({ where: { chatId, type: "group" }, relations: ["users"] });
        const user = await this.userRepository.findOne({ where: { id: userId } });

        if (!payload) {
            return false;
        }

        if (!chat || !user || role === "" || role === "Role") {
            return false;
        } else {
            const me = chat.users.find(chatUser => chatUser.userId === payload.id);
            const chatUser = chat.users.find(chatUser => chatUser.userId === user.id);

            if (me && me.role === "admin" && chatUser) {
                chatUser.role = role;
                await chatUser.save();

                pubSub.publish("EDITED_CHAT_USER", chatUser);

                return true;
            } {
                return false;
            }
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteMeFromGroup(
        @Arg("chatId") chatId: string,
        @Ctx() { payload }: AuthContext,
    ): Promise<Boolean> {
        if (!payload) {
            return false;
        }

        const chat = await this.chatRepository.findOne({ where: { chatId, type: "group" }, relations: ["users"] });
        const user = await this.userRepository.findOne({ where: { id: payload.id } });

        if (!chat || !user) {
            return false;
        } else {
            const me = chat.users.find(chatUser => chatUser.userId === user.id);

            if (me && !me.inside) {
                await me.remove();

                return true;
            } {
                return false;
            }
        }
    }

    @Mutation(() => ChatResponse)
    @UseMiddleware(isAuth)
    async editGroupInfo(
        @Arg("chatId") chatId: string,
        @Arg("chatTitle") chatTitle: string,
        @Arg("chatImage") chatImage: string,
        @Ctx() { payload }: AuthContext,
    ): Promise<ChatResponse> {
        let status = "";
        const chat = await this.chatRepository.findOne({ where: { chatId, type: "group" }, relations: ["users"] });

        if (!payload) {
            status = "You're not authenticated.";
        } else {
            const user = await this.userRepository.findOne({ where: { id: payload.id } });

            if (!chat || !user) {
                status = "An error has occurred while loading the data.";
            } else {
                chat.chatImage = chatImage;
                chat.chatTitle = chatTitle;

                await chat.save();

                const event = await this.eventRepository.create({
                    userId: user.id,
                    eventType: "chat",
                    eventMessage: `${user.firstName} ${user.lastName} edited the group information.`,
                    chat: await this.chatRepository.findOne({ where: { chatId } }) as Chat,
                    createdAt: new Date(),
                }).save();

                pubSub.publish("NEW_MESSAGE_OR_EVENT", event);
                pubSub.publish("EDITED_CHAT_INFO", chat);

                status = "The group information has been updated.";
            }
        }

        return {
            status,
        };
    }

    @Query(() => [User])
    async chatUsers(
        @Arg("chatId", { nullable: true }) chatId: string,
    ) {
        const chat = await this.chatRepository.findOne({ where: { chatId }, relations: ["users"] });

        let users: User[] = [];
    
        if (chat) {
            if (chat.type === "chat") {
                const ids = chat.users.map((user) => user.userId);

                for (const id of ids) {
                    const user = await this.userRepository.findOne({ where: { id } });

                    if (user) {
                        users.push(user);
                    }
                }
            } else {
                for (const chatUser of chat.users) {
                    const user = await this.userRepository.findOne({ where: { id: chatUser.userId } });

                    if (user && chatUser.inside) {
                        users.push(user);
                    }
                }
            }
        }

        return users;
    }

    @Subscription(() => [User], {
        topics: "ADDED_CHAT_USERS",
        filter: async ({ payload, args }) => {
            const chatRepository = appDataSource.getRepository(Chat);
            const chat = await chatRepository.findOne({ where: { chatId: args.chatId }, relations: ["users"] });

            if (chat) {
                const users = chat.users.map(chatUser => chatUser.userId);
                const addedUsers = payload.map((user: User) => user.id);

                return addedUsers.every((id: number) => users.includes(id));               
            } else {
                return false;
            }
        },
    })
    addedChatUsers(@Arg("chatId", { nullable: true }) _chatId: string, @Root() chatUsers: User[]): User[] {
        return chatUsers;
    }

    @Subscription(() => ChatUser, {
        topics: "EDITED_CHAT_USER",
        filter: async ({ payload, args }) => {
            return payload.userId === args.userId;
        },
    })
    editedChatUser(@Arg("userId", () => Int, { nullable: true }) _userId: number, @Root() chatUser: ChatUser): ChatUser {
        return chatUser;
    }

    @Subscription(() => User, {
        topics: "DELETED_CHAT_USER",
        filter: async ({ payload, args }) => {
            const chatRepository = appDataSource.getRepository(Chat);
            const chat = await chatRepository.findOne({ where: { chatId: args.chatId }, relations: ["users"] });
            
            if (chat) {
                const users = chat.users.map(chatUser => chatUser.userId);
                return users.includes(payload.id);                
            } else {
                return false;
            }
        },
    })
    deletedChatUser(@Arg("chatId", { nullable: true }) _chatId: string, @Root() chatUser: User): User {
        return chatUser;
    }
}

@Resolver(Message)
export class MessageResolver {
    private readonly userRepository: Repository<User>;
    private readonly chatRepository: Repository<Chat>;
    private readonly messageRepository: Repository<Message>;
    private readonly eventRepository: Repository<Event>;
    private readonly messageViewLogRepository: Repository<MessageViewLog>;
    private readonly messageNotificationRepository: Repository<MessageNotification>;
    private readonly userDeviceTokenRepository: Repository<UserDeviceToken>;
    private readonly blockRepository: Repository<Block>;

    constructor() {
        this.userRepository = appDataSource.getRepository(User);
        this.chatRepository = appDataSource.getRepository(Chat);
        this.messageRepository = appDataSource.getRepository(Message);
        this.eventRepository = appDataSource.getRepository(Event);
        this.messageViewLogRepository = appDataSource.getRepository(MessageViewLog);
        this.messageNotificationRepository = appDataSource.getRepository(MessageNotification);
        this.userDeviceTokenRepository = appDataSource.getRepository(UserDeviceToken);
        this.blockRepository = appDataSource.getRepository(Block);
    }

    @Mutation(() => Message, { nullable: true })
    @UseMiddleware(isAuth)
    async sendMessage(
        @Arg("type") type: string,
        @Arg("content") content: string,
        @Arg("media") media: string,
        @Arg("chatId") chatId: string,
        @Ctx() { payload }: AuthContext,
        @Arg("isReplyTo", () => Int, { nullable: true }) isReplyTo?: number,
    ) {
        let mediaObject = JSON.parse(media);

        if (!payload) {
            return null;
        } else {
            if (content === "" && (!media || media === "")) {
                return null;
            } else {
                const chat = await this.chatRepository.findOne({ where: { chatId }, relations: ["users", "messages", "events"] });

                const message = await this.messageRepository.create({
                    messageId: uuidv4(),
                    authorId: payload.id,
                    type,
                    content,
                    isEdited: false,
                    media: {
                        src: mediaObject.src,
                        type: mediaObject.type,
                    },
                    mentions: [], // extractMentions(content)
                    hashtags: [], // extractHashtags(content)
                    status: MessageStatus.SENT,
                    chat: await this.chatRepository.findOne({ where: { chatId } }) as Chat,
                    isReplyTo,
                }).save();

                if (message && chat) {
                    chat.messages.push(message);
                    chat.messagesCount += 1;

                    await chat.save();

                    const users = chat.users.filter(chatUser => chatUser.inside === false);

                    if (chat.type === "chat") {
                        chat.visible = true;
                        await chat.save();

                        for (const user of users) {
                            user.inside = true;
                            user.joinedChat = message.createdAt;
                            
                            await user.save();
                        }
                    }

                    const otherChatUsers = chat.users.filter(chatUser => chatUser.userId !== payload.id);

                    const userBlockedByMe = await this.blockRepository.findOne({ where: { blockedId: otherChatUsers[0].userId, userId: payload.id } });
                    const userBlockedMe = await this.blockRepository.findOne({ where: { blockedId: payload.id, userId: otherChatUsers[0].userId } });

                    if (chat.type === "chat" && (userBlockedByMe || userBlockedMe)) {
                        otherChatUsers[0].hiddenMessagesIds.push(message.id);

                        await otherChatUsers[0].save();
                    } else {
                        pubSub.publish("NEW_CHAT", chat);
                        pubSub.publish("NEW_MESSAGE_OR_EVENT", message);

                        const insideUsers = chat.users.filter((user) => user.inside);

                        const me = await this.userRepository.findOne({ where: { id: payload.id } });

                        for (const user of insideUsers) {
                            const chatUser = await this.userRepository.findOne({ where: { id: user.userId } });

                            if (chatUser && me && user.userId !== payload.id) {
                                const notification = await this.messageNotificationRepository.create({
                                    notificationId: uuidv4(),
                                    creatorId: payload.id,
                                    chatId,
                                    itemId: message.id,
                                    recipientId: user.userId,
                                    itemType: "message",
                                    viewed: false,
                                    content: message.content,
                                }).save();

                                pubSub.publish("NEW_CHAT_NOTIFICATION", notification);

                                const tokens = await this.userDeviceTokenRepository.find({ where: { userId: user.userId } });
                                const pushNotification: FirebaseNotification = {
                                    title: `${me.firstName} ${me.lastName} (@${me.username})`,
                                    body: notification.content,
                                    imageUrl: me.profile.profilePicture.length > 0 ? me.profile.profilePicture : "https://img.zncdn.net/brand/profile-picture.png",
                                };
                                const link = `${process.env.CLIENT_ORIGIN}/messages/${chatId}`;
                                await sendPushNotifications(tokens as UserDeviceToken[], pushNotification, link, { username: chatUser.username, type: notification.itemType });
                            }
                        }
                    }

                    return message;
                } else {
                    return null;
                }
            }
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async editMessage(
        @Arg("messageId") messageId: string,
        @Arg("content") content: string,
        @Arg("media") media: string,
        @Arg("chatId") chatId: string,
        @Ctx() { payload }: AuthContext,
    ) {
        let mediaObject = JSON.parse(media);

        if (!payload) {
            return false;
        } else {
            if (content === "" && (!media || media === "")) {
                return false;
            } else {
                const chat = await this.chatRepository.findOne({ where: { chatId }, relations: ["users", "messages", "events"] });

                if (!chat) {
                    return false;
                }

                await this.messageRepository.update(
                    {
                        messageId,
                        chat: { chatId: chat.chatId },
                    },
                    {
                        content,
                        isEdited: true,
                        mentions: [], // extractMentions(content)
                        hashtags: [], // extractHashtags(content)
                        status: MessageStatus.SENT,
                    }
                );

                const message = await this.messageRepository.findOne({ where: { messageId }, relations: ["chat"] });

                if (message) {
                    if (mediaObject.src.length > 0) {
                        message.media.src = mediaObject.src;
                        message.media.type = mediaObject.type;

                        await message.save();
                    }
                    
                    pubSub.publish("EDITED_MESSAGE", message);
                }

                return true;
            }
        }
    }

    @Query(() => Message, { nullable: true })
    @UseMiddleware(isAuth)
    async findMessage(
        @Arg("chatId", { nullable: true }) chatId: string,
        @Arg("messageId", { nullable: true }) messageId: string,
        @Ctx() { payload }: AuthContext
    ) {
        if (!payload) {
            return null;
        } else {
            const chat = await this.chatRepository.findOne({ where: { chatId } });
            
            if (!chat) {
                return null;
            } else {
                const message = await this.messageRepository.findOne({ where: { messageId, chat: { chatId } }, relations: ["chat"] });

                if (message) {
                    return message;
                } else {
                    return null;
                }
            }
        }
    }

    @Query(() => Message, { nullable: true })
    @UseMiddleware(isAuth)
    async findMessageById(
        @Arg("chatId") chatId: string,
        @Arg("id", () => Int) id: number,
        @Ctx() { payload }: AuthContext
    ) {
        if (!payload) {
            return null;
        } else {
            const chat = await this.chatRepository.findOne({ where: { chatId } });
            
            if (!chat) {
                return null;
            } else {
                const message = await this.messageRepository.findOne({ where: { id, chat: { chatId } }, relations: ["chat"] });

                if (message) {
                    return message;
                } else {
                    return null;
                }
            }
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteMessageForMe(
        @Arg("chatId") chatId: string,
        @Arg("messageId") messageId: string,
        @Ctx() { payload }: AuthContext
    ) {
        if (!payload) {
            return false;
        }

        const chat = await this.chatRepository.findOne({ where: { chatId }, relations: ["users", "messages", "events"] });
        const message = await this.messageRepository.findOne({ where: { messageId }, relations: ["chat"] });

        if (!chat || !message) {
            return false;
        }

        const me = chat.users.find(chatUser => chatUser.userId === payload.id);

        if (me) {
            const ids = [...me.hiddenMessagesIds];
            ids.push(message.id);
            me.hiddenMessagesIds = ids;

            await me.save();
        } else {
            return false;
        }

        if (chat.users.every((user) => user.hiddenMessagesIds.includes(message.id))) {
            chat.messages = chat.messages.filter((item) => item.id !== message.id);
            chat.messagesCount--;

            await chat.save();

            await this.messageRepository.delete({ messageId });
        }

        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteMessageForEveryone(
        @Arg("chatId") chatId: string,
        @Arg("messageId") messageId: string,
        @Ctx() { payload }: AuthContext,
    ) {
        if (!payload) {
            return false;
        }

        const chat = await this.chatRepository.findOne({ where: { chatId }, relations: ["users", "messages", "events"] });
        const message = await this.messageRepository.findOne({ where: { messageId, authorId: payload.id }, relations: ["chat"] });

        if (!chat || !message) {
            return false;
        }

        await this.messageRepository.delete({ messageId, authorId: payload.id });

        pubSub.publish("DELETED_MESSAGE_OR_EVENT", message);

        chat.messages = chat.messages.filter((item) => item.id !== message.id);
        chat.messagesCount--;

        await chat.save();

        const event = await this.eventRepository.create({
            userId: payload.id,
            resourceId: message.id,
            eventType: "message",
            eventMessage: "This message has been deleted.",
            chat: await this.chatRepository.findOne({ where: { chatId } }) as Chat,
            createdAt: message.createdAt,
        }).save();

        pubSub.publish("NEW_MESSAGE_OR_EVENT", event);

        const deletedNotifications = await this.messageNotificationRepository.find({
            where: {
                chatId,
                itemId: message.id,
                itemType: "message",
                creatorId: payload.id,
            }
        });

        if (deletedNotifications.length > 0) {
            for (const deletedNotification of deletedNotifications) {
                await this.messageNotificationRepository.delete({ itemId: message.id, creatorId: payload.id, notificationId: deletedNotification.notificationId });

                pubSub.publish("DELETED_CHAT_NOTIFICATION", deletedNotification);
            }
        }
        
        return true;
    }

    @Query(() => [MessageOrEvent])
    @UseMiddleware(isAuth)
    async messagesAndEvents(
        @Arg("chatId", { nullable: true }) chatId: string,
        @Ctx() { payload }: AuthContext
    ) {
        const chat = await this.chatRepository.findOne({ where: { chatId }, relations: ["users", "messages", "events"] });

        if (chat && payload) {
            const me = chat.users.find(chatUser => chatUser.userId === payload.id);

            if (me) {
                const messages = await this.messageRepository.find({ where: { chat: { chatId } }, relations: ["chat"], order: { createdAt: "ASC" } });
                const visibleMessages = messages.filter((message) => !me.hiddenMessagesIds.includes(message.id));
                const events = await this.eventRepository.find({ where: { chat: { chatId } }, relations: ["chat"], order: { createdAt: "ASC" } });
                const results = [...events, ...visibleMessages];

                let filteredResults = [];

                for (const result of results) {
                    if (me.inside) {
                        if (result.createdAt >= me.joinedChat) {
                            filteredResults.push(result);
                        }
                    } else {
                        if (result.createdAt <= me.lastExit) {
                            filteredResults.push(result);
                        }
                    }
                }

                filteredResults.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

                return filteredResults;
            } else {
                return [];
            }
        } else {
            return [];
        }
    }

    @Subscription(() => MessageOrEvent, {
        topics: "NEW_MESSAGE_OR_EVENT",
        filter: async ({ payload, args }) => {
            const chatRepository = appDataSource.getRepository(Chat);
            const chat = await chatRepository.findOne({ where: { chatId: args.chatId }, relations: ["users"] });
            
            if (chat) {
                const me = chat.users.find((user) => user.userId === args.userId);
                if (me && me.inside) {
                    return payload.chat.chatId === args.chatId;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
    })
    newMessageOrEvent(@Arg("chatId", { nullable: true }) _chatId: string, @Arg("userId", () => Int, { nullable: true }) _userId: number, @Root() messageOrEvent: typeof MessageOrEvent): typeof MessageOrEvent {
        return messageOrEvent;
    }

    @Subscription(() => MessageOrEvent, {
        topics: "DELETED_MESSAGE_OR_EVENT",
        filter: async ({ payload, args }) => {
            const chatRepository = appDataSource.getRepository(Chat);
            const chat = await chatRepository.findOne({ where: { chatId: args.chatId }, relations: ["users"] });
            
            if (chat) {
                const me = chat.users.find((user) => user.userId === args.userId);
                if (me && me.inside) {
                    return payload.chat.chatId === args.chatId;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
    })
    deletedMessageOrEvent(@Arg("chatId", { nullable: true }) _chatId: string, @Arg("userId", () => Int, { nullable: true }) _userId: number, @Root() messageOrEvent: typeof MessageOrEvent): typeof MessageOrEvent {
        return messageOrEvent;
    }

    @Mutation(() => Message, { nullable: true })
    @UseMiddleware(isAuth)
    async viewMessage(
        @Arg("messageId", { nullable: true }) messageId: string,
        @Ctx() { payload }: AuthContext,
    ) {
        const message = await this.messageRepository.findOne({ where: { messageId }, relations: ["chat"] });

        if (!payload || !message) {
            return null;
        }

        const messageViewLog = await this.messageViewLogRepository.findOne({ where: { messageId, userId: payload.id } });
        
        if (!messageViewLog) {
            await this.messageViewLogRepository.create({
                messageId,
                userId: payload.id,
            }).save();
        }

        const chat = await this.chatRepository.findOne({ where: { chatId: message.chat.chatId }, relations: ["users"] });
        const messageViewLogs = await this.messageViewLogRepository.find({ where: { messageId } });

        if (message.status === MessageStatus.SENT && chat && messageViewLogs) {
            const chatUserIds = chat.users.filter((user) => user.inside).map((user) => user.userId);
            const usersViewedIds = messageViewLogs.map((view) => view.userId);
        
            if (chatUserIds.every((id) => usersViewedIds.includes(id))) {
                message.status = MessageStatus.VIEWED;
                await message.save();

                pubSub.publish("EDITED_MESSAGE", message);
            }
        }

        return message;
    }

    @Subscription(() => Message, {
        topics: "EDITED_MESSAGE",
        filter: ({ payload, args }) => {
            return payload.messageId === args.messageId;
        },
    })
    editedMessage(@Arg("messageId", { nullable: true }) _messageId: string, @Root() message: Message): Message {
        return message;
    }
}