import { logger } from "../helpers/logger";
import appDataSource from "../dataSource";
import { Follow, User } from "../entities/User";
import { In, Repository } from "typeorm";
import { isValidUserInput } from "../helpers/user/isValidUserInput";
import { isEmail } from "class-validator";

export class UserService {
    private readonly userRepository: Repository<User>;
    private readonly followRepository: Repository<Follow>;

    constructor() {
        this.userRepository = appDataSource.getRepository(User);
        this.followRepository = appDataSource.getRepository(Follow);
    }

    async findUser(username: string, deleted: boolean = false): Promise<User | null> {
        if (!isValidUserInput(username)) {
            logger.warn("Invalid username.");

            return null;
        }
    
        try {
            const user = await this.userRepository.findOne({ where: { username }, withDeleted: deleted });
            
            if (!user) {
                logger.warn(`User with username "${username}" not found.`);

                return null;
            }
    
            return user;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    async findUserById(id: number, deleted: boolean = false): Promise<User | null> {
        if (!id) {
            logger.warn("Id not provided.");

            return null;
        }

        try {
            const user = await this.userRepository.findOne({ where: { id }, withDeleted: deleted });

            if (!user) {
                logger.warn(`User with id "${id}" not found.`);

                return null;
            }

            return user;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    async findUsersById(ids: number[], deleted: boolean = false): Promise<User[] | null> {
        if (ids.length === 0) {
            logger.warn("Ids not provided.");

            return null;
        }

        try {
            const users = await this.userRepository.find({ where: { id: In(ids) }, withDeleted: deleted });

            return users;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    async findUserByEmail(email: string, deleted: boolean = false): Promise<User | null> {
        const valid = isEmail(email);

        if (!valid) {
            logger.warn("The provided email address is not valid.");

            return null;
        }

        try {
            const user = await this.userRepository.findOne({ where: { email }, withDeleted: deleted || false });

            if (!user) {
                logger.warn(`User with email "${email}" not found.`);

                return null;
            }

            return user;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }

    async getFollowers(
        id?: number,
        offset?: number,
        limit?: number
    ): Promise<User[] | null> {
        if (!id) {
            logger.warn("User id not provided.");

            return null;
        }

        try {
            const followRelations = await this.followRepository.find({ where: { user: { id } }, relations: ["follower", "user"], take: limit, skip: offset, order: { createdAt: "DESC" } });

            const users = followRelations.map(follow => follow.follower);

            return users;
        } catch (error) {
            logger.error(error);

            return null;
        }
    }
}