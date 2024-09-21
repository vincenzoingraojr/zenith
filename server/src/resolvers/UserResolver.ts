import { Block, Follow, Session, User, UserDeviceToken } from "../entities/User";
import {
    Arg,
    Ctx,
    Field,
    Int,
    Mutation,
    ObjectType,
    Query,
    Resolver,
    UseMiddleware,
} from "type-graphql";
import { Not, Repository } from "typeorm";
import argon2 from "argon2";
import { AuthContext } from "../types";
import { sendRefreshToken } from "../auth/sendRefreshToken";
import { createAccessToken, createRefreshToken } from "../auth/auth";
import { verify } from "jsonwebtoken";
import { sendVerificationEmail } from "../helpers/sendVerificationEmail";
import ejs from "ejs";
import path from "path";
import { FieldError } from "./common";
import { isAuth } from "../middleware/isAuth";
import { processBirthDate, processDays } from "../helpers/dates";
import { v4 as uuidv4 } from "uuid";
import { Notification } from "../entities/Notification";
import { totp } from "otplib";
import { decrypt, encrypt } from "../helpers/crypto";
import appDataSource from "../dataSource";
import { SendEmailCommand, SendEmailCommandInput } from "@aws-sdk/client-ses";
import { pubSub } from "../helpers/createPubSub";
import { sendPushNotifications } from "../helpers/notifications";
import { Notification as FirebaseNotification } from "firebase-admin/messaging";
import { Topic } from "../entities/Topic";
import mailHelper from "../helpers/mailHelper";
import { Article, MediaItem, Post } from "../entities/Post";
import axios from "axios";
import { getPresignedUrlForDeleteCommand } from "../helpers/getPresignedUrls";
import { logger } from "../helpers/logger";

@ObjectType()
export class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User | null;

    @Field(() => String, { nullable: true })
    accessToken?: string;

    @Field(() => String, { nullable: true })
    status?: string;

    @Field(() => Boolean)
    ok: boolean;
}

@Resolver(User)
export class UserResolver {
    private readonly userRepository: Repository<User>;
    private readonly postRepository: Repository<Post>;
    private readonly sessionRepository: Repository<Session>;
    private readonly notificationRepository: Repository<Notification>;
    private readonly followRepository: Repository<Follow>;
    private readonly blockRepository: Repository<Block>;
    private readonly userDeviceTokenRepository: Repository<UserDeviceToken>;
    private readonly topicRepository: Repository<Topic>;
    private readonly articleRepository: Repository<Article>;
    private readonly mediaItemRepository: Repository<MediaItem>;

    constructor() {
        this.userRepository = appDataSource.getRepository(User);
        this.postRepository = appDataSource.getRepository(Post);
        this.sessionRepository = appDataSource.getRepository(Session);
        this.notificationRepository = appDataSource.getRepository(Notification);
        this.followRepository = appDataSource.getRepository(Follow);
        this.blockRepository = appDataSource.getRepository(Block);
        this.userDeviceTokenRepository = appDataSource.getRepository(UserDeviceToken);
        this.topicRepository = appDataSource.getRepository(Topic);
        this.articleRepository = appDataSource.getRepository(Article);
        this.mediaItemRepository = appDataSource.getRepository(MediaItem);
    }

    @Query(() => User, { nullable: true })
    async findUser(@Arg("username", { nullable: true }) username: string): Promise<User | null> {
        if (!username) {
            logger.warn("Username not provided.");

            return null;
        }
    
        try {
            const user = await this.userRepository.findOne({ where: { username } });
            
            if (!user) {
                logger.warn(`User with username "${username}" not found.`);

                return null;
            }
    
            return user;
        } catch (error) {
            logger.error(error);

            return null;
        }    
    }

