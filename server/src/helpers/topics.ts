import { Topic } from "../entities/Topic";
import appDataSource from "../dataSource";
import { logger } from "./logger";

export async function seedTopics() {
    const topicRepository = appDataSource.getRepository(Topic);

    const initialTopics = [
        "Technology",
        "Sports",
        "Entertainment",
        "Politics",
        "Health",
        "Education",
        "Travel",
        "Science",
        "Business",
        "Lifestyle",
        "Food",
        "Music",
        "Art",
        "History",
        "Environment",
        "Literature",
        "Movies",
        "Gaming",
        "Fashion",
    ];

    for (const topicName of initialTopics) {
        try {
            let topic = await topicRepository.findOne({
                where: { name: topicName },
            });

            if (!topic) {
                topic = topicRepository.create({ name: topicName });
                await topicRepository.save(topic);
            }
        } catch (error) {
            logger.error(error);
        }
    }
}
