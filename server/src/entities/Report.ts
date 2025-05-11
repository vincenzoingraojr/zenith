import { ReportStatus } from "../helpers/enums";
import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import { Column, Entity } from "typeorm";
import { BaseItem } from "./BaseItem";

registerEnumType(ReportStatus, {
    name: "ReportStatus",
    description: "Possible status of a report",
});

@ObjectType()
@Entity("reports")
export class Report extends BaseItem {
    @Field(() => String)
    @Column({ type: "uuid", unique: true })
    reportId: string;

    @Field(() => Int, { nullable: true, defaultValue: null })
    @Column({ nullable: true, default: null })
    authorId: number;

    @Field(() => String)
    @Column({ type: "uuid" })
    uniqueIdentifier: string;

    @Field(() => String)
    @Column()
    contentId: string;

    @Field(() => String)
    @Column()
    contentType: string;

    @Field(() => Int)
    @Column()
    categoryId: number;

    @Field(() => Int, { nullable: true, defaultValue: null })
    @Column({ nullable: true, default: null })
    subCategoryId: number;

    @Field(() => [Int], { nullable: true, defaultValue: [] })
    @Column({ type: "int", array: true, nullable: true, default: [] })
    additionalContentIds: number[];

    @Field(() => String, { nullable: true, defaultValue: null })
    @Column({ nullable: true, default: null })
    additionalContentType: string;

    @Field(() => ReportStatus)
    @Column({
        type: "enum",
        enum: ReportStatus,
        default: ReportStatus.OPEN,
    })
    status: ReportStatus;

    @Field(() => String, { nullable: true, defaultValue: null })
    @Column({ default: null, nullable: true })
    outcome: string;
}