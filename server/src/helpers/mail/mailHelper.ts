import { SESClient, SESClientConfig } from "@aws-sdk/client-ses";

const sesConfig: SESClientConfig = {
    credentials: {
        accessKeyId: process.env.SES_KEY_ID!,
        secretAccessKey: process.env.SES_SECRET_KEY!,
    },
    region: "us-east-1",
};

const mailHelper = new SESClient(sesConfig);

export default mailHelper;
