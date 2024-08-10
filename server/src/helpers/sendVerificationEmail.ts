import ejs from "ejs";
import path from "path";
import { SendEmailCommand, SendEmailCommandInput } from "@aws-sdk/client-ses";
import mailHelper from "./mailHelper";

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
                            Data: "Verify your account",
                        },
                    },
                    Source: "noreply@zenith.to",
                };

                const sesCommand = new SendEmailCommand(params);

                mailHelper.send(sesCommand)
                    .then(() => {
                        console.log("Email sent.");
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        }
    );
};