    @Query(() => User, { nullable: true })
    async findUserById(@Arg("id", () => Int, { nullable: true }) id: number, @Arg("deleted", { nullable: true }) deleted?: boolean): Promise<User | null> {
        if (!id) {
            logger.warn("Id not provided.");

            return null;
        }

        try {
            const user = await this.userRepository.findOne({ where: { id }, withDeleted: deleted || false });

            if (!user) {
                logger.warn(`User with id "${id}" not found.`);

                return null;
            }

            return user;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Query(() => User, { nullable: true })
    me(@Ctx() context: AuthContext) {
        const authorization = context.req.headers["authorization"];

        if (!authorization) {
            logger.warn("Context not provided.");

            return null;
        }

        try {
            const token = authorization.split(" ")[1];
            const payload: any = verify(
                token,
                process.env.ACCESS_TOKEN_SECRET!
            );

            if (!payload) {
                logger.warn("Couldn't retrieve the payload from the authorization token.");

                return null;
            }
            
            return this.userRepository.findOne({
                where: { id: payload.id },
            });
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Query(() => Session, { nullable: true })
    @UseMiddleware(isAuth)
    async currentSession(@Ctx() { payload }: AuthContext): Promise<Session | null> {
        if (!payload) {
            logger.warn("Payload not provided.");

            return null;
        }

        try {
            const currentSession = await this.sessionRepository.findOne({
                where: { 
                    sessionId: payload.sessionId,
                    user: {
                        id: payload.id,
                    },
                },
            });

            if (!currentSession) {
                logger.warn(`Current session for user with id "${payload.id}" not found.`);

                return null;
            }

            return currentSession;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Query(() => [Session], { nullable: true })
    @UseMiddleware(isAuth)
    async otherSessions(@Ctx() { payload }: AuthContext): Promise<Session[] | null> {
        if (!payload) {
            logger.warn("Payload not provided.");

            return null;
        }

        try {
            const sessions = await this.sessionRepository.find({
                where: { 
                    user: {
                        id: payload.id,
                    },
                    sessionId: Not(payload.sessionId),
                },
                order: {
                    creationDate: "DESC",
                },
            });

            return sessions;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Query(() => Session, { nullable: true })
    @UseMiddleware(isAuth)
    async findSession(@Arg("sessionId", { nullable: true }) sessionId: string, @Ctx() { payload }: AuthContext): Promise<Session | null> {
        if (!sessionId) {
            logger.warn("Session id not provided.");

            return null;
        }

        if (!payload) {
            logger.warn("Payload not provided.");

            return null;
        }

        try {
            const session = await this.sessionRepository.findOne({ where: { sessionId, user: { id: payload.id } }, relations: ["user"] });

            if (!session) {
                logger.warn(`Session for user with id "${payload.id}" not found.`);

                return null;
            }

            return session;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Query(() => [Topic], { nullable: true })
    async topics(): Promise<Topic[] | null> {
        try {
            const topics = await this.topicRepository.find();

            return topics;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Mutation(() => UserResponse, { nullable: true })
    async findUserBeforeLogIn(
        @Arg("input") input: string,
    ): Promise<UserResponse> {
        let status = "";
        let ok = false;
        let user: User | null = null;

        try {
            user = await this.userRepository.findOne({
                where: input.includes("@") ? { email: input } : { username: input },
            });

            if (!user) {
                status = "Sorry, but we can't find your account.";
            } else {
                ok = true;
            }
        } catch (error) {
            logger.error(error);
        }

        return {
            user,
            status,
            ok,
        };
    }

    // Si parte da qui (verso il basso)

    @Mutation(() => UserResponse, { nullable: true })
    async login(
        @Arg("input") input: string,
        @Arg("password") password: string,
        @Arg("clientOS") clientOS: string,
        @Arg("clientType") clientType: string,
        @Arg("clientName") clientName: string,
        @Arg("deviceLocation") deviceLocation: string,
        @Arg("country") country: string,
        @Ctx() { res }: AuthContext
    ): Promise<UserResponse> {
        let errors = [];
        let user: User | null = null;
        let accessToken;
        let status = "";
        let ok = false;

        try {
            user = await this.userRepository.findOne({
                where: input.includes("@") ? { email: input } : { username: input },
                withDeleted: true,
            });

            if (!user || (user && user.deletedAt !== null && processDays(user.deletedAt) > 90)) {
                errors.push({
                    field: "input",
                    message: "Sorry, but we can't find your account",
                });
    
                if (user && user.deletedAt !== null && processDays(user.deletedAt) > 90) {
                    await this.userRepository.delete({ id: user.id }).then(async () => {
                        if (user) {
                            const existingProfilePictureKey =
                                user.profile.profilePicture.replace(
                                    `https://img.zncdn.net/`, ""
                                );
    
                            const profilePictureUrl = await getPresignedUrlForDeleteCommand(existingProfilePictureKey, "image");
    
                            await axios.delete(profilePictureUrl).then(() => {
                                console.log("Profile picture successfully deleted.");
                            })
                            .catch((error) => {
                                console.error(`An error occurred while deleting the profile picture. Error code: ${error.code}.`);
                            });
    
                            const existingProfileBannerKey =
                                user.profile.profileBanner.replace(
                                    `https://img.zncdn.net/`, ""
                                );
    
                            const profileBannerUrl = await getPresignedUrlForDeleteCommand(existingProfileBannerKey, "image");
    
                            await axios.delete(profileBannerUrl).then(() => {
                                console.log("Profile banner successfully deleted.");
                            })
                            .catch((error) => {
                                console.error(`An error occurred while deleting the profile banner. Error code: ${error.code}.`);
                            });
                        }
                    });
    
                    await this.postRepository.delete({ authorId: user.id }).then(async () => {
                        if (user) {
                            const items = await this.mediaItemRepository.find({
                                order: {
                                    createdAt: "ASC",
                                },
                                where: {
                                    post: {
                                        authorId: user.id,
                                    },
                                },
                                relations: ["post"],
                            });
        
                            for (const item of items) {
                                const existingKey =
                                    item.src.replace(
                                        `https://${item.type.includes("image") ? "img" : "vid"}.zncdn.net/`, ""
                                    );
        
                                const url = await getPresignedUrlForDeleteCommand(existingKey, item.type);
        
                                await axios.delete(url).then(() => {
                                    console.log("Media item successfully deleted.");
                                })
                                .catch((error) => {
                                    console.error(`An error occurred while deleting the media item. Error code: ${error.code}.`);
                                });
        
                                await this.mediaItemRepository.delete({ id: item.id });
                            }
                        }
                    });
    
                    await this.articleRepository.delete({ authorId: user.id });
                }
            } else if (user && user.deletedAt !== null && processDays(user.deletedAt) <= 90) {
                status = "This account has been deactivated.";
            } else {
                const valid = await argon2.verify(user.password, password);
    
                if (!valid) {
                    errors.push({
                        field: "password",
                        message: "Incorrect password",
                    });
                } else {
                    if (user.emailVerified) {
                        if (!user.userSettings.twoFactorAuth) {
                            let session = await this.sessionRepository.create({
                                user,
                                sessionId: uuidv4(),
                                clientOS,
                                clientType,
                                clientName,
                                deviceLocation,
                                country,
                            }).save();
        
                            sendRefreshToken(res, createRefreshToken(user, session));
                            accessToken = createAccessToken(user, session);
        
                            status = "You are now logged in.";
    
                            ok = true;
                        } else {
                            const decryptedSecretKey = decrypt(user.secretKey);
                            totp.options = { window: 1, step: 180 };
                            const OTP = totp.generate(decryptedSecretKey);
                            const email = user.email;
                            const username = user.username;
    
                            ejs.renderFile(
                                path.join(__dirname, "../helpers/templates/OTPEmail.ejs"),
                                { otp: OTP, username },
                                 (error, data) => {
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        const params: SendEmailCommandInput = {
                                            Destination: {
                                                ToAddresses: [email],
                                            },
                                            Message: {
                                                Body: {
                                                    Html: {
                                                        Data: data,
                                                    },
                                                },
                                                Subject: {
                                                    Data: "OTP for logging in to your Zenith account",
                                                },
                                            },
                                            Source: "noreply@zenith.to",
                                        };
                        
                                        const otpSESCommand = new SendEmailCommand(params);
    
                                        mailHelper.send(otpSESCommand)
                                            .then(() => {
                                                console.log("Email sent.");
                                            })
                                            .catch((error) => {
                                                console.error(error);
                                            });
                                    }
                                }
                            );
                        }
                    } else {
                        status =
                            "Your email address is not verified. We just sent you an email containing the instructions for verification.";
                        const verifyToken = createAccessToken(user);
                        sendVerificationEmail(user.email, verifyToken);
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }

        return {
            user,
            errors,
            accessToken,
            status,
            ok,
        };
    }

    @Mutation(() => UserResponse, { nullable: true })
    async signup(
        @Arg("email") email: string,
        @Arg("username") username: string,
        @Arg("name") name: string,
        @Arg("password") password: string,
        @Arg("gender") gender: string,
        @Arg("birthDate") birthDate: Date
    ): Promise<UserResponse> {
        let errors = [];
        let ok = false;

        if (!email.includes("@") || email === "" || email === null) {
            errors.push({
                field: "email",
                message: "Invalid email",
            });
        }
        if (username.includes("@")) {
            errors.push({
                field: "username",
                message: "The username field cannot contain @",
            });
        }
        if (username.length <= 2) {
            errors.push({
                field: "username",
                message: "The username lenght must be greater than 2",
            });
        }
        if (password.length <= 2) {
            errors.push({
                field: "password",
                message: "The password lenght must be greater than 2",
            });
        }
        if (name === "" || name === null) {
            errors.push({
                field: "name",
                message: "The name field cannot be empty",
            });
        }
        if (gender === "Gender" || gender === "") {
            errors.push({
                field: "gender",
                message: "The gender field cannot take this value",
            });
        }

        let age = processBirthDate(birthDate);

        if (age < 13) {
            errors.push({
                field: "birthDate",
                message: "Users under the age of 13 cannot sign up to the platform",
            });
        }

        let status;
        const hashedPassword = await argon2.hash(password);
        const encriptedSecretKey = encrypt(uuidv4());

        const existingUser = await this.userRepository.findOne({
            where: {
                email,
                username,
            },
            withDeleted: true,
        });

        if (existingUser && existingUser.deletedAt !== null) {
            if (processDays(existingUser.deletedAt) <= 90) {
                status = "This account has been deactivated.";
            } else {
                await this.userRepository.delete({ id: existingUser.id }).then(async () => {
                    const existingProfilePictureKey =
                        existingUser.profile.profilePicture.replace(
                            `https://img.zncdn.net/`, ""
                        );

                    const profilePictureUrl = await getPresignedUrlForDeleteCommand(existingProfilePictureKey, "image");

                    await axios.delete(profilePictureUrl).then(() => {
                        console.log("Profile picture successfully deleted.");
                    })
                    .catch((error) => {
                        console.error(`An error occurred while deleting the profile picture. Error code: ${error.code}.`);
                    });

                    const existingProfileBannerKey =
                        existingUser.profile.profileBanner.replace(
                            `https://img.zncdn.net/`, ""
                        );

                    const profileBannerUrl = await getPresignedUrlForDeleteCommand(existingProfileBannerKey, "image");

                    await axios.delete(profileBannerUrl).then(() => {
                        console.log("Profile banner successfully deleted.");
                    })
                    .catch((error) => {
                        console.error(`An error occurred while deleting the profile banner. Error code: ${error.code}.`);
                    });
                });

                await this.postRepository.delete({ authorId: existingUser.id }).then(async () => {
                    const items = await this.mediaItemRepository.find({
                        order: {
                            createdAt: "ASC",
                        },
                        where: {
                            post: {
                                authorId: existingUser.id,
                            },
                        },
                        relations: ["post"],
                    });

                    for (const item of items) {
                        const existingKey =
                            item.src.replace(
                                `https://${item.type.includes("image") ? "img" : "vid"}.zncdn.net/`, ""
                            );

                        const url = await getPresignedUrlForDeleteCommand(existingKey, item.type);

                        await axios.delete(url).then(() => {
                            console.log("Media item successfully deleted.");
                        })
                        .catch((error) => {
                            console.error(`An error occurred while deleting the media item. Error code: ${error.code}.`);
                        });

                        await this.mediaItemRepository.delete({ id: item.id });
                    }
                });

                await this.articleRepository.delete({ authorId: existingUser.id });
            }
        }

        if (errors.length === 0) {
            try {
                const user = await this.userRepository.create({
                    username,
                    email,
                    password: hashedPassword,
                    name,
                    gender,
                    birthDate: {
                        date: birthDate,
                        monthAndDayVisibility: "public",
                        yearVisibility: "public",
                    },
                    secretKey: encriptedSecretKey,
                    emailVerified: false,
                }).save();

                const token = createAccessToken(user);
                sendVerificationEmail(email, token);
                status =
                    "Check your inbox, we just sent you an email with the instructions to verify your account.";

                ok = true;
            } catch (error) {
                console.log(error);

                if (error.detail.includes("username") && error.code === "23505") {
                    errors.push({
                        field: "username",
                        message: "Username already taken",
                    });
                }
                if (error.detail.includes("email") && error.code === "23505") {
                    errors.push({
                        field: "email",
                        message: "A user using this email already exists",
                    });
                }
            }
        }

        return {
            errors,
            status,
            ok,
        };
    }

    @Mutation(() => UserResponse, { nullable: true })
    async reactivateAccount(
        @Arg("input") input: string,
        @Arg("password") password: string
    ): Promise<UserResponse> {
        let errors = [];
        let status = "";
        let ok = false;

        const user = await this.userRepository.findOne({
            where: input.includes("@") ? { email: input } : { username: input },
            withDeleted: true,
        });

        if (user && user.deletedAt !== null && processDays(user.deletedAt) <= 90) {
            const valid = await argon2.verify(user.password, password);

            if (!valid) {
                errors.push({
                    field: "password",
                    message: "Incorrect password",
                });
            } else {
                try {
                    await this.userRepository.restore({ id: user.id });

                    status = "Your account has been restored. Now you can log in.";
                    ok = true;
                } catch (error) {
                    console.error(error);

                    status = "An error has occurred while trying to restore your account. Please try again later.";
                }
            }
        } else {
            status = "Can't find the user.";
        }

        return {
            errors,
            status,
            ok,
        }
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async verifyOTP(
        @Arg("otp") otp: string,
        @Arg("input", { nullable: true }) input: string,
        @Arg("password", { nullable: true }) password: string,
        @Arg("isLogin") isLogin: boolean,
        @Arg("clientOS", { nullable: true }) clientOS: string,
        @Arg("clientType", { nullable: true }) clientType: string,
        @Arg("clientName", { nullable: true }) clientName: string,
        @Arg("deviceLocation", { nullable: true }) deviceLocation: string,
        @Arg("country", { nullable: true }) country: string,
        @Ctx() { res, payload }: AuthContext
    ): Promise<UserResponse> {
        let accessToken;
        let status;
        let ok = false;

        if (!payload) {
            status = "You're not authenticated.";
        }

        let me;

        if (payload) {
            me = await this.userRepository.findOne({ where: { id: payload.id } });
        } else if (input.includes("@")) {
            me = await this.userRepository.findOne({
                where: { email: input },
            });
        } else {
            me = await this.userRepository.findOne({
                where: { username: input },
            });
        }

        if (me) {
            const decryptedSecretKey = decrypt(me.secretKey);
            const valid = await argon2.verify(me.password, password);
            
            try {
                if ((!me.userSettings.twoFactorAuth && payload) || (me.userSettings.twoFactorAuth && valid && isLogin)) {
                    const isValid = totp.check(otp, decryptedSecretKey);

                    if (isValid) {
                        if (isLogin) {
                            let session = await this.sessionRepository.create({
                                user: me,
                                sessionId: uuidv4(),
                                clientOS,
                                clientType,
                                clientName,
                                deviceLocation,
                                country,
                            }).save();
        
                            sendRefreshToken(res, createRefreshToken(me, session));
                            accessToken = createAccessToken(me, session);
        
                            status = "You are now logged in.";

                            ok = true;
                        } else if (payload) {
                            me.userSettings.twoFactorAuth = true;
                            await me.save();

                            status = "The two-factor authentication is now enabled.";

                            ok = true;
                        } else {
                            status = "An error has occurred. Please request a new OTP.";
                        }
                    } else {
                        status = "This OTP is invalid. Please request a new OTP.";
                    }
                }
            } catch (error) {
                console.log(error);
                status = "An error has occurred during the OTP verification. Please request a new OTP.";
            }
        } else {
            status = "Sorry, we couldn't find your account.";
        }

        return {
            status,
            accessToken,
            user: me,
            ok,
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async resendOTP(
        @Arg("input", { nullable: true }) input: string,
        @Arg("password", { nullable: true }) password: string,
        @Ctx() { payload }: AuthContext,
    ) {
        let me;

        if (payload) {
            me = await this.userRepository.findOne({ where: { id: payload.id } });
        } else if (input.includes("@")) {
            me = await this.userRepository.findOne({
                where: { email: input },
            });
        } else {
            me = await this.userRepository.findOne({
                where: { username: input },
            });
        }

        if (me) {
            const valid = await argon2.verify(me.password, password);

            if ((!me.userSettings.twoFactorAuth && payload) || (me.userSettings.twoFactorAuth && valid)) {
                const decryptedSecretKey = decrypt(me.secretKey);
                totp.options = { window: 1, step: 180 };
                const OTP = totp.generate(decryptedSecretKey);
                const email = me.email;
                const username = me.username;

                ejs.renderFile(
                    path.join(__dirname, "../helpers/templates/ResendOTPEmail.ejs"),
                    { otp: OTP, username }, (error, data) => {
                        if (error) {
                            console.log(error);
                        } else {
                            const params: SendEmailCommandInput = {
                                Destination: {
                                    ToAddresses: [email],
                                },
                                Message: {
                                    Body: {
                                        Html: {
                                            Data: data,
                                        },
                                    },
                                    Subject: {
                                        Data: "OTP for logging in to your Zenith account",
                                    },
                                },
                                Source: "noreply@zenith.to",
                            };
            
                            const otpSESCommand = new SendEmailCommand(params);

                            mailHelper.send(otpSESCommand)
                                .then(() => {
                                    console.log("Email sent.");
                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                        }
                    }
                );

                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async logout(@Ctx() { res, payload }: AuthContext) {
        if (!payload) {
            return false;
        }

        const existingToken = await this.findUserDeviceTokenBySessionId(payload.sessionId, payload.id);

        if (existingToken) {
            await this.deleteDeviceToken(existingToken.id, { payload } as AuthContext);
        }

        await this.sessionRepository.delete({ sessionId: payload.sessionId }).catch((error) => {
            console.error(error);
            return false;
        });

        sendRefreshToken(res, "");
        return true;
    }

    @Mutation(() => UserResponse)
    async verifyEmailAddress(
        @Arg("token") token: string
    ): Promise<UserResponse> {
        let status = "";
        let ok = false;

        try {
            const payload: any = verify(
                token,
                process.env.ACCESS_TOKEN_SECRET!
            );
            await this.userRepository.update(
                {
                    id: payload.id,
                },
                {
                    emailVerified: true,
                }
            );
            status = "Your email address is now verified.";

            ok = true;
        } catch (error) {
            console.error(error);
            status =
                "An error has occurred. Please repeat the email address verification.";
                }

        return { status, ok };
    }

    @Mutation(() => UserResponse)
    async sendRecoveryEmail(
        @Arg("email") email: string
    ): Promise<UserResponse> {
        let errors = [];
        let user;
        let status = "";
        let ok = false;

        if (!email.includes("@") || email === "" || email === null) {
            errors.push({
                field: "email",
                message: "Invalid email",
            });
        } else {
            user = await this.userRepository.findOne({ where: { email } });

            if (!user) {
                errors.push({
                    field: "email",
                    message:
                        "This email address is not associated with any account",
                });
            } else if (!user.emailVerified) {
                status =
                    "Your email address is not verified. We just sent you an email containing the instructions for verification.";
                const verifyToken = createAccessToken(user);
                sendVerificationEmail(user.email, verifyToken);
            } else {
                const token = createAccessToken(user);
                const link = `${process.env.CLIENT_ORIGIN}/modify-password/${token}`;

                try {
                    ejs.renderFile(
                        path.join(
                            __dirname,
                            "../helpers/templates/RecoveryEmail.ejs"
                        ),
                        { link },
                         (error, data) => {
                            if (error) {
                                console.log(error);
                            } else {
                                const params: SendEmailCommandInput = {
                                    Destination: {
                                        ToAddresses: [email],
                                    },
                                    ReplyToAddresses: [process.env.SUPPORT_EMAIL!],
                                    Message: {
                                        Body: {
                                            Html: {
                                                Data: data,
                                            },
                                        },
                                        Subject: {
                                            Data: "Recover your password",
                                        },
                                    },
                                    Source: "noreply@zenith.to",
                                };
            
                                const sesCommand = new SendEmailCommand(params);

                                mailHelper.send(sesCommand)
                                    .then(() => {
                                        console.log("Email sent.");

                                        status =
                                            "Check your inbox, we just sent you an email with the instructions to recover your account password.";
                                    
                                        ok = true;
                                    })
                                    .catch((error) => {
                                        console.error(error);

                                        status = "Could not send the email, please try again later.";
                                    });
                            }
                        }
                    );
                } catch (error) {
                    console.error(error);
                    errors.push({
                        field: "email",
                        message:
                            "Could not send the email, please try again later",
                    });
                }
            }
        }

        return {
            errors,
            status,
            ok,
        };
    }

    @Mutation(() => UserResponse)
    async notAuthModifyPassword(
        @Arg("password") password: string,
        @Arg("confirmPassword") confirmPassword: string,
        @Arg("token") token: string
    ): Promise<UserResponse> {
        let errors = [];
        let ok = false;

        if (password.length <= 2) {
            errors.push({
                field: "password",
                message: "The password lenght must be greater than 2",
            });
        }

        if (confirmPassword.length <= 2) {
            errors.push({
                field: "confirmPassword",
                message:
                    "The confirmation password lenght must be greater than 2",
            });
        }

        if (password != confirmPassword) {
            errors.push(
                {
                    field: "password",
                    message: "The two passwords do not match",
                },
                {
                    field: "confirmPassword",
                    message: "The two passwords do not match",
                }
            );
        }

        let status = "";

        if (errors.length === 0) {
            try {
                const payload: any = verify(
                    token,
                    process.env.ACCESS_TOKEN_SECRET!
                );
                await this.userRepository.update(
                    {
                        id: payload.id,
                    },
                    {
                        password: await argon2.hash(password),
                    }
                );

                status = "The password has been changed, now you can log in.";

                ok = true;
            } catch (error) {
                status =
                    "An error has occurred. Please repeat the password recovery operation.";
            }
        }

        return {
            status,
            errors,
            ok,
        };
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async editProfile(
        @Arg("name") name: string,
        @Arg("profilePicture") profilePicture: string,
        @Arg("profileBanner") profileBanner: string,
        @Arg("bio") bio: string,
        @Arg("website") website: string,
        @Ctx() { payload }: AuthContext
    ): Promise<UserResponse> {
        let errors = [];
        let user;
        let status = "";
        let ok = false;

        if (name === "" || name === null) {
            errors.push({
                field: "name",
                message: "The name field cannot be empty",
            });
        }

        if (!payload) {
            status = "You are not authenticated.";
        } else {
            if (errors.length === 0) {
                try {
                    await this.userRepository.update(
                        {
                            id: payload.id,
                        },
                        {
                            name,
                            profile: {
                                profilePicture,
                                profileBanner,
                                bio,
                                website,
                            },
                        },
                    );
    
                    user = await this.userRepository.findOne({
                        where: { id: payload.id },
                    });
                    status = "Your profile has been updated.";

                    ok = true;
                } catch (error) {
                    console.log(error);
                    status =
                        "An error has occurred. Please try again later to edit your profile";
                }
            }
        }

        return {
            errors,
            user,
            status,
            ok,
        };
    }

    @Mutation(() => Follow, { nullable: true })
    @UseMiddleware(isAuth)
    async followUser(
        @Arg("userId", () => Int) userId: number,
        @Arg("origin") origin: string,
        @Ctx() { payload }: AuthContext,
    ): Promise<Follow | null> {
        if (!payload) {
            return null;
        }

        const user = await this.userRepository.findOne({ where: { id: userId } });
        const follower = await this.userRepository.findOne({ where: { id: payload.id } });
        const existingFollow = await this.followRepository.findOne({ where: { user: { id: userId }, follower: { id: payload.id } }, relations: ["user", "follower"] });

        if (user && follower && !existingFollow) {
            const follow = await this.followRepository.create({
                user,
                follower,
                origin,
            }).save();

            const notification = await this.notificationRepository.create({
                notificationId: uuidv4(),
                creatorId: follower.id,
                recipientId: user.id,
                resourceId: follower.id,
                type: "follow",
                viewed: false,
                content: `${follower.name} (@${follower.username}) started following you.`,
            }).save();

            pubSub.publish("NEW_NOTIFICATION", notification);
            
            const tokens = await this.findUserDeviceTokensByUserId(user.id);
            const pushNotification: FirebaseNotification = {
                title: `New follower on Zenith (for @${user.username})`,
                body: notification.content,
                imageUrl: follower.profile.profilePicture.length > 0 ? follower.profile.profilePicture : "https://img.zncdn.net/static/profile-picture.png",
            };
            const link = `${process.env.CLIENT_ORIGIN}/${follower.username}?n_id=${notification.notificationId}`;
            await sendPushNotifications(tokens as UserDeviceToken[], pushNotification, link, { username: user.username, type: notification.type });

            return follow;
        } else {
            return null;
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async unfollowUser(
        @Arg("userId", () => Int, { nullable: true }) userId: number,
        @Ctx() { payload }: AuthContext,
    ) {
        if (!payload) {
            return false;
        }

        await this.followRepository.delete({ user: { id: userId }, follower: { id: payload.id } }).catch((error) => {
            console.error(error);
            return false;
        });

        const notification = await this.notificationRepository.findOne({
            where: {
                resourceId: payload.id, 
                type: "follow", 
                creatorId: payload.id, 
                recipientId: userId
            }
        });

        await this.notificationRepository.delete({ resourceId: payload.id, type: "follow", creatorId: payload.id, recipientId: userId });

        if (notification) {
            pubSub.publish("DELETED_NOTIFICATION", notification);
        }

        return true;
    }

    @Query(() => [User])
    async getFollowers(
        @Arg("id", () => Int, { nullable: true }) id: number,
        @Arg("limit", () => Int, { nullable: true }) limit: number,
        @Arg("offset", () => Int, { nullable: true }) offset: number
    ) {
        try {
            const followRelations = await this.followRepository.find({ where: { user: { id } }, relations: ["follower", "user"], take: limit, skip: offset, order: { createdAt: "DESC" } });

            const users = followRelations.map(follow => follow.follower);

            return users;
        } catch (error) {
            console.error(error);

            return [];
        }
    }

    @Query(() => [User])
    async getFollowing(
        @Arg("id", () => Int, { nullable: true }) id: number,
        @Arg("limit", () => Int, { nullable: true }) limit: number,
        @Arg("offset", () => Int, { nullable: true }) offset: number
    ) {
        try {
            const followRelations = await this.followRepository.find({ where: { follower: { id } }, relations: ["user", "follower"], take: limit, skip: offset, order: { createdAt: "DESC" } });

            const users = followRelations.map(follow => follow.user);

            return users;
        } catch (error) {
            console.error(error);

            return [];
        }
    }

    @Query(() => Boolean)
    @UseMiddleware(isAuth)
    async isFollowedByMe(
        @Arg("id", () => Int, { nullable: true }) id: number,
        @Ctx() { payload }: AuthContext
    ) {
        if (!payload) {
            return false;
        }

        const follow = await this.followRepository.findOne({ where: { follower: { id: payload.id }, user: { id } }, relations: ["user", "follower"] });

        if (follow) {
            return true;
        } else {
            return false;
        }
    }

    @Query(() => Boolean)
    @UseMiddleware(isAuth)
    async isUserFollowingMe(
        @Arg("id", () => Int, { nullable: true }) id: number,
        @Ctx() { payload }: AuthContext
    ) {
        if (!payload) {
            return false;
        }

        const follow = await this.followRepository.findOne({ where: { follower: { id }, user: { id: payload.id } }, relations: ["user", "follower"] });

        if (follow) {
            return true;
        } else {
            return false;
        }
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async changeUsername(
        @Arg("username", { nullable: true }) username: string,
        @Ctx() { payload }: AuthContext
    ): Promise<UserResponse> {
        let errors = [];
        let user;
        let status;
        let ok = false;

        if (username.includes("@")) {
            errors.push({
                field: "username",
                message: "The username field cannot contain @",
            });
        }
        if (username.length <= 2) {
            errors.push({
                field: "username",
                message: "The username lenght must be greater than 2",
            });
        }
        if (!payload) {
            errors.push({
                field: "username",
                message: "You are not authenticated",
            });
        }

        if (errors.length === 0 && payload) {
            const existingUserWithUsername = await this.userRepository.findOne({ where: { username } });
            const authenticatedUser = await this.userRepository.findOne({ where: { id: payload.id } });
            
            if (authenticatedUser && username === authenticatedUser.username) {
                errors.push({
                    field: "username",
                    message: "The username you entered is the one you are already using",
                });
            } else if (existingUserWithUsername) {
                errors.push({
                    field: "username",
                    message: "Username already taken",
                });
            } else {
                try {
                    await this.userRepository.update(
                        {
                            id: payload.id,
                        },
                        {
                            username
                        },
                    );
    
                    user = await this.userRepository.findOne({
                        where: { id: payload.id },
                    });
    
                    status = "Your username has been changed.";

                    ok = true;
                } catch (error) {
                    console.error(error);
                }
            }
        }

        return {
            errors,
            user,
            status,
            ok,
        }
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async editEmailAddress(
        @Arg("email") email: string,
        @Arg("confirmEmail") confirmEmail: string,
        @Ctx() { payload }: AuthContext
    ): Promise<UserResponse> {
        let errors = [];
        let ok = false;

        if (!email.includes("@") || email === "" || email === null) {
            errors.push({
                field: "email",
                message: "Invalid email",
            });
        }
        if (!confirmEmail.includes("@") || confirmEmail === "" || confirmEmail === null) {
            errors.push({
                field: "confirmEmail",
                message: "Invalid confirmation email",
            });
        }

        if (email != confirmEmail) {
            errors.push(
                {
                    field: "email",
                    message: "The two email addresses do not match",
                },
                {
                    field: "confirmEmail",
                    message: "The two email addresses do not match",
                }
            );
        }

        let status = "";
        let user;

        if (!payload) {
            status = "You are not authenticated.";
        } else if (errors.length === 0) {
            user = await this.userRepository.findOne({
                where: { id: payload.id },
            });

            if (user) {
                if (user.email === email && user.emailVerified) {
                    errors.push({
                        field: "email",
                        message: "The email address you entered is the one you are already using",
                    });
                } else {
                    const token = createAccessToken(user);
                    const link = `${process.env.CLIENT_ORIGIN}/settings/account/verify-email/${token}`;
        
                    try {
                        await this.userRepository.update(
                            {
                                id: payload.id,
                            },
                            {
                                email,
                                emailVerified: false,
                            },
                        );
        
                        ejs.renderFile(
                            path.join(
                                __dirname,
                                "../helpers/templates/VerifyNewEmail.ejs"
                            ),
                            { link: link },
                             (error, data) => {
                                if (error) {
                                    console.log(error);
                                    status = "Could not send the email, please try again later.";
                                } else {
                                    const params: SendEmailCommandInput = {
                                        Destination: {
                                            ToAddresses: [email],
                                        },
                                        ReplyToAddresses: [process.env.SUPPORT_EMAIL!],
                                        Message: {
                                            Body: {
                                                Html: {
                                                    Data: data,
                                                },
                                            },
                                            Subject: {
                                                Data: "Verify your new email address",
                                            },
                                        },
                                        Source: "noreply@zenith.to",
                                    };
                
                                    const sesCommand = new SendEmailCommand(params);
    
                                    mailHelper.send(sesCommand)
                                        .then(() => {
                                            console.log("Email sent.");
    
                                            status =
                                                "Check your inbox, we just sent you an email with the instructions to verify your new email address.";
                                            ok = true;
                                        })
                                        .catch((error) => {
                                            console.error(error);
    
                                            status = "Could not send the email, please try again later.";
                                        });
                                }
                            }
                        );
                    } catch (error) {
                        console.error(error);
                        if (error.code === "23505") {
                            status = "A user using this email address already exists.";
                        } else {
                            status = "An error has occurred. Please try again later to edit your email address.";
                        }
                    }
                }
            } else {
                status = "Can't find the user.";
            }
        }

        return {
            status,
            errors,
            user,
            ok,
        };
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async authSendVerificationEmail(
        @Ctx() { payload }: AuthContext
    ): Promise<UserResponse> {
        let status = "";
        let ok = false;

        if (!payload) {
            status = "You are not authenticated.";
        } else {
            const user = await this.userRepository.findOne({
                where: { id: payload.id },
            });
            
            if (user) {
                const token = createAccessToken(user);
                const link = `${process.env.CLIENT_ORIGIN}/settings/account/verify-email/${token}`;
    
                try {
                    ejs.renderFile(
                        path.join(
                            __dirname,
                            "../helpers/templates/VerifyEmail.ejs"
                        ),
                        { link },
                         (error, data) => {
                            if (error) {
                                console.log(error);
                            } else {
                                const params: SendEmailCommandInput = {
                                    Destination: {
                                        ToAddresses: [user.email],
                                    },
                                    ReplyToAddresses: [process.env.SUPPORT_EMAIL!],
                                    Message: {
                                        Body: {
                                            Html: {
                                                Data: data,
                                            },
                                        },
                                        Subject: {
                                            Data: "Verify your email address",
                                        },
                                    },
                                    Source: "noreply@zenith.to",
                                };
            
                                const sesCommand = new SendEmailCommand(params);

                                mailHelper.send(sesCommand)
                                    .then(() => {
                                        console.log("Email sent.");

                                        status =
                                            "Check your inbox, we just sent you an email with the instructions to verify your email address.";

                                        ok = true;
                                    })
                                    .catch((error) => {
                                        console.error(error);

                                        status = "Could not send the email, please try again later.";
                                    });
                            }
                        }
                    );
                } catch (error) {
                    console.error(error);
                    status = "Could not send the email, please try again later.";
                }
            } else {
                status = "Can't find the user.";
            }
        }

        return {
            status,
            ok,
        };
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async changePassword(
        @Arg("currentPassword") currentPassword: string,
        @Arg("password") password: string,
        @Arg("confirmPassword") confirmPassword: string,
        @Ctx() { payload }: AuthContext
    ): Promise<UserResponse> {
        let errors = [];
        let ok = false;

        if (currentPassword.length <= 2) {
            errors.push({
                field: "currentPassword",
                message: "The current password lenght must be greater than 2",
            });
        }

        if (password.length <= 2) {
            errors.push({
                field: "password",
                message: "The password lenght must be greater than 2",
            });
        }

        if (confirmPassword.length <= 2) {
            errors.push({
                field: "confirmPassword",
                message:
                    "The confirmation password lenght must be greater than 2",
            });
        }

        if (password !== confirmPassword) {
            errors.push(
                {
                    field: "password",
                    message: "The two passwords do not match",
                },
                {
                    field: "confirmPassword",
                    message: "The two passwords do not match",
                }
            );
        }

        let status = "";

        if (!payload) {
            status = "You are not authenticated.";
        } else {
            const user = await this.userRepository.findOne({
                where: { id: payload.id },
            });
    
            let valid = false;
    
            if (user) {
                valid = await argon2.verify(user.password, currentPassword);
            
                if (!valid) {
                    errors.push({
                        field: "currentPassword",
                        message: "Incorrect password",
                    });
                } else if (errors.length === 0) {
                    try {
                        
                        await this.userRepository.update(
                            {
                                id: payload.id,
                            },
                            {
                                password: await argon2.hash(password),
                            }
                        );
        
                        status = "The password has been changed.";

                        ok = true;
                    } catch (error) {
                        console.error(error);
        
                        status =
                            "An error has occurred. Please try again later to change your account password";
                    }
                }
            } else {
                status = "Can't find the user.";
            }
        }

        return {
            status,
            errors,
            ok,
        };
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async updateGender(
        @Arg("gender", { nullable: true }) gender: string,
        @Ctx() { payload }: AuthContext
    ): Promise<UserResponse> {
        let errors = [];
        let status;
        let ok = false;

        if (gender === "Gender" || gender === "") {
            errors.push({
                field: "gender",
                message: "The gender field cannot take this value",
            });
        }
        if (!payload) {
            errors.push({
                field: "gender",
                message: "You are not authenticated",
            });
        } else {
            if (errors.length === 0) {
                try {
                    await this.userRepository.update(
                        {
                            id: payload.id,
                        },
                        {
                            gender
                        },
                    );
        
                    status = "Your gender has been updated.";
                    ok = true;
                } catch (error) {
                    console.error(error);
    
                    errors.push({
                        field: "gender",
                        message: "An error has occurred. Please try again later to update your gender",
                    });
                }
            }
        }

        return {
            errors,
            status,
            ok,
        }
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async editBirthDate(
        @Arg("birthDate") birthDate: Date,
        @Arg("monthAndDayVisibility") monthAndDayVisibility: string,
        @Arg("yearVisibility") yearVisibility: string,
        @Ctx() { payload }: AuthContext
    ): Promise<UserResponse> {
        let errors = [];
        let status;
        let ok = false;

        if (monthAndDayVisibility === "") {
            errors.push({
                field: "monthAndDayVisibility",
                message: "The month and day visibility field cannot take this value",
            });
        }

        if (yearVisibility === "") {
            errors.push({
                field: "yearVisibility",
                message: "The year visibility field cannot take this value",
            });
        }

        if (!payload) {
            status = "You are not authenticated.";
        } else {
            let age = processBirthDate(birthDate);
    
            if (age < 13) {
                errors.push({
                    field: "birthDate",
                    message: "Users under the age of 13 cannot use the platform",
                });
            }

            if (errors.length === 0) {
                try {
                    await this.userRepository.update(
                        {
                            id: payload.id,
                        },
                        {
                            birthDate: {
                                date: birthDate,
                                monthAndDayVisibility,
                                yearVisibility,
                            },
                        },
                    );
        
                    status = "Your changes have been saved.";
                    ok = true;
                } catch (error) {
                    console.error(error);

                    errors.push({
                        field: "gender",
                        message: "An error has occurred. Please try again later to update your birth date",
                    });
                }
            }
        }

        return {
            errors,
            status,
            ok,
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteSession(
        @Arg("sessionId") sessionId: string,
        @Ctx() { payload }: AuthContext
    ) {
        
        if (!payload) {
            return false;
        }

        await this.sessionRepository.delete({ sessionId, user: { id: payload.id } }).catch((error) => {
            console.error(error);
            return false;
        });

        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteOtherSessions(
        @Ctx() { payload }: AuthContext
    ) {
        if (!payload) {
            return false;
        }

        await this.sessionRepository.delete({ sessionId: Not(payload.sessionId), user: { id: payload.id } }).catch((error) => {
            console.error(error);
            return false;
        });

        return true;
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async editIncomingMessages(
        @Arg("incomingMessages") incomingMessages: string,
        @Ctx() { payload }: AuthContext
    ): Promise<UserResponse> {
        let errors = [];
        let status;
        let ok = false;

        if (incomingMessages === "") {
            errors.push({
                field: "incomingMessages",
                message: "You cannot set the incoming messages field to this value",
            });
        }

        if (!payload) {
            status = "You are not authenticated.";
        } else {
            if (errors.length === 0) {
                try {
                    await this.userRepository.update(
                        {
                            id: payload.id,
                        },
                        {
                            userSettings: {
                                incomingMessages,
                            },
                        },
                    );
        
                    status = "Your changes have been saved.";

                    ok = true;
                } catch (error) {
                    console.error(error);
    
                    errors.push({
                        field: "incomingMessages",
                        message: "An error has occurred. Please try again later to update your message settings",
                    });
                }
            }
        }

        return {
            errors,
            status,
            ok,
        }
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async editTwoFactorAuth(
        @Ctx() { payload }: AuthContext,
    ): Promise<UserResponse> {
        let me;
        let status = "";
        let ok = false;

        if (payload) {
            me = await this.userRepository.findOne({ where: { id: payload.id } });
        
            if (me) {
                if (me.userSettings.twoFactorAuth) {
                    me.userSettings.twoFactorAuth = false;
    
                    await me.save();
    
                    status = "Two-factor authentication disabled.";

                    ok = true;
                } else {
                    const decryptedSecretKey = decrypt(me.secretKey);
                    totp.options = { window: 1, step: 180 };
                    const OTP = totp.generate(decryptedSecretKey);
                    const email = me.email;
                    const username = me.username;
    
                    ejs.renderFile(
                        path.join(__dirname, "../helpers/templates/EnableTFA.ejs"),
                        { otp: OTP, username },
                         (error, data) => {
                            if (error) {
                                console.log(error);
                            } else {
                                const params: SendEmailCommandInput = {
                                    Destination: {
                                        ToAddresses: [email],
                                    },
                                    Message: {
                                        Body: {
                                            Html: {
                                                Data: data,
                                            },
                                        },
                                        Subject: {
                                            Data: "Enable two-factor authentication for your Zenith account",
                                        },
                                    },
                                    Source: "noreply@zenith.to",
                                };
                
                                const otpSESCommand = new SendEmailCommand(params);
                                
                                mailHelper.send(otpSESCommand)
                                    .then(() => {
                                        console.log("Email sent.");

                                        ok = true;
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                    });
                            }
                        }
                    );
    
                    me = undefined;
                }
            } else {
                status = "An error has occurred, please try again.";
            }
        } else {
            status = "You're not authenticated.";
        }

        return {
            user: me,
            status,
            ok,
        }
    }
 
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deactivateAccount(
        @Ctx() { res, payload }: AuthContext
    ) {
        if (!payload) {
            return false;
        }

        const me = await this.userRepository.findOne({ where: { id: payload.id }, relations: ["posts", "sessions"] });

        if (!me) {
            return false;
        } else {
            try {
                await this.userRepository.softDelete({ id: me.id });

                sendRefreshToken(res, "");

                await this.sessionRepository.delete({ user: { id: me.id } }).catch((error) => {
                    console.error(error);

                    return false;
                });

                return true;
            } catch (error) {
                console.error(error);

                return false;
            }
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async editHideSensitiveContentSetting(
        @Ctx() { payload }: AuthContext
    ) {
        if (!payload) {
            return false;
        } else {
            try {
                const me = await this.findUserById(payload.id);
                
                if (me) {
                    await this.userRepository.update(
                        {
                            id: payload.id,
                        },
                        {
                            searchSettings: {
                                hideSensitiveContent: !me.searchSettings.hideSensitiveContent,
                            },
                        },
                    );
                } else {
                    return false;
                }
    
                return true;
            } catch (error) {
                console.error(error);

                return false;
            }
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async editHideBlockedAccountsSetting(
        @Ctx() { payload }: AuthContext
    ) {
        if (!payload) {
            return false;
        } else {
            try {
                const me = await this.findUserById(payload.id);

                if (me) {
                    await this.userRepository.update(
                        {
                            id: payload.id,
                        },
                        {
                            searchSettings: {
                                hideBlockedAccounts: !me.searchSettings.hideBlockedAccounts,
                            },
                        },
                    );
                } else {
                    return false;
                }
    
                return true;
            } catch (error) {
                console.error(error);

                return false;
            }
        }
    }

    @Mutation(() => Block, { nullable: true })
    @UseMiddleware(isAuth)
    async blockUser(
        @Arg("userId", () => Int) userId: number,
        @Arg("origin") origin: string,
        @Ctx() { payload }: AuthContext
    ): Promise<Block | null> {
        if (!payload) {
            return null;
        } else {            
            const me = await this.findUserById(payload.id);

            if (me) {
                const user = await this.findUserById(userId);

                if (user) {
                    const block = await this.blockRepository.create({
                        blockedId: user.id,
                        userId: me.id,
                        origin,
                    }).save();

                    await this.unfollowUser(user.id, { payload } as  AuthContext);

                    await this.followRepository.delete({ user: { id: me.id }, follower: { id: user.id } }).catch((error) => {
                        console.error(error);
                        return null;
                    });
            
                    const notification = await this.notificationRepository.findOne({
                        where: {
                            resourceId: user.id, 
                            type: "follow", 
                            creatorId: user.id, 
                            recipientId: me.id
                        }
                    });
            
                    await this.notificationRepository.delete({ resourceId: user.id, type: "follow", creatorId: user.id, recipientId: me.id });
            
                    if (notification) {
                        pubSub.publish("DELETED_NOTIFICATION", notification);
                    }

                    return block;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async unblockUser(
        @Arg("blockedId", () => Int) blockedId: number,
        @Ctx() { payload }: AuthContext
    ) {
        if (!payload) {
            return false;
        }

        await this.blockRepository.delete({ blockedId, userId: payload.id }).catch((error) => {
            console.error(error);
            return false;
        });

        return true;
    }

    @Query(() => [User])
    @UseMiddleware(isAuth)
    async blockedUsers(
        @Ctx() { payload }: AuthContext,
    ) {
        if (!payload) {
            return [];
        } else {
            const me = await this.findUserById(payload.id);
            const users: User[] = [];

            if (me) {
                const blockActions = await this.blockRepository.find({ where: { userId: payload.id } });

                await Promise.all(
                    blockActions.map(async (item) => {
                        const user = await this.userRepository.findOne({ where: { id: item.blockedId } });

                        if (user) {
                            users.push(user);
                        }
                    })
                );

                return users;
            } else {
                return [];
            }
        }
    }

    // Si parte da qui (verso l'alto)

    @Query(() => Boolean)
    @UseMiddleware(isAuth)
    async isUserBlockedByMe(
        @Arg("id", () => Int, { nullable: true }) id: number,
        @Ctx() { payload }: AuthContext
    ) {
        if (!payload) {
            logger.warn("Payload not provided.");

            return false;
        }

        try {
            const block = await this.blockRepository.findOne({ where: { blockedId: id, userId: payload.id } });

            if (block) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            logger.error(error);

            return false;
        }
    }

    @Query(() => Boolean)
    @UseMiddleware(isAuth)
    async hasUserBlockedMe(
        @Arg("id", () => Int, { nullable: true }) id: number,
        @Ctx() { payload }: AuthContext
    ) {
        if (!payload) {
            logger.warn("Payload not provided.");

            return false;
        }

        try {
            const block = await this.blockRepository.findOne({ where: { blockedId: payload.id, userId: id } });

            if (block) {
                return true;
            } else {
                return false;
            }   
        } catch (error) {
            logger.error(error);

            return false;
        }
    }

    @Query(() => UserDeviceToken, { nullable: true })
    async findUserDeviceTokenById(@Arg("id", () => Int, { nullable: true }) id: number, @Arg("userId", () => Int, { nullable: true }) userId: number): Promise<UserDeviceToken | null> {
        if (!id) {
            logger.warn("Id not provided.");

            return null;
        }

        if (!userId) {
            logger.warn("User id not provided.");

            return null;
        }

        try {
            const userToken = await this.userDeviceTokenRepository.findOne({ where: { id, userId } });

            if (!userToken) {
                logger.warn(`Token with id "${id}" not found.`);

                return null;
            }

            return userToken;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }
    
    @Query(() => [UserDeviceToken], { nullable: true })
    async findUserDeviceTokensByUserId(@Arg("userId", () => Int, { nullable: true }) userId: number): Promise<UserDeviceToken[] | null> {
        if (!userId) {
            return null;
        }

        try {
            const tokens = await this.userDeviceTokenRepository.find({ where: { userId } });

            return tokens;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Query(() => UserDeviceToken, { nullable: true })
    async findUserDeviceTokenByToken(@Arg("token", { nullable: true }) token: string, @Arg("userId", () => Int, { nullable: true }) userId: number): Promise<UserDeviceToken | null> {
        if (!token) {
            logger.warn("Token not provided.");

            return null;
        }

        if (!userId) {
            logger.warn("User id not provided.");

            return null;
        }

        try {
            const userToken = await this.userDeviceTokenRepository.findOne({ where: { token, userId } });

            if (!userToken) {
                logger.warn(`Token with token "${token}" not found.`);

                return null;
            }

            return userToken;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Query(() => UserDeviceToken, { nullable: true })
    async findUserDeviceTokenBySessionId(@Arg("sessionId", { nullable: true }) sessionId: string, @Arg("userId", () => Int, { nullable: true }) userId: number): Promise<UserDeviceToken | null> {
        if (!sessionId) {
            logger.warn("Session id not provided.");

            return null;
        }

        if (!userId) {
            logger.warn("User id not provided.");

            return null;
        }

        try {
            const token = await this.userDeviceTokenRepository.findOne({ where: { sessionId, userId } });

            if (!token) {
                logger.warn(`Token for session with id "${sessionId}" not found.`);

                return null;
            }

            return token;
        } catch (error) {
            logger.error(error);

            return null;
        }        
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async createDeviceToken(
        @Arg("token", { nullable: true }) token: string,
        @Ctx() { payload }: AuthContext
    ) {
        if (!payload) {
            logger.warn("Payload not provided.");

            return false;
        }

        try {
            const existingToken = await this.findUserDeviceTokenBySessionId(payload.sessionId, payload.id);

            if (existingToken) {
                await this.deleteDeviceToken(existingToken.id, { payload } as AuthContext);
            }

            if (token && token.length > 0) {
                await this.userDeviceTokenRepository.create({
                    token,
                    userId: payload.id,
                    sessionId: payload.sessionId,
                }).save();

                return true;
            } else {
                logger.warn("Token not provided.");

                return false;
            }
        } catch (error) {
            logger.error(error);

            return false;
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteDeviceToken(
        @Arg("id", () => Int, { nullable: true }) id: number,
        @Ctx() { payload }: AuthContext
    ) {
        if (!payload) {
            logger.warn("Payload not provided.");

            return false;
        }

        try {
            await this.userDeviceTokenRepository.delete({ id, userId: payload.id });

            return true;
        } catch (error) {
            logger.error(error);

            return false;
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteDeviceTokens(
        @Ctx() { payload }: AuthContext
    ) {
        if (!payload) {
            logger.warn("Payload not provided.");

            return false;
        }

        try {
            await this.userDeviceTokenRepository.delete({ userId: payload.id });
    
            return true;
        } catch (error) {
            logger.error(error);

            return false;
        }
    }
}
