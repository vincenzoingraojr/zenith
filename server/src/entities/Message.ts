import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { MessageStatus } from "../helpers/enums";
import { BaseItem } from "./BaseItem";

registerEnumType(MessageStatus, {
    name: "MessageStatus",
    description: "Possible message status values",
});

@ObjectType()
@Entity("chats")
export class Chat extends BaseItem {
    @Field(() => String)
    @Column({ type: "uuid", unique: true })
    chatId: string;

    @Field(() => Int)
    @Column()
    creatorId: number;

    @Field(() => String)
    @Column()
    type: string;

    @Field(() => String, { nullable: true, defaultValue: null})
    @Column({ nullable: true, default: null })
    chatImage: string;

    @Field(() => String, { nullable: true, defaultValue: null })
    @Column({ nullable: true, default: null })
    chatTitle: string;

    @Field(() => [ChatUser])
    @OneToMany(() => ChatUser, (user) => user.chat, { cascade: true })
    users: ChatUser[];

    @Field(() => [Message], { nullable: true, defaultValue: [] })
    @OneToMany(() => Message, (message) => message.chat, { nullable: true, cascade: true })
    messages: Message[];

    @Field(() => [Event], { nullable: true, defaultValue: [] })
    @OneToMany(() => Event, (event) => event.chat, { nullable: true, cascade: true })
    events: Message[];
}

@ObjectType()
export class MessageMedia {
    @Field(() => String, { nullable: true, defaultValue: null })
    @Column({ nullable: true, default: null })
    type: string;

    @Field(() => String, { nullable: true, defaultValue: null })
    @Column({ nullable: true, default: null })
    src: string;
}

@ObjectType()
export class MessageItem {
    @Field(() => String, { nullable: true, defaultValue: null })
    @Column({ nullable: true, default: null })
    type: string;

    @Field(() => Int, { nullable: true, defaultValue: null })
    @Column({ nullable: true, default: null })
    id: number;
}

@ObjectType()
@Entity("chat-users")
export class ChatUser extends BaseItem {
    @Field(() => String)
    @Column()
    role: string;

    @Field(() => Int)
    @Column()
    userId: number;

    @Field(() => Chat)
    @ManyToOne(() => Chat, (chat) => chat.users)
    chat: Chat;

    @Field(() => String)
    @Column()
    joinedChat: Date;

    @Field(() => String)
    @Column()
    lastExit: Date;

    @Field(() => Boolean)
    @Column({ default: false })
    inside: boolean;

    @Field(() => [Int], { nullable: true, defaultValue: [] })
    @Column({ type: "int", array: true, nullable: true, default: [] })
    hiddenMessagesIds: number[];
}

@ObjectType()
export class ChatItem extends BaseItem {
    @Field(() => String)
    @Column({ type: "uuid", unique: true })
    itemId: string;

    @Field(() => Int)
    @Column()
    authorId: number;

    @Field(() => String)
    @Column()
    type: string;
}

@ObjectType()
@Entity("messages")
export class Message extends ChatItem {
    @Field(() => Chat)
    @ManyToOne(() => Chat, (chat) => chat.messages)
    chat: Chat;

    @Field(() => Int, { nullable: true, defaultValue: null })
    @Column({ nullable: true, default: null })
    isReplyTo: number;

    @Field(() => String, { nullable: true, defaultValue: null })
    @Column({ nullable: true, default: null })
    content: string;

    @Field(() => Boolean)
    @Column({ default: false })
    isEdited: boolean;

    @Field(() => MessageMedia)
    @Column(() => MessageMedia)
    media: MessageMedia;

    @Field(() => MessageItem)
    @Column(() => MessageItem)
    item: MessageItem;
    
    @Field(() => [String], { nullable: true, defaultValue: [] })
    @Column({ type: "text", array: true, nullable: true, default: [] })
    mentions: string[];

    @Field(() => [String], { nullable: true, defaultValue: [] })
    @Column({ type: "text", array: true, nullable: true, default: [] })
    hashtags: string[];

    @Field(() => MessageStatus)
    @Column({
        type: "enum",
        enum: MessageStatus,
        default: MessageStatus.SENT,
    })
    status: MessageStatus;
}

@ObjectType()
@Entity("message-view-logs")
export class MessageViewLog extends BaseItem {
    @Field(() => String)
    @Column({ type: "uuid", unique: false })
    messageId: string;

    @Field(() => Int)
    @Column()
    userId: number;
}

@ObjectType()
@Entity("events")
export class Event extends ChatItem {
    @Field(() => Chat)
    @ManyToOne(() => Chat, (chat) => chat.events)
    chat: Chat;

    @Field(() => Int, { nullable: true, defaultValue: null })
    @Column({ nullable: true, default: null })
    resourceId: number;
    
    @Field(() => String)
    @Column()
    eventMessage: string;
}

@ObjectType()
export class ChatItemWrapper {
    @Field(() => String)
    chatItemId: string;

    @Field(() => String)
    itemType: string;

    @Field(() => ChatItem)
    item: ChatItem;
}