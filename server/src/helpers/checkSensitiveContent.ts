import { ComprehendClient, DetectSentimentCommand, DetectSentimentCommandInput, LanguageCode } from "@aws-sdk/client-comprehend";
import { logger } from "./logger";

export async function checkSensitiveContent(text: string, lang: LanguageCode | undefined): Promise<boolean> {
    const client = new ComprehendClient({ 
        region: "us-east-1",
        credentials: {
            accessKeyId: process.env.COMPREHEND_KEY_ID!,
            secretAccessKey: process.env.COMPREHEND_SECRET_KEY!,
        },
    });
    
    const params: DetectSentimentCommandInput = {
        Text: text,
        LanguageCode: lang,
    };

    try {
        const command = new DetectSentimentCommand(params);
        const response = await client.send(command);
        const sentiment = response.Sentiment;

        return sentiment === "NEGATIVE";
    } catch (error) {
        logger.error(error);
        return false;
    }
}