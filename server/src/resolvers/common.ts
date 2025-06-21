import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class FieldError {
    @Field()
    field: string;

    @Field()
    message: string;
}

@ObjectType()
export class FeedWrapper {
    @Field(() => Boolean)
    hasMore: boolean;

    @Field(() => Int, { nullable: true })
    totalCount?: number;
}
