import { Arg, Ctx, Field, Int, Mutation, ObjectType, Query, Resolver, Root, Subscription, UseMiddleware } from "type-graphql";
import { FieldError } from "./common";
import { Article, Bookmark, FeedItem, Like, MediaItem, Post, ViewLog } from "../entities/Post";
import { isAuth } from "../middleware/isAuth";
import { AuthContext } from "../types";
import { v4 as uuidv4 } from "uuid";
import { User, UserDeviceToken } from "../entities/User";
import { Notification } from "../entities/Notification";
import { In, IsNull, Repository } from "typeorm";
import appDataSource from "../dataSource";
import { pubSub } from "../helpers/createPubSub";
import { Notification as FirebaseNotification } from "firebase-admin/messaging";
import { sendPushNotifications } from "../helpers/notifications";
import { ComprehendClient, DetectDominantLanguageCommand } from "@aws-sdk/client-comprehend";
import lumen from "@zenith-to/lumen-js";
import { getPresignedUrlForDeleteCommand } from "../helpers/getPresignedUrls";
import axios from "axios";
import { UserService } from "./UserService";
import { logger } from "../helpers/logger";
import { isUUID } from "class-validator";
import { NotificationService } from "./NotificationService";
import { POST_TYPES } from "../helpers/post/postTypes";
import { NOTIFICATION_TYPES } from "../helpers/notification/notificationTypes";
import { EMPTY_CONTENT_REGEXP } from "../helpers/textConstants";

@ObjectType()
export class PostResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => Post, { nullable: true })
    post?: Post | null;

    @Field(() => String, { nullable: true })
    status?: string;

    @Field(() => Boolean)
    ok: boolean;
}

@Resolver(Post)
export class PostResolver {
    private readonly userService: UserService;
    private readonly notificationService: NotificationService;
    private readonly userRepository: Repository<User>;
    private readonly postRepository: Repository<Post>;
    private readonly articleRepository: Repository<Article>;
    private readonly mediaItemRepository: Repository<MediaItem>;
    private readonly notificationRepository: Repository<Notification>;
    private readonly likeRepository: Repository<Like>;
    private readonly viewLogRepository: Repository<ViewLog>;
    private readonly userDeviceTokenRepository: Repository<UserDeviceToken>;
    private readonly bookmarkRepository: Repository<Bookmark>;
    private readonly comprehend: ComprehendClient;

    constructor() {
        this.userService = new UserService();
        this.notificationService = new NotificationService();
        this.userRepository = appDataSource.getRepository(User);
        this.postRepository = appDataSource.getRepository(Post);
        this.articleRepository = appDataSource.getRepository(Article);
        this.mediaItemRepository = appDataSource.getRepository(MediaItem);
        this.notificationRepository = appDataSource.getRepository(Notification);
        this.likeRepository = appDataSource.getRepository(Like);
        this.viewLogRepository = appDataSource.getRepository(ViewLog);
        this.userDeviceTokenRepository = appDataSource.getRepository(UserDeviceToken);
        this.bookmarkRepository = appDataSource.getRepository(Bookmark);
        this.comprehend = new ComprehendClient({ 
            region: "us-west-1",
            credentials: {
                accessKeyId: process.env.COMPREHEND_KEY_ID!,
                secretAccessKey: process.env.COMPREHEND_SECRET_KEY!,
            },
        });
    }

    @Subscription(() => Post, {
        topics: "NEW_POST",
        filter: ({ payload, args }) => {
            if (!args.postId) {
                return payload.isReplyToId === args.postId && payload.authorId === args.userId;
            } else {
                return payload.authorId === args.userId;
            }
        },
    })
    newPost(@Arg("postId", () => Int, { nullable: true }) _postId: number, @Arg("userId", () => Int) _userId: number, @Root() post: Post): Post {
        return post;
    }

    @Subscription(() => Post, {
        topics: "DELETED_POST",
        filter: ({ payload, args }) => {
            if (!args.postId) {
                return payload.isReplyToId === args.postId && payload.authorId === args.userId;
            } else {
                return payload.authorId === args.userId;
            }
        },
    })
    deletedPost(@Arg("postId", () => Int, { nullable: true }) _postId: number, @Arg("userId", () => Int) _userId: number, @Root() post: Post): Post {
        return post;
    }

    @Subscription(() => Post, {
        topics: "EDITED_POST",
        filter: ({ payload, args }) => {
            return payload.itemId === args.postId;
        },
    })
    editedPost(@Arg("postId") _postId: string, @Root() post: Post): Post {
        return post;
    }

