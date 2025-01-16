import { LandingUser } from "../entities/LandingUser";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UserResolver, UserResponse } from "./UserResolver";
import { Repository } from "typeorm";
import ejs from "ejs";
import path from "path";
import appDataSource from "../dataSource";
import { SendEmailCommand, SendEmailCommandInput } from "@aws-sdk/client-ses";
import mailHelper from "../helpers/mail/mailHelper";
import { logger } from "../helpers/logger";
import { isEmail } from "class-validator";
import { isValidUserInput } from "../helpers/user/isValidUserInput";

@Resolver(LandingUser)
export class LandingUserResolver {
    private readonly landingUserRepository: Repository<LandingUser>;
    private readonly userResolver: UserResolver;

    constructor() {
        this.landingUserRepository = appDataSource.getRepository(LandingUser);
        this.userResolver = new UserResolver();
    }

    @Query(() => [LandingUser])
    landingUsers() {
        return this.landingUserRepository.find({
            order: {
                createdAt: "DESC",
            },
        });
    }

    @Mutation(() => UserResponse)
    async addLandingUser(
        @Arg("name") name: string,
        @Arg("email") email: string,
        @Arg("username") username: string
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
        if (!isValidUserInput(name)) {
            errors.push({
                field: "name",
                message: "The name field cannot be empty",
            });
        }

        let status;

        try {
            const existingUserWithUsername = await this.userResolver.findUser(username);
            const existingUserWithEmail = await this.userResolver.findUserByEmail(email);

            const existingLandingUserWithEmail = await this.landingUserRepository.findOne({ where: { email } });
            const existingLandingUserWithUsername = await this.landingUserRepository.findOne({ where: { username } });

            if (existingUserWithEmail || existingLandingUserWithEmail) {
                errors.push({
                    field: "email",
                    message: "A user using this email already exists",
                });
            }

            if (existingUserWithUsername || existingLandingUserWithUsername) {
                errors.push({
                    field: "username",
                    message: "Username already taken",
                });
            }

            if (errors.length === 0) {
                await this.landingUserRepository.create({
                    name,
                    username,
                    email,
                }).save();

                const welcomeUserData = await ejs.renderFile(
                    path.join(__dirname, "../helpers/templates/WelcomeUser.ejs"),
                    { name, username }
                );

                const welcomeUserParams: SendEmailCommandInput = {
                    Destination: {
                        ToAddresses: [email],
                    },
                    Message: {
                        Body: {
                            Html: {
                                Data: welcomeUserData,
                            },
                        },
                        Subject: {
                            Data: "Welcome to Zenith",
                        },
                    },
                    Source: "noreply@zenith.to",
                };

                const welcomeUserSESCommand = new SendEmailCommand(welcomeUserParams);

                await mailHelper.send(welcomeUserSESCommand);

                const notifyCreatorData = await ejs.renderFile(
                    path.join(__dirname, "../helpers/templates/NotifyCreator.ejs"),
                    { name, email, username }
                );

                const notifyCreatorParams: SendEmailCommandInput = {
                    Destination: {
                        ToAddresses: [process.env.PERSONAL_EMAIL as string],
                    },
                    Message: {
                        Body: {
                            Html: {
                                Data: notifyCreatorData,
                            },
                        },
                        Subject: {
                            Data: "Another user has signed up to the platform",
                        },
                    },
                    Source: "noreply@zenith.to",
                };

                const notifyCreatorSESCommand = new SendEmailCommand(notifyCreatorParams);

                await mailHelper.send(notifyCreatorSESCommand);

                status = "You are now signed up. You will be notified when the platform is completed.";

                ok = true;
            }
        } catch (error) {
            logger.error(error);

            if (error.detail.includes("username") && error.code === "23505") {
                errors.push({
                    field: "username",
                    message: "Username already taken",
                });
            } else if (error.detail.includes("email") && error.code === "23505") {
                errors.push({
                    field: "email",
                    message: "A user using this email already exists",
                });
            } else {
                status = "An unknown error has occured, please try again later.";
            }
        }

        return {
            status,
            errors,
            ok,
        };
    }
}
