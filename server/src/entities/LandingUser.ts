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

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    firstName: string;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    lastName: string;

    @Field(() => String, { nullable: false })
    @Column({ unique: true, nullable: false })
    username: string;

    @Field(() => String, { nullable: false })
    @Column({ unique: true, nullable: false })
    email: string;

    @Field(() => String, { nullable: false })
    @CreateDateColumn({ nullable: false })
    createdAt: Date;
}
