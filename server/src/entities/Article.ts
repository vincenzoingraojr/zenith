import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity("articles")
export class Article extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String, { nullable: false })
    @Column({ type: "uuid", unique: true, nullable: false })
    articleId: string;

    @Field(() => Number, { nullable: false })
    @Column({ nullable: false })
    authorId: number;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.articles)
    author: User;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    title: string;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    description: string;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    content: string;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    cover: string;

    @Field(() => String, { nullable: false })
    @CreateDateColumn({ nullable: false })
    createdAt: Date;

    @Field(() => Boolean, { defaultValue: false })
    @Column({ default: false })
    isEdited: boolean;

    @Field(() => String, { nullable: false })
    @UpdateDateColumn({ nullable: false })
    updatedAt: Date;

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