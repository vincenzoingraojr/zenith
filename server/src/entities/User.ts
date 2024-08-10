import { Field, Int, ObjectType } from "type-graphql";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    BaseEntity,
    ManyToOne,
    OneToMany,
    DeleteDateColumn,
} from "typeorm";
import { Post } from "./Post";
import { Article } from "./Article";

@ObjectType()
export class Profile {
    @Field(() => String, { defaultValue: "" })
    @Column({ default: "" })
    profilePicture: string;

    @Field(() => String, { defaultValue: "" })
    @Column({ default: "" })
    profileBanner: string;

    @Field(() => String, { defaultValue: "" })
    @Column({ default: "" })
    bio: string;

    @Field(() => String, { defaultValue: "" })
    @Column({ default: "" })
    website: string;
}

@ObjectType()
export class Settings {
    @Field(() => String, { defaultValue: "everyone" })
    @Column({ default: "everyone" })
    incomingMessages: string;

    @Field(() => Boolean, { defaultValue: false })
    @Column({ default: false })
    twoFactorAuth: boolean;
}

@ObjectType()
export class SearchSettings {
    @Field(() => Boolean, { defaultValue: true })
    @Column({ default: true })
    hideSensitiveContent: boolean;

    @Field(() => Boolean, { defaultValue: true })
    @Column({ default: true })
    hideBlockedAccounts: boolean;
}

@ObjectType()
export class BirthDate {
    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    date: Date;

    @Field(() => String, { defaultValue: "public" })
    @Column({ default: "public" })
    monthAndDayVisibility: string;

    @Field(() => String, { defaultValue: "public" })
    @Column({ default: "public" })
    yearVisibility: string;
}

@ObjectType()
export class SecretKey {
    @Column({ type: "varchar", nullable: false })
    iv: string;

    @Column({ type: "varchar", unique: true, nullable: false })
    encryptedData: string;
}

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    firstName: string;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    lastName: string;

    @Field(() => String, { nullable: false })
    @Column({ unique: true, nullable: false })
    username: string;

    @Field(() => String, { nullable: false })
    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column(() => SecretKey)
    secretKey: SecretKey;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    gender: string;

    @Field(() => BirthDate, { nullable: true })
    @Column(() => BirthDate)
    birthDate: BirthDate;

    @Field(() => Boolean)
    @Column()
    emailVerified: boolean;

    @Field(() => Profile)
    @Column(() => Profile)
    profile: Profile;

    @Column("int", { default: 0 })
    tokenVersion: number;

    @Field(() => [Session], { nullable: true, defaultValue: [] })
    @OneToMany(() => Session, (session) => session.user, { nullable: true, cascade: true })
    sessions: Session[];

    @Field(() => [Post], { nullable: true, defaultValue: [] })
    @OneToMany(() => Post, (post) => post.author, { nullable: true })
    posts: Post[];

    @Field(() => [Article], { nullable: true, defaultValue: [] })
    @OneToMany(() => Article, (article) => article.author, { nullable: true })
    articles: Article[];

    @Field(() => Settings)
    @Column(() => Settings)
    userSettings: Settings;

    @Field(() => SearchSettings)
    @Column(() => SearchSettings)
    searchSettings: SearchSettings;

    @Field(() => [Int], { nullable: false, defaultValue: [] })
    @Column({ type: "int", array: true, nullable: false, default: [] })
    topicsIds: number[];

    @DeleteDateColumn()
    deletedAt: Date;
}

@ObjectType()
@Entity("follow-actions")
export class Follow extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Int, { nullable: false })
    @Column({ nullable: false })
    followerId: number;

    @Field(() => Int, { nullable: false })
    @Column({ nullable: false })
    userId: number;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    origin: string;

    @Field(() => String, { nullable: false })
    @CreateDateColumn({ nullable: false })
    createdAt: Date;
}

@ObjectType()
@Entity("block-actions")
export class Block extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Int, { nullable: false })
    @Column({ nullable: false })
    blockedId: number;

    @Field(() => Int, { nullable: false })
    @Column({ nullable: false })
    userId: number;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    origin: string;

    @Field(() => String, { nullable: false })
    @CreateDateColumn({ nullable: false })
    createdAt: Date;
}

@ObjectType()
@Entity("sessions")
export class Session extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => User, { nullable: false })
    @ManyToOne(() => User, (user) => user.sessions, { nullable: false })
    user: User;

    @Field(() => String, { nullable: false })
    @Column({ type: "uuid", unique: true, nullable: false })
    sessionId: string;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    clientOS: string;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    clientType: string;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    clientName: string;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    deviceLocation: string;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    country: string;

    @Field(() => String, { nullable: false })
    @CreateDateColumn({ nullable: false })
    creationDate: Date;
}

@ObjectType()
@Entity("user-device-tokens")
export class UserDeviceToken extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    token: string;

    @Field(() => Int, { nullable: false })
    @Column({ nullable: false })
    userId: number;

    @Field(() => String, { nullable: false })
    @Column({ type: "uuid", unique: true, nullable: false })
    sessionId: string;

    @Field(() => String, { nullable: false })
    @CreateDateColumn({ nullable: false })
    createdAt: Date;
}