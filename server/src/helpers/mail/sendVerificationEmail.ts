import ejs from "ejs";
import path from "path";
import { SendEmailCommand, SendEmailCommandInput } from "@aws-sdk/client-ses";
import mailHelper from "./mailHelper";
import { logger } from "../logger";

export const sendVerificationEmail = (
    email: string,
    token: string
) => {
    const link = `${process.env.CLIENT_ORIGIN}/verify/${token}`;

    ejs.renderFile(
        path.join(__dirname, "./templates/VerifyEmail.ejs"),
        { link },
        function (error, data) {
            if (error) {
                logger.error(error);
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
                            Data: "Verify your account",
                        },
                    },
                    Source: "noreply@zenith.to",
                };

                const sesCommand = new SendEmailCommand(params);

                mailHelper.send(sesCommand)
                    .then(() => {
                        logger.warn("Email sent.");
                    })
                    .catch((error) => {
                        logger.error(error);
                    });
            }
        }
    );
};
