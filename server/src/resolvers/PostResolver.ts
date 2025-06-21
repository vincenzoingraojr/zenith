import { Arg, Ctx, Field, Int, Mutation, ObjectType, Query, Resolver, Root, Subscription, UseMiddleware } from "type-graphql";
import { FeedWrapper, FieldError } from "./common";
import { Article, Bookmark, FeedItem, Like, MediaItem, Post, FeedItemStats, Repost, ViewLog, PostMentions } from "../entities/Post";
import { isAuth } from "../middleware/isAuth";
import { AuthContext } from "../types";
import { v4 as uuidv4 } from "uuid";
import { UserDeviceToken } from "../entities/User";
import { Notification } from "../entities/Notification";
import { In, IsNull, LessThan, Repository } from "typeorm";
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

@ObjectType()
export class PaginatedPosts extends FeedWrapper {
    @Field(() => [Post])
    posts: Post[];
}

@ObjectType()
export class PaginatedLikes extends FeedWrapper {
    @Field(() => [Like])
    likes: Like[];
}

@ObjectType()
export class PaginatedReposts extends FeedWrapper {
    @Field(() => [Repost])
    reposts: Repost[];
}

@ObjectType()
export class PaginatedBookmarks extends FeedWrapper {
    @Field(() => [Bookmark])
    bookmarks: Bookmark[];
}

@Resolver(Post)
export class PostResolver {
    private readonly userService: UserService;
    private readonly notificationService: NotificationService;
    private readonly postRepository: Repository<Post>;
    private readonly postMentionsRepository: Repository<PostMentions>;
    private readonly feedItemStatsRepository: Repository<FeedItemStats>;
    private readonly articleRepository: Repository<Article>;
    private readonly mediaItemRepository: Repository<MediaItem>;
    private readonly notificationRepository: Repository<Notification>;
    private readonly likeRepository: Repository<Like>;
    private readonly viewLogRepository: Repository<ViewLog>;
    private readonly userDeviceTokenRepository: Repository<UserDeviceToken>;
    private readonly bookmarkRepository: Repository<Bookmark>;
    private readonly repostRepository: Repository<Repost>;
    private readonly comprehend: ComprehendClient;

