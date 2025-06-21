import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import { BaseItem } from "./BaseItem";

@ObjectType()
@Entity("notifications")
export class Notification extends BaseItem {
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
}

@ObjectType()
@Entity("message-notifications")
export class MessageNotification extends Notification {
    @Field(() => String)
    @Column({ type: "uuid" })
    chatId: string;
}
