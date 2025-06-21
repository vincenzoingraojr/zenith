import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    DeleteDateColumn,
} from "typeorm";
import { Article, Post } from "./Post";
import { BaseItem } from "./BaseItem";
import { USER_TYPES } from "../helpers/user/userTypes";
import { GraphQLJSONObject } from "graphql-scalars";
import { VerificationStatus } from "../helpers/enums";

registerEnumType(VerificationStatus, {
    name: "VerificationStatus",
    description: "Possible verification request status values",
});

@ObjectType()
export class Profile {
    @Field(() => String)
    @Column({ default: "" })
    profilePicture: string;

    @Field(() => String)
    @Column({ default: "" })
    profileBanner: string;

    @Field(() => String)
    @Column({ default: "" })
    bio: string;

    @Field(() => String)
    @Column({ default: "" })
    website: string;
}

@ObjectType()
export class Settings {
    @Field(() => String)
    @Column({ default: "everyone" })
    incomingMessages: string;

    @Field(() => Boolean, { defaultValue: false })
    @Column({ default: false })
    twoFactorAuth: boolean;
}

@ObjectType()
export class SearchSettings {
    @Field(() => Boolean)
    @Column({ default: true })
    hideSensitiveContent: boolean;

    @Field(() => Boolean)
    @Column({ default: true })
    hideBlockedAccounts: boolean;
}

@ObjectType()
export class BirthDate {
    @Field(() => String)
    @Column()
    date: Date;

    @Field(() => String)
    @Column({ default: "Public" })
    monthAndDayVisibility: string;

    @Field(() => String)
    @Column({ default: "Public" })
    yearVisibility: string;
}

@ObjectType()
export class SecretKey {
    @Column({ type: "varchar" })
    iv: string;

    @Column({ type: "varchar", unique: true })
    encryptedData: string;
}

@ObjectType()
export class Verification {
    @Field(() => VerificationStatus)
    @Column({
        type: "enum",
        enum: VerificationStatus,
        default: VerificationStatus.UNDER_REVIEW,
    })
    verified: VerificationStatus;

    @Field(() => String, { nullable: true, defaultValue: null })
    @Column({ nullable: true, default: null })
    verifiedSince: Date;

    @Column({ type: "jsonb", default: [] })
    documents: { type: string; url: string }[];

    @Column({ default: null, nullable: true })
    outcome: string;
}

@ObjectType()
export class IdentityVerification extends Verification {
    @Column({ default: "" })
    country: string;

    @Column({ default: "" })
    fullName: string;

    @Column({ default: "" })
    entityIdentifier: string;

    @Column({ default: null, nullable: true })
    birthOrCreationDate: Date;
}

@ObjectType()
@Entity("users")
export class User extends BaseItem {
    @Field(() => String)
    @Column()
    name: string;

    @Field(() => String)
    @Column({ unique: true })
    username: string;

    @Field(() => String)
    @Column({ unique: true })
    email: string;

    @Field(() => String)
    @Column({ default: USER_TYPES.USER })
    type: string;

    @Column()
    password: string;

    @Column(() => SecretKey)
    secretKey: SecretKey;

    @Field(() => String)
    @Column({ default: "Non-binary" })
    gender: string;

    @Field(() => BirthDate)
    @Column(() => BirthDate)
    birthDate: BirthDate;

    @Field(() => Boolean)
    @Column({ default: false })
    emailVerified: boolean;

    @Field(() => Profile)
    @Column(() => Profile)
    profile: Profile;

    @Field(() => [Session], { nullable: true, defaultValue: [] })
    @OneToMany(() => Session, (session) => session.user, {
        nullable: true,
        cascade: true,
    })
    sessions: Session[];

    @Field(() => [Follow], { nullable: true, defaultValue: [] })
    @OneToMany(() => Follow, (follow) => follow.user, {
        nullable: true,
        cascade: true,
    })
    followers: Follow[];

    @Field(() => [Follow], { nullable: true, defaultValue: [] })
    @OneToMany(() => Follow, (follow) => follow.follower, {
        nullable: true,
        cascade: true,
    })
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

    @Field(() => IdentityVerification)
    @Column(() => IdentityVerification)
    identity: IdentityVerification;

    @Field(() => Verification)
    @Column(() => Verification)
    verification: Verification;

    @Field(() => [GraphQLJSONObject], { nullable: true })
    @Column({ type: "jsonb", default: [] })
    topics: { id: number; weight: number }[];

    @Field(() => [Int])
    @Column({ type: "int", array: true, default: [] })
    hiddenPosts: number[];

    @DeleteDateColumn()
    deletedAt: Date;
}

@ObjectType()
@Entity("follow-actions")
export class Follow extends BaseItem {
    @Field(() => User)
    @ManyToOne(() => User, (user) => user.following)
    follower: User;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.followers)
    user: User;

    @Field(() => String)
    @Column()
    origin: string;
}

@ObjectType()
@Entity("block-actions")
export class Block extends BaseItem {
    @Field(() => Int)
    @Column()
    blockedId: number;

    @Field(() => Int)
    @Column()
    userId: number;

    @Field(() => String)
    @Column()
    origin: string;
}

@ObjectType()
@Entity("sessions")
export class Session extends BaseItem {
    @Field(() => User)
    @ManyToOne(() => User, (user) => user.sessions)
    user: User;

    @Field(() => String)
    @Column({ type: "uuid", unique: true })
    sessionId: string;

    @Field(() => String)
    @Column()
    clientOS: string;

    @Field(() => String)
    @Column()
    clientType: string;

    @Field(() => String)
    @Column()
    clientName: string;

    @Field(() => String)
    @Column()
    deviceLocation: string;

    @Field(() => String)
    @Column()
    country: string;
}

@ObjectType()
@Entity("user-device-tokens")
export class UserDeviceToken extends BaseItem {
    @Field(() => String)
    @Column()
    token: string;

    @Field(() => Int)
    @Column()
    userId: number;

    @Field(() => String)
    @Column({ type: "uuid", unique: true })
    sessionId: string;
}

@ObjectType()
@Entity("affiliations")
export class Affiliation extends BaseItem {
    @Field(() => String)
    @Column({ type: "uuid", unique: true })
    affiliationId: string;

    @Field(() => Int)
    @Column()
    organizationId: number;

    @Field(() => Int)
    @Column({ unique: true })
    userId: number;

    @Field(() => Boolean)
    @Column({ default: false })
    status: boolean;
}
