import { isAuth } from "../middleware/isAuth";
import { Report } from "../entities/Report";
import { Arg, Ctx, Field, Int, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { AuthContext } from "../types";
import { Repository } from "typeorm";
import appDataSource from "../dataSource";
import { v4 as uuidv4 } from "uuid";
import { altReportOptions, ReportOption, reportOptions } from "../helpers/reportData";

@ObjectType()
export class ReportResponse {
    @Field(() => Report, { nullable: true })
    report?: Report | null;

    @Field(() => String, { nullable: true })
    status?: string;
}

@Resolver(Report)
export class ReportResolver {
    private readonly reportRepository: Repository<Report>;

    constructor() {
        this.reportRepository = appDataSource.getRepository(Report);
    }

    @Mutation(() => ReportResponse)
    @UseMiddleware(isAuth)
    async createReport(
        @Arg("contentId", () => String) contentId: string,
        @Arg("contentType") contentType: string,
        @Arg("categoryId", () => Int) categoryId: number, 
        @Arg("subCategoryId", () => Int, { nullable: true }) subCategoryId: number,
        @Ctx() { payload }: AuthContext,
        @Arg("additionalContentIds", () => [Int], { nullable: true }) additionalContentIds?: number[],
        @Arg("additionalContentType", { nullable: true }) additionalContentType?: string,
    ): Promise<ReportResponse> {
        let status = "";
        
        if (!payload) {
            status = "You're not authenticated.";
        } else {
            await this.reportRepository.create({
                reportId: uuidv4(),
                authorId: payload.id,
                contentId,
                contentType,
                categoryId,
                subCategoryId,
                additionalContentIds,
                additionalContentType,
            }).save().then(() => {
                status = "Your report has been submitted.";
            }).catch((error) => {
                console.error(error);
                status = "An error has occurred, please try again later.";
            });
        }

        return {
            status
        };
    }

    @Query(() => [ReportOption])
    @UseMiddleware(isAuth)
    reportOptions(
        @Arg("type", { nullable: true }) type: string,
        @Ctx() { payload }: AuthContext,
    ) {
        if (payload) {
            if (type === "user" || type === "post") {
                return reportOptions;
            } else {
                return altReportOptions;
            }
        } else {
            return [];
        }
    }
}