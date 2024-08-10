import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity("notifications")
export class Notification extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String, { nullable: false })
    @Column({ type: "uuid", unique: true, nullable: false })
    notificationId: string;

    @Field(() => Int, { nullable: false })
    @Column({ nullable: false })
    creatorId: number;

    @Field(() => Int, { nullable: false })
    @Column({ nullable: false })
    recipientId: number;

    @Field(() => Int, { nullable: false })
    @Column({ nullable: false })
    resourceId: number;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    type: string;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    content: string;

    @Field(() => Boolean, { nullable: false })
    @Column({ nullable: false })
    viewed: boolean;

    @Field(() => String, { nullable: false })
    @CreateDateColumn({ nullable: false })
    createdAt: Date;
}

@ObjectType()
@Entity("message-notifications")
export class MessageNotification extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String, { nullable: false })
    @Column({ type: "uuid", unique: true, nullable: false })
    notificationId: string;

    @Field(() => Int, { nullable: false })
    @Column({ nullable: false })
    creatorId: number;

    @Field(() => String, { nullable: false })
    @Column({ type: "uuid", unique: false, nullable: false })
    chatId: string;

    @Field(() => Int, { nullable: false })
    @Column({ nullable: false })
    itemId: number;

    @Field(() => Int, { nullable: false })
    @Column({ nullable: false })
    recipientId: number;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    itemType: string;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    content: string;

    @Field(() => Boolean, { nullable: false })
    @Column({ nullable: false })
    viewed: boolean;

    @Field(() => String, { nullable: false })
    @CreateDateColumn({ nullable: false })
    createdAt: Date;
}