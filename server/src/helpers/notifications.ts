import {
    BatchResponse,
    MulticastMessage,
} from "firebase-admin/lib/messaging/messaging-api";
import * as admin from "firebase-admin";
import { UserDeviceToken } from "../entities/User";
import { Notification } from "firebase-admin/messaging";
import { logger } from "./logger";

const sendMulticastPushNotifications = async (
    message: MulticastMessage
): Promise<BatchResponse | undefined> => {
    try {
        const response = await admin.messaging().sendEachForMulticast(message);

        return response;
    } catch (error) {
        logger.error(error);

        return undefined;
    }
};

export const sendPushNotifications = async (
    tokens: UserDeviceToken[],
    notification: Notification,
    link: string,
    data?: { [key: string]: string }
) => {
    if (tokens.length === 0) {
        return;
    }

    const message: MulticastMessage = {
        tokens: tokens.map((deviceToken) => deviceToken.token),
        data: {
            title: notification.title as string,
            body: notification.body as string,
            icon: notification.imageUrl as string,
            link,
            ...data,
        },
    };

    return sendMulticastPushNotifications(message);
};
