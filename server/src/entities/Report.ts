import { ReportStatus } from "../helpers/enums";
import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

registerEnumType(ReportStatus, {
    name: "ReportStatus",
    description: "Possible status of a report",
});

@ObjectType()
@Entity("reports")
export class Report extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String, { nullable: false })
    @Column({ type: "uuid", unique: true, nullable: false })
    reportId: string;

    @Field(() => Number, { nullable: false })
    @Column({ nullable: false })
    authorId: number;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    contentId: string;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    contentType: string;

    @Field(() => Int, { nullable: false })
    @Column({ nullable: false })
    categoryId: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    subCategoryId: number;

    @Field(() => [Int], { nullable: true, defaultValue: [] })
    @Column({ type: "int", array: true, nullable: true, default: [] })
    additionalContentIds: number[];

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    additionalContentType: string;

    @Field(() => String, { nullable: false })
    @CreateDateColumn({ nullable: false })
    createdAt: Date;

    @Field(() => String, { nullable: false })
    @UpdateDateColumn({ nullable: false })
    updatedAt: Date;

    @Field(() => ReportStatus)
    @Column({
        type: "enum",
        enum: ReportStatus,
        default: ReportStatus.OPEN,
    })
    status: ReportStatus;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    outcome: string;
}