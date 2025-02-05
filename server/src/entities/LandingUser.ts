import { Field, ObjectType } from "type-graphql";
import {
    Entity,
    Column,
} from "typeorm";
import { BaseItem } from "./BaseItem";

@ObjectType()
@Entity("landing-users")
export class LandingUser extends BaseItem {
    @Field(() => String)
    @Column()
    name: string;

    @Field(() => String)
    @Column({ unique: true })
    username: string;

    @Field(() => String)
    @Column({ unique: true })
    email: string;
}
