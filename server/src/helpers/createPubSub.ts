import { createPubSub } from "@graphql-yoga/subscription";
import { MessageNotification, Notification } from "../entities/Notification";
import { Chat, ChatUser, Message, MessageOrEvent } from "../entities/Message";
import { User } from "../entities/User";
import { Post } from "../entities/Post";

export const pubSub = createPubSub<{
    NEW_NOTIFICATION: [Notification];
    DELETED_NOTIFICATION: [Notification];
    NEW_CHAT: [Chat];
    NEW_MESSAGE_OR_EVENT: [typeof MessageOrEvent];
    DELETED_MESSAGE_OR_EVENT: [typeof MessageOrEvent];
    ADDED_CHAT_USERS: [User[]];
    DELETED_CHAT_USER: [User];
    EDITED_CHAT_USER: [ChatUser];
    EDITED_CHAT_INFO: [Chat];
    NEW_CHAT_NOTIFICATION: [MessageNotification];
    DELETED_CHAT_NOTIFICATION: [MessageNotification];
    EDITED_MESSAGE: [Message];
    EDITED_POST: [Post];
}>();
