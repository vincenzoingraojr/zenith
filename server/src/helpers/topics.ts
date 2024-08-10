import { Topic } from "../entities/Topic";
import appDataSource from "../dataSource";

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
        "Fashion"
    ];
    
    for (const topicName of initialTopics) {
        let topic = await topicRepository.findOne({ where: { name: topicName } });

        if (!topic) {
            topic = topicRepository.create({ name: topicName });
            await topicRepository.save(topic);
        }
    }
}