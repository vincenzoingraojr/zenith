import { Arg, Ctx, Field, Int, Mutation, ObjectType, Query, Resolver, Root, Subscription, UseMiddleware } from "type-graphql";
import { FieldError } from "./common";
import { Like, MediaItem, Post, ViewLog } from "../entities/Post";
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
import { UserResolver } from "./UserResolver";
import { logger } from "../helpers/logger";
import { isUUID } from "class-validator";
import { NotificationResolver } from "./NotificationResolver";

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

const EMPTY_CONTENT_REGEXP = /^\s+\S*/;

@Resolver(Post)
export class PostResolver {
    private readonly userResolver: UserResolver;
    private readonly notificationResolver: NotificationResolver;
    private readonly userRepository: Repository<User>;
    private readonly postRepository: Repository<Post>;
    private readonly mediaItemRepository: Repository<MediaItem>;
    private readonly notificationRepository: Repository<Notification>;
    private readonly likeRepository: Repository<Like>;
    private readonly viewLogRepository: Repository<ViewLog>;
    private readonly userDeviceTokenRepository: Repository<UserDeviceToken>;
    private readonly comprehend: ComprehendClient;

    constructor() {
        this.userResolver = new UserResolver();
        this.notificationResolver = new NotificationResolver();
        this.userRepository = appDataSource.getRepository(User);
        this.postRepository = appDataSource.getRepository(Post);
        this.mediaItemRepository = appDataSource.getRepository(MediaItem);
        this.notificationRepository = appDataSource.getRepository(Notification);
        this.likeRepository = appDataSource.getRepository(Like);
        this.viewLogRepository = appDataSource.getRepository(ViewLog);
        this.userDeviceTokenRepository = appDataSource.getRepository(UserDeviceToken);
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
                return payload.isReplyTo === args.postId && payload.authorId === args.userId;
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
                return payload.isReplyTo === args.postId && payload.authorId === args.userId;
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
        @Arg("offset", () => Int, { nullable: true }) offset: number,
        @Arg("limit", () => Int, { nullable: true }) limit: number,
    ): Promise<Post[] | null> {
        try {
            const posts = await this.postRepository.find({
                where: {
                    type: "post",
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
        @Arg("offset", () => Int, { nullable: true }) offset: number,
        @Arg("limit", () => Int, { nullable: true }) limit: number,
    ): Promise<Post[] | null> {
        if (!userId) {
            logger.warn("User id not provided.");

            return null;
        }

        try {
            const author = await this.userResolver.findUserById(userId);

            if (!author) {
                logger.warn("Post author not found.");

                return null;
            }

            return await this.postRepository.find({
                order: {
                    createdAt: "DESC",
                },
                where: {
                    type: "post",
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
        @Arg("offset", () => Int, { nullable: true }) offset: number,
        @Arg("limit", () => Int, { nullable: true }) limit: number,
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
                    type: "comment",
                    isReplyTo: id,
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
        @Arg("offset", () => Int, { nullable: true }) offset: number,
        @Arg("limit", () => Int, { nullable: true }) limit: number,
    ): Promise<Post[] | null> {
        if (!userId) {
            logger.warn("User id not provided.");

            return null;
        }
    
        try {
            const author = await this.userResolver.findUserById(userId);
            
            if (!author) {
                logger.warn("Post author not found.");

                return null;
            }
    
            return await this.postRepository.find({
                order: {
                    createdAt: "DESC",
                },
                where: {
                    type: "comment",
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
        @Arg("isReplyTo", () => Int, { nullable: true }) isReplyTo?: number,
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
                message: `You can't publish a ${(type === "comment") ? "comment" : "post"} without content`,
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
                    const user = await this.userResolver.findUserById(payload.id);
                
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
                            type,
                            content,
                            author: user,
                            mentions,
                            hashtags: lumen.extractHashtags(content),
                            isReplyTo,
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
                                    const notification = await this.notificationResolver.createNotification(payload.id, mentionedUser.id, post.id, type, "mention", `${post.author.name} (@${post.author.username}) mentioned you in a ${(type === "comment") ? "comment" : "post"}.`);
                                    
                                    if (notification) {
                                        pubSub.publish("NEW_NOTIFICATION", notification);
    
                                        const tokens = await this.userDeviceTokenRepository.find({ where: { userId: mentionedUser.id } });
                                        const pushNotification: FirebaseNotification = {
                                            title: `@${post.author.username} mentioned you ${(type === "comment") ? "comment" : "post"} (for @${mentionedUser.username})`,
                                            body: notification.content,
                                            imageUrl: post.author.profile.profilePicture.length > 0 ? post.author.profile.profilePicture : "https://img.zncdn.net/static/profile-picture.png",
                                        };
                                        const link = `${process.env.CLIENT_ORIGIN}/${post.author.username}/post/${post.itemId}?n_id=${notification.notificationId}`;
                                        await sendPushNotifications(tokens as UserDeviceToken[], pushNotification, link, { username: mentionedUser.username, type: notification.notificationType });
                                    }
                                }
                            }
                        }
    
                        if (isReplyTo) {
                            const isReplyToPost = await this.findPostById(isReplyTo);
    
                            if (isReplyToPost && (type === "comment") && (isReplyToPost.authorId !== payload.id)) {
                                const notification = await this.notificationResolver.createNotification(payload.id, isReplyToPost.authorId, post.id, type, "comment", `${post.author.name} (@${post.author.username}) commented your post.`);
        
                                if (notification) {
                                    pubSub.publish("NEW_NOTIFICATION", notification);
        
                                    const tokens = await this.userDeviceTokenRepository.find({ where: { userId: isReplyToPost.authorId } });
                                    const pushNotification: FirebaseNotification = {
                                        title: `@${post.author.username} commented your post (for @${isReplyToPost.author.username})`,
                                        body: notification.content,
                                        imageUrl: post.author.profile.profilePicture.length > 0 ? post.author.profile.profilePicture : "https://img.zncdn.net/static/profile-picture.png",
                                    };
                                    const link = `${process.env.CLIENT_ORIGIN}/${post.author.username}/post/${post.itemId}?n_id=${notification.notificationId}`;
                                    await sendPushNotifications(tokens as UserDeviceToken[], pushNotification, link, { username: isReplyToPost.author.username, type: notification.notificationType });
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
                message: `You can't update a ${(type === "comment") ? "comment" : "post"} by removing the content`,
            });
        }

        if (!payload) {
            errors.push({
                field: "content",
                message: "You are not authenticated",
            });
        } else {
            if (errors.length === 0) { // da qua
                const user = await this.userResolver.findUserById(payload.id);
                
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

                    try {
                        await this.postRepository.update(
                            {
                                postId,
                                authorId: payload.id,
                            },
                            {
                                content,
                                mentions,
                                isEdited: true,
                                hashtags: lumen.extractHashtags(content),
                                lang,
                                topicsIds: [],
                            },
                        );

                        post = await this.postRepository.findOne({
                            where: { postId, authorId: payload.id },
                            relations: ["author", "media"],
                        });

                        if (mediaArray && mediaArray.length > 0 && post) {
                            const mediaItems = [];
                            
                            for (const mediaItem of mediaArray) {
                                const newMediaItem = this.mediaItemRepository.create({
                                    post,
                                    type: mediaItem.type,
                                    src: mediaItem.src,
                                    alt: mediaItem.alt,
                                });
                                await newMediaItem.save();
                                mediaItems.push(newMediaItem);
                            }

                            post.media.push(...mediaItems);
                            await post.save();
                        }

                        if (deletedMediaIdsArray && deletedMediaIdsArray.length > 0) {
                            await Promise.all(
                                deletedMediaIdsArray.map(async (item: any) => {
                                    await this.mediaItemRepository.delete({ id: item });
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
                            const mentionedUsers: User[] = [];

                            if (post.mentions.length > 0) {
                                for (const mention of post.mentions) {
                                    const user = await this.userResolver.findUser(mention);
                                    
                                    if (user) {
                                        mentionedUsers.push(user);
                                    }
                                }
                            }

                            if (mentionedUsers.length > 0) {
                                for (const mentionedUser of mentionedUsers) {
                                    const notification = await this.notificationRepository.findOne({
                                        where: {
                                            creatorId: payload.id,
                                            type: "mention",
                                            resourceId: post.id,
                                            recipientId: mentionedUser.id,
                                        },
                                    });

                                    if (!notification) {
                                        const newNotification = await this.notificationRepository.create({
                                            notificationId: uuidv4(),
                                            creatorId: payload.id,
                                            recipientId: mentionedUser.id,
                                            resourceId: post.id,
                                            type: "mention",
                                            viewed: false,
                                            content: `${post.author.name} (@${post.author.username}) mentioned you in a ${(post.type === "comment") ? "comment" : "post"}.`,
                                        }).save();

                                        pubSub.publish("NEW_NOTIFICATION", newNotification);

                                        const tokens = await this.userDeviceTokenRepository.find({ where: { userId: mentionedUser.id } });
                                        const pushNotification: FirebaseNotification = {
                                            title: `@${post.author.username} mentioned you ${(post.type === "comment") ? "comment" : "post"} (for @${mentionedUser.username})`,
                                            body: newNotification.content,
                                            imageUrl: post.author.profile.profilePicture.length > 0 ? post.author.profile.profilePicture : "https://img.zncdn.net/static/profile-picture.png",
                                        };
                                        const link = `${process.env.CLIENT_ORIGIN}/${post.author.username}/post/${post.postId}?n_id=${newNotification.notificationId}`;
                                        await sendPushNotifications(tokens as UserDeviceToken[], pushNotification, link, { username: mentionedUser.username, type: newNotification.type });
                                    }
                                }
                            }

                            const mentionNotifications = await this.notificationRepository.find({
                                where: {
                                    creatorId: payload.id,
                                    type: "mention",
                                    resourceId: post.id,
                                },
                            });

                            const uselessNotifications = mentionNotifications.filter(notification =>
                                !mentionedUsers.some(mention => mention.id === notification.recipientId)
                            );

                            for (const deletedNotification of uselessNotifications) {
                                await this.notificationRepository.delete({ id: deletedNotification.id, type: "mention" });
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
                    } catch (error) {
                        console.log(error);
                        errors.push({
                            field: "content",
                            message:
                                "An error has occurred. Please try again later to update your post",
                        });
                    }
                } else {
                    errors.push({
                        field: "content",
                        message:
                            "Can't find the user",
                    });
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
        
        if (!payload) {
            return false;
        }

        const post = await this.postRepository.findOne({ where: { postId, authorId: payload.id }, relations: ["author", "media"] });

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
                        console.log("Media item successfully deleted.");
                    })
                    .catch((error) => {
                        console.error(`An error occurred while deleting the media item. Error code: ${error.code}.`);
                    });

                    await this.mediaItemRepository.delete({ id: item.id });
                })
            );
        }

        await this.notificationRepository.delete({
            resourceId: post.id,
            type: In(["mention", "like", "comment"]),
        });

        await this.postRepository.delete({ postId, authorId: payload.id }).catch((error) => {
            console.error(error);
            return false;
        });

        pubSub.publish("DELETED_POST", post);

        return true;
    }

    @Mutation(() => Like, { nullable: true })
    @UseMiddleware(isAuth)
    async likePost(
        @Arg("postId") postId: string,
        @Arg("origin") origin: string,
        @Arg("postOpened") postOpened: boolean,
        @Ctx() { payload }: AuthContext,
    ): Promise<Like | null> {
        if (!payload) {
            return null;
        }

        const post = await this.postRepository.findOne({ where: { postId }, relations: ["author"] });
        const existingLike = await this.likeRepository.findOne({ where: { likedPostId: postId, userId: payload.id } });

        if (post && !existingLike) {
            const like = await this.likeRepository.create({
                userId: payload.id,
                likedPostId: postId,
                origin,
                postOpened,
            }).save();

            const user = await this.userResolver.findUserById(payload.id);

            if (!user) {
                return null;
            }

            if (payload.id !== post.authorId) {
                const notification = await this.notificationRepository.create({
                    notificationId: uuidv4(),
                    creatorId: payload.id,
                    recipientId: post.authorId,
                    resourceId: post.id,
                    type: "like",
                    viewed: false,
                    content: `${user.name} (@${user.username}) liked your ${(post.type === "comment") ? "comment" : "post"}.`,
                }).save();

                pubSub.publish("NEW_NOTIFICATION", notification);

                const tokens = await this.userDeviceTokenRepository.find({ where: { userId: post.authorId } });
                const pushNotification: FirebaseNotification = {
                    title: `@${user.username} liked your ${(post.type === "comment") ? "comment" : "post"} (for @${post.author.username})`,
                    body: notification.content,
                    imageUrl: user.profile.profilePicture.length > 0 ? user.profile.profilePicture : "https://img.zncdn.net/static/profile-picture.png",
                };
                const link = `${process.env.CLIENT_ORIGIN}/${post.author.username}/post/${post.postId}?n_id=${notification.notificationId}`;
                await sendPushNotifications(tokens as UserDeviceToken[], pushNotification, link, { username: post.author.username, type: notification.type });
            }

            return like;
        } else {
            return null;
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async removeLike(
        @Arg("postId", { nullable: true }) postId: string,
        @Ctx() { payload }: AuthContext,
    ) {
        if (!payload) {
            return false;
        }

        const post = await this.postRepository.findOne({ where: { postId } });
        
        if (!post) {
            return false;
        }

        await this.likeRepository.delete({ userId: payload.id, likedPostId: postId }).catch((error) => {
            console.error(error);
            return false;
        });

        const notification = await this.notificationRepository.findOne({ 
            where: {
                resourceId: post.id, 
                type: "like", 
                creatorId: payload.id, 
                recipientId: post.authorId
            },
        });

        if (payload.id !== post.authorId && notification) {
            await this.notificationRepository.delete({ resourceId: post.id, type: "like", creatorId: payload.id, recipientId: post.authorId });
            pubSub.publish("DELETED_NOTIFICATION", notification);
        }

        return true;
    }

    @Query(() => [Post], { nullable: true })
    async getLikedPosts(
        @Arg("id", () => Int, { nullable: true }) id: number,
        @Arg("offset", () => Int, { nullable: true }) offset?: number,
        @Arg("limit", () => Int, { nullable: true }) limit?: number,
    ) {
        if (!id) {
            return [];
        }
    
        try {
            const likes = await this.likeRepository.find({
                where: { userId: id },
                skip: offset,
                take: limit,
                order: { createdAt: "DESC" }
            });
    
            if (likes.length === 0) {
                return [];
            }
    
            const likedPostIds = likes.map(like => like.likedPostId);
            
            const posts = await this.postRepository.find({
                where: { postId: In(likedPostIds) },
                relations: ["author", "media"],
            });
    
            return posts;
        } catch (error) {
            console.error(error);

            return [];
        }
    }

    @Query(() => [User], { nullable: true })
    async getPostLikes(
        @Arg("postId", { nullable: true }) postId: string,
        @Arg("offset", () => Int, { nullable: true }) offset?: number,
        @Arg("limit", () => Int, { nullable: true }) limit?: number,
    ) {
        if (!postId) {
            return null;
        }
    
        const likes = await this.likeRepository.find({
            where: { likedPostId: postId },
            skip: offset,
            take: limit,
            order: { createdAt: "DESC" }
        });
    
        const userIds = likes.map(like => like.userId);
    
        if (userIds.length === 0) {
            return [];
        }
    
        const users = await this.userRepository.find({ where: { id: In(userIds) } });
    
        return users;
    }

    @Query(() => Boolean)
    @UseMiddleware(isAuth)
    async isPostLikedByMe(
        @Arg("postId", { nullable: true }) postId: string,
        @Ctx() { payload }: AuthContext
    ) {
        if (!payload) {
            return false;
        }

        const like = await this.likeRepository.findOne({ where: { userId: payload.id, likedPostId: postId } });

        if (like) {
            return true;
        } else {
            return false;
        }
    }

    @Mutation(() => Post, { nullable: true })
    @UseMiddleware(isAuth)
    async incrementPostViews(
        @Arg("postId") postId: string,
        @Arg("postOpened") postOpened: boolean,
        @Arg("origin") origin: string,
        @Ctx() { payload, req }: AuthContext
    ): Promise<Post | null> {
        const post = await this.postRepository.findOne({
            where: {
                postId,
            },
        });
        const uniqueIdentifier = req.cookies["uid"];

        if (!post) {
            return null;
        }

        if (!payload) {
            const hasViewed = await this.viewLogRepository.findOne({
                where: {
                    postId,
                    uniqueIdentifier,
                }
            });
    
            if (!hasViewed) {
                post.views += 1;
                await post.save();
            
                await this.viewLogRepository.create({
                    postId,
                    uniqueIdentifier,
                    isAuth: false,
                    postOpened,
                    origin,
                }).save();
            }
        } else {
            const userHasViewed = await this.viewLogRepository.findOne({
                where: {
                    postId,
                    userId: payload.id,
                }
            });
    
            if (!userHasViewed) {
                post.views += 1;
                await post.save();
            
                await this.viewLogRepository.create({
                    postId,
                    userId: payload.id,
                    uniqueIdentifier,
                    isAuth: true,
                    postOpened,
                    origin,
                }).save();
            }
        }

        return post;
    }
}
