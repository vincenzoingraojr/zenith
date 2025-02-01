import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity("notifications")
export class Notification extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column({ type: "uuid", unique: true })
    notificationId: string;

    @Field(() => Int)
    @Column()
    creatorId: number;

    @Field(() => Int)
    @Column()
    recipientId: number;

    @Field(() => Int)
    @Column()
    resourceId: number;

    @Field(() => String)
    @Column()
    resourceType: string;

    @Field(() => String)
    @Column()
    notificationType: string;

    @Field(() => String)
    @Column()
    content: string;

    @Field(() => Boolean, { defaultValue: false })
    @Column({ default: false })
    viewed: boolean;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;
}

@ObjectType()
@Entity("message-notifications")
export class MessageNotification extends Notification {
    @Field(() => String)
    @Column({ type: "uuid" })
    chatId: string;
}