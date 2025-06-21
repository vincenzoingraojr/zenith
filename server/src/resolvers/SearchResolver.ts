import { Block, User } from "../entities/User";
import { Post } from "../entities/Post";
import {
    Arg,
    Ctx,
    Field,
    Int,
    ObjectType,
    Query,
    Resolver,
    UseMiddleware,
} from "type-graphql";
import { Repository } from "typeorm";
import appDataSource from "../dataSource";
import { isAuth } from "../middleware/isAuth";
import { AuthContext } from "../types";
import { enhancedContentFilter } from "../helpers/checkSensitiveContent";
import { LanguageCode } from "@aws-sdk/client-comprehend";
import lumen from "@zenith-to/lumen-js";
import { logger } from "../helpers/logger";

@ObjectType()
export class SearchResult {
    @Field(() => [Post], { nullable: true })
    posts: Post[];

    @Field(() => [User], { nullable: true })
    users: User[];

    @Field(() => Boolean)
    hasMorePosts: boolean;

    @Field(() => Boolean)
    hasMoreUsers: boolean;
}

interface SearchFilters {
    blockedUserIds: number[];
    shouldFilterSensitive: boolean;
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

    // "relevance", "latest", "users"
    @Query(() => SearchResult)
    @UseMiddleware(isAuth)
    async search(
        @Arg("keyword") keyword: string,
        @Arg("type") type: string,
        @Arg("postsLimit", () => Int, { defaultValue: 10 }) postsLimit: number,
        @Arg("postsOffset", () => Int, { defaultValue: 0 }) postsOffset: number,
        @Arg("usersLimit", () => Int, { defaultValue: 3 }) usersLimit: number,
        @Arg("usersOffset", () => Int, { defaultValue: 0 }) usersOffset: number,
        @Ctx() { payload }: AuthContext
    ): Promise<SearchResult> {
        try {
            // Input validation
            if (!keyword || keyword.trim().length < 2) {
                return {
                    posts: [],
                    users: [],
                    hasMorePosts: false,
                    hasMoreUsers: false,
                };
            }

            const user = payload
                ? await this.getUserWithSettings(payload.id)
                : null;
            const filters = await this.getSearchFilters(user);

            const cleanedKeyword = this.cleanKeyword(keyword);

            const [rawPosts, rawUsers] = await Promise.all([
                this.searchPosts(
                    cleanedKeyword,
                    type,
                    postsLimit + 1,
                    postsOffset,
                    filters
                ),
                this.searchUsers(
                    cleanedKeyword,
                    usersLimit + 1,
                    usersOffset,
                    filters
                ),
            ]);

            const filteredPosts = await this.applyContentFiltering(
                rawPosts.slice(0, postsLimit),
                filters
            );
            const users = rawUsers.slice(0, usersLimit);

            return {
                posts: filteredPosts,
                users,
                hasMorePosts: rawPosts.length > postsLimit,
                hasMoreUsers: rawUsers.length > usersLimit,
            };
        } catch (error) {
            logger.error("Error during search", { error, keyword });
            return {
                posts: [],
                users: [],
                hasMorePosts: false,
                hasMoreUsers: false,
            };
        }
    }

    private async getUserWithSettings(userId: number): Promise<User | null> {
        return this.userRepository.findOne({
            where: { id: userId },
        });
    }

    private async getSearchFilters(user: User | null): Promise<SearchFilters> {
        const filters: SearchFilters = {
            blockedUserIds: [],
            shouldFilterSensitive: false,
        };

        if (user) {
            filters.shouldFilterSensitive =
                user.searchSettings.hideSensitiveContent;

            if (user.searchSettings.hideBlockedAccounts) {
                const blockActions = await this.blockRepository.find({
                    where: { userId: user.id },
                });
                filters.blockedUserIds = blockActions.map(
                    (block) => block.blockedId
                );
            }
        }

        return filters;
    }