    @Query(() => [Post], { nullable: true }) // implement algorithm
    async postFeed(
        @Arg("offset", () => Int, { nullable: true }) offset?: number,
        @Arg("limit", () => Int, { nullable: true }) limit?: number,
    ): Promise<Post[] | null> {
        try {
            const posts = await this.postRepository.find({
                where: {
                    type: POST_TYPES.POST,
                    author: {
                        deletedAt: IsNull(),
                    },
                },
                order: {
                    createdAt: "DESC",
                },
                skip: offset,
                take: limit,
                relations: ["author", "media"],
            });
    
            return posts;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Query(() => [Post], { nullable: true })
    async userPostFeed(
        @Arg("userId", () => Int, { nullable: true }) userId: number,
        @Arg("offset", () => Int, { nullable: true }) offset?: number,
        @Arg("limit", () => Int, { nullable: true }) limit?: number,
    ): Promise<Post[] | null> {
        if (!userId) {
            logger.warn("User id not provided.");

            return null;
        }

        try {
            const author = await this.userService.findUserById(userId);

            if (!author) {
                logger.warn("Post author not found.");

                return null;
            }

            return await this.postRepository.find({
                order: {
                    createdAt: "DESC",
                },
                where: {
                    type: POST_TYPES.POST,
                    author,
                },
                skip: offset,
                take: limit,
                relations: ["author", "media"],
            });
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Query(() => [Post], { nullable: true })
    async postComments(
        @Arg("id", () => Int, { nullable: true }) id: number,
        @Arg("type") type: string,
        @Arg("offset", () => Int, { nullable: true }) offset?: number,
        @Arg("limit", () => Int, { nullable: true }) limit?: number,
    ): Promise<Post[] | null> {
        if (!id) {
            logger.warn("Post id not provided.");

            return null;
        }
    
        try {
            const comments = await this.postRepository.find({
                order: {
                    createdAt: "DESC",
                },
                where: {
                    type: POST_TYPES.COMMENT,
                    isReplyToId: id,
                    isReplyToType: type,
                    author: {
                        deletedAt: IsNull(),
                    }
                }, 
                skip: offset,
                take: limit,
                relations: ["author", "media"],
            });
    
            return comments;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Query(() => [Post], { nullable: true })
    async userComments(
        @Arg("userId", () => Int, { nullable: true }) userId: number,
        @Arg("offset", () => Int, { nullable: true }) offset?: number,
        @Arg("limit", () => Int, { nullable: true }) limit?: number,
    ): Promise<Post[] | null> {
        if (!userId) {
            logger.warn("User id not provided.");

            return null;
        }
    
        try {
            const author = await this.userService.findUserById(userId);
            
            if (!author) {
                logger.warn("Post author not found.");

                return null;
            }
    
            return await this.postRepository.find({
                order: {
                    createdAt: "DESC",
                },
                where: {
                    type: POST_TYPES.COMMENT,
                    author,
                }, 
                skip: offset,
                take: limit,
                relations: ["author", "media"],
            });
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Query(() => Post, { nullable: true })
    async findPost(@Arg("postId") postId: string): Promise<Post | null> {
        if (!isUUID(postId)) {
            logger.warn("Invalid postId provided.");

            return null;
        }

        try {
            const post = await this.postRepository.findOne({
                where: { itemId: postId, author: { deletedAt: IsNull() } },
                relations: ["author", "media"],
            });

            if (!post) {
                logger.warn(`Post with itemId "${postId}" not found.`);

                return null;
            }

            return post;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Query(() => Post, { nullable: true })
    async findPostById(@Arg("id", () => Int, { nullable: true }) id: number): Promise<Post | null> {
        if (!id) {
            logger.warn("Id not provided.");

            return null;
        }

        try {
            const post = await this.postRepository.findOne({
                where: { id, author: { deletedAt: IsNull() } },
                relations: ["author", "media"],
            });

            if (!post) {
                logger.warn(`Post with id "${id}" not found.`);

                return null;
            }

            return post;
        } catch (error) {
            console.error(error);

            return null;
        }
    }

    @Query(() => [MediaItem], { nullable: true })
    async postMedia(@Arg("postId") postId: string): Promise<MediaItem[] | null> {
        if (!isUUID(postId)) {
            logger.warn("Invalid postId provided.");

            return null;
        }

        try {
            const media = await this.mediaItemRepository.find({
                order: {
                    createdAt: "ASC",
                },
                where: {
                    post: {
                        itemId: postId,
                    },
                },
                relations: ["post"],
            });

            return media;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Mutation(() => PostResponse)
    @UseMiddleware(isAuth)
    async createPost(
        @Arg("type") type: string,
        @Arg("content") content: string,
        @Arg("media") media: string,
        @Ctx() { payload }: AuthContext,
        @Arg("isReplyToId", () => Int, { nullable: true }) isReplyToId?: number,
        @Arg("isReplyToType", { nullable: true }) isReplyToType?: string,
        @Arg("quotedPostId", () => Int, { nullable: true }) quotedPostId?: number,
    ): Promise<PostResponse> {
        let errors = [];
        let post: Post | null = null;
        let ok = false;
        let status = "";

        let mediaArray = JSON.parse(media);

        if (EMPTY_CONTENT_REGEXP.test(content)) {
            errors.push({
                field: "content",
                message: "You can't create a post without content",
            });
        }

        if (type.length === 0) {
            errors.push({
                field: "type",
                message: "Invalid type provided",
            });
        }

        if (!payload) {
            status = "You are not authenticated.";
        } else {
            if (errors.length === 0) {
                try {
                    const user = await this.userService.findUserById(payload.id);
                
                    if (user) {
                        let mentions: string[] = lumen.extractMentions(content);
                        const index = mentions.indexOf(user.username);
    
                        if (index !== -1) {
                            mentions.splice(index, 1);
                        }
    
                        const command = new DetectDominantLanguageCommand({
                            Text: content,
                        });
                        const response = await this.comprehend.send(command);
                        const lang = (response.Languages && response.Languages[0]) ? response.Languages[0].LanguageCode : "undefined";
    
                        post = await this.postRepository.create({
                            itemId: uuidv4(),
                            authorId: payload.id,
                            type: (type === POST_TYPES.COMMENT) ? POST_TYPES.COMMENT : POST_TYPES.POST,
                            content,
                            author: user,
                            mentions,
                            hashtags: lumen.extractHashtags(content),
                            isReplyToId,
                            isReplyToType,
                            quotedPostId,
                            lang,
                        }).save();
    
                        const mediaItems = [];
    
                        if (mediaArray && mediaArray.length > 0) {
                            for (const mediaItem of mediaArray) {
                                const newMediaItem = await this.mediaItemRepository.create({
                                    post,
                                    type: mediaItem.type,
                                    src: mediaItem.src,
                                    alt: mediaItem.alt,
                                }).save();
                                
                                mediaItems.push(newMediaItem);
                            }
                        }
    
                        post.media = mediaItems;
    
                        await post.save();
    
                        if (post.mentions.length > 0) {
                            const mentionedUsers = await this.userRepository.find({ where: { username: In(post.mentions) } });
    
                            if (mentionedUsers.length > 0) {
                                for (const mentionedUser of mentionedUsers) {
                                    const notification = await this.notificationService.createNotification(payload.id, mentionedUser.id, post.id, type, NOTIFICATION_TYPES.MENTION, `${post.author.name} (@${post.author.username}) mentioned you in a ${(type === POST_TYPES.COMMENT) ? POST_TYPES.COMMENT : POST_TYPES.POST}.`);
                                    
                                    if (notification) {
                                        pubSub.publish("NEW_NOTIFICATION", notification);
    
                                        const tokens = await this.userDeviceTokenRepository.find({ where: { userId: mentionedUser.id } });
                                        const pushNotification: FirebaseNotification = {
                                            title: `@${post.author.username} mentioned you ${(type === POST_TYPES.COMMENT) ? POST_TYPES.COMMENT : POST_TYPES.POST} (for @${mentionedUser.username})`,
                                            body: notification.content,
                                            imageUrl: post.author.profile.profilePicture.length > 0 ? post.author.profile.profilePicture : "https://img.zncdn.net/static/profile-picture.png",
                                        };
                                        const link = `${process.env.CLIENT_ORIGIN}/${post.author.username}/post/${post.itemId}?n_id=${notification.notificationId}`;
                                        await sendPushNotifications(tokens as UserDeviceToken[], pushNotification, link, { username: mentionedUser.username, type: notification.notificationType });
                                    }
                                }
                            }
                        }
    
                        if (isReplyToId) {
                            let isReplyToItem: FeedItem | null = null;

                            if (isReplyToType === POST_TYPES.POST || isReplyToType === POST_TYPES.COMMENT) {
                                isReplyToItem = await this.findPostById(isReplyToId);
                            } else {
                                isReplyToItem = await this.articleRepository.findOne({ where: { id: isReplyToId, draft: false } });
                            }
    
                            if (isReplyToItem && (type === NOTIFICATION_TYPES.COMMENT) && (isReplyToItem.authorId !== payload.id)) {
                                const notification = await this.notificationService.createNotification(payload.id, isReplyToItem.authorId, post.id, type, NOTIFICATION_TYPES.COMMENT, `${post.author.name} (@${post.author.username}) commented your post.`);
        
                                const author = await this.userService.findUserById(isReplyToItem.authorId);

                                if (notification && author) {
                                    pubSub.publish("NEW_NOTIFICATION", notification);
        
                                    const tokens = await this.userDeviceTokenRepository.find({ where: { userId: isReplyToItem.authorId } });
                                    const pushNotification: FirebaseNotification = {
                                        title: `@${post.author.username} commented your post (for @${author.username})`,
                                        body: notification.content,
                                        imageUrl: post.author.profile.profilePicture.length > 0 ? post.author.profile.profilePicture : "https://img.zncdn.net/static/profile-picture.png",
                                    };
                                    const link = `${process.env.CLIENT_ORIGIN}/${post.author.username}/post/${post.itemId}?n_id=${notification.notificationId}`;
                                    await sendPushNotifications(tokens as UserDeviceToken[], pushNotification, link, { username: author.username, type: notification.notificationType });
                                }
                            }
                        }
    
                        pubSub.publish("NEW_POST", post);
    
                        ok = true;
                    } else {
                        status = "Can't find the user.";
                    }
                } catch (error) {
                    logger.error(error);
    
                    status = "An error has occurred. Please try again later to create a post.";
                }
            }
        }

        return {
            post,
            errors,
            ok,
            status,
        };
    }

    @Mutation(() => PostResponse)
    @UseMiddleware(isAuth)
    async editPost(
        @Arg("postId") postId: string,
        @Arg("type") type: string,
        @Arg("content") content: string,
        @Arg("media") media: string,
        @Arg("deletedMedia") deletedMedia: string,
        @Arg("existingAltTexts") existingAltTexts: string,
        @Ctx() { payload }: AuthContext,
    ): Promise<PostResponse> {
        let errors = [];
        let post: Post | null = null;
        let mediaArray = JSON.parse(media);
        let deletedMediaIdsArray = JSON.parse(deletedMedia);
        let existingAltTextsArray = JSON.parse(existingAltTexts);
        let ok = false;
        let status = "";

        if (!isUUID(postId)) {
            status = "Invalid postId provided.";
        }

        if (EMPTY_CONTENT_REGEXP.test(content)) {
            errors.push({
                field: "content",
                message: `You can't edit a ${(type === POST_TYPES.COMMENT) ? POST_TYPES.COMMENT : POST_TYPES.POST} by removing the content`,
            });
        }

        if (type.length === 0) {
            errors.push({
                field: "type",
                message: "Invalid type provided",
            });
        }

        if (!payload) {
            status = "You are not authenticated.";
        } else {
            if (errors.length === 0) {
                try {
                    const user = await this.userService.findUserById(payload.id);
                
                    if (user) {
                        let mentions: string[] = lumen.extractMentions(content);
                        const index = mentions.indexOf(user.username);

                        if (index !== -1) {
                            mentions.splice(index, 1);
                        }

                        const command = new DetectDominantLanguageCommand({
                            Text: content,
                        });
                        const response = await this.comprehend.send(command);
                        const lang = (response.Languages && response.Languages[0]) ? response.Languages[0].LanguageCode : "undefined";

                        await this.postRepository.update(
                            {
                                itemId: postId,
                                authorId: payload.id,
                            },
                            {
                                content,
                                mentions,
                                isEdited: true,
                                hashtags: lumen.extractHashtags(content),
                                lang,
                            },
                        );

                        post = await this.postRepository.findOne({
                            where: { itemId: postId, authorId: payload.id },
                            relations: ["author", "media"],
                        });

                        if (mediaArray && mediaArray.length > 0 && post) {
                            const mediaItems = [];
                            
                            for (const mediaItem of mediaArray) {
                                const newMediaItem = await this.mediaItemRepository.create({
                                    post,
                                    type: mediaItem.type,
                                    src: mediaItem.src,
                                    alt: mediaItem.alt,
                                }).save();

                                mediaItems.push(newMediaItem);
                            }

                            post.media.push(...mediaItems);
                            await post.save();
                        }

                        if (deletedMediaIdsArray && deletedMediaIdsArray.length > 0) {
                            const mediaItems = await this.mediaItemRepository.find({ where: { id: In(deletedMediaIdsArray) } });
                            
                            await Promise.all(
                                mediaItems.map(async (item) => {
                                    const existingKey =
                                        item.src.replace(
                                            `https://${item.type.includes("image") ? "img" : "vid"}.zncdn.net/`, ""
                                        );
                
                                    const url = await getPresignedUrlForDeleteCommand(existingKey, item.type);
                
                                    await axios.delete(url).then(() => {
                                        logger.error("Media item successfully deleted.");
                                    })
                                    .catch((error) => {
                                        logger.error(`An error occurred while deleting the media item. Error code: ${error.code}.`);
                                    });

                                    await this.mediaItemRepository.delete({ id: item.id });
                                })
                            );
                        }

                        if (existingAltTextsArray && existingAltTextsArray.length > 0) {
                            for (const item of existingAltTextsArray) {
                                await this.mediaItemRepository.update({
                                    id: item[0],
                                }, {
                                    alt: item[1],
                                });
                            }
                        }

                        if (post) {
                            const mentionedUsers = await this.userRepository.find({ where: { username: In(post.mentions) } });

                            if (mentionedUsers.length > 0) {
                                for (const mentionedUser of mentionedUsers) {
                                    const notification = await this.notificationService.findNotification(payload.id, mentionedUser.id, post.id, post.type, NOTIFICATION_TYPES.MENTION);

                                    if (!notification) {
                                        const newNotification = await this.notificationService.createNotification(payload.id, mentionedUser.id, post.id, post.type, NOTIFICATION_TYPES.MENTION, `${post.author.name} (@${post.author.username}) mentioned you in a ${(post.type === POST_TYPES.COMMENT) ? POST_TYPES.COMMENT : POST_TYPES.POST}.`);

                                        if (newNotification) {
                                            pubSub.publish("NEW_NOTIFICATION", newNotification);

                                            const tokens = await this.userDeviceTokenRepository.find({ where: { userId: mentionedUser.id } });
                                            const pushNotification: FirebaseNotification = {
                                                title: `@${post.author.username} mentioned you ${(post.type === POST_TYPES.COMMENT) ? POST_TYPES.COMMENT : POST_TYPES.POST} (for @${mentionedUser.username})`,
                                                body: newNotification.content,
                                                imageUrl: post.author.profile.profilePicture.length > 0 ? post.author.profile.profilePicture : "https://img.zncdn.net/static/profile-picture.png",
                                            };
                                            const link = `${process.env.CLIENT_ORIGIN}/${post.author.username}/post/${post.itemId}?n_id=${newNotification.notificationId}`;
                                            await sendPushNotifications(tokens as UserDeviceToken[], pushNotification, link, { username: mentionedUser.username, type: newNotification.notificationType });
                                        }
                                    }
                                }
                            }

                            const mentionNotifications = await this.notificationRepository.find({
                                where: {
                                    creatorId: payload.id,
                                    notificationType: NOTIFICATION_TYPES.MENTION,
                                    resourceId: post.id,
                                    resourceType: post.type,
                                },
                            });

                            const uselessNotifications = mentionNotifications.filter(notification =>
                                !mentionedUsers.some(mention => mention.id === notification.recipientId)
                            );

                            for (const deletedNotification of uselessNotifications) {
                                await this.notificationRepository.delete({ id: deletedNotification.id, notificationType: NOTIFICATION_TYPES.COMMENT });
                                
                                pubSub.publish("DELETED_NOTIFICATION", deletedNotification);
                            }

                            pubSub.publish("EDITED_POST", post);

                            ok = true;
                        } else {
                            errors.push({
                                field: "content",
                                message:
                                    "An error has occurred while retrieving the post data",
                            });
                        }
                    } else {
                        status = "Can't find the user.";
                    }
                } catch (error) {
                    logger.error(error);

                    status = "An error has occurred. Please try again later to edit your post.";
                }
            }
        }

        return {
            post,
            errors,
            ok,
            status,
        };
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deletePost(
        @Arg("postId") postId: string,
        @Ctx() { payload }: AuthContext
    ) {
        if (!payload || !isUUID(postId)) {
            logger.warn("Bad request.");
            
            return false;
        }

        try {
            const post = await this.postRepository.findOne({ where: { itemId: postId, authorId: payload.id }, relations: ["author", "media"] });

            if (!post) {
                return false;
            }

            if (post.media.length > 0) {
                await Promise.all(
                    post.media.map(async (item) => {
                        const existingKey =
                            item.src.replace(
                                `https://${item.type.includes("image") ? "img" : "vid"}.zncdn.net/`, ""
                            );
    
                        const url = await getPresignedUrlForDeleteCommand(existingKey, item.type);
    
                        await axios.delete(url).then(() => {
                            logger.error("Media item successfully deleted.");
                        })
                        .catch((error) => {
                            logger.error(`An error occurred while deleting the media item. Error code: ${error.code}.`);
                        });
    
                        await this.mediaItemRepository.delete({ id: item.id });
                    })
                );
            }
    
            await this.notificationRepository.delete({
                resourceId: post.id,
                notificationType: In([NOTIFICATION_TYPES.MENTION, NOTIFICATION_TYPES.LIKE, NOTIFICATION_TYPES.COMMENT]),
            });
    
            await this.postRepository.delete({ itemId: postId, authorId: payload.id }).catch((error) => {
                logger.error(error);

                return false;
            });
    
            pubSub.publish("DELETED_POST", post);
    
            return true;
        } catch (error) {
            logger.error(error);

            return false;
        }
    }

    @Mutation(() => Like, { nullable: true })
    @UseMiddleware(isAuth)
    async likePost(
        @Arg("itemId") itemId: string,
        @Arg("origin") origin: string,
        @Arg("itemOpened") itemOpened: boolean,
        @Arg("itemType") itemType: string,
        @Ctx() { payload }: AuthContext,
    ): Promise<Like | null> {
        if (!payload) {
            logger.warn("User not authenticated.");

            return null;
        }

        if (!isUUID(itemId)) {
            logger.warn("Invalid itemId provided.");

            return null;
        }

        try {
            let item: FeedItem | null = null;

            if (itemType === POST_TYPES.POST || itemType === POST_TYPES.COMMENT) {
                item = await this.findPost(itemId);
            } else {
                item = await this.articleRepository.findOne({ where: { itemId, draft: false } });
            }

            const existingLike = await this.likeRepository.findOne({ where: { likedItemId: itemId, userId: payload.id } });

            const user = await this.userService.findUserById(payload.id);

            if (!user) {
                logger.warn("User not found.");

                return null;
            }

            if (item && !existingLike) {
                const like = await this.likeRepository.create({
                    userId: payload.id,
                    likedItemId: itemId,
                    origin,
                    itemOpened,
                    itemType,
                }).save();

                const author = await this.userService.findUserById(item.authorId);

                if (payload.id !== item.authorId && author) {
                    const notification = await this.notificationService.createNotification(payload.id, item.authorId, item.id, item.type, NOTIFICATION_TYPES.LIKE, `${user.name} (@${user.username}) liked your ${(item.type === POST_TYPES.ARTICLE) ? POST_TYPES.ARTICLE : ((item.type === POST_TYPES.COMMENT) ? POST_TYPES.COMMENT : POST_TYPES.POST)}.`);

                    if (notification) {
                        pubSub.publish("NEW_NOTIFICATION", notification);

                        const tokens = await this.userDeviceTokenRepository.find({ where: { userId: item.authorId } });
                        const pushNotification: FirebaseNotification = {
                            title: `@${user.username} liked your ${(item.type === POST_TYPES.ARTICLE) ? POST_TYPES.ARTICLE : ((item.type === POST_TYPES.COMMENT) ? POST_TYPES.COMMENT : POST_TYPES.POST)} (for @${author.username})`,
                            body: notification.content,
                            imageUrl: user.profile.profilePicture.length > 0 ? user.profile.profilePicture : "https://img.zncdn.net/static/profile-picture.png",
                        };
                        const link = `${process.env.CLIENT_ORIGIN}/${author.username}/post/${item.itemId}?n_id=${notification.notificationId}`;
                        await sendPushNotifications(tokens as UserDeviceToken[], pushNotification, link, { username: author.username, type: notification.notificationType });
                    }
                }

                return like;
            } else {
                logger.warn("Like already exists.");

                return null;
            }
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async removeLike(
        @Arg("itemId") itemId: string,
        @Arg("itemType") itemType: string,
        @Ctx() { payload }: AuthContext,
    ) {
        if (!payload) {
            logger.warn("User not authenticated.");

            return false;
        }

        if (!isUUID(itemId)) {
            logger.warn("Invalid itemId provided.");

            return false;
        }

        try {
            let item: FeedItem | null = null;

            if (itemType === POST_TYPES.POST || itemType === POST_TYPES.COMMENT) {
                item = await this.findPost(itemId);
            } else {
                item = await this.articleRepository.findOne({ where: { itemId, draft: false } });
            }

            if (!item) {
                logger.warn("Item not found.");

                return false;
            }

            await this.likeRepository.delete({ userId: payload.id, likedItemId: itemId, itemType }).catch((error) => {
                logger.error(error);

                return false;
            });

            const notification = await this.notificationService.findNotification(payload.id, item.authorId, item.id, item.type, NOTIFICATION_TYPES.LIKE);
    
            if (payload.id !== item.authorId && notification) {
                await this.notificationService.deleteNotification(notification.notificationId);

                pubSub.publish("DELETED_NOTIFICATION", notification);
            }
    
            return true;
        } catch (error) {
            logger.error(error);

            return false;
        }
    }

    @Query(() => [Post], { nullable: true })
    async getLikedPosts(
        @Arg("id", () => Int, { nullable: true }) id: number,
        @Arg("offset", () => Int, { nullable: true }) offset?: number,
        @Arg("limit", () => Int, { nullable: true }) limit?: number,
    ) {
        if (!id) {
            logger.warn("User id not provied.");

            return null;
        }
    
        try {
            const likes = await this.likeRepository.find({
                where: { userId: id },
                skip: offset,
                take: limit,
                order: { createdAt: "DESC" }
            });
    
            const likedPostIds = likes.filter(like => like.itemType !== POST_TYPES.ARTICLE).map(like => like.likedItemId);
            
            const posts = await this.postRepository.find({
                where: { itemId: In(likedPostIds) },
                relations: ["author", "media"],
            });
    
            return posts;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Query(() => [User], { nullable: true })
    async getPostLikes(
        @Arg("itemId") itemId: string,
        @Arg("type") type: string,
        @Arg("offset", () => Int, { nullable: true }) offset?: number,
        @Arg("limit", () => Int, { nullable: true }) limit?: number,
    ) {
        if (!isUUID(itemId)) {
            logger.warn("Invalid itemId provided.");

            return null;
        }

        try {
            const likes = await this.likeRepository.find({
                where: { likedItemId: itemId, itemType: type },
                skip: offset,
                take: limit,
                order: { createdAt: "DESC" }
            });
        
            const userIds = likes.map(like => like.userId);
        
            const users = await this.userService.findUsersById(userIds, true);
        
            return users;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Query(() => Boolean)
    @UseMiddleware(isAuth)
    async isPostLikedByMe(
        @Arg("itemId") itemId: string,
        @Arg("type") type: string,
        @Ctx() { payload }: AuthContext
    ) {
        if (!payload) {
            logger.warn("User not authenticated.");

            return false;
        }

        if (!isUUID(itemId)) {
            logger.warn("Invalid itemId provided.");

            return false;
        }

        try {
            const like = await this.likeRepository.findOne({ where: { userId: payload.id, likedItemId: itemId, itemType: type } });

            if (like) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            logger.error(error);

            return false;
        }
    }

    @Mutation(() => FeedItem, { nullable: true })
    @UseMiddleware(isAuth)
    async incrementPostViews(
        @Arg("itemId") itemId: string,
        @Arg("type") type: string,
        @Arg("itemOpened") itemOpened: boolean,
        @Arg("origin") origin: string,
        @Ctx() { payload, req }: AuthContext
    ): Promise<FeedItem | null> {
        if (!isUUID(itemId)) {
            logger.warn("Invalid itemId provided.");

            return null;
        }

        try {
            let item: FeedItem | null = null;

            if (type === POST_TYPES.POST || type === POST_TYPES.COMMENT) {
                item = await this.findPost(itemId);
            } else {
                item = await this.articleRepository.findOne({ where: { itemId, draft: false } });
            }

            const uniqueIdentifier = req.cookies["uid"];

            if (!item) {
                return null;
            }

            if (!payload) {
                const hasViewed = await this.viewLogRepository.findOne({
                    where: {
                        itemId,
                        itemType: type,
                        uniqueIdentifier,
                    }
                });
        
                if (!hasViewed) {
                    item.views += 1;
                    await item.save();
                
                    await this.viewLogRepository.create({
                        itemId,
                        uniqueIdentifier,
                        isAuth: false,
                        itemType: type,
                        itemOpened,
                        origin,
                    }).save();
                }
            } else {
                const userHasViewed = await this.viewLogRepository.findOne({
                    where: {
                        itemId,
                        itemType: type,
                        userId: payload.id,
                    }
                });
        
                if (!userHasViewed) {
                    item.views += 1;
                    await item.save();
                
                    await this.viewLogRepository.create({
                        itemId,
                        userId: payload.id,
                        uniqueIdentifier,
                        isAuth: true,
                        itemType: type,
                        itemOpened,
                        origin,
                    }).save();
                }
            }

            return item;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Mutation(() => Bookmark, { nullable: true })
    @UseMiddleware(isAuth)
    async createBookmark(
        @Arg("itemId") itemId: string,
        @Arg("type") type: string,
        @Arg("origin") origin: string,
        @Ctx() { payload }: AuthContext
    ): Promise<Bookmark | null> {
        if (!isUUID(itemId)) {
            logger.warn("Invalid itemId provided.");

            return null;
        }

        if (!payload) {
            logger.warn("User not authenticated.");

            return null;
        }
        
        try {
            let item: FeedItem | null = null;

            if (type === POST_TYPES.POST || type === POST_TYPES.COMMENT) {
                item = await this.findPost(itemId);
            } else {
                item = await this.articleRepository.findOne({ where: { itemId, draft: false } });
            }

            if (!item) {
                return null;
            }

            const bookmark = await this.bookmarkRepository.create({
                itemId: item.id,
                itemType: type,
                authorId: payload.id,
                origin,
            }).save();

            if (!bookmark) {
                logger.warn("An error has occurred while creating the bookmark.");

                return null;
            }

            return bookmark;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async removeBookmark(
        @Arg("itemId") itemId: string,
        @Arg("type") type: string,
        @Ctx() { payload }: AuthContext,
    ) {
        if (!payload) {
            logger.warn("User not authenticated.");

            return false;
        }

        if (!isUUID(itemId)) {
            logger.warn("Invalid itemId provided.");

            return null;
        }

        try {
            let item: FeedItem | null = null;

            if (type === POST_TYPES.POST || type === POST_TYPES.COMMENT) {
                item = await this.findPost(itemId);
            } else {
                item = await this.articleRepository.findOne({ where: { itemId, draft: false } });
            }

            if (!item) {
                logger.warn("Item not found.");

                return false;
            }

            await this.bookmarkRepository.delete({ authorId: payload.id, itemId: item.id, itemType: type }).catch((error) => {
                logger.error(error);

                return false;
            });
    
            return true;
        } catch (error) {
            logger.error(error);

            return false;
        }
    }

    @Query(() => Boolean)
    @UseMiddleware(isAuth)
    async isBookmarked(
        @Arg("itemId", () => Int) itemId: number,
        @Arg("type") type: string,
        @Ctx() { payload }: AuthContext
    ) {
        if (!payload) {
            logger.warn("User not authenticated.");

            return false;
        }

        if (!isUUID(itemId)) {
            logger.warn("Invalid itemId provided.");

            return false;
        }

        try {
            const bookmark = await this.bookmarkRepository.findOne({ where: { authorId: payload.id, itemId, itemType: type } });

            if (bookmark) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            logger.error(error);

            return false;
        }
    }

    @Query(() => [Post], { nullable: true })
    @UseMiddleware(isAuth)
    async getBookmarks(
        @Ctx() { payload }: AuthContext,
        @Arg("offset", () => Int, { nullable: true }) offset?: number,
        @Arg("limit", () => Int, { nullable: true }) limit?: number,
    ) {
        if (!payload) {
            logger.warn("User not authenticated.");

            return null;
        }
    
        try {
            const bookmarks = await this.bookmarkRepository.find({
                where: { authorId: payload.id },
                skip: offset,
                take: limit,
                order: { createdAt: "DESC" }
            });
    
            const savedPostIds = bookmarks.filter(bookmark => bookmark.itemType !== POST_TYPES.ARTICLE).map(bookmark => bookmark.itemId);
            
            const posts = await this.postRepository.find({
                where: { id: In(savedPostIds) },
                relations: ["author", "media"],
            });
    
            return posts;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }
}
