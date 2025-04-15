import { MessageNotification, Notification } from "../entities/Notification";
import appDataSource from "../dataSource";
import { logger } from "../helpers/logger";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";

export class NotificationService {
    private readonly notificationRepository: Repository<Notification>;
    private readonly messageNotificationRepository: Repository<MessageNotification>;

    constructor() {
        this.notificationRepository = appDataSource.getRepository(Notification);
        this.messageNotificationRepository = appDataSource.getRepository(MessageNotification);
    }

    async findNotification(
        creatorId: number,
        recipientId: number,
        resourceId: number,
        resourceType: string,
        notificationType: string
    ): Promise<Notification | null> {
        try {
            const notification = await this.notificationRepository.findOne({
                where: {
                    creatorId,
                    recipientId,
                    resourceId,
                    resourceType,
                    notificationType,
                },
            });

            return notification || null;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }
    
    async createNotification(
        creatorId: number,
        recipientId: number,
        resourceId: number,
        resourceType: string,
        notificationType: string,
        content: string,
    ): Promise<Notification | null> {
        try {
            const newNotification = this.notificationRepository.create({
                notificationId: uuidv4(),
                creatorId,
                recipientId,
                resourceId,
                resourceType,
                notificationType,
                content,
            });

            await newNotification.save();

            return newNotification;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    async deleteNotification(
        notificationId: string,
    ): Promise<boolean> {
        try {
            const notification = await this.notificationRepository.findOne({
                where: {
                    notificationId,
                },
            });

            if (!notification) {
                logger.warn("Notification not found. Returning false.");

                return false;
            }

            await this.notificationRepository.remove(notification);

            return true;
        } catch (error) {
            logger.error(error);

            return false;
        }
    }

    async createMessageNotification(
        creatorId: number,
        recipientId: number,
        resourceId: number,
        resourceType: string,
        notificationType: string,
        content: string,
        chatId: string,
    ): Promise<MessageNotification | null> {
        try {
            const newNotification = this.messageNotificationRepository.create({
                notificationId: uuidv4(),
                creatorId,
                recipientId,
                resourceId,
                resourceType,
                notificationType,
                content,
                chatId,
            });

            await newNotification.save();

            return newNotification;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }
}