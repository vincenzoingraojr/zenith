import { Field, Int, ObjectType } from "type-graphql";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    BaseEntity,
    ManyToOne,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity("posts")
export class Post extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column({ type: "uuid", unique: true })
    postId: string;

    @Field(() => Int)
    @Column()
    authorId: number;

    @Field(() => Int, { nullable: true, defaultValue: null })
    @Column({ nullable: true, default: null })
    isReplyTo: number;

    @Field(() => Int, { nullable: true, defaultValue: null })
    @Column({ nullable: true, default: null })
    quotedPostId: number;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.posts)
    author: User;

    @Field(() => String)
    @Column({ default: "post" })
    type: string;

    @Field(() => String)
    @Column()
    content: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => Boolean)
    @Column({ default: false })
    isEdited: boolean;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    @Field(() => [MediaItem], { nullable: true, defaultValue: [] })
    @OneToMany(() => MediaItem, (mediaItem) => mediaItem.post, { nullable: true, cascade: true, eager: true })
    media: MediaItem[];
    
    @Field(() => [String])
    @Column({ type: "text", array: true, default: [] })
    mentions: string[];

    @Field(() => [String])
    @Column({ type: "text", array: true, default: [] })
    hashtags: string[];

    @Field(() => Int)
    @Column("int", { default: 0 })
    views: number;

    @Field(() => Number)
    @Column("float", { default: 1 })
    usefulnessRating: number;

    @Field(() => String)
    @Column()
    lang: string;

    @Field(() => [Int])
    @Column({ type: "int", array: true, default: [] })
    topicsIds: number[];
}

@ObjectType()
@Entity("likes")
export class Like extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

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

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;
}

@ObjectType()
@Entity("media-items")
export class MediaItem extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

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

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;
}

@ObjectType()
@Entity("view-logs")
export class ViewLog extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

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

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;
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
export class Article extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column({ type: "uuid", unique: true })
    articleId: string;

    @Field(() => Int)
    @Column()
    authorId: number;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.articles)
    author: User;

    @Field(() => String)
    @Column()
    title: string;

    @Field(() => String)
    @Column()
    description: string;

    @Field(() => String)
    @Column()
    content: string;

    @Field(() => ArticleCover)
    @Column()
    cover: ArticleCover;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => Boolean)
    @Column({ default: false })
    isEdited: boolean;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    @Field(() => Int)
    @Column("int", { default: 0 })
    views: number;

    @Field(() => Int)
    @Column("int", { default: 1 })
    usefulnessRating: number;

    @Field(() => String)
    @Column()
    lang: string;

    @Field(() => [Int])
    @Column({ type: "int", array: true, default: [] })
    topicsIds: number[];
}

@ObjectType()
@Entity("reposts")
export class Repost extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column({ type: "uuid", unique: true })
    repostId: string;

    @Field(() => Int)
    @Column()
    postId: number;

    @Field(() => Int)
    @Column()
    authorId: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;    
}

@ObjectType()
@Entity("bookmarks")
export class Bookmark extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

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
    @CreateDateColumn()
    createdAt: Date;
}