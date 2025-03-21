import { isAuth } from "../middleware/isAuth";
import { MessageNotification, Notification } from "../entities/Notification";
import { Arg, Ctx, Field, Int, Mutation, ObjectType, Query, Resolver, Root, Subscription, UseMiddleware } from "type-graphql";
import { AuthContext } from "../types";
import { LessThan, Repository } from "typeorm";
import { Chat } from "../entities/Message";
import appDataSource from "../dataSource";
import { User } from "../entities/User";
import { UserResolver } from "./UserResolver";
import { logger } from "../helpers/logger";
import { isUUID } from "class-validator";
import { v4 as uuidv4 } from "uuid";

@ObjectType()
export class PaginatedNotifications {
    @Field(() => [Notification], { nullable: false })
    notifications: Notification[];

    @Field(() => String, { nullable: true })
    nextCursor: string | null;
}

@Resolver(Notification)
export class NotificationResolver {
    private readonly notificationRepository: Repository<Notification>;
    private readonly userResolver: UserResolver;

    constructor() {
        this.notificationRepository = appDataSource.getRepository(Notification);
        this.userResolver = new UserResolver();
    }

    @Query(() => PaginatedNotifications)
    @UseMiddleware(isAuth)
    async notificationFeed(
        @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
        @Arg("limit", () => Int, { nullable: true }) limit: number,
        @Ctx() { payload }: AuthContext
    ): Promise<PaginatedNotifications> {
        if (!payload) {
            logger.warn("No payload found in context. Returning empty feed.");

            return {
                notifications: [],
                nextCursor: null,
            };
        }

        try {
            let dateCursor: Date | null = null;

            if (cursor && cursor.length > 0) {
                const parsedDate = Date.parse(cursor);
                
                if (!isNaN(parsedDate)) {
                    dateCursor = new Date(parsedDate);
                }
            }

            const notifications = await this.notificationRepository.find({
                where: {
                    recipientId: payload.id,
                    ...(dateCursor && { createdAt: LessThan(dateCursor) }),
                },
                order: {
                    createdAt: "DESC",
                },
                take: limit,
            });

            const ids = Array.from(new Set(notifications.map((notification) => notification.creatorId)));
            const creators = await this.userResolver.findUsersById(ids);
            
            const feed: Notification[] = [];

            if (creators && creators.length > 0) {
                const creatorIdsSet = new Set(creators.map(creator => creator.id));
                feed.push(...notifications.filter((notification) => creatorIdsSet.has(notification.creatorId)));
            }

            const nextCursor = notifications.length === limit
                ? notifications[notifications.length - 1].createdAt.toISOString()
                : null;

            return { notifications: feed, nextCursor };
        } catch (error) {
            logger.error(error);

            return { notifications: [], nextCursor: null };
        }
    }

