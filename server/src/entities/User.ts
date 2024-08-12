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
    UpdateDateColumn,
} from "typeorm";
import { Post, Article } from "./Post";

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
    name: string;

    @Field(() => String, { nullable: false })
    @Column({ unique: true, nullable: false })
    username: string;

    @Field(() => String, { nullable: false })
    @Column({ unique: true, nullable: false })
    email: string;

    @Field(() => String, { nullable: false, defaultValue: "user" })
    @Column({ nullable: false, default: "user" })
    type: string;

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

    @Field(() => [Session], { nullable: true, defaultValue: [] })
    @OneToMany(() => Session, (session) => session.user, { nullable: true, cascade: true })
    sessions: Session[];

    @Field(() => [Follow], { nullable: true, defaultValue: [] })
    @OneToMany(() => Follow, (follow) => follow.user, { nullable: true, cascade: true })
    followers: Follow[];

    @Field(() => [Follow], { nullable: true, defaultValue: [] })
    @OneToMany(() => Follow, (follow) => follow.follower, { nullable: true, cascade: true })
    following: Follow[];

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

    @Field(() => String, { nullable: false })
    @CreateDateColumn({ nullable: false })
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}

@ObjectType()
@Entity("follow-actions")
export class Follow extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => User, { nullable: false })
    @ManyToOne(() => User, (user) => user.following, { nullable: false })
    follower: User;

    @Field(() => User, { nullable: false })
    @ManyToOne(() => User, (user) => user.followers, { nullable: false })
    user: User;

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

@ObjectType()
@Entity("user-verifications")
export class UserVerification extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Int, { nullable: false })
    @Column({ unique: true, nullable: false })
    userId: number;

    @Field(() => String, { nullable: false })
    @CreateDateColumn({ nullable: false })
    createdAt: Date;

    @Field(() => String, { nullable: false })
    @UpdateDateColumn({ nullable: false })
    updatedAt: Date;

    @Field(() => Boolean)
    @Column()
    verified: boolean;

    @Field(() => String, { nullable: true, defaultValue: null })
    @Column({ nullable: true, default: null })
    verifiedSince: Date;

    @Field(() => String, { nullable: true, defaultValue: null })
    @Column({ nullable: true, default: null })
    idUrl: string;

    @Field(() => [String], { nullable: true, defaultValue: [] })
    @Column({ type: "text", array: true, nullable: true, default: [] })
    documents: string[];

    @Field(() => String, { nullable: true, defaultValue: null })
    @Column({ nullable: true, default: null })
    outcome: string;
}