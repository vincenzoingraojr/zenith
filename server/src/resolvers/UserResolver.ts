import {
    Affiliation,
    Block,
    Follow,
    Session,
    User,
    UserDeviceToken,
} from "../entities/User";
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
import { Brackets, LessThan, Not, Repository } from "typeorm";
import argon2 from "argon2";
import { AuthContext } from "../types";
import { sendRefreshToken } from "../auth/sendRefreshToken";
import { createAccessToken, createRefreshToken } from "../auth/auth";
import { verify } from "jsonwebtoken";
import { sendVerificationEmail } from "../helpers/mail/sendVerificationEmail";
import ejs from "ejs";
import path from "path";
import { FeedWrapper, FieldError } from "./common";
import { isAuth } from "../middleware/isAuth";
import { processBirthDate, processDays } from "../helpers/dates";
import { v4 as uuidv4 } from "uuid";
import { totp } from "otplib";
import { decrypt, encrypt } from "../helpers/crypto";
import appDataSource from "../dataSource";
import { SendEmailCommand, SendEmailCommandInput } from "@aws-sdk/client-ses";
import { pubSub } from "../helpers/createPubSub";
import { sendPushNotifications } from "../helpers/notifications";
import { Notification as FirebaseNotification } from "firebase-admin/messaging";
import { Topic } from "../entities/Topic";
import mailHelper from "../helpers/mail/mailHelper";
import { Article, MediaItem, Post } from "../entities/Post";
import axios from "axios";
import { getPresignedUrlForDeleteCommand } from "../helpers/getPresignedUrls";
import { logger } from "../helpers/logger";
import { isEmail, isJWT, isUUID } from "class-validator";
import { isValidUserInput } from "../helpers/user/isValidUserInput";
import { USER_TYPES } from "../helpers/user/userTypes";
import { NOTIFICATION_TYPES } from "../helpers/notification/notificationTypes";
import { VerificationStatus } from "../helpers/enums";
import { NotificationService } from "./NotificationService";
import { UserService } from "./UserService";
import { WebServiceClient } from "@maxmind/geoip2-node";

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

@ObjectType()
export class PaginatedUsers extends FeedWrapper {
    @Field(() => [User])
    users: User[];
}

@ObjectType()
export class PaginatedFollowRelations extends FeedWrapper {
    @Field(() => [Follow])
    followRelations: Follow[];
}

@ObjectType()
export class PaginatedBlockActions extends FeedWrapper {
    @Field(() => [Block])
    blockActions: Block[];
}

@ObjectType()
export class PaginatedAffiliations extends FeedWrapper {
    @Field(() => [Affiliation])
    affiliations: Affiliation[];
}

@Resolver(User)
export class UserResolver {
    private readonly userRepository: Repository<User>;
    private readonly userService: UserService;
    private readonly postRepository: Repository<Post>;
    private readonly sessionRepository: Repository<Session>;
    private readonly notificationService: NotificationService;
    private readonly followRepository: Repository<Follow>;
    private readonly blockRepository: Repository<Block>;
    private readonly userDeviceTokenRepository: Repository<UserDeviceToken>;
    private readonly topicRepository: Repository<Topic>;
    private readonly articleRepository: Repository<Article>;
    private readonly mediaItemRepository: Repository<MediaItem>;
    private readonly affiliationRepository: Repository<Affiliation>;
    private readonly webServiceClient: WebServiceClient;

    constructor() {
        this.userRepository = appDataSource.getRepository(User);
        this.userService = new UserService();
        this.postRepository = appDataSource.getRepository(Post);
        this.sessionRepository = appDataSource.getRepository(Session);
        this.notificationService = new NotificationService();
        this.followRepository = appDataSource.getRepository(Follow);
        this.blockRepository = appDataSource.getRepository(Block);
        this.userDeviceTokenRepository =
            appDataSource.getRepository(UserDeviceToken);
        this.topicRepository = appDataSource.getRepository(Topic);
        this.articleRepository = appDataSource.getRepository(Article);
        this.mediaItemRepository = appDataSource.getRepository(MediaItem);
        this.affiliationRepository = appDataSource.getRepository(Affiliation);
        this.webServiceClient = new WebServiceClient(process.env.MAXMIND_ACCOUNT_ID!, process.env.MAXMIND_LICENSE_KEY!, { host: "geolite.info" });
    }

    @Query(() => User, { nullable: true })
    async findUser(
        @Arg("username") username: string,
        @Arg("deleted", { nullable: true }) deleted: boolean = false
    ): Promise<User | null> {
        const response = await this.userService.findUser(username, deleted);

        return response;
    }

    @Query(() => User, { nullable: true })
    async findUserById(
        @Arg("id", () => Int, { nullable: true }) id: number,
        @Arg("deleted", { nullable: true }) deleted: boolean = false
    ): Promise<User | null> {
        const response = await this.userService.findUserById(id, deleted);

        return response;
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
                logger.warn(
                    "Couldn't retrieve the payload from the authorization token."
                );

                return null;
            }

            return this.findUserById(payload.id);
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Query(() => Session, { nullable: true })
    @UseMiddleware(isAuth)
    async currentSession(
        @Ctx() { payload }: AuthContext
    ): Promise<Session | null> {
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
                logger.warn(
                    `Current session for user with id "${payload.id}" not found.`
                );

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
    async otherSessions(
        @Ctx() { payload }: AuthContext
    ): Promise<Session[] | null> {
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
                    createdAt: "DESC",
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
    async findSession(
        @Arg("sessionId") sessionId: string,
        @Ctx() { payload }: AuthContext
    ): Promise<Session | null> {
        if (!payload) {
            logger.warn("Payload not provided.");

            return null;
        }

        const validSessionId = isUUID(sessionId);

        if (!validSessionId) {
            logger.warn("Invalid sessionId provided.");

            return null;
        }

        try {
            const session = await this.sessionRepository.findOne({
                where: { sessionId, user: { id: payload.id } },
                relations: ["user"],
            });

            if (!session) {
                logger.warn(
                    `Session for user with id "${payload.id}" not found.`
                );

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

    @Mutation(() => UserResponse)
    async findUserBeforeLogIn(
        @Arg("input") input: string
    ): Promise<UserResponse> {
        let status = "";
        let ok = false;
        let user: User | null = null;
        let errors = [];

        if (!isValidUserInput(input)) {
            errors.push({
                field: "input",
                message: "This field can't be empty",
            });
        }

        try {
            const isEmailAddress = isEmail(input);

            if (isEmailAddress) {
                user = await this.userService.findUserByEmail(input);
            } else {
                user = await this.findUser(input);
            }

            if (!user) {
                status = "Sorry, but we can't find your account.";
            } else {
                ok = true;
            }
        } catch (error) {
            status = "An error has occurred, please try again later.";

            logger.error(error);
        }

        return {
            user,
            status,
            ok,
            errors,
        };
    }

    @Mutation(() => Session, { nullable: true })
    async createSession(
        @Arg("userId", () => Int) userId: number,
        @Arg("clientOS") clientOS: string,
        @Arg("clientType") clientType: string,
        @Arg("clientName") clientName: string,
        @Ctx() { req }: AuthContext
    ): Promise<Session | null> {
        const user = await this.findUserById(userId);
        let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

        if (!user || !ip) {
            return null;
        }

        if (typeof ip === "string" && ip.includes(",")) {
            ip = ip.split(",")[0].trim();
        }

        if (Array.isArray(ip)) {
            ip = ip[0];
        }

        if (process.env.NODE_ENV === "development") {
            ip = "8.8.8.8";
        }

        try {
            let countryCode = "";
            let city = "";

            const countryResponse = await this.webServiceClient.country(ip);
            const cityResponse = await this.webServiceClient.city(ip)

            countryCode = countryResponse.country?.isoCode || "";
            city = cityResponse.city?.names.en || "";

            const session = await this.sessionRepository
                .create({
                    user,
                    sessionId: uuidv4(),
                    clientOS,
                    clientType,
                    clientName,
                    deviceLocation: city,
                    country: countryCode,
                })
                .save();

            return session;
        } catch (error) {
            logger.error(error);
            console.error(error);

            return null;
        }
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg("input") input: string,
        @Arg("password") password: string,
        @Arg("clientOS") clientOS: string,
        @Arg("clientType") clientType: string,
        @Arg("clientName") clientName: string,
        @Ctx() { req, res }: AuthContext
    ): Promise<UserResponse> {
        let errors = [];
        let user: User | null = null;
        let accessToken;
        let status = "";
        let ok = false;

        if (!isValidUserInput(input)) {
            errors.push({
                field: "input",
                message: "This field can't be empty",
            });
        }

        try {
            const isEmailAddress = isEmail(input);

            if (isEmailAddress) {
                user = await this.userService.findUserByEmail(input, true);
            } else {
                user = await this.findUser(input, true);
            }

            if (
                !user ||
                (user &&
                    user.deletedAt !== null &&
                    processDays(user.deletedAt) > 90)
            ) {
                status = "Sorry, but we can't find your account.";

                if (
                    user &&
                    user.deletedAt !== null &&
                    processDays(user.deletedAt) > 90
                ) {
                    await this.deleteAccountData(user.id);
                }
            } else if (
                user &&
                user.deletedAt !== null &&
                processDays(user.deletedAt) <= 90
            ) {
                status = "account_deactivated";
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
                            try {
                                const session = await this.createSession(user.id, clientOS, clientType, clientName, { req } as AuthContext);

                                if (session) {
                                    sendRefreshToken(
                                        res,
                                        createRefreshToken(user, session)
                                    );
                                    accessToken = createAccessToken(user, session);

                                    status = "You are now logged in.";

                                    ok = true;
                                } else {
                                    status = "Failed to create a new session, please try again later.";
                                }
                            } catch (error) {
                                status =
                                    "An error occurred while trying to create a new session, please try again later.";

                                logger.error(error);
                            }
                        } else {
                            const decryptedSecretKey = decrypt(user.secretKey);
                            totp.options = { window: 1, step: 180 };
                            const OTP = totp.generate(decryptedSecretKey);
                            const email = user.email;
                            const username = user.username;

                            const data = await ejs.renderFile(
                                path.join(
                                    __dirname,
                                    "../helpers/templates/OTPEmail.ejs"
                                ),
                                { otp: OTP, username }
                            );

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

                            await mailHelper.send(otpSESCommand);

                            status = "otp_sent";
                        }
                    } else {
                        const verifyToken = createAccessToken(user);
                        const emailStatus = await sendVerificationEmail(
                            user.email,
                            verifyToken
                        );

                        if (emailStatus) {
                            status =
                                "Your email address is not verified. We just sent you an email containing the instructions for verification.";
                        } else {
                            status =
                                "An error has occurred while trying to send the verification email. Please try again later.";
                        }
                    }
                }
            }
        } catch (error) {
            logger.error(error);

            status = "An error has occurred, please try again later.";
        }

        return {
            user,
            errors,
            accessToken,
            status,
            ok,
        };
    }

    @Mutation(() => UserResponse)
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

        if (!isEmail(email)) {
            errors.push({
                field: "email",
                message: "Invalid email",
            });
        }
        if (!isValidUserInput(username) || username.includes("@")) {
            errors.push({
                field: "username",
                message: "Invalid username",
            });
        }
        if (!isValidUserInput(password) || password.length <= 2) {
            errors.push({
                field: "password",
                message: "The password length must be greater than 2",
            });
        }
        if (!isValidUserInput(name)) {
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
                message:
                    "Users under the age of 13 cannot sign up to the platform",
            });
        }

