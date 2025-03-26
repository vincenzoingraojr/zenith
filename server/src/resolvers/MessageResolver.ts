import { AuthContext } from "../types";
import { Chat, ChatUser, Event, Message, MessageOrEvent, MessageViewLog } from "../entities/Message";
import { isAuth } from "../middleware/isAuth";
import { Arg, Ctx, Field, Int, Mutation, ObjectType, Query, Resolver, Root, Subscription, UseMiddleware } from "type-graphql";
import { FieldError } from "./common";
import { v4 as uuidv4 } from "uuid";
import { Block, User, UserDeviceToken } from "../entities/User";
import { mergeAndDeduplicateArrays } from "../helpers/mergeAndDeduplicateArrays";
import { MessageStatus } from "../helpers/enums";
import { MessageNotification } from "../entities/Notification";
import { Brackets, In, IsNull, Repository } from "typeorm";
import appDataSource from "../dataSource";
import { pubSub } from "../helpers/createPubSub";
import { Notification as FirebaseNotification } from "firebase-admin/messaging";
import { sendPushNotifications } from "../helpers/notifications";
import lumen from "@zenith-to/lumen-js";
import { logger } from "../helpers/logger";
import { UserResolver } from "./UserResolver";
import { MessageNotificationResolver } from "./NotificationResolver";
import { isUUID } from "class-validator";
import { CHAT_TYPES, CHAT_USER_ROLES, EVENT_TYPES, MESSAGE_TYPES } from "../helpers/message/chatTypes";
import { EMPTY_CONTENT_REGEXP } from "../helpers/textConstants";
import { MESSAGE_NOTIFICATION_TYPES } from "../helpers/notification/notificationTypes";
import { getPresignedUrlForDeleteCommand } from "../helpers/getPresignedUrls";
import axios from "axios";

@ObjectType()
export class ChatResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => Chat, { nullable: true })
    chat?: Chat | null;

    @Field(() => String, { nullable: true })
    status?: string;

    @Field(() => Boolean)
    ok: boolean;
}

@Resolver(Chat)
export class ChatResolver {
    private readonly userResolver: UserResolver;
    private readonly chatRepository: Repository<Chat>;
    private readonly userRepository: Repository<User>;
    private readonly messageRepository: Repository<Message>;
    private readonly eventRepository: Repository<Event>;
    private readonly chatUserRepository: Repository<ChatUser>;
    private readonly messageNotificationRepository: Repository<MessageNotification>;
    private readonly blockRepository: Repository<Block>;

    constructor() {
        this.userResolver = new UserResolver();
        this.chatRepository = appDataSource.getRepository(Chat);
        this.userRepository = appDataSource.getRepository(User);
        this.messageRepository = appDataSource.getRepository(Message);
        this.eventRepository = appDataSource.getRepository(Event);
        this.chatUserRepository = appDataSource.getRepository(ChatUser);
        this.messageNotificationRepository = appDataSource.getRepository(MessageNotification);
        this.blockRepository = appDataSource.getRepository(Block);
    }

