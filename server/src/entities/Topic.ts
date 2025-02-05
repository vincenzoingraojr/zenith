import { Field, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import { BaseItem } from "./BaseItem";

@ObjectType()
@Entity("topics")
export class Topic extends BaseItem {
    @Field(() => String)
    @Column({ unique: true })
    name: string;
}
