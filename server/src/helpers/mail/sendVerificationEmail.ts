import ejs from "ejs";
import path from "path";
import { SendEmailCommand, SendEmailCommandInput } from "@aws-sdk/client-ses";
import mailHelper from "./mailHelper";
import { logger } from "../logger";

export const sendVerificationEmail = async (
    email: string,
    token: string
): Promise<boolean> => {
    const link = `${process.env.CLIENT_ORIGIN}/verify/${token}`;

    try {
        const data = await ejs.renderFile(
            path.join(__dirname, "../templates/VerifyEmail.ejs"),
            { link }
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
                    Data: "Verify your account",
                },
            },
            Source: "noreply@zenith.to",
        };

        const sesCommand = new SendEmailCommand(params);
        await mailHelper.send(sesCommand);

        logger.info("Email sent.");

        return true;
    } catch (error) {
        logger.error(error);

        return false;
    }
};