    @Query(() => [Chat], { nullable: true })
    @UseMiddleware(isAuth)
    async chats(
        @Ctx() { payload }: AuthContext
    ): Promise<Chat[] | null> {
        if (!payload) {
            logger.warn("User not authenticated.");

            return null;
        }

        try {
            const userChats = await this.chatRepository
                .createQueryBuilder("chat")
                .leftJoinAndSelect("chat.users", "user")
                .where("user.userId = :userId", { userId: payload.id })
                .andWhere(
                    new Brackets(qb => {
                        qb.where("chat.type = :chatTypeGroup", { chatTypeGroup: CHAT_TYPES.GROUP })
                        .orWhere("chat.type = :chatTypeChat AND user.inside = :inside", { chatTypeChat: CHAT_TYPES.CHAT, inside: true });
                    })
                )
                .orderBy("chat.updatedAt", "DESC")
                .getMany();

            return userChats;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Subscription(() => Chat, {
        topics: "NEW_CHAT",
        filter: ({ payload, args }) => {
            const me = payload.users.find((user: ChatUser) => user.userId === args.userId);

            return payload.users.some((obj: ChatUser) => obj.userId === args.userId) && me.inside;
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
        @Arg("chatId") chatId: string,
        @Ctx() { payload }: AuthContext
    ) {
        if (!payload) {
            logger.warn("User not authenticated.");

            return null;
        }

        if (!isUUID(chatId)) {
            logger.warn("Invalid chatId provided.");

            return null;
        }
        
        try {
            const chat = await this.chatRepository.findOne({ where: { chatId }, relations: ["users"] });
            
            if (!chat) {
                logger.warn("Chat not found.");

                return null;
            } else {
                const isIdInArray = chat.users.some(obj => obj.userId === payload.id && obj.inside);

                if (isIdInArray) {
                    return chat;
                } else {
                    return null;
                }
            }
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Query(() => [User], { nullable: true })
    @UseMiddleware(isAuth)
    async usersToMessage(
        @Ctx() { payload }: AuthContext,
        @Arg("offset", () => Int, { nullable: true }) offset?: number,
        @Arg("limit", () => Int, { nullable: true }) limit?: number,
    ): Promise<User[] | null> {
        if (!payload) {
            logger.warn("User not authenticated.");

            return null;
        }

        try {
            const followers = await this.userResolver.getFollowers(payload.id);

            const everyoneUsers = await this.userRepository.find({ where: { deletedAt: IsNull(), userSettings: { incomingMessages: "everyone" } } });

            const userIds: number[] = [];

            if (followers && followers.length > 0) {
                const followerIds = followers.filter((follower) => follower.deletedAt === null).map((follower) => follower.id);   
                userIds.push(...mergeAndDeduplicateArrays(everyoneUsers.filter((user) => user.id !== payload.id).map((user) => user.id), followerIds));
            }

            const blockActions = await this.blockRepository.find({ where: { userId: payload.id } });
            const blockedMeActions = await this.blockRepository.find({ where: { blockedId: payload.id } });

            const blockedAccounts = blockActions.map((item) => item.blockedId);
            const blockedMeAccounts = blockedMeActions.map((item) => item.userId);

            const blockArray = mergeAndDeduplicateArrays(blockedAccounts, blockedMeAccounts);
            userIds.filter((item) => !blockArray.includes(item));

            const users = await this.userRepository.find({ where: { id: In(userIds), deletedAt: IsNull() }, order: { createdAt: "DESC" }, skip: offset, take: limit });
        
            return users;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Query(() => MessageOrEvent, { nullable: true })
    @UseMiddleware(isAuth)
    async latestMessageOrEvent(
        @Arg("chatId") chatId: string,
        @Ctx() { payload }: AuthContext
    ): Promise<typeof MessageOrEvent | null> {
        if (!payload) {
            logger.warn("User not authenticated.");

            return null;
        }

        if (!isUUID(chatId)) {
            logger.warn("Invalid chatId provided.");

            return null;
        }

        try {
            const chat = await this.findChat(chatId, { payload } as AuthContext);
            
            let result = null;

            if (!chat) {
                logger.warn("Chat not found.");

                return null;
            }

            const me = chat.users.find(chatUser => chatUser.userId === payload.id);

            if (!me) {
                logger.warn("User not found in chat.");

                return null;
            }

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

            return result;
        } catch (error) {
            logger.error(error);

            return null;
        }
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
        let ok = false;

        if (!payload) {
            status = "You're not authenticated.";
        } else {
            try {
                const existingChats = await this.chatRepository.find({ where: { type }, relations: ["users"] });

                let existingChatId = undefined;

                if (type === CHAT_TYPES.CHAT) {
                    for (const parent of existingChats) {
                        const childIds = parent.users.map((child: ChatUser) => child.userId);
                        const id = userIds[0];

                        if (childIds.includes(payload.id) && childIds.includes(id)) {
                            existingChatId = parent.id;
                        }
                    }
                }

                if (!existingChatId || type === CHAT_TYPES.GROUP) {
                    const users: ChatUser[] = [];

                    await Promise.all(
                        userIds.map(async (id) => {
                            const user = await this.userResolver.findUserById(id);
                            
                            if (user) {
                                const chatUser = await this.chatUserRepository.create({
                                    role: CHAT_USER_ROLES.MEMBER,
                                    userId: user.id,
                                    joinedChat: new Date(),
                                    inside: true,
                                }).save();

                                users.push(chatUser);
                            }
                        })
                    );

                    const me = await this.userResolver.findUserById(payload.id);

                    if (me) {
                        const meChatUser = await this.chatUserRepository.create({
                            role: type === CHAT_TYPES.CHAT ? CHAT_USER_ROLES.MEMBER : CHAT_USER_ROLES.ADMIN,
                            userId: me.id,
                            joinedChat: new Date(),
                            inside: true,
                        }).save();

                        users.push(meChatUser);
                    }

                    if (type === CHAT_TYPES.CHAT) {
                        chat = await this.chatRepository.create({
                            chatId: uuidv4(),
                            creatorId: payload.id,
                            type,
                            users,
                        }).save();
                    } else if (type === CHAT_TYPES.GROUP && (users.length > 2 && users.length <= 100)) {
                        chat = await this.chatRepository.create({
                            chatId: uuidv4(),
                            creatorId: payload.id,
                            type,
                            chatImage,
                            chatTitle,
                            users,
                        }).save();

                        if (chat) {
                            pubSub.publish("NEW_CHAT", chat);
                        }

                        if (me) {
                            const chatUsers = users.filter(user => user.userId !== me.id);

                            for (const chatUser of chatUsers) {
                                const user = await this.userRepository.findOne({ where: { id: chatUser.userId } });
                                
                                if (user) {
                                    const event = await this.eventRepository.create({
                                        itemId: uuidv4(),
                                        authorId: user.id,
                                        type: EVENT_TYPES.CHAT,
                                        resourceId: chat.id,
                                        eventMessage: `${me.name} added ${user.name} to the group.`,
                                        chat: await this.chatRepository.findOne({ where: { chatId: chat.chatId } }) as Chat,
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
                        }
                    }
                }

                ok = true;
            } catch (error) {
                logger.error(error);
                
                status = "An error occurred while creating the chat.";
            }
        }

        return {
            chat,
            status,
            ok,
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
        let ok = false;

        if (!isUUID(chatId)) {
            status = "Invalid chatId provided.";
        }

        if (!payload) {
            status = "You're not authenticated.";
        } else {
            try {
                const existingChat = await this.findChat(chatId, { payload } as AuthContext);

                if (existingChat && existingChat.type === CHAT_TYPES.GROUP) {
                    let users: ChatUser[] = [];
                    let actualUsers: User[] = [];

                    await Promise.all(
                        userIds.map(async (id) => {
                            const user = await this.userRepository.findOne({ where: { id, deletedAt: IsNull() } });
                            const existingChatUser = existingChat.users.find((chatUser) => chatUser.userId === id);
                            
                            if (user) {
                                if (!existingChatUser) {
                                    const chatUser = await this.chatUserRepository.create({
                                        role: CHAT_USER_ROLES.MEMBER,
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

                    const me = await this.userResolver.me({ payload } as AuthContext);
                    
                    if (me) {
                        for (const chatUser of actualUsers) {                    
                            const event = await this.eventRepository.create({
                                itemId: uuidv4(),
                                authorId: chatUser.id,
                                type: EVENT_TYPES.CHAT,
                                resourceId: existingChat.id,
                                eventMessage: `${me.name} added ${chatUser.name} to the group.`,
                                chat: await this.chatRepository.findOne({ where: { chatId } }) as  Chat,
                            }).save();
        
                            pubSub.publish("NEW_MESSAGE_OR_EVENT", event);
                        }
                    }

                    const publishedChat = await this.chatRepository.findOne({ where: { chatId }, relations: ["users"] });

                    if (publishedChat) {
                        pubSub.publish("NEW_CHAT", publishedChat);
                    }

                    status = "Users added to the group.";

                    ok = true;
                } else {
                    status = "Can't find the chat.";
                }
            } catch (error) {
                logger.error(error);

                status = "An error occurred while adding users to the group.";
            }
        }

        return {
            status,
            ok,
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
            logger.warn("User not authenticated.");

            return false;
        }

        try {
            const chat = await this.chatRepository.findOne({ where: { chatId, type }, relations: ["users"] });
            const user = await this.userResolver.me({ payload } as AuthContext);

            if (!chat || !user) {
                logger.warn("Chat or user not found.");

                return false;
            } else {
                const me = chat.users.find(chatUser => chatUser.userId === user.id);
                const otherChatUserIds = chat.users.filter(chatUser => chatUser.userId !== user.id).map(chatUser => chatUser.userId);
                const ids = Array.from(new Set(otherChatUserIds));

                const otherChatUsers = await this.userResolver.findUsersById(ids);

                const chatUsers = [];

                if (otherChatUsers && otherChatUsers.length > 0) {
                    const otherChatUserIdsSet = new Set(otherChatUsers.map(user => user.id));
                    chatUsers.push(...chat.users.filter((chatUser) => otherChatUserIdsSet.has(chatUser.userId)));
                }

                if (me && (me.role === CHAT_USER_ROLES.MEMBER || (me.role === CHAT_USER_ROLES.ADMIN && (chatUsers.every((user) => user.inside === false) || chatUsers.some(obj => obj.role === CHAT_USER_ROLES.ADMIN))))) {
                    me.inside = false;
                    me.role = CHAT_USER_ROLES.MEMBER;
                    await me.save();

                    if (chat.type === CHAT_TYPES.GROUP) {
                        const event = await this.eventRepository.create({
                            itemId: uuidv4(),
                            authorId: user.id,
                            type: EVENT_TYPES.CHAT,
                            resourceId: chat.id,
                            eventMessage: `${user.name} left the group.`,
                            chat: await this.chatRepository.findOne({ where: { chatId } }) as Chat,
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
                        });
                    }

                    return true;
                } {
                    return false;
                }
            }
        } catch (error) {
            logger.error(error);

            return false;
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async removeUserFromGroup(
        @Arg("chatId") chatId: string,
        @Arg("userId", () => Int) userId: number,
        @Ctx() { payload }: AuthContext,
    ): Promise<Boolean> {
        if (!payload) {
            logger.warn("User not authenticated.");

            return false;
        }

        if (!isUUID(chatId)) {
            logger.warn("Invalid chatId provided.");

            return false;
        }

        try {
            const chat = await this.chatRepository.findOne({ where: { chatId, type: CHAT_TYPES.GROUP }, relations: ["users"] });
            const user = await this.userResolver.findUserById(userId);

            if (!chat || !user) {
                logger.warn("Chat or user not found.");

                return false;
            } else {
                const me = chat.users.find(chatUser => chatUser.userId === payload.id);
                const chatUser = chat.users.find(chatUser => chatUser.userId === user.id);

                if (me && me.role === CHAT_USER_ROLES.ADMIN && chatUser) {
                    chatUser.inside = false;
                    chatUser.role = CHAT_USER_ROLES.MEMBER;
                    await chatUser.save();
                    
                    const meUser = await this.userResolver.me({ payload } as AuthContext);

                    if (meUser) {
                        const event = await this.eventRepository.create({
                            itemId: uuidv4(),
                            authorId: user.id,
                            type: EVENT_TYPES.CHAT,
                            resourceId: chat.id,
                            eventMessage: `${user.name} has been removed from the group by ${meUser.name}.`,
                            chat: await this.chatRepository.findOne({ where: { chatId } }) as Chat,
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
        } catch (error) {
            logger.error(error);

            return false;
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
        if (!isUUID(chatId)) {
            logger.warn("Invalid chatId provided.");

            return false;
        }

        if (!payload) {
            logger.warn("User not authenticated.");
            
            return false;
        }
        
        try {
            const chat = await this.chatRepository.findOne({ where: { chatId, type: CHAT_TYPES.GROUP }, relations: ["users"] });
            const user = await this.userResolver.findUserById(userId);

            if (!chat || !user || role === "" || role === "Role") {
                return false;
            } else {
                const me = chat.users.find(chatUser => chatUser.userId === payload.id);
                const chatUser = chat.users.find(chatUser => chatUser.userId === user.id);

                if (me && me.role === CHAT_USER_ROLES.ADMIN && chatUser) {
                    chatUser.role = role;
                    await chatUser.save();

                    pubSub.publish("EDITED_CHAT_USER", chatUser);

                    return true;
                } {
                    return false;
                }
            }
        } catch (error) {
            logger.error(error);

            return false;
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteMeFromGroup(
        @Arg("chatId") chatId: string,
        @Ctx() { payload }: AuthContext,
    ): Promise<Boolean> {
        if (!payload) {
            logger.warn("User not authenticated.");

            return false;
        }

        if (!isUUID(chatId)) {
            logger.warn("Invalid chatId provided.");

            return false;
        }

        try {
            const chat = await this.chatRepository.findOne({ where: { chatId, type: CHAT_TYPES.GROUP }, relations: ["users"] });
            const user = await this.userResolver.me({ payload } as AuthContext);

            if (!chat || !user) {
                logger.warn("Chat or user not found.");

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
        } catch (error) {
            logger.error(error);

            return false;
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
        let ok = false;

        if (!isUUID(chatId)) {
            status = "Invalid chatId provided.";
        }

        if (!payload) {
            status = "You're not authenticated.";
        } else {
            try {
                const chat = await this.chatRepository.findOne({ where: { chatId, type: CHAT_TYPES.GROUP }, relations: ["users"] });
                const user = await this.userResolver.me({ payload } as AuthContext);

                if (!chat || !user) {
                    status = "An error has occurred while loading the data.";
                } else {
                    chat.chatImage = chatImage;
                    chat.chatTitle = chatTitle;

                    await chat.save();

                    const event = await this.eventRepository.create({
                        itemId: uuidv4(),
                        authorId: user.id,
                        type: EVENT_TYPES.CHAT,
                        resourceId: chat.id,
                        eventMessage: `${user.name} edited the group information.`,
                        chat: await this.chatRepository.findOne({ where: { chatId } }) as Chat,
                    }).save();

                    pubSub.publish("NEW_MESSAGE_OR_EVENT", event);
                    pubSub.publish("EDITED_CHAT_INFO", chat);

                    status = "The group information has been updated.";
                    
                    ok = true;
                }
            } catch (error) {
                logger.error(error);

                status = "An error occurred while editing the group info.";
            }
        }

        return {
            status,
            ok,
        };
    }

    @Query(() => [User], { nullable: true })
    @UseMiddleware(isAuth)
    async chatUsers(
        @Arg("chatId", { nullable: true }) chatId: string,
        @Ctx() { payload }: AuthContext,
    ): Promise<User[] | null> {
        if (!payload) {
            logger.warn("User not authenticated.");

            return null;
        }

        if (!isUUID(chatId)) {
            logger.warn("Invalid chatId provided.");

            return null;
        }

        try {
            const chat = await this.findChat(chatId, { payload } as AuthContext);
            const user = await this.userResolver.me({ payload } as AuthContext);

            if (!chat || !user) {
                logger.warn("Chat or user not found.");

                return null;
            }

            const me = chat.users.find(chatUser => chatUser.userId === user.id && chatUser.inside);
            
            if (!me) {
                return null;
            }

            const otherChatUserIds = chat.users.filter(chatUser => chatUser.userId !== me.userId && chatUser.inside).map(chatUser => chatUser.userId);
            const ids = Array.from(new Set(otherChatUserIds));

            const otherChatUsers = await this.userResolver.findUsersById(ids);

            return otherChatUsers;
        } catch (error) {
            logger.error(error);

            return null;
        }
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
    private readonly userResolver: UserResolver;
    private readonly chatResolver: ChatResolver;
    private readonly messageNotificationResolver: MessageNotificationResolver;
    private readonly chatRepository: Repository<Chat>;
    private readonly messageRepository: Repository<Message>;
    private readonly eventRepository: Repository<Event>;
    private readonly messageViewLogRepository: Repository<MessageViewLog>;
    private readonly messageNotificationRepository: Repository<MessageNotification>;
    private readonly userDeviceTokenRepository: Repository<UserDeviceToken>;
    private readonly blockRepository: Repository<Block>;

    constructor() {
        this.userResolver = new UserResolver();
        this.chatResolver = new ChatResolver();
        this.messageNotificationResolver = new MessageNotificationResolver();
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
        @Arg("chatPreview", { nullable: true }) chatPreview: boolean = false,
        @Ctx() { payload }: AuthContext,
        @Arg("isReplyToId", () => Int, { nullable: true }) isReplyToId?: number,
        @Arg("chatId", { nullable: true }) chatId?: string,
        @Arg("userId", { nullable: true }) userId?: number,
        @Arg("media", { nullable: true }) media?: string,
        @Arg("item", { nullable: true }) item?: string,
    ) {
        let mediaObject = null;
        let itemObject = null;

        if (media && media.length > 0) {
            mediaObject = JSON.parse(media);
        }

        if (item && item.length > 0) {
            itemObject = JSON.parse(item);
        }

        if (!payload) {
            logger.warn("User not authenticated.");

            return null;
        } 
        
        try {
            if (EMPTY_CONTENT_REGEXP.test(content) && !mediaObject && !itemObject) {
                logger.warn("Empty content provided.");

                return null;
            }

            let chat = null;

            if (chatPreview && !chatId && userId) {
                const chatResponse = await this.chatResolver.createChatOrGroup("chat", [userId], { payload } as AuthContext);
            
                if (chatResponse.ok) {
                    chat = chatResponse.chat;
                }
            } else {
                chat = await this.chatRepository.findOne({ where: { chatId }, relations: ["users", "messages"] });
            }

            if (!chat) {
                logger.warn("Chat not found.");

                return null;
            }

            const message = await this.messageRepository.create({
                itemId: uuidv4(),
                authorId: payload.id,
                type,
                content,
                media: {
                    src: mediaObject.src,
                    type: mediaObject.type,
                },
                messageItem: {
                    type: itemObject.type,
                    id: itemObject.id,
                },
                mentions: lumen.extractMentions(content),
                hashtags: lumen.extractHashtags(content),
                chat: await this.chatRepository.findOne({ where: { chatId } }) as Chat,
                isReplyToId,
            }).save();

            if (message) {
                chat.messages.push(message);

                await chat.save();

                let chatTypeBlocked = false;
                
                if (chat.type === CHAT_TYPES.CHAT) {
                    const users = chat.users.filter(chatUser => chatUser.inside === false);

                    for (const user of users) {
                        user.inside = true;
                        user.joinedChat = message.createdAt;
                        
                        await user.save();
                    }

                    const otherChatUsers = chat.users.filter(chatUser => chatUser.userId !== payload.id);

                    const userBlockedByMe = await this.blockRepository.findOne({ where: { blockedId: otherChatUsers[0].userId, userId: payload.id } });
                    const userBlockedMe = await this.blockRepository.findOne({ where: { blockedId: payload.id, userId: otherChatUsers[0].userId } });
    
                    if (userBlockedByMe || userBlockedMe) {
                        otherChatUsers[0].hiddenMessagesIds.push(message.id);

                        await otherChatUsers[0].save();

                        chatTypeBlocked = true;
                    }
                }

                if (chat.type !== CHAT_TYPES.CHAT || !chatTypeBlocked) {
                    pubSub.publish("NEW_CHAT", chat);
                    pubSub.publish("NEW_MESSAGE_OR_EVENT", message);

                    const insideUsers = chat.users.filter((user) => user.inside && user.userId !== payload.id).map((user) => user.userId);

                    const me = await this.userResolver.me({ payload } as AuthContext);

                    const chatUsers = await this.userResolver.findUsersById(insideUsers);

                    if (chatUsers && me && chatUsers.length > 0) {
                        for (const chatUser of chatUsers) {
                            const notificationContent = message.content.length > 0 ? message.content : (message.media.src.length > 0 ? `Sent a ${message.media.type}` : (message.messageItem.type.length > 0 ? `Sent a ${message.messageItem.type}` : "Sent a message"));
                            const notification = await this.messageNotificationResolver.createMessageNotification(payload.id, chatUser.id, message.id, message.type, MESSAGE_NOTIFICATION_TYPES.MESSAGE, notificationContent, chat.chatId);

                            if (notification) {
                                pubSub.publish("NEW_CHAT_NOTIFICATION", notification);

                                const tokens = await this.userDeviceTokenRepository.find({ where: { userId: chatUser.id } });
                                const pushNotification: FirebaseNotification = {
                                    title: `${me.name} (@${me.username})`,
                                    body: notificationContent,
                                    imageUrl: (message.type === MESSAGE_TYPES.IMAGE ? message.media.src : (me.profile.profilePicture.length > 0 ? me.profile.profilePicture : "https://img.zncdn.net/static/profile-picture.png")),
                                };
                                const link = `${process.env.CLIENT_ORIGIN}/messages/${chat.chatId}`;
                                await sendPushNotifications(tokens as UserDeviceToken[], pushNotification, link, { username: chatUser.username, type: notification.notificationType });
                            }
                        }
                    }
                }

                return message;
            } else {
                return null;
            }
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async editMessage(
        @Arg("messageId") messageId: string,
        @Arg("content") content: string,
        @Arg("chatId") chatId: string,
        @Arg("deleteMedia", { nullable: true }) deleteMedia: boolean = false,
        @Ctx() { payload }: AuthContext,
        @Arg("media", { nullable: true }) media?: string,
    ) {
        if (!isUUID(messageId) || !isUUID(chatId)) {
            logger.warn("Invalid messageId or chatId provided.");

            return false;
        }

        let mediaObject = null;

        if (media && media.length > 0) {
            mediaObject = JSON.parse(media);
        }

        if (!payload) {
            logger.warn("User not authenticated.");

            return false;
        } 

        try {
            if (EMPTY_CONTENT_REGEXP.test(content) && !mediaObject) {
                logger.warn("Empty content provided.");

                return false;
            } 
            
            const chat = await this.chatRepository.findOne({ where: { chatId } });

            if (!chat) {
                logger.warn("Chat not found.");

                return false;
            }

            await this.messageRepository.update(
                {
                    itemId: messageId,
                    chat: { chatId: chat.chatId },
                },
                {
                    content,
                    isEdited: true,
                    mentions: lumen.extractMentions(content),
                    hashtags: lumen.extractHashtags(content),
                    status: MessageStatus.SENT,
                }
            );

            const message = await this.findMessage(chat.chatId, messageId, { payload } as AuthContext);

            if (message) {
                if (message.media.src.length > 0 && deleteMedia) {
                    const existingKey =
                        message.media.src.replace(
                            `https://${message.media.type.includes("image") ? "img" : "vid"}.zncdn.net/`, ""
                        );

                    const url = await getPresignedUrlForDeleteCommand(existingKey, message.media.type);

                    await axios.delete(url).then(() => {
                        logger.error("Message media successfully deleted.");
                    })
                    .catch((error) => {
                        logger.error(`An error occurred while deleting the message media. Error code: ${error.code}.`);
                    });

                    message.media.src = "";
                    message.media.type = "";

                    await message.save();
                }

                if (mediaObject.src.length > 0) {
                    message.media.src = mediaObject.src;
                    message.media.type = mediaObject.type;

                    await message.save();
                }
                
                pubSub.publish("EDITED_MESSAGE", message);
            }

            return true;
        } catch (error) {
            logger.error(error);

            return false;
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
        } 

        if (!isUUID(chatId) || !isUUID(messageId)) {
            logger.warn("Invalid chatId or messageId provided.");

            return null;
        }

        try {
            const chat = await this.chatResolver.findChat(chatId, { payload } as AuthContext);
            
            if (!chat) {
                logger.warn("Chat not found.");

                return null;
            } else {
                const message = await this.messageRepository.findOne({ where: { itemId: messageId, chat: { chatId } }, relations: ["chat"] });

                if (message) {
                    return message;
                } else {
                    return null;
                }
            }
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Query(() => Message, { nullable: true })
    @UseMiddleware(isAuth)
    async findMessageById(
        @Arg("chatId") chatId: string,
        @Arg("id", () => Int, { nullable: true }) id: number,
        @Ctx() { payload }: AuthContext,
    ) {
        if (!isUUID(chatId)) {
            logger.warn("Invalid chatId provided.");

            return null;
        }

        if (!payload) {
            return null;
        } 
        
        try {
            const chat = await this.chatResolver.findChat(chatId, { payload } as AuthContext);
            
            if (!chat) {
                logger.warn("Chat not found.");

                return null;
            } else {
                const message = await this.messageRepository.findOne({ where: { id, chat: { chatId } }, relations: ["chat"] });

                if (message) {
                    return message;
                } else {
                    return null;
                }
            }
        } catch (error) {
            logger.error(error);

            return null;
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
            logger.warn("User not authenticated.");

            return false;
        }

        if (!isUUID(chatId) || !isUUID(messageId)) {
            logger.warn("Invalid chatId or messageId provided.");

            return false;
        }

        try {
            const chat = await this.chatResolver.findChat(chatId, { payload } as AuthContext);
            const message = await this.findMessage(chatId, messageId, { payload } as AuthContext);

            if (!chat || !message) {
                logger.warn("Chat or message not found.");

                return false;
            }

            const me = chat.users.find(chatUser => chatUser.userId === payload.id);

            if (me) {
                me.hiddenMessagesIds.push(message.id);

                await me.save();
            } else {
                return false;
            }

            if (chat.users.every((user) => user.hiddenMessagesIds.includes(message.id))) {
                chat.messages = chat.messages.filter((item) => item.id !== message.id);

                await chat.save();

                if (message.media.src.length > 0) {
                    const existingKey =
                        message.media.src.replace(
                            `https://${message.media.type.includes("image") ? "img" : "vid"}.zncdn.net/`, ""
                        );

                    const url = await getPresignedUrlForDeleteCommand(existingKey, message.media.type);

                    await axios.delete(url).then(() => {
                        logger.error("Message media successfully deleted.");
                    })
                    .catch((error) => {
                        logger.error(`An error occurred while deleting the message media. Error code: ${error.code}.`);
                    });
                }

                await this.messageRepository.delete({ itemId: messageId });

                await this.messageNotificationRepository.delete({ resourceId: message.id, resourceType: MESSAGE_NOTIFICATION_TYPES.MESSAGE });
            }

            return true;
        } catch (error) {
            logger.error(error);

            return false;
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteMessageForEveryone(
        @Arg("chatId") chatId: string,
        @Arg("messageId") messageId: string,
        @Ctx() { payload }: AuthContext,
    ) {
        if (!payload) {
            logger.warn("User not authenticated.");

            return false;
        }

        if (!isUUID(chatId) || !isUUID(messageId)) {
            logger.warn("Invalid chatId or messageId provided.");

            return false;
        }

        try {
            const chat = await this.chatResolver.findChat(chatId, { payload } as AuthContext);
            const message = await this.messageRepository.findOne({ where: { itemId: messageId, authorId: payload.id }, relations: ["chat"] });

            if (!chat || !message) {
                logger.warn("Chat or message not found.");

                return false;
            }

            await this.messageRepository.delete({ itemId: messageId, chat: { chatId: chat.chatId }, authorId: payload.id });

            pubSub.publish("DELETED_MESSAGE_OR_EVENT", message);

            chat.messages = chat.messages.filter((item) => item.id !== message.id);

            await chat.save();

            if (message.media.src.length > 0) {
                const existingKey =
                    message.media.src.replace(
                        `https://${message.media.type.includes("image") ? "img" : "vid"}.zncdn.net/`, ""
                    );

                const url = await getPresignedUrlForDeleteCommand(existingKey, message.media.type);

                await axios.delete(url).then(() => {
                    logger.error("Message media successfully deleted.");
                })
                .catch((error) => {
                    logger.error(`An error occurred while deleting the message media. Error code: ${error.code}.`);
                });
            }

            const event = await this.eventRepository.create({
                itemId: uuidv4(),
                authorId: payload.id,
                resourceId: message.id,
                type: EVENT_TYPES.MESSAGE,
                eventMessage: "This message has been deleted.",
                chat: await this.chatRepository.findOne({ where: { chatId } }) as Chat,
                createdAt: message.createdAt,
            }).save();

            pubSub.publish("NEW_MESSAGE_OR_EVENT", event);

            const deletedNotifications = await this.messageNotificationRepository.find({
                where: {
                    chatId,
                    resourceId: message.id,
                    resourceType: MESSAGE_NOTIFICATION_TYPES.MESSAGE,
                    creatorId: payload.id,
                }
            });

            if (deletedNotifications.length > 0) {
                for (const deletedNotification of deletedNotifications) {
                    await this.messageNotificationRepository.delete({ resourceId: message.id, creatorId: payload.id, notificationId: deletedNotification.notificationId });

                    pubSub.publish("DELETED_CHAT_NOTIFICATION", deletedNotification);
                }
            }
            
            return true;
        } catch (error) {
            logger.error(error);

            return false;
        }
    }

    @Query(() => [MessageOrEvent], { nullable: true })
    @UseMiddleware(isAuth)
    async messagesAndEvents(
        @Arg("chatId", { nullable: true }) chatId: string,
        @Ctx() { payload }: AuthContext
    ): Promise<typeof MessageOrEvent[] | null> {
        if (!payload) {
            logger.warn("User not authenticated.");

            return null;
        }

        try {
            const chat = await this.chatResolver.findChat(chatId, { payload } as AuthContext);

            if (!chat) {
                logger.warn("Chat not found.");

                return null;
            }

            const me = chat.users.find(chatUser => chatUser.userId === payload.id);

            if (!me) {
                logger.warn("User not found in the chat.");

                return null;
            }

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
        } catch (error) {
            logger.error(error);

            return null;
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
        @Arg("messageId") messageId: string,
        @Arg("chatId") chatId: string,
        @Ctx() { payload }: AuthContext,
    ) {
        if (!payload) {
            logger.warn("User not authenticated.");

            return null;
        }

        if (!isUUID(chatId) || !isUUID(messageId)) {
            logger.warn("Invalid chatId or messageId provided.");

            return null;
        }

        try {
            const message = await this.findMessage(chatId, messageId, { payload } as AuthContext);

            const messageViewLog = await this.messageViewLogRepository.findOne({ where: { messageId, userId: payload.id } });
            
            if (!messageViewLog) {
                await this.messageViewLogRepository.create({
                    messageId,
                    userId: payload.id,
                }).save();
            }

            if (!message) {
                logger.warn("Message not found.");

                return null;
            }

            const chat = await this.chatResolver.findChat(chatId, { payload } as AuthContext);

            const messageViewLogs = await this.messageViewLogRepository.find({ where: { messageId } });

            if (message.status === MessageStatus.SENT && chat) {
                const chatUserIds = chat.users.filter((user) => user.inside).map((user) => user.userId);
                const usersViewedIds = messageViewLogs.map((view) => view.userId);
            
                if (chatUserIds.every((id) => usersViewedIds.includes(id))) {
                    message.status = MessageStatus.VIEWED;
                    await message.save();

                    pubSub.publish("EDITED_MESSAGE", message);
                }
            }

            return message;
        } catch (error) {
            logger.error(error);

            return null;
        }
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