        let status;

        try {
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
                    status = "account_deactivated";
                } else {
                    await this.deleteAccountData(existingUser.id);
                }
            }

            if (errors.length === 0) {
                const user = await this.userRepository
                    .create({
                        username,
                        email,
                        password: hashedPassword,
                        name,
                        gender,
                        birthDate: {
                            date: birthDate,
                        },
                        secretKey: encriptedSecretKey,
                    })
                    .save();

                const token = createAccessToken(user);
                const emailStatus = await sendVerificationEmail(
                    user.email,
                    token
                );

                if (emailStatus) {
                    status =
                        "Check your inbox, we just sent you an email with the instructions to verify your account.";
                } else {
                    status =
                        "An error has occurred while trying to send the verification email. Please try again later.";
                }

                ok = true;
            }
        } catch (error) {
            logger.error(error);

            if (error.detail.includes("username") && error.code === "23505") {
                errors.push({
                    field: "username",
                    message: "Username already taken",
                });
            } else if (
                error.detail.includes("email") &&
                error.code === "23505"
            ) {
                errors.push({
                    field: "email",
                    message: "A user using this email already exists",
                });
            } else {
                status =
                    "An unknown error has occurred, please try again later.";
            }
        }

        return {
            errors,
            status,
            ok,
        };
    }

    @Mutation(() => UserResponse)
    async reactivateAccount(
        @Arg("input") input: string,
        @Arg("password") password: string
    ): Promise<UserResponse> {
        let errors = [];
        let status = "";
        let ok = false;
        let user: User | null = null;

        if (!isValidUserInput(input)) {
            errors.push({
                field: "input",
                message: "This field can't be empty",
            });
        }

        try {
            const isEmailAddress = isEmail(input);

            if (isEmailAddress) {
                user = await this.userService.findUserByEmail(input, true);
            } else {
                user = await this.findUser(input, true);
            }

            if (user) {
                const valid = await argon2.verify(user.password, password);

                if (!valid) {
                    errors.push({
                        field: "password",
                        message: "Incorrect password",
                    });
                }

                if (errors.length === 0) {
                    if (
                        user.deletedAt !== null &&
                        processDays(user.deletedAt) <= 90
                    ) {
                        await this.userRepository.restore({ id: user.id });

                        status =
                            "Your account has been restored. Now you can log in.";
                        ok = true;
                    } else if (
                        user.deletedAt !== null &&
                        processDays(user.deletedAt) > 90
                    ) {
                        status =
                            "Sorry, but you can't reactivate your account. It has been deactivated for more than 90 days.";

                        await this.deleteAccountData(user.id);
                    } else {
                        status = "Your account is already active.";
                    }
                }
            } else {
                status = "Sorry, but we can't find your account.";
            }
        } catch (error) {
            logger.error(error);

            status =
                "An error has occurred while trying to restore your account. Please try again later.";
        }

        return {
            errors,
            status,
            ok,
        };
    }

    @Mutation(() => Boolean)
    async deleteAccountData(
        @Arg("id", () => Int, { nullable: true }) id: number
    ) {
        if (!id) {
            logger.warn("Id not provided.");

            return false;
        }

        try {
            const user = await this.findUserById(id, true);

            if (user) {
                await this.userRepository
                    .delete({ id: user.id })
                    .then(async () => {
                        if (user.profile.profilePicture.length > 0) {
                            const existingProfilePictureKey =
                                user.profile.profilePicture.replace(
                                    `https://img.zncdn.net/`,
                                    ""
                                );

                            try {
                                const profilePictureUrl =
                                    await getPresignedUrlForDeleteCommand(
                                        existingProfilePictureKey,
                                        "image"
                                    );

                                await axios
                                    .delete(profilePictureUrl)
                                    .then(() => {
                                        logger.info(
                                            "Profile picture successfully deleted."
                                        );
                                    })
                                    .catch((error) => {
                                        logger.warn(
                                            `An error occurred while deleting the profile picture. Error code: ${error.code}.`
                                        );
                                    });
                            } catch (error) {
                                logger.error(error);
                            }
                        }

                        if (user.profile.profileBanner.length > 0) {
                            const existingProfileBannerKey =
                                user.profile.profileBanner.replace(
                                    `https://img.zncdn.net/`,
                                    ""
                                );

                            try {
                                const profileBannerUrl =
                                    await getPresignedUrlForDeleteCommand(
                                        existingProfileBannerKey,
                                        "image"
                                    );

                                await axios
                                    .delete(profileBannerUrl)
                                    .then(() => {
                                        logger.info(
                                            "Profile banner successfully deleted."
                                        );
                                    })
                                    .catch((error) => {
                                        logger.warn(
                                            `An error occurred while deleting the profile banner. Error code: ${error.code}.`
                                        );
                                    });
                            } catch (error) {
                                logger.error(error);
                            }
                        }
                    });

                try {
                    await this.postRepository
                        .delete({ authorId: user.id })
                        .then(async () => {
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
                                const existingKey = item.src.replace(
                                    `https://${
                                        item.type.includes("image")
                                            ? "img"
                                            : "vid"
                                    }.zncdn.net/`,
                                    ""
                                );

                                try {
                                    const url =
                                        await getPresignedUrlForDeleteCommand(
                                            existingKey,
                                            item.type
                                        );

                                    await axios
                                        .delete(url)
                                        .then(() => {
                                            logger.info(
                                                "Media item successfully deleted."
                                            );
                                        })
                                        .catch((error) => {
                                            logger.warn(
                                                `An error occurred while deleting the media item. Error code: ${error.code}.`
                                            );
                                        });

                                    await this.mediaItemRepository.delete({
                                        id: item.id,
                                    });
                                } catch (error) {
                                    logger.error(error);
                                }
                            }
                        });
                } catch (error) {
                    logger.warn(
                        `Encountered an error while trying to delete posts with authorId "${id}". Error message: ${error.message}`
                    );
                }

                try {
                    await this.articleRepository.delete({ authorId: user.id });
                } catch (error) {
                    logger.warn(
                        `Error encountered while trying to delete articles with authorId "${id}". Error message: ${error.message}`
                    );
                }

                return true;
            } else {
                logger.warn(
                    `Error encountered while trying to delete account data: user with id "${id}" not found.`
                );

                return false;
            }
        } catch (error) {
            logger.error(error);

            return false;
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
        @Ctx() { req, res, payload }: AuthContext
    ): Promise<UserResponse> {
        let accessToken;
        let status;
        let ok = false;
        let me: User | null = null;

        try {
            if (payload) {
                me = await this.findUserById(payload.id);
            } else {
                if (isValidUserInput(input)) {
                    if (isEmail(input)) {
                        me = await this.userService.findUserByEmail(input);
                    } else {
                        me = await this.findUser(input);
                    }
                } else {
                    status = "Invalid input.";
                }
            }

            if (me) {
                const decryptedSecretKey = decrypt(me.secretKey);
                const valid = await argon2.verify(me.password, password);

                if (
                    (!me.userSettings.twoFactorAuth && payload) ||
                    (me.userSettings.twoFactorAuth && valid && isLogin)
                ) {
                    const isValid = totp.check(otp, decryptedSecretKey);

                    if (isValid) {
                        if (isLogin) {
                            const session = await this.createSession(me.id, clientOS, clientType, clientName, { req } as AuthContext);

                            if (session) {
                                sendRefreshToken(
                                    res,
                                    createRefreshToken(me, session)
                                );
                                accessToken = createAccessToken(me, session);

                                status = "You are now logged in.";

                                ok = true;
                            } else {
                                status = "Failed to create a new session, please try again later.";
                            }
                        } else if (payload) {
                            me.userSettings.twoFactorAuth = true;
                            await me.save();

                            status =
                                "The two-factor authentication is now enabled.";

                            ok = true;
                        } else {
                            status =
                                "An error has occurred. Please request a new OTP.";
                        }
                    } else {
                        status =
                            "This OTP is invalid. Please request a new OTP.";
                    }
                }
            } else {
                status = "Sorry, we couldn't find your account.";
            }
        } catch (error) {
            logger.error(error);

            status =
                "An error has occurred during the OTP verification. Please request a new OTP.";
        }

        return {
            status,
            accessToken,
            user: me,
            ok,
        };
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async resendOTP(
        @Arg("input") input: string,
        @Arg("password") password: string,
        @Ctx() { payload }: AuthContext
    ) {
        let me: User | null = null;

        if (!isValidUserInput(input) && !payload) {
            logger.warn("Bad request.");

            return false;
        }

        try {
            if (payload) {
                me = await this.findUserById(payload.id);
            } else {
                if (isValidUserInput(input)) {
                    if (isEmail(input)) {
                        me = await this.userService.findUserByEmail(input);
                    } else {
                        me = await this.findUser(input);
                    }
                } else {
                    logger.warn("Invalid input.");
                }
            }

            if (me) {
                const valid = await argon2.verify(me.password, password);

                if (
                    (!me.userSettings.twoFactorAuth && payload) ||
                    (me.userSettings.twoFactorAuth && valid)
                ) {
                    const decryptedSecretKey = decrypt(me.secretKey);
                    totp.options = { window: 1, step: 180 };
                    const OTP = totp.generate(decryptedSecretKey);
                    const email = me.email;
                    const username = me.username;

                    const data = await ejs.renderFile(
                        path.join(
                            __dirname,
                            "../helpers/templates/ResendOTPEmail.ejs"
                        ),
                        { otp: OTP, username }
                    );

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
                                Data: "OTP for your Zenith account",
                            },
                        },
                        Source: "noreply@zenith.to",
                    };

                    const otpSESCommand = new SendEmailCommand(params);

                    await mailHelper.send(otpSESCommand);

                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } catch (error) {
            logger.error(error);

            return false;
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async logout(@Ctx() { res, payload }: AuthContext) {
        if (!payload) {
            logger.warn("Payload not provided.");

            return false;
        }

        try {
            const existingToken = await this.findUserDeviceTokenBySessionId(
                payload.sessionId,
                payload.id
            );

            if (existingToken) {
                await this.deleteDeviceToken(existingToken.id, {
                    payload,
                } as AuthContext);
            }

            await this.sessionRepository.delete({
                sessionId: payload.sessionId,
            });

            sendRefreshToken(res, "");

            return true;
        } catch (error) {
            logger.error(error);

            return false;
        }
    }

    @Mutation(() => UserResponse)
    async verifyEmailAddress(
        @Arg("token") token: string
    ): Promise<UserResponse> {
        let status = "";
        let ok = false;

        try {
            if (isJWT(token)) {
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
            } else {
                logger.warn("Invalid token.");

                status = "Invalid token.";
            }
        } catch (error) {
            logger.error(error);

            status =
                "An error has occurred. Please repeat the email address verification.";
        }

        return {
            status,
            ok,
        };
    }

    @Mutation(() => UserResponse)
    async sendRecoveryEmail(
        @Arg("email") email: string
    ): Promise<UserResponse> {
        let errors = [];
        let user;
        let status = "";
        let ok = false;

        if (!isEmail(email)) {
            errors.push({
                field: "email",
                message: "Invalid email",
            });
        } else {
            try {
                user = await this.userService.findUserByEmail(email);

                if (!user) {
                    errors.push({
                        field: "email",
                        message:
                            "This email address is not associated with any account",
                    });
                } else if (!user.emailVerified) {
                    const verifyToken = createAccessToken(user);
                    const emailStatus = await sendVerificationEmail(
                        user.email,
                        verifyToken
                    );

                    if (emailStatus) {
                        status =
                            "Your email address is not verified. We just sent you an email containing the instructions for verification.";
                    } else {
                        status =
                            "An error has occurred while trying to send the verification email. Please try again later.";
                    }
                } else {
                    const token = createAccessToken(user);
                    const link = `${process.env.CLIENT_ORIGIN}/modify_password/${token}`;

                    const data = await ejs.renderFile(
                        path.join(
                            __dirname,
                            "../helpers/templates/RecoveryEmail.ejs"
                        ),
                        { link }
                    );

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
                    await mailHelper.send(sesCommand);

                    status =
                        "Check your inbox, we just sent you an email with the instructions to recover your account password.";

                    ok = true;
                }
            } catch (error) {
                logger.error(error);

                status = "Could not send the email, please try again later.";
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

        if (!isValidUserInput(password) || password.length <= 2) {
            errors.push({
                field: "password",
                message: "The password length must be greater than 2",
            });
        }

        if (!isValidUserInput(confirmPassword) || confirmPassword.length <= 2) {
            errors.push({
                field: "confirmPassword",
                message:
                    "The confirmation password length must be greater than 2",
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

        if (errors.length === 0) {
            try {
                if (isJWT(token)) {
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

                    status =
                        "The password has been changed, now you can log in.";

                    ok = true;
                } else {
                    logger.warn("Invalid token.");

                    status = "Invalid token.";
                }
            } catch (error) {
                logger.error(error);

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

        if (!payload) {
            status = "You are not authenticated.";
        } else {
            if (!isValidUserInput(name)) {
                errors.push({
                    field: "name",
                    message: "The name field cannot be empty",
                });
            } else {
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
                        }
                    );

                    user = await this.findUserById(payload.id);
                    status = "Your profile has been updated.";

                    ok = true;
                } catch (error) {
                    logger.error(error);

                    status =
                        "An error has occurred. Please try again later to edit your profile.";
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
        @Arg("userId", () => Int, { nullable: true }) userId: number,
        @Arg("origin") origin: string,
        @Ctx() { payload }: AuthContext
    ): Promise<Follow | null> {
        if (!payload) {
            logger.warn("Payload not provided.");

            return null;
        }

        if (!userId) {
            logger.warn("User id not provided.");

            return null;
        }

        try {
            const user = await this.findUserById(userId);
            const follower = await this.findUserById(payload.id);
            const existingFollow = await this.followRepository.findOne({
                where: { user: { id: userId }, follower: { id: payload.id } },
                relations: ["user", "follower"],
            });
            const isBlockedByMe = await this.userService.whoHasBlockedWho(
                userId,
                payload.id
            );
            const hasBlockedMe = await this.userService.whoHasBlockedWho(
                payload.id,
                userId
            );

            if (
                user &&
                follower &&
                !existingFollow &&
                !isBlockedByMe &&
                !hasBlockedMe
            ) {
                const follow = await this.followRepository
                    .create({
                        user,
                        follower,
                        origin,
                    })
                    .save();

                const notification =
                    await this.notificationService.createNotification(
                        follower.id,
                        user.id,
                        follower.id,
                        USER_TYPES.USER,
                        NOTIFICATION_TYPES.FOLLOW,
                        `${follower.name} (@${follower.username}) started following you.`
                    );

                if (notification) {
                    pubSub.publish("NEW_NOTIFICATION", notification);

                    const tokens = await this.findUserDeviceTokensByUserId(
                        user.id
                    );
                    const pushNotification: FirebaseNotification = {
                        title: `New follower on Zenith (for @${user.username})`,
                        body: notification.content,
                        imageUrl:
                            follower.profile.profilePicture.length > 0
                                ? follower.profile.profilePicture
                                : "https://assets.zncdn.net/static/profile-picture.png",
                    };
                    const link = `${process.env.CLIENT_ORIGIN}/${follower.username}?n_id=${notification.notificationId}`;
                    await sendPushNotifications(
                        tokens as UserDeviceToken[],
                        pushNotification,
                        link,
                        {
                            username: user.username,
                            type: notification.notificationType,
                        }
                    );
                }

                return follow;
            } else {
                logger.warn(
                    `followUserData: [{ userId: ${
                        user ? user.id : undefined
                    } }, { followerId: ${
                        follower ? follower.id : undefined
                    } }, { existingFollowId: ${
                        existingFollow ? existingFollow.id : undefined
                    } }]`
                );

                return null;
            }
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async unfollowUser(
        @Arg("userId", () => Int, { nullable: true }) userId: number,
        @Ctx() { payload }: AuthContext
    ) {
        if (!payload) {
            logger.warn("Payload not provided.");

            return false;
        }

        if (!userId) {
            logger.warn("User id not provided.");

            return false;
        }

        try {
            await this.followRepository.delete({
                user: { id: userId },
                follower: { id: payload.id },
            });

            const notification =
                await this.notificationService.findNotification(
                    payload.id,
                    userId,
                    payload.id,
                    USER_TYPES.USER,
                    NOTIFICATION_TYPES.FOLLOW
                );

            if (notification) {
                pubSub.publish("DELETED_NOTIFICATION", notification);

                await this.notificationService.deleteNotification(
                    notification.notificationId
                );
            }

            return true;
        } catch (error) {
            logger.error(error);

            return false;
        }
    }

    @Query(() => PaginatedFollowRelations)
    async getFollowers(
        @Arg("id", () => Int, { nullable: true }) id: number,
        @Arg("limit", () => Int) limit: number,
        @Arg("cursor", () => String, { nullable: true }) cursor: string | null
    ): Promise<PaginatedFollowRelations> {
        if (!id) {
            logger.warn("User id not provided.");

            return {
                followRelations: [],
                hasMore: false,
                totalCount: 0,
            };
        }

        try {
            const [followRelations, totalCount] = await Promise.all([
                this.followRepository.find({
                    where: {
                        user: { id },
                        ...(cursor
                            ? {
                                  createdAt: LessThan(
                                      new Date(parseInt(cursor))
                                  ),
                              }
                            : {}),
                    },
                    relations: ["follower", "user"],
                    take: limit + 1,
                    order: { createdAt: "DESC" },
                }),
                this.followRepository.count({
                    where: {
                        user: { id },
                    },
                    relations: ["user"],
                }),
            ]);

            return {
                followRelations: followRelations.slice(0, limit),
                hasMore: followRelations.length === limit + 1,
                totalCount,
            };
        } catch (error) {
            logger.error(error);

            return {
                followRelations: [],
                hasMore: false,
                totalCount: 0,
            };
        }
    }

    @Query(() => PaginatedFollowRelations)
    async getFollowing(
        @Arg("id", () => Int, { nullable: true }) id: number,
        @Arg("limit", () => Int) limit: number,
        @Arg("cursor", () => String, { nullable: true }) cursor: string | null
    ): Promise<PaginatedFollowRelations> {
        if (!id) {
            logger.warn("User id not provided.");

            return {
                followRelations: [],
                hasMore: false,
                totalCount: 0,
            };
        }

        try {
            const [followRelations, totalCount] = await Promise.all([
                this.followRepository.find({
                    where: {
                        follower: { id },
                        ...(cursor
                            ? {
                                  createdAt: LessThan(
                                      new Date(parseInt(cursor))
                                  ),
                              }
                            : {}),
                    },
                    relations: ["user", "follower"],
                    take: limit + 1,
                    order: { createdAt: "DESC" },
                }),
                this.followRepository.count({
                    where: {
                        follower: { id },
                    },
                    relations: ["follower"],
                }),
            ]);

            return {
                followRelations: followRelations.slice(0, limit),
                hasMore: followRelations.length === limit + 1,
                totalCount,
            };
        } catch (error) {
            logger.error(error);

            return {
                followRelations: [],
                hasMore: false,
                totalCount: 0,
            };
        }
    }

    @Query(() => Follow, { nullable: true })
    @UseMiddleware(isAuth)
    async isFollowedByMe(
        @Arg("id", () => Int, { nullable: true }) id: number,
        @Ctx() { payload }: AuthContext
    ): Promise<Follow | null> {
        if (!payload) {
            logger.warn("Payload not provided.");

            return null;
        }

        if (!id) {
            logger.warn("User id not provided.");

            return null;
        }

        try {
            const follow = await this.followRepository.findOne({
                where: { follower: { id: payload.id }, user: { id } },
                relations: ["user", "follower"],
            });

            return follow;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Query(() => Follow, { nullable: true })
    @UseMiddleware(isAuth)
    async isUserFollowingMe(
        @Arg("id", () => Int, { nullable: true }) id: number,
        @Ctx() { payload }: AuthContext
    ): Promise<Follow | null> {
        if (!payload) {
            logger.warn("Payload not provided.");

            return null;
        }

        if (!id) {
            logger.warn("User id not provided.");

            return null;
        }

        try {
            const follow = await this.followRepository.findOne({
                where: { follower: { id }, user: { id: payload.id } },
                relations: ["user", "follower"],
            });

            return follow;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async changeUsername(
        @Arg("username") username: string,
        @Ctx() { payload }: AuthContext
    ): Promise<UserResponse> {
        let errors = [];
        let user;
        let status;
        let ok = false;

        if (!payload) {
            status = "You're not authenticated.";
        } else {
            if (!isValidUserInput(username) || username.includes("@")) {
                errors.push({
                    field: "username",
                    message: "Invalid username",
                });
            } else {
                try {
                    const existingUserWithUsername = await this.findUser(
                        username
                    );
                    const authenticatedUser = await this.findUserById(
                        payload.id
                    );

                    if (
                        authenticatedUser &&
                        username === authenticatedUser.username
                    ) {
                        errors.push({
                            field: "username",
                            message:
                                "The username you entered is the one you are already using",
                        });
                    } else if (existingUserWithUsername) {
                        errors.push({
                            field: "username",
                            message: "Username already taken",
                        });
                    } else {
                        await this.userRepository.update(
                            {
                                id: payload.id,
                            },
                            {
                                username,
                            }
                        );

                        user = await this.findUserById(payload.id);

                        status = "Your username has been changed.";

                        ok = true;
                    }
                } catch (error) {
                    logger.error(error);

                    status =
                        "An error has occurred. Please try again later to change your username.";
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

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async editEmailAddress(
        @Arg("email") email: string,
        @Arg("confirmEmail") confirmEmail: string,
        @Ctx() { payload }: AuthContext
    ): Promise<UserResponse> {
        let errors = [];
        let ok = false;

        let status = "";
        let user;

        if (!payload) {
            status = "You are not authenticated.";
        } else {
            if (!isEmail(email)) {
                errors.push({
                    field: "email",
                    message: "Invalid email",
                });
            }
            if (!isEmail(confirmEmail)) {
                errors.push({
                    field: "confirmEmail",
                    message: "Invalid confirmation email",
                });
            }

            if (email !== confirmEmail) {
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

            if (errors.length === 0) {
                try {
                    user = await this.findUserById(payload.id);

                    if (user) {
                        if (user.email === email && user.emailVerified) {
                            errors.push({
                                field: "email",
                                message:
                                    "The email address you entered is the one you are already using",
                            });
                        } else {
                            const token = createAccessToken(user);
                            const link = `${process.env.CLIENT_ORIGIN}/settings/account/verify-email/${token}`;

                            await this.userRepository.update(
                                {
                                    id: payload.id,
                                },
                                {
                                    email,
                                    emailVerified: false,
                                }
                            );

                            const data = await ejs.renderFile(
                                path.join(
                                    __dirname,
                                    "../helpers/templates/VerifyNewEmail.ejs"
                                ),
                                { link }
                            );

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

                            await mailHelper.send(sesCommand);

                            status =
                                "Check your inbox, we just sent you an email with the instructions to verify your new email address.";

                            ok = true;
                        }
                    } else {
                        status = "Can't find the user.";
                    }
                } catch (error) {
                    logger.error(error);

                    if (error.code === "23505") {
                        status =
                            "A user using this email address already exists.";
                    } else {
                        status =
                            "An error has occurred. Please try again later to edit your email address.";
                    }
                }
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
            try {
                const user = await this.findUserById(payload.id);

                if (user) {
                    const token = createAccessToken(user);
                    const link = `${process.env.CLIENT_ORIGIN}/settings/account/verify-email/${token}`;

                    const data = await ejs.renderFile(
                        path.join(
                            __dirname,
                            "../helpers/templates/VerifyEmail.ejs"
                        ),
                        { link }
                    );

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

                    await mailHelper.send(sesCommand);

                    status =
                        "Check your inbox, we just sent you an email with the instructions to verify your email address.";

                    ok = true;
                } else {
                    status = "Can't find the user.";
                }
            } catch (error) {
                logger.error(error);

                status = "Could not send the email, please try again later.";
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

        let status = "";

        if (!payload) {
            status = "You are not authenticated.";
        } else {
            if (
                !isValidUserInput(currentPassword) ||
                currentPassword.length <= 2
            ) {
                errors.push({
                    field: "currentPassword",
                    message:
                        "The current password length must be greater than 2",
                });
            }

            if (!isValidUserInput(password) || password.length <= 2) {
                errors.push({
                    field: "password",
                    message: "The password length must be greater than 2",
                });
            }

            if (
                !isValidUserInput(confirmPassword) ||
                confirmPassword.length <= 2
            ) {
                errors.push({
                    field: "confirmPassword",
                    message:
                        "The confirmation password length must be greater than 2",
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

            try {
                const user = await this.findUserById(payload.id);

                if (user) {
                    const valid = await argon2.verify(
                        user.password,
                        currentPassword
                    );

                    if (!valid) {
                        errors.push({
                            field: "currentPassword",
                            message: "Incorrect password",
                        });
                    } else if (errors.length === 0) {
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
                    }
                } else {
                    status = "Can't find the user.";
                }
            } catch (error) {
                logger.error(error);

                status =
                    "An error has occurred. Please try again later to change your account password.";
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
        @Arg("gender") gender: string,
        @Ctx() { payload }: AuthContext
    ): Promise<UserResponse> {
        let errors = [];
        let status;
        let ok = false;

        if (!payload) {
            errors.push({
                field: "gender",
                message: "You are not authenticated",
            });
        } else {
            if (gender === "Gender" || gender === "") {
                errors.push({
                    field: "gender",
                    message: "The gender field cannot take this value",
                });
            } else {
                try {
                    await this.userRepository.update(
                        {
                            id: payload.id,
                            type: Not(USER_TYPES.ORGANIZATION),
                        },
                        {
                            gender,
                        }
                    );

                    status = "Your gender has been updated.";
                    ok = true;
                } catch (error) {
                    logger.error(error);

                    errors.push({
                        field: "gender",
                        message:
                            "An error has occurred. Please try again later to update your gender",
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

        if (!payload) {
            status = "You are not authenticated.";
        } else {
            if (monthAndDayVisibility === "") {
                errors.push({
                    field: "monthAndDayVisibility",
                    message:
                        "The month and day visibility field cannot take this value",
                });
            }

            if (yearVisibility === "") {
                errors.push({
                    field: "yearVisibility",
                    message: "The year visibility field cannot take this value",
                });
            }

            if (errors.length === 0) {
                try {
                    const user = await this.findUserById(payload.id);

                    if (user) {
                        if (user.type !== USER_TYPES.ORGANIZATION) {
                            let age = processBirthDate(birthDate);

                            if (age < 13) {
                                errors.push({
                                    field: "birthDate",
                                    message:
                                        "Users under the age of 13 cannot sign up to the platform",
                                });
                            }
                        }

                        user.birthDate.date = birthDate;
                        user.birthDate.monthAndDayVisibility =
                            monthAndDayVisibility;
                        user.birthDate.yearVisibility = yearVisibility;

                        await user.save();

                        status = "Your changes have been saved.";
                        ok = true;
                    } else {
                        status = "Can't find this user.";
                    }
                } catch (error) {
                    logger.error(error);

                    status =
                        "An error has occurred. Please try again later to update your birth date.";
                }
            }
        }

        return {
            errors,
            status,
            ok,
        };
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteSession(
        @Arg("sessionId") sessionId: string,
        @Ctx() { payload }: AuthContext
    ) {
        if (!payload) {
            logger.warn("Payload not provided.");

            return false;
        }

        if (!isUUID(sessionId)) {
            logger.warn("Session id not provided.");

            return false;
        }

        try {
            await this.sessionRepository.delete({
                sessionId,
                user: { id: payload.id },
            });

            return true;
        } catch (error) {
            logger.error(error);

            return false;
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteOtherSessions(@Ctx() { payload }: AuthContext) {
        if (!payload) {
            logger.warn("Payload not provided.");

            return false;
        }

        try {
            await this.sessionRepository.delete({
                sessionId: Not(payload.sessionId),
                user: { id: payload.id },
            });

            return true;
        } catch (error) {
            logger.error(error);

            return false;
        }
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

        if (!payload) {
            status = "You are not authenticated.";
        } else {
            if (incomingMessages === "") {
                errors.push({
                    field: "incomingMessages",
                    message:
                        "You cannot set the incoming messages field to this value",
                });
            } else {
                try {
                    await this.userRepository.update(
                        {
                            id: payload.id,
                        },
                        {
                            userSettings: {
                                incomingMessages,
                            },
                        }
                    );

                    status = "Your changes have been saved.";

                    ok = true;
                } catch (error) {
                    logger.error(error);

                    errors.push({
                        field: "incomingMessages",
                        message:
                            "An error has occurred. Please try again later to update your message settings",
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
    @UseMiddleware(isAuth)
    async editTwoFactorAuth(
        @Ctx() { payload }: AuthContext
    ): Promise<UserResponse> {
        let me;
        let status = "";
        let ok = false;

        if (payload) {
            try {
                me = await this.findUserById(payload.id);

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

                        const data = await ejs.renderFile(
                            path.join(
                                __dirname,
                                "../helpers/templates/EnableTFA.ejs"
                            ),
                            { otp: OTP, username }
                        );

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

                        await mailHelper.send(otpSESCommand);

                        me = undefined;

                        ok = true;
                    }
                } else {
                    status =
                        "An error has occurred while trying to fetch user data. Please try again later.";
                }
            } catch (error) {
                logger.error(error);

                status = "An error has occurred, please try again later.";
            }
        } else {
            status = "You're not authenticated.";
        }

        return {
            user: me,
            status,
            ok,
        };
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deactivateAccount(@Ctx() { res, payload }: AuthContext) {
        if (!payload) {
            logger.warn("Payload not provided.");

            return false;
        }

        try {
            const me = await this.userRepository.findOne({
                where: { id: payload.id },
                relations: ["sessions"],
            });

            if (!me) {
                return false;
            } else {
                await this.userRepository.softDelete({ id: me.id });

                await this.sessionRepository.delete({ user: { id: me.id } });

                sendRefreshToken(res, "");

                return true;
            }
        } catch (error) {
            logger.error(error);

            return false;
        }
    }

    @Mutation(() => Boolean, { nullable: true })
    @UseMiddleware(isAuth)
    async editHideSensitiveContentSetting(
        @Ctx() { payload }: AuthContext
    ): Promise<Boolean | null> {
        if (!payload) {
            logger.warn("Payload not provided.");

            return null;
        } else {
            try {
                const me = await this.findUserById(payload.id);

                if (me) {
                    me.searchSettings.hideSensitiveContent =
                        !me.searchSettings.hideSensitiveContent;

                    await me.save();

                    return me.searchSettings.hideSensitiveContent;
                } else {
                    return null;
                }
            } catch (error) {
                logger.error(error);

                return null;
            }
        }
    }

    @Mutation(() => Boolean, { nullable: true })
    @UseMiddleware(isAuth)
    async editHideBlockedAccountsSetting(
        @Ctx() { payload }: AuthContext
    ): Promise<Boolean | null> {
        if (!payload) {
            logger.warn("Payload not provided.");

            return null;
        } else {
            try {
                const me = await this.findUserById(payload.id);

                if (me) {
                    me.searchSettings.hideBlockedAccounts =
                        !me.searchSettings.hideBlockedAccounts;

                    await me.save();

                    return me.searchSettings.hideBlockedAccounts;
                } else {
                    return null;
                }
            } catch (error) {
                logger.error(error);

                return null;
            }
        }
    }

    @Mutation(() => Block, { nullable: true })
    @UseMiddleware(isAuth)
    async blockUser(
        @Arg("userId", () => Int, { nullable: true }) userId: number,
        @Arg("origin") origin: string,
        @Ctx() { payload }: AuthContext
    ): Promise<Block | null> {
        if (!payload || !userId) {
            logger.warn("Bad request.");

            return null;
        } else {
            try {
                const me = await this.findUserById(payload.id);

                if (me) {
                    const user = await this.findUserById(userId);

                    if (user) {
                        const isAffiliatedToMe =
                            await this.hasThisUserAsAffiliate(
                                userId,
                                payload.id
                            );
                        const isAnAffiliate = await this.hasThisUserAsAffiliate(
                            payload.id,
                            userId
                        );

                        if (isAffiliatedToMe || isAnAffiliate) {
                            logger.warn(
                                "Can't block someone when there is an affiliation."
                            );

                            return null;
                        }

                        const block = await this.blockRepository
                            .create({
                                blockedId: user.id,
                                userId: me.id,
                                origin,
                            })
                            .save();

                        await this.unfollowUser(user.id, {
                            payload,
                        } as AuthContext);

                        await this.followRepository.delete({
                            user: { id: me.id },
                            follower: { id: user.id },
                        });

                        const notification =
                            await this.notificationService.findNotification(
                                user.id,
                                me.id,
                                user.id,
                                USER_TYPES.USER,
                                NOTIFICATION_TYPES.FOLLOW
                            );

                        if (notification) {
                            pubSub.publish(
                                "DELETED_NOTIFICATION",
                                notification
                            );

                            await this.notificationService.deleteNotification(
                                notification.notificationId
                            );
                        }

                        return block;
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            } catch (error) {
                logger.error(error);

                return null;
            }
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async unblockUser(
        @Arg("blockedId", () => Int, { nullable: true }) blockedId: number,
        @Ctx() { payload }: AuthContext
    ) {
        if (!payload || !blockedId) {
            logger.warn("Bad request.");

            return false;
        }

        try {
            await this.blockRepository.delete({
                blockedId,
                userId: payload.id,
            });

            return true;
        } catch (error) {
            logger.error(error);

            return false;
        }
    }

    @Query(() => PaginatedBlockActions)
    @UseMiddleware(isAuth)
    async blockedUsers(
        @Ctx() { payload }: AuthContext,
        @Arg("limit", () => Int) limit: number,
        @Arg("cursor", () => String, { nullable: true }) cursor: string | null
    ): Promise<PaginatedBlockActions> {
        if (!payload) {
            logger.warn("Payload not provided.");

            return {
                blockActions: [],
                hasMore: false,
                totalCount: 0,
            };
        } else {
            try {
                const me = await this.findUserById(payload.id);

                if (me) {
                    const [blockActions, totalCount] = await Promise.all([
                        this.blockRepository.find({
                            where: {
                                userId: payload.id,
                                ...(cursor
                                    ? {
                                          createdAt: LessThan(
                                              new Date(parseInt(cursor))
                                          ),
                                      }
                                    : {}),
                            },
                            take: limit + 1,
                            order: { createdAt: "DESC" },
                        }),
                        this.blockRepository.count({
                            where: {
                                userId: payload.id,
                            },
                        }),
                    ]);

                    return {
                        blockActions: blockActions.slice(0, limit),
                        hasMore: blockActions.length === limit + 1,
                        totalCount,
                    };
                } else {
                    return {
                        blockActions: [],
                        hasMore: false,
                        totalCount: 0,
                    };
                }
            } catch (error) {
                logger.error(error);

                return {
                    blockActions: [],
                    hasMore: false,
                    totalCount: 0,
                };
            }
        }
    }

    @Query(() => Block, { nullable: true })
    @UseMiddleware(isAuth)
    async isUserBlockedByMe(
        @Arg("id", () => Int, { nullable: true }) id: number,
        @Ctx() { payload }: AuthContext
    ): Promise<Block | null> {
        if (!payload) {
            logger.warn("Payload not provided.");

            return null;
        }

        if (!id) {
            logger.warn("User id not provided.");

            return null;
        }

        try {
            const block = await this.userService.whoHasBlockedWho(
                id,
                payload.id
            );

            return block;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Query(() => Block, { nullable: true })
    @UseMiddleware(isAuth)
    async hasUserBlockedMe(
        @Arg("id", () => Int, { nullable: true }) id: number,
        @Ctx() { payload }: AuthContext
    ): Promise<Block | null> {
        if (!payload) {
            logger.warn("Payload not provided.");

            return null;
        }

        if (!id) {
            logger.warn("User id not provided.");

            return null;
        }

        try {
            const block = await this.userService.whoHasBlockedWho(
                payload.id,
                id
            );

            return block;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Query(() => UserDeviceToken, { nullable: true })
    async findUserDeviceTokenById(
        @Arg("id", () => Int, { nullable: true }) id: number,
        @Arg("userId", () => Int, { nullable: true }) userId: number
    ): Promise<UserDeviceToken | null> {
        if (!id) {
            logger.warn("Id not provided.");

            return null;
        }

        if (!userId) {
            logger.warn("User id not provided.");

            return null;
        }

        try {
            const userToken = await this.userDeviceTokenRepository.findOne({
                where: { id, userId },
            });

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
    async findUserDeviceTokensByUserId(
        @Arg("userId", () => Int, { nullable: true }) userId: number
    ): Promise<UserDeviceToken[] | null> {
        if (!userId) {
            logger.warn("User id not provided.");

            return null;
        }

        try {
            const tokens = await this.userDeviceTokenRepository.find({
                where: { userId },
            });

            return tokens;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Query(() => UserDeviceToken, { nullable: true })
    async findUserDeviceTokenByToken(
        @Arg("token") token: string,
        @Arg("userId", () => Int, { nullable: true }) userId: number
    ): Promise<UserDeviceToken | null> {
        if (token.length === 0) {
            logger.warn("Token not provided.");

            return null;
        }

        if (!userId) {
            logger.warn("User id not provided.");

            return null;
        }

        try {
            const userToken = await this.userDeviceTokenRepository.findOne({
                where: { token, userId },
            });

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
    async findUserDeviceTokenBySessionId(
        @Arg("sessionId") sessionId: string,
        @Arg("userId", () => Int, { nullable: true }) userId: number
    ): Promise<UserDeviceToken | null> {
        if (!isUUID(sessionId)) {
            logger.warn("Session id not provided.");

            return null;
        }

        if (!userId) {
            logger.warn("User id not provided.");

            return null;
        }

        try {
            const token = await this.userDeviceTokenRepository.findOne({
                where: { sessionId, userId },
            });

            if (!token) {
                logger.warn(
                    `Token for session with id "${sessionId}" not found.`
                );

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
        @Arg("token") token: string,
        @Ctx() { payload }: AuthContext
    ) {
        if (!payload) {
            logger.warn("Payload not provided.");

            return false;
        }

        try {
            const existingToken = await this.findUserDeviceTokenBySessionId(
                payload.sessionId,
                payload.id
            );

            if (existingToken) {
                await this.deleteDeviceToken(existingToken.id, {
                    payload,
                } as AuthContext);
            }

            if (token.length > 0) {
                await this.userDeviceTokenRepository
                    .create({
                        token,
                        userId: payload.id,
                        sessionId: payload.sessionId,
                    })
                    .save();

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

        if (!id) {
            logger.warn("Id not provided.");

            return false;
        }

        try {
            await this.userDeviceTokenRepository.delete({
                id,
                userId: payload.id,
            });

            return true;
        } catch (error) {
            logger.error(error);

            return false;
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteDeviceTokens(@Ctx() { payload }: AuthContext) {
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

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async createOrganization(
        @Arg("email") email: string,
        @Arg("username") username: string,
        @Arg("name") name: string,
        @Arg("password") password: string,
        @Arg("birthDate") birthDate: Date,
        @Ctx() { payload }: AuthContext
    ): Promise<UserResponse> {
        let errors = [];
        let ok = false;

        let status;

        if (!payload) {
            status = "You're not authenticated.";
        } else {
            if (!isEmail(email)) {
                errors.push({
                    field: "email",
                    message: "Invalid email",
                });
            }
            if (!isValidUserInput(username) || username.includes("@")) {
                errors.push({
                    field: "username",
                    message: "Invalid username",
                });
            }
            if (!isValidUserInput(password) || password.length <= 2) {
                errors.push({
                    field: "password",
                    message: "The password length must be greater than 2",
                });
            }
            if (!isValidUserInput(name)) {
                errors.push({
                    field: "name",
                    message: "The name field cannot be empty",
                });
            }

            try {
                const hashedPassword = await argon2.hash(password);
                const encriptedSecretKey = encrypt(uuidv4());

                const existingOrg = await this.userRepository.findOne({
                    where: {
                        email,
                        username,
                        type: USER_TYPES.ORGANIZATION,
                    },
                    withDeleted: true,
                });

                if (existingOrg && existingOrg.deletedAt !== null) {
                    if (processDays(existingOrg.deletedAt) <= 90) {
                        status = "account_deactivated";
                    } else {
                        await this.deleteAccountData(existingOrg.id);
                    }
                }

                if (errors.length === 0) {
                    const organization = await this.userRepository
                        .create({
                            username,
                            email,
                            password: hashedPassword,
                            name,
                            type: USER_TYPES.ORGANIZATION,
                            birthDate: {
                                date: birthDate,
                            },
                            secretKey: encriptedSecretKey,
                        })
                        .save();

                    await this.affiliationRepository
                        .create({
                            affiliationId: uuidv4(),
                            organizationId: organization.id,
                            userId: payload.id,
                            status: true,
                        })
                        .save();

                    const token = createAccessToken(organization);
                    const emailStatus = await sendVerificationEmail(
                        organization.email,
                        token
                    );

                    if (emailStatus) {
                        status =
                            "Check your inbox, we just sent you an email with the instructions to verify your organization account.";
                    } else {
                        status =
                            "An error has occurred while trying to send the verification email. Please try again later.";
                    }

                    ok = true;
                }
            } catch (error) {
                logger.error(error);

                if (
                    error.detail.includes("username") &&
                    error.code === "23505"
                ) {
                    errors.push({
                        field: "username",
                        message: "Username already taken",
                    });
                } else if (
                    error.detail.includes("email") &&
                    error.code === "23505"
                ) {
                    errors.push({
                        field: "email",
                        message: "A user using this email already exists",
                    });
                } else {
                    status =
                        "An unknown error has occurred, please try again later.";
                }
            }
        }

        return {
            errors,
            status,
            ok,
        };
    }

    @Query(() => Affiliation, { nullable: true })
    @UseMiddleware(isAuth)
    async findAffiliationRequest(
        @Arg("affiliationId") affiliationId: string,
        @Ctx() { payload }: AuthContext
    ): Promise<Affiliation | null> {
        if (!isUUID(affiliationId)) {
            logger.warn("Affiliation id not provided.");

            return null;
        }

        if (!payload) {
            logger.warn("Payload not provided.");

            return null;
        }

        try {
            const affiliation = await this.affiliationRepository.findOne({
                where: { affiliationId, userId: payload.id },
            });

            if (!affiliation) {
                logger.warn(
                    `Affiliation with affiliationId "${affiliationId}" not found.`
                );

                return null;
            }

            return affiliation;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Query(() => Affiliation, { nullable: true })
    async findAffiliationByUserId(
        @Arg("userId", () => Int, { nullable: true }) userId: number
    ): Promise<Affiliation | null> {
        if (!userId) {
            logger.warn("User id not provided.");

            return null;
        }

        try {
            const affiliation = await this.affiliationRepository.findOne({
                where: { userId },
            });

            if (!affiliation) {
                logger.warn(
                    `Affiliation of user with id "${userId}" not found.`
                );

                return null;
            }

            return affiliation;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Query(() => User, { nullable: true })
    async isAffiliatedTo(
        @Arg("id", () => Int, { nullable: true }) id: number
    ): Promise<User | null> {
        if (!id) {
            logger.warn("User id not provided.");

            return null;
        }

        try {
            const affiliation = await this.findAffiliationByUserId(id);

            if (!affiliation) {
                logger.warn(`Affiliation of user with id "${id}" not found.`);

                return null;
            }

            const organization = await this.findUserById(
                affiliation.organizationId,
                false
            );

            if (
                !organization ||
                organization.type !== USER_TYPES.ORGANIZATION
            ) {
                logger.warn(
                    `Organization with id "${affiliation.organizationId}" not found.`
                );

                return null;
            }

            return organization;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Query(() => Boolean)
    async hasThisUserAsAffiliate(
        @Arg("id", () => Int, { nullable: true }) id: number,
        @Arg("userId", () => Int, { nullable: true }) userId: number
    ) {
        if (!id) {
            logger.warn("Organization id not provided.");

            return false;
        }

        if (!userId) {
            logger.warn("User id not provided.");

            return false;
        }

        try {
            const organization = await this.findUserById(id, false);

            if (
                !organization ||
                (organization && organization.type !== USER_TYPES.ORGANIZATION)
            ) {
                logger.warn("Organization not found.");

                return false;
            }

            const affiliation = await this.affiliationRepository.findOne({
                where: {
                    organizationId: id,
                    userId,
                },
            });

            if (!affiliation) {
                logger.warn("Affiliation not found.");

                return false;
            }

            return true;
        } catch (error) {
            logger.error(error);

            return false;
        }
    }

    @Query(() => PaginatedAffiliations)
    async affiliates(
        @Arg("id", () => Int, { nullable: true }) id: number,
        @Arg("limit", () => Int) limit: number,
        @Arg("cursor", () => String, { nullable: true }) cursor: string | null
    ): Promise<PaginatedAffiliations> {
        if (!id) {
            logger.warn("User id not provided.");

            return {
                affiliations: [],
                hasMore: false,
                totalCount: 0,
            };
        } else {
            try {
                const organization = await this.findUserById(id, false);

                if (
                    organization &&
                    organization.type === USER_TYPES.ORGANIZATION
                ) {
                    const [affiliations, totalCount] = await Promise.all([
                        this.affiliationRepository.find({
                            where: {
                                organizationId: organization.id,
                                ...(cursor
                                    ? {
                                          createdAt: LessThan(
                                              new Date(parseInt(cursor))
                                          ),
                                      }
                                    : {}),
                            },
                            take: limit + 1,
                            order: { createdAt: "DESC" },
                        }),
                        this.affiliationRepository.count({
                            where: { organizationId: organization.id },
                        }),
                    ]);

                    return {
                        affiliations: affiliations.slice(0, limit),
                        hasMore: affiliations.length === limit + 1,
                        totalCount,
                    };
                } else {
                    return {
                        affiliations: [],
                        hasMore: false,
                        totalCount: 0,
                    };
                }
            } catch (error) {
                logger.error(error);

                return {
                    affiliations: [],
                    hasMore: false,
                    totalCount: 0,
                };
            }
        }
    }

    @Mutation(() => Affiliation, { nullable: true })
    @UseMiddleware(isAuth)
    async createAffiliation(
        @Arg("userId", () => Int, { nullable: true }) userId: number,
        @Ctx() { payload }: AuthContext
    ): Promise<Affiliation | null> {
        if (!payload) {
            logger.warn("Payload not provided.");

            return null;
        }

        if (!userId) {
            logger.warn("User id not provided.");

            return null;
        }

        try {
            const user = await this.findUserById(userId);
            const organization = await this.findUserById(payload.id, false);
            const existingAffiliation = await this.findAffiliationByUserId(
                userId
            );

            if (
                user &&
                organization &&
                organization.type === USER_TYPES.ORGANIZATION &&
                !existingAffiliation
            ) {
                const affiliation = await this.affiliationRepository
                    .create({
                        affiliationId: uuidv4(),
                        organizationId: organization.id,
                        userId: user.id,
                        status: false,
                    })
                    .save();

                const notification =
                    await this.notificationService.createNotification(
                        organization.id,
                        user.id,
                        affiliation.id,
                        "affiliation",
                        NOTIFICATION_TYPES.AFFILIATION,
                        `${organization.name} (@${organization.username}) wants you to become an affiliated account.`
                    );

                if (notification) {
                    pubSub.publish("NEW_NOTIFICATION", notification);

                    const tokens = await this.findUserDeviceTokensByUserId(
                        user.id
                    );
                    const pushNotification: FirebaseNotification = {
                        title: `New affiliation request on Zenith (for @${user.username})`,
                        body: notification.content,
                        imageUrl:
                            organization.profile.profilePicture.length > 0
                                ? organization.profile.profilePicture
                                : "https://assets.zncdn.net/static/profile-picture.png",
                    };
                    const link = `${process.env.CLIENT_ORIGIN}/affiliation/${affiliation.affiliationId}?n_id=${notification.notificationId}`;
                    await sendPushNotifications(
                        tokens as UserDeviceToken[],
                        pushNotification,
                        link,
                        {
                            username: user.username,
                            type: notification.notificationType,
                        }
                    );
                }
                return affiliation;
            } else {
                return null;
            }
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Mutation(() => Affiliation, { nullable: true })
    @UseMiddleware(isAuth)
    async manageAffiliation(
        @Arg("affiliationId") affiliationId: string,
        @Arg("accepted", { nullable: true }) accepted: boolean,
        @Ctx() { payload }: AuthContext
    ): Promise<Affiliation | null> {
        if (!payload) {
            logger.warn("Payload not provided.");

            return null;
        }

        if (!isUUID(affiliationId)) {
            logger.warn("Affiliation id not provided.");

            return null;
        }

        if (accepted === null) {
            return null;
        }

        try {
            const me = await this.findUserById(payload.id);
            const affiliation = await this.findAffiliationRequest(
                affiliationId,
                { payload } as AuthContext
            );

            if (me && affiliation) {
                if (accepted) {
                    affiliation.status = accepted;

                    await affiliation.save();

                    return affiliation;
                } else {
                    await this.affiliationRepository.delete({
                        affiliationId: affiliationId,
                    });

                    return null;
                }
            } else {
                return null;
            }
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async removeAffiliation(
        @Arg("affiliationId") affiliationId: string,
        @Ctx() { payload }: AuthContext
    ) {
        if (!payload) {
            logger.warn("Payload not provided.");

            return false;
        }

        if (!isUUID(affiliationId)) {
            logger.warn("Affiliation id not provided.");

            return false;
        }

        try {
            const affiliation = await this.findAffiliationRequest(
                affiliationId,
                { payload } as AuthContext
            );

            if (affiliation) {
                await this.affiliationRepository.delete({
                    affiliationId,
                    userId: payload.id,
                });

                const notification =
                    await this.notificationService.findNotification(
                        affiliation.organizationId,
                        payload.id,
                        affiliation.id,
                        "affiliation",
                        NOTIFICATION_TYPES.AFFILIATION
                    );

                if (notification) {
                    pubSub.publish("DELETED_NOTIFICATION", notification);

                    await this.notificationService.deleteNotification(
                        notification.notificationId
                    );
                }

                return true;
            } else {
                return false;
            }
        } catch (error) {
            logger.error(error);

            return false;
        }
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async requestVerification(
        @Arg("documents") documents: string,
        @Ctx() { payload }: AuthContext
    ): Promise<UserResponse> {
        let user: User | null = null;
        let status = "";
        let ok = false;

        let documentsArray = JSON.parse(documents);

        if (!payload) {
            status = "You are not authenticated.";
        } else {
            try {
                user = await this.findUserById(payload.id);

                if (user) {
                    const identityVerified =
                        user.identity.verified === VerificationStatus.VERIFIED;

                    if (!user.emailVerified) {
                        status = "Your email address is not verified.";
                    } else {
                        const affiliatedOrganization =
                            await this.isAffiliatedTo(user.id);

                        if (identityVerified || affiliatedOrganization) {
                            if (
                                identityVerified &&
                                user.verification.verified ===
                                    VerificationStatus.VERIFIED
                            ) {
                                status = "You're already verified.";
                            } else if (
                                identityVerified &&
                                user.verification.verified ===
                                    VerificationStatus.UNDER_REVIEW
                            ) {
                                status =
                                    "You've already submitted a verification request for your account.";
                            } else if (
                                identityVerified &&
                                documentsArray &&
                                documentsArray.length > 0
                            ) {
                                user.verification.outcome = "";
                                user.verification.documents = documentsArray;
                                user.verification.verified =
                                    VerificationStatus.UNDER_REVIEW;

                                await user.save();

                                status = "Verification request submitted.";
                            } else if (
                                (identityVerified ||
                                    user.type === USER_TYPES.ORGANIZATION) &&
                                affiliatedOrganization
                            ) {
                                const isOrganizationVerified =
                                    affiliatedOrganization.verification
                                        .verified ===
                                    VerificationStatus.VERIFIED;

                                if (isOrganizationVerified) {
                                    user.verification.verified =
                                        VerificationStatus.VERIFIED;
                                    (user.verification.verifiedSince =
                                        new Date()),
                                        (user.verification.outcome =
                                            "Verified through organization.");

                                    await user.save();
                                } else {
                                    status =
                                        "The organization you're affiliated to is not verified.";
                                }
                            } else {
                                status =
                                    "You need to upload the requested documents to verify your account on Zenith.";
                            }

                            ok = true;
                        } else {
                            status =
                                "You need to verify your identity on Zenith before submitting a verification request for your account.";
                        }
                    }
                } else {
                    status = "This user doesn't exist.";
                }
            } catch (error) {
                logger.error(error);

                status = "An error has occurred. Please try again later.";
            }
        }

        return {
            user,
            status,
            ok,
        };
    }

    @Mutation(() => UserResponse)
    @UseMiddleware(isAuth)
    async requestIdentityVerification(
        @Arg("country") country: string,
        @Arg("fullName") fullName: string,
        @Arg("entityIdentifier") entityIdentifier: string,
        @Arg("birthOrCreationDate") birthOrCreationDate: Date,
        @Arg("type") type: string,
        @Arg("documents") documents: string,
        @Ctx() { payload }: AuthContext
    ): Promise<UserResponse> {
        let user: User | null = null;
        let status = "";
        let ok = false;
        let errors: FieldError[] = [];

        let documentsArray = JSON.parse(documents);

        if (!isValidUserInput(fullName)) {
            errors.push({
                field: "fullName",
                message: "The full name field cannot be empty",
            });
        }

        if (!isValidUserInput(entityIdentifier)) {
            errors.push({
                field: "entity",
                message: "The identifier field cannot be empty",
            });
        }

        if (country === "Country" || country === "") {
            errors.push({
                field: "country",
                message: "The country field cannot take this value",
            });
        }

        let age = processBirthDate(birthOrCreationDate);

        if (type === USER_TYPES.USER && age < 13) {
            errors.push({
                field: "birthOrCreationDate",
                message: "Users under the age of 13 cannot use this platform",
            });
        }

        if (!payload) {
            status = "You are not authenticated.";
        } else {
            if (errors.length === 0) {
                try {
                    user = await this.findUserById(payload.id);

                    if (user) {
                        if (!user.emailVerified) {
                            status = "Your email address is not verified.";
                        } else {
                            if (
                                user.identity.verified ===
                                VerificationStatus.VERIFIED
                            ) {
                                status = "You're already verified.";
                            } else if (
                                user.identity.verified ===
                                VerificationStatus.UNDER_REVIEW
                            ) {
                                status =
                                    "You've already submitted an identity verification request for your account.";
                            } else if (
                                documentsArray &&
                                documentsArray.length > 0
                            ) {
                                user.identity.documents = documentsArray;
                                user.identity.outcome = "";
                                user.identity.country = country;
                                user.identity.fullName = fullName;
                                user.identity.entityIdentifier =
                                    entityIdentifier;
                                user.identity.birthOrCreationDate =
                                    birthOrCreationDate;
                                user.identity.verified =
                                    VerificationStatus.UNDER_REVIEW;

                                await user.save();

                                status =
                                    "Identity verification request submitted.";
                            } else {
                                status =
                                    "You need to upload the requested documents to verify your identity on Zenith.";
                            }

                            ok = true;
                        }
                    } else {
                        status = "This user doesn't exist.";
                    }
                } catch (error) {
                    logger.error(error);

                    status = "An error has occurred. Please try again later.";
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

    @Query(() => [User], { nullable: true })
    @UseMiddleware(isAuth)
    async usersToMention(
        @Arg("query", () => String) query: string,
        @Ctx() { payload }: AuthContext,
        @Arg("limit", () => Int) limit: number
    ): Promise<User[] | null> {
        const sanitizedQuery = query.replace(/[@#$]/g, "").trim();
        const likeQuery = `%${sanitizedQuery}%`;

        if (!payload) {
            logger.warn("User not authenticated.");

            return null;
        }

        try {
            const users = await this.userRepository
                .createQueryBuilder("user")
                .leftJoin(
                    Follow,
                    "follow",
                    "follow.followerId = :userId AND follow.userId = user.id",
                    { userId: payload.id }
                )
                .leftJoin(
                    Block,
                    "block1",
                    "block1.userId = :userId AND block1.blockedId = user.id",
                    { userId: payload.id }
                )
                .leftJoin(
                    Block,
                    "block2",
                    "block2.blockedId = :userId AND block2.userId = user.id",
                    { userId: payload.id }
                )
                .where("block1.id IS NULL AND block2.id IS NULL")
                .andWhere("user.id != :userId", { userId: payload.id })
                .andWhere(
                    new Brackets((qb) => {
                        qb.where("user.name ILIKE :query", {
                            query: `%${sanitizedQuery}%`,
                        }).orWhere("user.username ILIKE :query", {
                            query: `%${sanitizedQuery}%`,
                        });
                    })
                )
                .addSelect(
                    `
                    CASE
                        WHEN user.username ILIKE :exactQuery THEN 100
                        WHEN user.name ILIKE :exactQuery THEN 90
                        WHEN user.username ILIKE :query THEN 80
                        WHEN user.name ILIKE :query THEN 70
                        ELSE 0
                    END +
                    CASE
                        WHEN follow.id IS NOT NULL THEN 10
                        ELSE 0
                    END +
                    CASE
                        WHEN user.verification.verified = 'VERIFIED' THEN 5
                        ELSE 0
                    END
                `,
                    "score"
                )
                .orderBy("score", "DESC")
                .limit(limit)
                .setParameters({ exactQuery: sanitizedQuery, query: likeQuery })
                .getMany();

            return users;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }
}