    private cleanKeyword(keyword: string): string {
        // Remove special characters but preserve spaces and alphanumeric
        return keyword
            .replace(/[^\w\s@#]/g, "") // Keep alphanumeric, spaces, @, #
            .trim()
            .replace(/\s+/g, " "); // Normalize whitespace
    }

    private async searchPosts(
        keyword: string,
        type: string,
        limit: number,
        offset: number,
        filters: SearchFilters
    ): Promise<Post[]> {
        const keywords = keyword.split(" ").filter((word) => word.length > 1);
        if (keywords.length === 0) return [];

        const mentions: string[] = lumen.extractMentions(keyword);
        const hashtags: string[] = lumen.extractHashtags(keyword);

        const query = this.postRepository
            .createQueryBuilder("post")
            .leftJoinAndSelect("post.author", "author")
            .where("author.deletedAt IS NULL");

        // Apply blocked users filter early
        if (filters.blockedUserIds.length > 0) {
            query.andWhere("post.authorId NOT IN (:...blockedIds)", {
                blockedIds: filters.blockedUserIds,
            });
        }

        // Content search with improved relevance scoring
        const contentConditions: string[] = [];
        const relevanceExpressions: string[] = [];

        keywords.forEach((word, index) => {
            const paramName = `keyword${index}`;
            const relevanceParam = `relevance${index}`;

            query.setParameter(paramName, `%${word}%`);
            query.setParameter(relevanceParam, keywords.length - index);

            const condition = `post.content ILIKE :${paramName}`;
            contentConditions.push(condition);

            // Higher weight for exact matches at word boundaries
            const exactMatchWeight = `CASE WHEN post.content ILIKE :${paramName} THEN :${relevanceParam} * 2 ELSE :${relevanceParam} END`;
            relevanceExpressions.push(
                `CASE WHEN ${condition} THEN ${exactMatchWeight} ELSE 0 END`
            );
        });

        // Author search conditions
        const authorConditions: string[] = [];
        keywords.forEach((word, index) => {
            const nameParam = `authorName${index}`;
            const usernameParam = `authorUsername${index}`;

            query.setParameter(nameParam, `%${word}%`);
            query.setParameter(usernameParam, `%${word}%`);

            authorConditions.push(
                `(author.name ILIKE :${nameParam} OR author.username ILIKE :${usernameParam})`
            );
        });

        // Combine all search conditions
        const allConditions: string[] = [];

        if (contentConditions.length > 0) {
            allConditions.push(`(${contentConditions.join(" OR ")})`);
        }

        if (authorConditions.length > 0) {
            allConditions.push(`(${authorConditions.join(" AND ")})`);
        }

        // Mentions and hashtags
        if (mentions.length > 0) {
            const mentionConditions = mentions.map((mention, index) => {
                const param = `mention${index}`;
                query.setParameter(param, `%${mention}%`);
                return `post.content ILIKE :${param}`;
            });
            allConditions.push(`(${mentionConditions.join(" OR ")})`);
        }

        if (hashtags.length > 0) {
            query.setParameter("hashtags", hashtags);
            allConditions.push("post.hashtags && :hashtags");
        }

        if (allConditions.length > 0) {
            query.andWhere(`(${allConditions.join(" OR ")})`);
        }

        // Relevance scoring and ordering
        if (type === "relevance" && relevanceExpressions.length > 0) {
            const relevanceSum = relevanceExpressions.join(" + ");
            query
                .addSelect(`(${relevanceSum}) AS relevance`)
                .orderBy("relevance", "DESC");
        } else {
            query.orderBy("post.createdAt", "DESC");
        }

        return query.limit(limit).offset(offset).getMany();
    }

    private async searchUsers(
        keyword: string,
        limit: number,
        offset: number,
        filters: SearchFilters
    ): Promise<User[]> {
        const keywords = keyword.split(" ").filter((word) => word.length > 1);
        if (keywords.length === 0) return [];

        const query = this.userRepository
            .createQueryBuilder("user")
            .where("user.deletedAt IS NULL");

        // Apply blocked users filter
        if (filters.blockedUserIds.length > 0) {
            query.andWhere("user.id NOT IN (:...blockedIds)", {
                blockedIds: filters.blockedUserIds,
            });
        }

        const searchConditions: string[] = [];

        keywords.forEach((word, index) => {
            const nameParam = `userName${index}`;
            const usernameParam = `userUsername${index}`;
            const bioParam = `userBio${index}`;

            query.setParameter(nameParam, `%${word}%`);
            query.setParameter(usernameParam, `%${word}%`);
            query.setParameter(bioParam, `%${word}%`);

            searchConditions.push(`(
                user.name ILIKE :${nameParam} OR 
                user.username ILIKE :${usernameParam} OR 
                user.profile.bio ILIKE :${bioParam}
            )`);
        });

        if (searchConditions.length > 0) {
            query.andWhere(`(${searchConditions.join(" OR ")})`);
        }

        // Order by relevance: exact username matches first, then name matches
        query
            .addSelect(
                `
            CASE 
                WHEN user.username ILIKE :exactUsername THEN 3
                WHEN user.name ILIKE :exactName THEN 2
                ELSE 1
            END AS userRelevance
        `
            )
            .setParameter("exactUsername", `%${keyword}%`)
            .setParameter("exactName", `%${keyword}%`)
            .orderBy("userRelevance", "DESC")
            .addOrderBy("user.createdAt", "DESC");

        return query.limit(limit).offset(offset).getMany();
    }

    private async applyContentFiltering(
        posts: Post[],
        filters: SearchFilters
    ): Promise<Post[]> {
        if (!filters.shouldFilterSensitive || posts.length === 0) {
            return posts;
        }

        try {
            // Process posts in batches to avoid overwhelming the API
            const batchSize = 10;
            const filteredPosts: Post[] = [];

            for (let i = 0; i < posts.length; i += batchSize) {
                const batch = posts.slice(i, i + batchSize);
                const batchResults = await Promise.allSettled(
                    batch.map(async (post) => {
                        const isAppropriate = await enhancedContentFilter(
                            post.content,
                            post.lang as LanguageCode | undefined
                        );
                        return isAppropriate ? post : null;
                    })
                );

                batchResults.forEach((result, index) => {
                    if (result.status === "fulfilled" && result.value) {
                        filteredPosts.push(result.value);
                    } else if (result.status === "rejected") {
                        logger.warn("Content filtering failed for post", {
                            postId: batch[index].id,
                            error: result.reason,
                        });
                        // Include post if filtering fails (fail-open approach)
                        filteredPosts.push(batch[index]);
                    }
                });
            }

            return filteredPosts;
        } catch (error) {
            logger.error("Batch content filtering failed", error);
            return posts; // Return unfiltered posts if filtering fails
        }
    }
}
