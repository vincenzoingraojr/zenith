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

    @Field(() => String, { nullable: false })
    @Column({ type: "uuid", unique: true, nullable: false })
    postId: string;

    @Field(() => Number, { nullable: false })
    @Column({ nullable: false })
    authorId: number;

    @Field(() => Number, { nullable: true })
    @Column({ nullable: true })
    isReplyTo: number;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.posts)
    author: User;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    type: string;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    content: string;

    @Field(() => String, { nullable: false })
    @CreateDateColumn({ nullable: false })
    createdAt: Date;

    @Field(() => Boolean, { defaultValue: false })
    @Column({ default: false })
    isEdited: boolean;

    @Field(() => String, { nullable: false })
    @UpdateDateColumn({ nullable: false })
    updatedAt: Date;

    @Field(() => [MediaItem], { nullable: true, defaultValue: [] })
    @OneToMany(() => MediaItem, (mediaItem) => mediaItem.post, { nullable: true, eager: true })
    media: MediaItem[];
    
    @Field(() => [String], { nullable: true, defaultValue: [] })
    @Column({ type: "text", array: true, nullable: true, default: [] })
    mentions: string[];

    @Field(() => [String], { nullable: true, defaultValue: [] })
    @Column({ type: "text", array: true, nullable: true, default: [] })
    hashtags: string[];

    @Field(() => Int, { defaultValue: 0 })
    @Column("int", { default: 0 })
    views: number;

    @Field(() => String, { nullable: false, defaultValue: "undefined" })
    @Column({ nullable: false, default: "undefined" })
    lang: string;

    @Field(() => [Int], { nullable: false, defaultValue: [] })
    @Column({ type: "int", array: true, nullable: false, default: [] })
    topicsIds: number[];
}

@ObjectType()
@Entity("likes")
export class Like extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Int, { nullable: false })
    @Column({ nullable: false })
    userId: number;

    @Field(() => String, { nullable: false })
    @Column({ type: "uuid", nullable: false })
    likedPostId: string;

    @Field(() => Boolean, { nullable: false })
    @Column({ nullable: false })
    postOpened: boolean;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    origin: string;

    @Field(() => String, { nullable: false })
    @CreateDateColumn({ nullable: false })
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

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    type: string;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    src: string;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    alt: string;

    @Field(() => String, { nullable: false })
    @CreateDateColumn({ nullable: false })
    createdAt: Date;
}

@ObjectType()
@Entity("view-logs")
export class ViewLog extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String, { nullable: false })
    @Column({ type: "uuid", unique: false, nullable: false })
    postId: string;

    @Field(() => String, { nullable: false })
    @Column({ type: "uuid", unique: false, nullable: false })
    uniqueIdentifier: string;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    userId: number;

    @Field(() => Boolean)
    @Column()
    isAuth: boolean;

    @Field(() => Boolean)
    @Column()
    postOpened: boolean;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    origin: string;

    @Field(() => String, { nullable: false })
    @CreateDateColumn({ nullable: false })
    createdAt: Date;
}
