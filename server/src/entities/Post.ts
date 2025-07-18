import { createUnionType, Field, Int, ObjectType } from "type-graphql";
import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { BaseItem } from "./BaseItem";
import { GraphQLJSONObject } from "graphql-scalars";

@ObjectType()
export class FeedItem extends BaseItem {
    @Field(() => String)
    @Column({ type: "uuid", unique: true })
    itemId: string;

    @Field(() => Int)
    @Column()
    authorId: number;

    @Field(() => String)
    @Column()
    type: string;

    @Field(() => String)
    @Column()
    content: string;

    @Field(() => Boolean)
    @Column({ default: false })
    isEdited: boolean;

    @Field(() => String)
    @Column()
    lang: string;

    @Field(() => [GraphQLJSONObject], { nullable: true })
    @Column({ type: "jsonb", default: [] })
    topics: { id: number; weight: number }[];
}

@ObjectType()
@Entity("posts")
export class Post extends FeedItem {
    @Field(() => User)
    @ManyToOne(() => User, (user) => user.posts)
    author: User;

    @Field(() => Int, { nullable: true, defaultValue: null })
    @Column({ nullable: true, default: null })
    isReplyToId: number;

    @Field(() => String, { nullable: true, defaultValue: null })
    @Column({ nullable: true, default: null })
    isReplyToType: string;

    @Field(() => Int, { nullable: true, defaultValue: null })
    @Column({ nullable: true, default: null })
    quotedPostId: number;

    @Field(() => [MediaItem], { nullable: true, defaultValue: [] })
    @OneToMany(() => MediaItem, (mediaItem) => mediaItem.post, {
        nullable: true,
        cascade: true,
        eager: true,
    })
    media: MediaItem[];

    @Field(() => [String])
    @Column({ type: "text", array: true, default: [] })
    hashtags: string[];
}

@ObjectType()
@Entity("likes")
export class Like extends BaseItem {
    @Field(() => Int)
    @Column()
    userId: number;

    @Field(() => String)
    @Column({ type: "uuid" })
    likedItemId: string;

    @Field(() => Boolean)
    @Column()
    itemOpened: boolean;

    @Field(() => String)
    @Column()
    itemType: string;

    @Field(() => String)
    @Column()
    origin: string;
}

@ObjectType()
@Entity("media-items")
export class MediaItem extends BaseItem {
    @Field(() => Post)
    @ManyToOne(() => Post, (post) => post.media)
    post: Post;

    @Field(() => String)
    @Column()
    type: string;

    @Field(() => String)
    @Column()
    src: string;

    @Field(() => String)
    @Column()
    alt: string;
}

@ObjectType()
@Entity("feed-item-stats")
export class FeedItemStats extends BaseItem {
    @Field(() => String)
    @Column({ type: "uuid" })
    itemId: string;

    @Field(() => String)
    @Column()
    itemType: string;

    @Field(() => Int)
    @Column("int", { default: 0 })
    views: number;
}

@ObjectType()
@Entity("post-mentions")
export class PostMentions extends BaseItem {
    @Field(() => String)
    @Column({ type: "uuid" })
    postId: string;

    @Field(() => [String])
    @Column({ type: "text", array: true, default: [] })
    mentions: string[];
}

@ObjectType()
@Entity("view-logs")
export class ViewLog extends BaseItem {
    @Field(() => String)
    @Column({ type: "uuid" })
    itemId: string;

    @Field(() => String)
    @Column({ type: "uuid" })
    uniqueIdentifier: string;

    @Field(() => Int, { nullable: true, defaultValue: null })
    @Column({ nullable: true, default: null })
    userId: number;

    @Field(() => Boolean)
    @Column()
    isAuth: boolean;

    @Field(() => Boolean)
    @Column()
    itemOpened: boolean;

    @Field(() => String)
    @Column()
    itemType: string;

    @Field(() => String)
    @Column()
    origin: string;
}

@ObjectType()
export class ArticleCover {
    @Field(() => String)
    @Column({ default: "" })
    alt: string;

    @Field(() => String)
    @Column({ default: "" })
    src: string;
}

@ObjectType()
@Entity("articles")
export class Article extends FeedItem {
    @Field(() => User)
    @ManyToOne(() => User, (user) => user.articles)
    author: User;

    @Field(() => String)
    @Column()
    title: string;

    @Field(() => String)
    @Column()
    description: string;

    @Field(() => ArticleCover)
    @Column(() => ArticleCover)
    cover: ArticleCover;

    @Field(() => Boolean)
    @Column({ default: true })
    draft: boolean;
}

@ObjectType()
@Entity("reposts")
export class Repost extends BaseItem {
    @Field(() => String)
    @Column({ type: "uuid", unique: true })
    repostId: string;

    @Field(() => Int)
    @Column()
    postId: number;

    @Field(() => Int)
    @Column()
    authorId: number;
}

@ObjectType()
@Entity("bookmarks")
export class Bookmark extends BaseItem {
    @Field(() => Int)
    @Column()
    itemId: number;

    @Field(() => String)
    @Column()
    itemType: string;

    @Field(() => Int)
    @Column()
    authorId: number;

    @Field(() => String)
    @Column()
    origin: string;
}

export const PostOrArticle = createUnionType({
    name: "PostOrArticle",
    description: "Post or Article type",
    types: () => [Post, Article] as const,
    resolveType: (value) => {
        if (value && "media" in value) {
            return Post;
        }
        if (value && "title" in value) {
            return Article;
        }

        return null;
    },
});
