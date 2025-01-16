import { Field, Int, ObjectType } from "type-graphql";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    BaseEntity,
} from "typeorm";

@ObjectType()
@Entity("landing-users")
export class LandingUser extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    name: string;

    @Field(() => String)
    @Column({ unique: true })
    username: string;

    @Field(() => String)
    @Column({ unique: true })
    email: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;
}