    @Query(() => [Notification])
    @UseMiddleware(isAuth)
    async unseenNotifications(@Ctx() { payload }: AuthContext) {
        if (!payload) {
            logger.warn("No payload found in context. Returning empty feed.");

            return [];
        }

        try {
            const unseenNotifications = await this.notificationRepository.find({
                order: {
                    createdAt: "DESC",
                },
                where: {
                    recipientId: payload.id,
                    viewed: false,
                },
            });

            const ids = Array.from(new Set(unseenNotifications.map((notification) => notification.creatorId)));
            const creators = await this.userResolver.findUsersById(ids);
            
            const unseenFeed: Notification[] = [];

            if (creators && creators.length > 0) {
                const creatorIdsSet = new Set(creators.map(creator => creator.id));
                unseenFeed.push(...unseenNotifications.filter((notification) => creatorIdsSet.has(notification.creatorId)));
            }

            return unseenFeed;
        } catch (error) {
            logger.error(error);

            return [];
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async viewNotification(
        @Arg("notificationId") notificationId: string,
        @Ctx() { payload }: AuthContext,
    ) {
        if (!payload) {
            logger.warn("No payload found in context. Returning false.");

            return false;
        }

        if (!isUUID(notificationId)) {
            logger.warn("Invalid UUID provided. Returning false.");

            return false;
        }

        try {
            const newNotification = await this.notificationRepository.findOne({
                where: {
                    notificationId,
                    recipientId: payload.id,
                    viewed: false,
                },
            });
    
            if (!newNotification) {
                logger.warn("Notification not found or already viewed. Returning false.");

                return false;
            }
    
            newNotification.viewed = true;
            await newNotification.save();
    
            return true;
        } catch (error) {
            logger.error(error);

            return false;
        }
    }

    @Subscription(() => Notification, {
        topics: "NEW_NOTIFICATION",
        filter: ({ payload, args }) => {
            return payload.recipientId === args.userId;
        },
    })
    newNotification(@Arg("userId", () => Int) _userId: number, @Root() notification: Notification): Notification {
        return notification;
    }

    @Subscription(() => Notification, {
        topics: "DELETED_NOTIFICATION",
        filter: ({ payload, args }) => {
            return payload.recipientId === args.userId;
        },
    })
    deletedNotification(@Arg("userId", () => Int) _userId: number, @Root() notification: Notification): Notification {
        return notification;
    }

    @Mutation(() => Notification, { nullable: true })
    async findNotification(
        @Arg("creatorId", () => Int) creatorId: number,
        @Arg("recipientId", () => Int) recipientId: number,
        @Arg("resourceId", () => Int) resourceId: number,
        @Arg("resourceType") resourceType: string,
        @Arg("notificationType") notificationType: string,
    ): Promise<Notification | null> {
        try {
            const notification = await this.notificationRepository.findOne({
                where: {
                    creatorId,
                    recipientId,
                    resourceId,
                    resourceType,
                    notificationType,
                },
            });

            return notification || null;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Mutation(() => Notification, { nullable: true })
    async createNotification(
        @Arg("creatorId", () => Int) creatorId: number,
        @Arg("recipientId", () => Int) recipientId: number,
        @Arg("resourceId", () => Int) resourceId: number,
        @Arg("resourceType") resourceType: string,
        @Arg("notificationType") notificationType: string,
        @Arg("content") content: string,
    ): Promise<Notification | null> {
        try {
            const newNotification = this.notificationRepository.create({
                notificationId: uuidv4(),
                creatorId,
                recipientId,
                resourceId,
                resourceType,
                notificationType,
                content,
            });

            await newNotification.save();

            return newNotification;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Mutation(() => Boolean)
    async deleteNotification(
        @Arg("notificationId") notificationId: string,
    ): Promise<boolean> {
        try {
            const notification = await this.notificationRepository.findOne({
                where: {
                    notificationId,
                },
            });

            if (!notification) {
                logger.warn("Notification not found. Returning false.");

                return false;
            }

            await this.notificationRepository.remove(notification);

            return true;
        } catch (error) {
            logger.error(error);

            return false;
        }
    }
}

// da sistemare
@Resolver(MessageNotification)
export class MessageNotificationResolver {
    private readonly messageNotificationRepository: Repository<MessageNotification>;
    private readonly chatRepository: Repository<Chat>;
    private readonly userRepository: Repository<User>;

    constructor() {
        this.messageNotificationRepository = appDataSource.getRepository(MessageNotification);
        this.chatRepository = appDataSource.getRepository(Chat);
        this.userRepository = appDataSource.getRepository(User);
    }

    @Query(() => [MessageNotification])
    @UseMiddleware(isAuth)
    async unseenMessageNotifications(
        @Arg("chatId", { nullable: true }) chatId: string,
        @Ctx() { payload }: AuthContext
    ) {
        if (payload) {
            const messageNotifications = await this.messageNotificationRepository.find({
                order: {
                    createdAt: "DESC",
                },
                where: {
                    chatId,
                    recipientId: payload.id,
                    viewed: false,
                },
            });

            const feed = [];

            for (const messageNotification of messageNotifications) {
                const creator = await this.userRepository.findOne({ where: { id: messageNotification.creatorId } });

                if (creator) {
                    feed.push(messageNotification);
                }
            }

            return feed;
        } else {
            return [];
        }
    }

    @Query(() => [MessageNotification])
    @UseMiddleware(isAuth)
    async allUnseenMessageNotifications(
        @Ctx() { payload }: AuthContext
    ) {
        const chats = await this.chatRepository.find({ relations: ["users"], order: { updatedAt: "DESC" } });
        
        if (payload) {
            const userChats: Chat[] = [];

            for (const chat of chats) {
                const me = chat.users.find(user => user.userId === payload.id);
                
                if (me && ((chat.users.some(obj => obj.userId === payload.id) && me.inside) || (chat.creatorId === payload.id && me.inside))) {
                    userChats.push(chat);
                }
            }

            const unseenMessageNotifications: MessageNotification[] = [];

            for (const userChat of userChats) {
                const userChatNotifications = await this.messageNotificationRepository.find({
                    order: {
                        createdAt: "DESC",
                    },
                    where: {
                        chatId: userChat.chatId,
                        recipientId: payload.id,
                        viewed: false,
                    },
                });

                const feed = [];

                for (const chatNotification of userChatNotifications) {
                    const creator = await this.userRepository.findOne({ where: { id: chatNotification.creatorId } });

                    if (creator) {
                        feed.push(chatNotification);
                    }
                }

                unseenMessageNotifications.push(...feed);
            }

            return unseenMessageNotifications;
        } else {
            return [];
        }
    }

    @Subscription(() => MessageNotification, {
        topics: "NEW_CHAT_NOTIFICATION",
        filter: async ({ payload, args }) => {
            const chats = await Chat.find({ relations: ["users"], order: { updatedAt: "DESC" } });
            const userChats: Chat[] = [];

            for (const chat of chats) {
                const me = chat.users.find(user => user.userId === args.userId);
                
                if (me && ((chat.users.some(obj => obj.userId === args.userId) && me.inside) || (chat.creatorId === args.userId && me.inside))) {
                    userChats.push(chat);
                }
            }

            const chatIds = userChats.map(chat => chat.chatId);

            if (args.chatId !== null) {
                return payload.chatId === args.chatId && payload.recipientId === args.userId;
            } else {
                return chatIds.includes(payload.chatId) && payload.recipientId === args.userId;
            }
        },
    })
    newMessageNotification(@Arg("chatId", { nullable: true }) _chatId: string, @Arg("userId", () => Int, { nullable: true }) _userId: number, @Root() notification: MessageNotification): MessageNotification {
        return notification;
    }

    @Subscription(() => MessageNotification, {
        topics: "DELETED_CHAT_NOTIFICATION",
        filter: async ({ payload, args }) => {
            const chatRepository = appDataSource.getRepository(Chat);
            const chats = await chatRepository.find({ relations: ["users"], order: { updatedAt: "DESC" } });
            const userChats: Chat[] = [];

            for (const chat of chats) {
                const me = chat.users.find(user => user.userId === args.userId);
                
                if (me && ((chat.users.some(obj => obj.userId === args.userId) && me.inside) || (chat.creatorId === args.userId && me.inside))) {
                    userChats.push(chat);
                }
            }

            const chatIds = userChats.map(chat => chat.chatId);

            if (args.chatId !== null) {
                return payload.chatId === args.chatId && payload.recipientId === args.userId;
            } else {
                return chatIds.includes(payload.chatId) && payload.recipientId === args.userId;
            }
        },
    })
    deletedMessageNotification(@Arg("chatId", { nullable: true }) _chatId: string, @Arg("userId", () => Int, { nullable: true }) _userId: number, @Root() notification: MessageNotification): MessageNotification {
        return notification;
    }

    @Mutation(() => Boolean, { nullable: true })
    @UseMiddleware(isAuth)
    async viewMessageNotifications(
        @Arg("chatId", { nullable: true }) chatId: string,
        @Ctx() { payload }: AuthContext,
    ) {
        if (!payload) {
            return false;
        }

        const newNotifications = await this.messageNotificationRepository.find({
            where: {
                chatId,
                recipientId: payload.id,
                viewed: false,
            },
        });

        if (newNotifications.length === 0) {
            return false;
        }

        await this.messageNotificationRepository
            .createQueryBuilder()
            .update(MessageNotification)
            .set({ viewed: true })
            .whereInIds(newNotifications.map((notification) => notification.id))
            .execute();

        return true;
    }
}