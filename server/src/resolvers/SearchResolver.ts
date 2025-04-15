import { Block, User } from "../entities/User";
import { Post } from "../entities/Post";
import { Arg, Ctx, Field, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { Repository } from "typeorm";
import appDataSource from "../dataSource";
import { isAuth } from "../middleware/isAuth";
import { AuthContext } from "../types";
import { checkSensitiveContent } from "../helpers/checkSensitiveContent";
import { LanguageCode } from "@aws-sdk/client-comprehend";
import lumen from "@zenith-to/lumen-js";
import { logger } from "../helpers/logger";

@ObjectType()
export class SearchResult {
    @Field(() => [Post], { nullable: true })
    posts?: Post[];

    @Field(() => [User], { nullable: true })
    users?: User[];
}

@Resolver()
export class SearchResolver {
    private readonly userRepository: Repository<User>;
    private readonly postRepository: Repository<Post>;
    private readonly blockRepository: Repository<Block>;

    constructor() {
        this.userRepository = appDataSource.getRepository(User);
        this.postRepository = appDataSource.getRepository(Post);
        this.blockRepository = appDataSource.getRepository(Block);
    }

    @Query(() => SearchResult)
    @UseMiddleware(isAuth)
    async search(@Arg("keyword") keyword: string, @Arg("type") type: string = "relevance", @Ctx() { payload }: AuthContext): Promise<SearchResult> {
        let posts: Post[] = [];
        let users: User[] = [];
        const regex = /[@#$]/;
        
        try {
            let me: User | null = null;
        
            if (payload) {
                me = await this.userRepository.findOne({ where: { id: payload.id } });
            }

            let encodedKeyword = keyword;

            if (regex.test(encodedKeyword)) {
                encodedKeyword = encodedKeyword.replace(/[@#$]/g, "");
            }

            const keywords = encodedKeyword.split(" ");

            const parameterObject = keywords.reduce((obj: { [key: string]: string }, word) => {
                obj[word] = `%${word}%`;
                return obj;
            }, {});

            const postsQuery = this.postRepository
                .createQueryBuilder("post")
                .leftJoinAndSelect("post.author", "user")
                .where("user.deletedAt IS NULL");

            const mentions: string[] = lumen.extractMentions(keyword);
            const hashtags: string[] = lumen.extractHashtags(keyword);

            const contentConditions = keywords.map((kw, index) => {
                const paramName = `keyword${index}`;
                postsQuery.setParameter(paramName, `%${kw}%`);
                return `post.content ILIKE :${paramName}`;
            });

            if (contentConditions.length > 0) {
                const relevanceExpressions = contentConditions.map((condition, index) => {
                    const relevanceParam = `relevance${index}`;
                    postsQuery.setParameter(relevanceParam, contentConditions.length - index);
                    return `(${condition})::int * :${relevanceParam}`;
                });
            
                const relevanceSum = relevanceExpressions.join(" + ");
                
                postsQuery.addSelect(`(${relevanceSum}) AS relevance`)
                    .andWhere(`(${relevanceSum}) > 0`)
                    .orderBy("relevance", "DESC");
            }

            if (mentions.length > 0) {
                postsQuery.andWhere("post.content ILIKE ANY(:mentions)", { mentions: mentions.map((mention: string) => `%${mention}%`) });
            }
        
            if (hashtags.length > 0) {
                postsQuery.andWhere("post.hashtags && :hashtags", { hashtags });
            }

            const authorNameConditions = keywords.map((word) => `user.name ILIKE :${word}`).join(" AND ");
            const authorUsernameConditions = keywords.map((word) => `user.username ILIKE :${word}`).join(" AND ");

            if (type === "latest") {
                postsQuery.addOrderBy("post.createdAt", "DESC");
            }

            posts = await postsQuery
                .orWhere(`(${authorNameConditions})`, parameterObject)
                .orWhere(`(${authorUsernameConditions})`, parameterObject)
                .getMany();

            const nameConditions = keywords.map((word) => `user.name ILIKE :${word}`).join(" OR ");
            const usernameConditions = keywords.map((word) => `user.username ILIKE :${word}`).join(" OR ");
            const bioConditions = keywords.map((word) => `user.profile.bio ILIKE :${word}`).join(" OR ");

            users = await this.userRepository
                .createQueryBuilder("user")
                .where(`(${nameConditions})`, parameterObject)
                .orWhere(`(${usernameConditions})`, parameterObject)
                .orWhere(`(${bioConditions})`, parameterObject)
                .getMany();

            if (me && me.searchSettings.hideBlockedAccounts) {
                const blockActions = await this.blockRepository.find({ where: { userId: me.id } });
                
                const blockedAccounts = blockActions.map((item) => item.blockedId);
                
                if (users.length > 0) {
                    users = users.filter((user) => !blockedAccounts.includes(user.id));
                }

                if (posts.length > 0) {
                    posts = posts.filter((post) => !blockedAccounts.includes(post.authorId));
                }
            }

            if (me && me.searchSettings.hideSensitiveContent) {
                if (posts.length > 0) {
                    const sensitivePostIds: number[] = [];

                    for (const post of posts) {
                        const isSensitive = await checkSensitiveContent(post.content, post.lang as LanguageCode | undefined);

                        if (isSensitive) {
                            sensitivePostIds.push(post.id);
                        }
                    }

                    posts = posts.filter((post) => !sensitivePostIds.includes(post.id));
                }
            }
        } catch (error) {
            logger.error("Error during search", error);
        }

        return {
            posts,
            users,
        }
    }
}
