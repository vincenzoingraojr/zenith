import { Brackets } from "typeorm";
import appDataSource from "../../dataSource";
import { Chat } from "../../entities/Message";
import { logger } from "../logger";
import { CHAT_TYPES } from "./chatTypes";

export async function findChatsById(id?: number): Promise<Chat[] | null> {
    const chatRepository = appDataSource.getRepository(Chat);

    if (!id) {
        logger.warn("User not authenticated.");

        return null;
    }

    try {
        const userChats = await chatRepository
            .createQueryBuilder("chat")
            .leftJoinAndSelect("chat.users", "user")
            .where("user.userId = :userId", { userId: id })
            .andWhere(
                new Brackets(qb => {
                    qb.where("chat.type = :chatTypeGroup", { chatTypeGroup: CHAT_TYPES.GROUP })
                    .orWhere("chat.type = :chatTypeChat AND user.inside = :inside", { chatTypeChat: CHAT_TYPES.CHAT, inside: true });
                })
            )
            .orderBy("chat.updatedAt", "DESC")
            .getMany();

        return userChats;
    } catch (error) {
        logger.error(error);

        return null;
    }
}