    constructor() {
        this.userService = new UserService();
        this.notificationService = new NotificationService();
        this.postRepository = appDataSource.getRepository(Post);
        this.postMentionsRepository = appDataSource.getRepository(PostMentions);
        this.feedItemStatsRepository = appDataSource.getRepository(FeedItemStats);
        this.articleRepository = appDataSource.getRepository(Article);
        this.mediaItemRepository = appDataSource.getRepository(MediaItem);
        this.notificationRepository = appDataSource.getRepository(Notification);
        this.likeRepository = appDataSource.getRepository(Like);
        this.viewLogRepository = appDataSource.getRepository(ViewLog);
        this.userDeviceTokenRepository = appDataSource.getRepository(UserDeviceToken);
        this.bookmarkRepository = appDataSource.getRepository(Bookmark);
        this.repostRepository = appDataSource.getRepository(Repost);
        this.comprehend = new ComprehendClient({ 
            region: "us-east-1",
            credentials: {
                accessKeyId: process.env.COMPREHEND_KEY_ID!,
                secretAccessKey: process.env.COMPREHEND_SECRET_KEY!,
            },
        });
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

    @Query(() => PaginatedPosts) // implement algorithm
    async postFeed(
        @Arg("limit", () => Int) limit: number,
        @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    ): Promise<PaginatedPosts> {
        try {
            const [posts, totalCount] = await Promise.all([
                this.postRepository.find({
                    where: {
                        type: POST_TYPES.POST,
                        ...(cursor ? { createdAt: LessThan(new Date(parseInt(cursor))) } : {}),
                        author: {
                            deletedAt: IsNull(),
                        },
                    },
                    order: {
                        createdAt: "DESC",
                    },
                    take: limit + 1,
                    relations: ["author", "media"],
                }),
                this.postRepository.count({
                    where: {
                        type: POST_TYPES.POST,
                        author: {
                            deletedAt: IsNull(),
                        },
                    },
                }),
            ]);

            return {
                posts: posts.slice(0, limit),
                hasMore:  posts.length === limit + 1,
                totalCount,
            };
        } catch (error) {
            logger.error(error);

            return {
                posts: [],
                hasMore: false,
                totalCount: 0,
            };
        }
    }

    @Query(() => PaginatedPosts)
    async userPostFeed(
        @Arg("userId", () => Int, { nullable: true }) userId: number,
        @Arg("limit", () => Int) limit: number,
        @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    ): Promise<PaginatedPosts> {
        if (!userId) {
            logger.warn("User id not provided.");

            return {
                posts: [],
                hasMore: false,
                totalCount: 0,
            };
        }

        try {
            const author = await this.userService.findUserById(userId);

            if (!author) {
                logger.warn("Post author not found.");

                return {
                    posts: [],
                    hasMore: false,
                    totalCount: 0,
                };
            }

            const [posts, totalCount] = await Promise.all([
                this.postRepository.find({
                    where: {
                        type: POST_TYPES.POST,
                        ...(cursor ? { createdAt: LessThan(new Date(parseInt(cursor))) } : {}),
                        author,
                    },
                    order: {
                        createdAt: "DESC",
                    },
                    take: limit + 1,
                    relations: ["author", "media"],
                }),
                this.postRepository.count({
                    where: {
                        type: POST_TYPES.POST,
                        author,
                    },
                }),
            ]);

            return {
                posts: posts.slice(0, limit),
                hasMore:  posts.length === limit + 1,
                totalCount,
            };
        } catch (error) {
            logger.error(error);

            return {
                posts: [],
                hasMore: false,
                totalCount: 0,
            };
        }
    }

    @Query(() => PaginatedPosts)
    async postComments(
        @Arg("id", () => Int, { nullable: true }) id: number,
        @Arg("type") type: string,
        @Arg("limit", () => Int) limit: number,
        @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    ): Promise<PaginatedPosts> {
        if (!id) {
            logger.warn("Post id not provided.");

            return {
                posts: [],
                hasMore: false,
                totalCount: 0,
            };
        }

        if (type.length === 0) {
            logger.warn("Invalid type provided.");

            return {
                posts: [],
                hasMore: false,
                totalCount: 0,
            };
        }
    
        try {
            const [posts, totalCount] = await Promise.all([
                this.postRepository.find({
                    where: {
                        type: POST_TYPES.COMMENT,
                        ...(cursor ? { createdAt: LessThan(new Date(parseInt(cursor))) } : {}),
                        isReplyToId: id,
                        isReplyToType: type,
                        author: {
                            deletedAt: IsNull(),
                        }
                    },
                    order: {
                        createdAt: "DESC",
                    },
                    take: limit + 1,
                    relations: ["author", "media"],
                }),
                this.postRepository.count({
                    where: {
                        type: POST_TYPES.COMMENT,
                        isReplyToId: id,
                        isReplyToType: type,
                        author: {
                            deletedAt: IsNull(),
                        }
                    },
                }),
            ]);

            return {
                posts: posts.slice(0, limit),
                hasMore:  posts.length === limit + 1,
                totalCount,
            };
        } catch (error) {
            logger.error(error);

            return {
                posts: [],
                hasMore: false,
                totalCount: 0,
            };
        }
    }

    @Query(() => PaginatedPosts)
    async userComments(
        @Arg("userId", () => Int, { nullable: true }) userId: number,
        @Arg("limit", () => Int) limit: number,
        @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    ): Promise<PaginatedPosts> {
        if (!userId) {
            logger.warn("User id not provided.");

            return {
                posts: [],
                hasMore: false,
                totalCount: 0,
            };
        }
    
        try {
            const author = await this.userService.findUserById(userId);
            
            if (!author) {
                logger.warn("Post author not found.");

                return {
                    posts: [],
                    hasMore: false,
                    totalCount: 0,
                };
            }

            const [posts, totalCount] = await Promise.all([
                this.postRepository.find({
                    where: {
                        type: POST_TYPES.COMMENT,
                        ...(cursor ? { createdAt: LessThan(new Date(parseInt(cursor))) } : {}),
                        author,
                    },
                    order: {
                        createdAt: "DESC",
                    },
                    take: limit + 1,
                    relations: ["author", "media"],
                }),
                this.postRepository.count({
                    where: {
                        type: POST_TYPES.COMMENT,
                        author,
                    },
                }),
            ]);

            return {
                posts: posts.slice(0, limit),
                hasMore:  posts.length === limit + 1,
                totalCount,
            };
        } catch (error) {
            logger.error(error);

            return {
                posts: [],
                hasMore: false,
                totalCount: 0,
            };
        }
    }

    @Query(() => Post, { nullable: true })
    async findPost(@Arg("postId") postId: string, @Arg("username", { nullable: true }) username?: string): Promise<Post | null> {
        if (!isUUID(postId)) {
            logger.warn("Invalid postId provided.");

            return null;
        }

        if (username && username.length === 0) {
            logger.warn("Invalid username provided.");

            return null;
        }

        try {
            const post = await this.postRepository.findOne({
                where: { itemId: postId, author: { username, deletedAt: IsNull() } },
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
    async findPostById(@Arg("id", () => Int, { nullable: true }) id: number | null): Promise<Post | null> {
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
                
                    let isReplyToItem: FeedItem | null = null;

                    if (isReplyToType === POST_TYPES.POST || isReplyToType === POST_TYPES.COMMENT) {
                        isReplyToItem = await this.findPostById(isReplyToId ? isReplyToId : null);
                    } else {
                        isReplyToItem = await this.articleRepository.findOne({ where: { id: isReplyToId, draft: false } });
                    }

                    const quotedPost = await this.findPostById(quotedPostId ? quotedPostId : null);

                    let hasBlockedMe = false;
                    let isBlockedByMe = false;

                    if (isReplyToItem && !quotedPost) {
                        hasBlockedMe = await this.userService.whoHasBlockedWho(payload.id, isReplyToItem.authorId) ? true : false;
                        isBlockedByMe = await this.userService.whoHasBlockedWho(isReplyToItem.authorId, payload.id) ? true : false;
                    } else if (quotedPost) {
                        hasBlockedMe = await this.userService.whoHasBlockedWho(payload.id, quotedPost.authorId) ? true : false;
                        isBlockedByMe = await this.userService.whoHasBlockedWho(quotedPost.authorId, payload.id) ? true : false;
                    }

                    if (user && !hasBlockedMe) {
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
    
                        if (mentions.length > 0) {
                            const mentionedUsers = await this.userService.findUsersByUsername(mentions);
                            const postMentions: string[] = [];

                            if (mentionedUsers && mentionedUsers.length > 0) {
                                for (const mentionedUser of mentionedUsers) {
                                    const notification = await this.notificationService.createNotification(payload.id, mentionedUser.id, post.id, type, NOTIFICATION_TYPES.MENTION, `${post.author.name} (@${post.author.username}) mentioned you in a ${(type === POST_TYPES.COMMENT) ? POST_TYPES.COMMENT : POST_TYPES.POST}.`);
                                    
                                    if (notification) {
                                        pubSub.publish("NEW_NOTIFICATION", notification);
                                        postMentions.push(mentionedUser.username);
    
                                        const tokens = await this.userDeviceTokenRepository.find({ where: { userId: mentionedUser.id } });
                                        const pushNotification: FirebaseNotification = {
                                            title: `@${post.author.username} mentioned you in a ${(type === POST_TYPES.COMMENT) ? POST_TYPES.COMMENT : POST_TYPES.POST} (for @${mentionedUser.username})`,
                                            body: notification.content,
                                            imageUrl: post.author.profile.profilePicture.length > 0 ? post.author.profile.profilePicture : "https://img.zncdn.net/static/profile-picture.png",
                                        };
                                        const link = `${process.env.CLIENT_ORIGIN}/${post.author.username}/post/${post.itemId}?n_id=${notification.notificationId}`;
                                        await sendPushNotifications(tokens as UserDeviceToken[], pushNotification, link, { username: mentionedUser.username, type: notification.notificationType });
                                    }
                                }
                            }

                            await this.postMentionsRepository.create({
                                postId: post.itemId,
                                mentions: postMentions,
                            }).save();
                        }
    
                        if (isReplyToItem && (type === POST_TYPES.COMMENT) && (isReplyToItem.authorId !== payload.id) && !isBlockedByMe) {
                            const notification = await this.notificationService.createNotification(payload.id, isReplyToItem.authorId, post.id, type, NOTIFICATION_TYPES.COMMENT, `${post.author.name} (@${post.author.username}) commented your ${isReplyToType === POST_TYPES.ARTICLE ? POST_TYPES.ARTICLE : POST_TYPES.POST}.`);
    
                            const author = await this.userService.findUserById(isReplyToItem.authorId);

                            if (notification && author) {
                                pubSub.publish("NEW_NOTIFICATION", notification);
    
                                const tokens = await this.userDeviceTokenRepository.find({ where: { userId: isReplyToItem.authorId } });
                                const pushNotification: FirebaseNotification = {
                                    title: `@${post.author.username} commented your ${isReplyToType === POST_TYPES.ARTICLE ? POST_TYPES.ARTICLE : POST_TYPES.POST} (for @${author.username})`,
                                    body: notification.content,
                                    imageUrl: post.author.profile.profilePicture.length > 0 ? post.author.profile.profilePicture : "https://img.zncdn.net/static/profile-picture.png",
                                };
                                const link = `${process.env.CLIENT_ORIGIN}/${post.author.username}/post/${post.itemId}?n_id=${notification.notificationId}`;
                                await sendPushNotifications(tokens as UserDeviceToken[], pushNotification, link, { username: author.username, type: notification.notificationType });
                            }
                        }

                        if (quotedPost && quotedPost.authorId !== payload.id && !isBlockedByMe) {
                            const notification = await this.notificationService.createNotification(payload.id, quotedPost.authorId, post.id, type, NOTIFICATION_TYPES.QUOTE, `${post.author.name} (@${post.author.username}) quoted your post.`);
    
                            const author = await this.userService.findUserById(quotedPost.authorId);

                            if (notification && author) {
                                pubSub.publish("NEW_NOTIFICATION", notification);
    
                                const tokens = await this.userDeviceTokenRepository.find({ where: { userId: quotedPost.authorId } });
                                const pushNotification: FirebaseNotification = {
                                    title: `@${post.author.username} quoted your post (for @${author.username})`,
                                    body: notification.content,
                                    imageUrl: post.author.profile.profilePicture.length > 0 ? post.author.profile.profilePicture : "https://img.zncdn.net/static/profile-picture.png",
                                };
                                const link = `${process.env.CLIENT_ORIGIN}/${post.author.username}/post/${post.itemId}?n_id=${notification.notificationId}`;
                                await sendPushNotifications(tokens as UserDeviceToken[], pushNotification, link, { username: author.username, type: notification.notificationType });
                            }
                        }

                        await this.feedItemStatsRepository.create({
                            itemId: post.itemId,
                            itemType: post.type,
                        }).save();

                        ok = true;
                    } else {
                        if (hasBlockedMe) {
                            status = "This user has blocked you.";
                        } else {
                            status = "Can't find the user.";
                        }
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

    @Query(() => PostMentions, { nullable: true })
    async getPostMentions(
        @Arg("postId") postId: string
    ): Promise<PostMentions | null> {
        if (!isUUID(postId)) {
            logger.warn("Invalid postId provided.");

            return null;
        }

        try {
            const postMentions = await this.postMentionsRepository.findOne({
                where: {
                    postId,
                },
            });

            return postMentions;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Mutation(() => PostResponse)
    @UseMiddleware(isAuth)
    async editPost(
        @Arg("postId") postId: string,
        @Arg("type") type: string,
        @Arg("content") content: string,
        @Arg("media") media: string,
        @Ctx() { payload }: AuthContext,
    ): Promise<PostResponse> {
        let errors = [];
        let post: Post | null = null;
        const mediaArray = JSON.parse(media);
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
                                isEdited: true,
                                hashtags: lumen.extractHashtags(content),
                                lang,
                            },
                        );

                        post = await this.postRepository.findOne({
                            where: { itemId: postId, authorId: payload.id },
                            relations: ["author", "media"],
                        });

                        const mediaToUpload = mediaArray.filter((item: any) => item.status === "uploading");

                        if (mediaToUpload && mediaToUpload.length > 0 && post) {
                            const mediaItems = [];
                            
                            for (const mediaItem of mediaToUpload) {
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

                        const toBeDeletedMedia = mediaArray.filter((item: any) => item.status === "to_be_deleted");

                        if (toBeDeletedMedia.length > 0) {
                            const deletedMediaIdsArray = toBeDeletedMedia.map((item: any) => item.id);
                            const mediaItems = await this.mediaItemRepository.find({ where: { id: In(deletedMediaIdsArray) } });

                            await Promise.all(
                                mediaItems.map(async (item) => {
                                    const existingKey =
                                        item.src.replace(
                                            `https://${item.type.includes("image") ? "img" : "vid"}.zncdn.net/`, ""
                                        );
                
                                    const url = await getPresignedUrlForDeleteCommand(existingKey, item.type);
                
                                    await axios.delete(url).then(() => {
                                        logger.warn(`Media item with id ${item.id} successfully deleted.`);
                                    })
                                    .catch((error) => {
                                        logger.error(`An error occurred while deleting the media item. Error code: ${error.code}.`);
                                    });

                                    await this.mediaItemRepository.delete({ id: item.id });
                                })
                            );
                        }

                        const existingMedia = mediaArray.filter((item: any) => item.status === "uploaded");

                        if (existingMedia && existingMedia.length > 0) {
                            for (const item of existingMedia) {
                                await this.mediaItemRepository.update({
                                    id: item.id,
                                }, {
                                    alt: item.alt,
                                });
                            }
                        }

                        if (post) {
                            const postMedia = await this.postMedia(post.itemId);

                            if (postMedia) {
                                post.media = postMedia;

                                await post.save();
                            }

                            const mentionedUsers = await this.userService.findUsersByUsername(mentions);
                            const postMentions: string[] = [];

                            if (mentionedUsers && mentionedUsers.length > 0) {
                                for (const mentionedUser of mentionedUsers) {
                                    const notification = await this.notificationService.findNotification(payload.id, mentionedUser.id, post.id, post.type, NOTIFICATION_TYPES.MENTION);

                                    if (!notification) {
                                        const newNotification = await this.notificationService.createNotification(payload.id, mentionedUser.id, post.id, post.type, NOTIFICATION_TYPES.MENTION, `${post.author.name} (@${post.author.username}) mentioned you in a ${(post.type === POST_TYPES.COMMENT) ? POST_TYPES.COMMENT : POST_TYPES.POST}.`);

                                        if (newNotification) {
                                            pubSub.publish("NEW_NOTIFICATION", newNotification);

                                            const tokens = await this.userDeviceTokenRepository.find({ where: { userId: mentionedUser.id } });
                                            const pushNotification: FirebaseNotification = {
                                                title: `@${post.author.username} mentioned you in a ${(post.type === POST_TYPES.COMMENT) ? POST_TYPES.COMMENT : POST_TYPES.POST} (for @${mentionedUser.username})`,
                                                body: newNotification.content,
                                                imageUrl: post.author.profile.profilePicture.length > 0 ? post.author.profile.profilePicture : "https://img.zncdn.net/static/profile-picture.png",
                                            };
                                            const link = `${process.env.CLIENT_ORIGIN}/${post.author.username}/post/${post.itemId}?n_id=${newNotification.notificationId}`;
                                            await sendPushNotifications(tokens as UserDeviceToken[], pushNotification, link, { username: mentionedUser.username, type: newNotification.notificationType });
                                        }
                                    }

                                    postMentions.push(mentionedUser.username);
                                }
                            }

                            const existingMentions = await this.getPostMentions(post.itemId);
                            
                            if (existingMentions) {
                                existingMentions.mentions = postMentions;

                                await existingMentions.save();
                            } else {
                                await this.postMentionsRepository.create({
                                    postId: post.itemId,
                                    mentions: postMentions,
                                }).save();
                            }

                            const mentionNotifications = await this.notificationRepository.find({
                                where: {
                                    creatorId: payload.id,
                                    notificationType: NOTIFICATION_TYPES.MENTION,
                                    resourceId: post.id,
                                    resourceType: post.type,
                                },
                            });

                            const uselessNotifications = mentionedUsers
                                ? mentionNotifications.filter(n => !mentionedUsers.some(u => u.id === n.recipientId))
                                : mentionNotifications;

                            for (const deletedNotification of uselessNotifications) {
                                await this.notificationService.deleteNotification(deletedNotification.notificationId);
                                
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
                resourceType: In([POST_TYPES.POST, POST_TYPES.COMMENT]),
                notificationType: In([NOTIFICATION_TYPES.MENTION, NOTIFICATION_TYPES.LIKE, NOTIFICATION_TYPES.COMMENT, NOTIFICATION_TYPES.QUOTE, NOTIFICATION_TYPES.REPOST]),
            });
    
            await this.postRepository.delete({ itemId: postId, authorId: payload.id });

            await this.feedItemStatsRepository.delete({
                itemId: post.itemId,
                itemType: post.type,
            });

            await this.postMentionsRepository.delete({
                postId: post.itemId,
            });

            return true;
        } catch (error) {
            logger.error(error);

            return false;
        }
    }

    @Mutation(() => PostResponse)
    @UseMiddleware(isAuth)
    async revokeMention(
        @Arg("postId") postId: string,
        @Ctx() { payload }: AuthContext
    ): Promise<PostResponse> {
        let status = "";
        let ok = false;

        if (!payload) {
            status = "User not authenticated.";
        } else if (!isUUID(postId)) {
            status = "Invalid postId provided.";
        } else {
            try {
                const post = await this.findPost(postId);

                if (post) {
                    const me = await this.userService.findUserById(payload.id);
                    
                    const postMentions = await this.getPostMentions(post.itemId);

                    if (me && postMentions && postMentions.mentions.includes(me.username)) {
                        const mentions = postMentions.mentions.filter(mention => mention !== me.username);
                        postMentions.mentions = mentions;

                        await postMentions.save();

                        status = "Your mention has been removed from the post.";

                        const notification = await this.notificationService.findNotification(post.authorId, me.id, post.id, post.type, NOTIFICATION_TYPES.MENTION);

                        if (notification) {
                            await this.notificationService.deleteNotification(notification.notificationId);
                        }

                        ok = true;
                    } else if (me && postMentions && !postMentions.mentions.includes(me.username)) {
                        status = "Mention not found.";
                    } else if (!postMentions) {
                        status = "This post doesn't have mentions.";
                    } else {
                        status = "User not found.";
                    }
                } else {
                    status = "Post not found.";
                }
            } catch (error) {
                logger.error(error);
    
                status = "An error has occurred. Please try again later.";
            }
        }

        return {
            status,
            ok,
        };
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

            if (!item) {
                logger.warn("Feed item not found.");

                return null;
            }

            const hasBlockedMe = await this.userService.whoHasBlockedWho(payload.id, item.authorId);
            const isBlockedByMe = await this.userService.whoHasBlockedWho(item.authorId, payload.id);

            if (hasBlockedMe) {
                logger.warn("Can't like the post because the item author has blocked me.");

                return null;
            }

            if (!existingLike) {
                const like = await this.likeRepository.create({
                    userId: payload.id,
                    likedItemId: itemId,
                    origin,
                    itemOpened,
                    itemType,
                }).save();

                const author = await this.userService.findUserById(item.authorId);

                if (payload.id !== item.authorId && author && !isBlockedByMe) {
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

    @Query(() => PaginatedLikes)
    async getLikedPosts(
        @Arg("id", () => Int, { nullable: true }) id: number,
        @Arg("limit", () => Int) limit: number,
        @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    ): Promise<PaginatedLikes> {
        if (!id) {
            logger.warn("User id not provied.");

            return {
                likes: [],
                hasMore: false,
                totalCount: 0,
            };
        }
    
        try {
            const [likes, totalCount] = await Promise.all([
                this.likeRepository.find({
                    where: { 
                        userId: id,
                        ...(cursor ? { createdAt: LessThan(new Date(parseInt(cursor))) } : {}),
                    },
                    take: limit + 1,
                    order: { createdAt: "DESC" }
                }),
                this.likeRepository.count({
                    where: { 
                        userId: id,
                    },
                }),
            ]);
    
            return {
                likes: likes.slice(0, limit),
                hasMore:  likes.length === limit + 1,
                totalCount,
            };
        } catch (error) {
            logger.error(error);

            return {
                likes: [],
                hasMore: false,
                totalCount: 0,
            };
        }
    }

    @Query(() => PaginatedLikes)
    async getPostLikes(
        @Arg("itemId") itemId: string,
        @Arg("type") type: string,
        @Arg("limit", () => Int) limit: number,
        @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    ): Promise<PaginatedLikes> {
        if (!isUUID(itemId)) {
            logger.warn("Invalid itemId provided.");

            return {
                likes: [],
                hasMore: false,
                totalCount: 0,
            };
        }

        if (type.length === 0) {
            logger.warn("Invalid type provided.");

            return {
                likes: [],
                hasMore: false,
                totalCount: 0,
            };
        }

        try {        
            const [likes, totalCount] = await Promise.all([
                this.likeRepository.find({
                    where: { 
                        likedItemId: itemId, 
                        itemType: type,
                        ...(cursor ? { createdAt: LessThan(new Date(parseInt(cursor))) } : {}),
                    },
                    take: limit + 1,
                    order: { createdAt: "DESC" }
                }),
                this.likeRepository.count({
                    where: { 
                        likedItemId: itemId, 
                        itemType: type,
                    },
                }),
            ]);

            return {
                likes: likes.slice(0, limit),
                hasMore:  likes.length === limit + 1,
                totalCount,
            };
        } catch (error) {
            logger.error(error);

            return {
                likes: [],
                hasMore: false,
                totalCount: 0,
            };
        }
    }

    @Query(() => Like, { nullable: true })
    @UseMiddleware(isAuth)
    async isPostLikedByMe(
        @Arg("itemId") itemId: string,
        @Arg("type") type: string,
        @Ctx() { payload }: AuthContext
    ): Promise<Like | null> {
        if (!payload) {
            logger.warn("User not authenticated.");

            return null;
        }

        if (!isUUID(itemId)) {
            logger.warn("Invalid itemId provided.");

            return null;
        }

        if (type.length === 0) {
            logger.warn("Invalid type provided.");

            return null;
        }

        try {
            const like = await this.likeRepository.findOne({ where: { userId: payload.id, likedItemId: itemId, itemType: type } });

            return like;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Mutation(() => ViewLog, { nullable: true })
    @UseMiddleware(isAuth)
    async viewFeedItem(
        @Arg("itemId") itemId: string,
        @Arg("type") type: string,
        @Arg("itemOpened") itemOpened: boolean,
        @Arg("origin") origin: string,
        @Ctx() { payload, req }: AuthContext
    ): Promise<ViewLog | null> {
        if (!isUUID(itemId)) {
            logger.warn("Invalid itemId provided.");

            return null;
        }

        if (type.length === 0) {
            logger.warn("Invalid type provided.");

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
                logger.warn("Item not found.");

                return null;
            }

            const itemStats = await this.getFeedItemStats(item.itemId, item.type);

            if (!itemStats) {
                logger.warn("Not stats found for this feed item.");

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
                    itemStats.views += 1;
                    
                    await itemStats.save();

                    const viewLog = await this.viewLogRepository.create({
                        itemId,
                        uniqueIdentifier,
                        isAuth: false,
                        itemType: type,
                        itemOpened,
                        origin,
                    }).save();

                    return viewLog;
                } else {
                    return null;
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
                    itemStats.views += 1;
                    
                    await itemStats.save();

                    const viewLog = await this.viewLogRepository.create({
                        itemId,
                        userId: payload.id,
                        uniqueIdentifier,
                        isAuth: true,
                        itemType: type,
                        itemOpened,
                        origin,
                    }).save();

                    return viewLog;
                } else {
                    return null;
                }
            }
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Query(() => FeedItemStats, { nullable: true })
    async getFeedItemStats(
        @Arg("itemId") itemId: string,
        @Arg("type") type: string,
    ): Promise<FeedItemStats | null> {
        if (!isUUID(itemId)) {
            logger.warn("Invalid itemId provided.");

            return null;
        }

        if (type.length === 0) {
            logger.warn("Invalid type provided.");

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
                logger.warn("Feed item not found.");

                return null;
            }

            const feedItemStats = await this.feedItemStatsRepository.findOne({
                where: {
                    itemId,
                    itemType: type,
                },
            });

            return feedItemStats;
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

            const hasBlockedMe = await this.userService.whoHasBlockedWho(payload.id, item.authorId);

            if (hasBlockedMe) {
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

    @Query(() => Bookmark, { nullable: true })
    @UseMiddleware(isAuth)
    async isBookmarked(
        @Arg("itemId", () => Int, { nullable: true }) itemId: number,
        @Arg("type") type: string,
        @Ctx() { payload }: AuthContext
    ): Promise<Bookmark | null> {
        if (!payload) {
            logger.warn("User not authenticated.");

            return null;
        }

        if (!itemId) {
            logger.warn("Item id not provided.");

            return null;
        }

        if (type.length === 0) {
            logger.warn("Invalid type provided.");

            return null;
        }

        try {
            const bookmark = await this.bookmarkRepository.findOne({ where: { authorId: payload.id, itemId, itemType: type } });

            return bookmark;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Query(() => PaginatedBookmarks)
    @UseMiddleware(isAuth)
    async getBookmarks(
        @Ctx() { payload }: AuthContext,
        @Arg("limit", () => Int) limit: number,
        @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    ): Promise<PaginatedBookmarks> {
        if (!payload) {
            logger.warn("User not authenticated.");

            return {
                bookmarks: [],
                hasMore: false,
                totalCount: 0,
            };
        }
    
        try {
            const [bookmarks, totalCount] = await Promise.all([
                this.bookmarkRepository.find({
                    where: { 
                        authorId: payload.id,
                        ...(cursor ? { createdAt: LessThan(new Date(parseInt(cursor))) } : {}),
                    },
                    take: limit + 1,
                    order: { createdAt: "DESC" }
                }),
                this.bookmarkRepository.count({
                    where: {
                        authorId: payload.id,
                    },
                })
            ]);

            return {
                bookmarks: bookmarks.slice(0, limit),
                hasMore: bookmarks.length === limit + 1,
                totalCount,
            };
        } catch (error) {
            logger.error(error);

            return {
                bookmarks: [],
                hasMore: false,
                totalCount: 0,
            };
        }
    }

    @Mutation(() => Repost, { nullable: true })
    @UseMiddleware(isAuth)
    async createRepost(
        @Arg("postId") postId: string,
        @Ctx() { payload }: AuthContext
    ): Promise<Repost | null> {
        if (!isUUID(postId)) {
            logger.warn("Invalid postId provided.");

            return null;
        }

        if (!payload) {
            logger.warn("User not authenticated.");

            return null;
        }
        
        try {
            let item: Post | null = null;

            item = await this.findPost(postId);

            if (!item) {
                return null;
            }

            const hasBlockedMe = await this.userService.whoHasBlockedWho(payload.id, item.authorId);
            const isBlockedByMe = await this.userService.whoHasBlockedWho(item.authorId, payload.id);

            if (hasBlockedMe) {
                return null;
            }

            const me = await this.userService.findUserById(payload.id);

            if (!me) {
                logger.warn("User not found.");

                return null;
            }

            const repost = await this.repostRepository.create({
                repostId: uuidv4(),
                postId: item.id,
                authorId: payload.id,
            }).save();

            if (!repost) {
                logger.warn("An error has occurred while reposting the post.");

                return null;
            }

            if (item.authorId !== payload.id && !isBlockedByMe) {
                const notification = await this.notificationService.createNotification(payload.id, item.authorId, item.id, item.type, NOTIFICATION_TYPES.REPOST, `${me.name} (@${me.username}) reposted your ${(item.type === POST_TYPES.COMMENT) ? POST_TYPES.COMMENT : POST_TYPES.POST}.`);

                if (notification) {
                    pubSub.publish("NEW_NOTIFICATION", notification);

                    const tokens = await this.userDeviceTokenRepository.find({ where: { userId: item.authorId } });
                    const pushNotification: FirebaseNotification = {
                        title: `@${me.username} reposted your ${(item.type === POST_TYPES.COMMENT) ? POST_TYPES.COMMENT : POST_TYPES.POST} (for @${item.author.username})`,
                        body: notification.content,
                        imageUrl: me.profile.profilePicture.length > 0 ? me.profile.profilePicture : "https://img.zncdn.net/static/profile-picture.png",
                    };
                    const link = `${process.env.CLIENT_ORIGIN}/${item.author.username}/post/${item.itemId}?n_id=${notification.notificationId}`;
                    await sendPushNotifications(tokens as UserDeviceToken[], pushNotification, link, { username: item.author.username, type: notification.notificationType });
                }
            }

            return repost;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteRepost(
        @Arg("postId", () => Int) postId: number,
        @Ctx() { payload }: AuthContext
    ) {
        if (!payload) {
            logger.warn("User not authenticated.");

            return false;
        }

        try {
            const item = await this.findPostById(postId);

            if (!item) {
                logger.warn("Item not found.");

                return false;
            }

            await this.repostRepository.delete({ authorId: payload.id, postId }).catch((error) => {
                logger.error(error);

                return false;
            });

            const notification = await this.notificationService.findNotification(payload.id, item.authorId, item.id, item.type, NOTIFICATION_TYPES.REPOST);
    
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

    @Query(() => Repost, { nullable: true })
    @UseMiddleware(isAuth)
    async isRepostedByUser(
        @Arg("postId", () => Int, { nullable: true }) postId: number,
        @Arg("userId", () => Int, { nullable: true }) userId: number,
    ): Promise<Repost | null> {
        if (!userId) {
            logger.warn("User id not provided.");

            return null;
        }

        if (!postId) {
            logger.warn("Post id not provided.");

            return null;
        }

        try {
            const repost = await this.repostRepository.findOne({ where: { authorId: userId, postId } });

            return repost;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Query(() => PaginatedReposts)
    async getReposts(
        @Arg("postId", () => Int, { nullable: true }) postId: number,
        @Arg("limit", () => Int) limit: number,
        @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    ): Promise<PaginatedReposts> {
        if (!postId) {
            logger.warn("Post id not provided.");

            return {
                reposts: [],
                hasMore: false,
                totalCount: 0,
            };
        }

        try {
            const [reposts, totalCount] = await Promise.all([
                this.repostRepository.find({
                    where: { 
                        postId,
                        ...(cursor ? { createdAt: LessThan(new Date(parseInt(cursor))) } : {}),
                    },
                    take: limit + 1,
                    order: { createdAt: "DESC" }
                }),
                this.repostRepository.count({
                    where: {
                        postId,
                    }
                })
            ]);
        
            return {
                reposts: reposts.slice(0, limit),
                hasMore: reposts.length === limit + 1,
                totalCount,
            };
        } catch (error) {
            logger.error(error);

            return {
                reposts: [],
                hasMore: false,
                totalCount: 0,
            };
        }
    }
}
