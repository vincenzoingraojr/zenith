import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity("topics")
export class Topic extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column({ unique: true })
    name: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;
}

@ObjectType()
@Entity("topics-with-weights")
export class TopicWithWeight extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Int)
    @Column()
    topicId: number;

    @Field(() => Int)
    @Column()
    itemId: number;

    @Field(() => String)
    @Column()
    itemType: string;

    @Field(() => Int)
    @Column("int", { default: 100 })
    weight: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;
}