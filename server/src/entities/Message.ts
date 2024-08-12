import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MessageStatus } from "../helpers/enums";

registerEnumType(MessageStatus, {
    name: "MessageStatus",
    description: "Possible message status values",
});

@ObjectType()
@Entity("chats")
export class Chat extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String, { nullable: false })
    @Column({ type: "uuid", unique: true, nullable: false })
    chatId: string;

    @Field(() => Number, { nullable: false })
    @Column({ nullable: false })
    creatorId: number;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    type: string;

    @Field(() => String, { nullable: true, defaultValue: "" })
    @Column({ nullable: true, default: "" })
    chatImage: string;

    @Field(() => String, { nullable: true, defaultValue: "" })
    @Column({ nullable: true, default: "" })
    chatTitle: string;

    @Field(() => String, { nullable: false })
    @CreateDateColumn({ nullable: false })
    createdAt: Date;

    @Field(() => String, { nullable: false })
    @UpdateDateColumn({ nullable: false })
    updatedAt: Date;

    @Field(() => Boolean, { defaultValue: false })
    @Column({ default: false })
    visible: boolean;

    @Field(() => [ChatUser], { nullable: false })
    @OneToMany(() => ChatUser, (user) => user.chat, { nullable: false, cascade: true })
    users: ChatUser[];

    @Field(() => [Message], { nullable: true, defaultValue: [] })
    @OneToMany(() => Message, (message) => message.chat, { nullable: true, cascade: true })
    messages: Message[];

    @Field(() => [Event], { nullable: true, defaultValue: [] })
    @OneToMany(() => Event, (event) => event.chat, { nullable: true, cascade: true })
    events: Event[];
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
export class ChatUser extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    role: string;

    @Field(() => Int, { nullable: false })
    @Column({ nullable: false })
    userId: number;

    @Field(() => Chat)
    @ManyToOne(() => Chat, (chat) => chat.users)
    chat: Chat;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    joinedChat: Date;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    lastExit: Date;

    @Field(() => Boolean, { defaultValue: false })
    @Column({ default: false })
    inside: boolean;

    @Field(() => [Int], { nullable: true, defaultValue: [] })
    @Column({ type: "int", array: true, nullable: true, default: [] })
    hiddenMessagesIds: number[];
}

@ObjectType()
@Entity("messages")
export class Message extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String, { nullable: false })
    @Column({ type: "uuid", unique: true, nullable: false })
    messageId: string;

    @Field(() => Number, { nullable: false })
    @Column({ nullable: false })
    authorId: number;

    @Field(() => Number, { nullable: true })
    @Column({ nullable: true })
    isReplyTo: number;

    @Field(() => Chat, { nullable: false })
    @ManyToOne(() => Chat, (chat) => chat.messages, { nullable: false })
    chat: Chat;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    type: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
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
export class MessageViewLog extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String, { nullable: false })
    @Column({ type: "uuid", unique: false, nullable: false })
    messageId: string;

    @Field(() => Number, { nullable: false })
    @Column({ nullable: false })
    userId: number;
    
    @Field(() => String, { nullable: false })
    @CreateDateColumn({ nullable: false })
    createdAt: Date;
}

@ObjectType()
@Entity("events")
export class Event extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Number, { nullable: false })
    @Column({ nullable: false })
    userId: number;

    @Field(() => Number, { nullable: true })
    @Column({ nullable: true })
    resourceId: number;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    eventType: string;
    
    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    eventMessage: string;

    @Field(() => Chat, { nullable: false })
    @ManyToOne(() => Chat, (chat) => chat.events, { nullable: false })
    chat: Chat;
    
    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    createdAt: Date;
}
