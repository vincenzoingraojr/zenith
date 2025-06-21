import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class SubCategoryOption {
    @Field(() => Int, { nullable: false })
    categoryId: number;

    @Field(() => Int, { nullable: false })
    id: number;

    @Field(() => String, { nullable: false })
    title: string;

    @Field(() => String, { nullable: true, defaultValue: "" })
    description?: string;

    constructor(
        categoryId: number,
        id: number,
        title: string,
        description?: string
    ) {
        this.categoryId = categoryId;
        this.id = id;
        this.title = title;
        this.description = description || "";
    }
}

@ObjectType()
export class ReportOption {
    @Field(() => Int, { nullable: false })
    id: number;

    @Field(() => String, { nullable: false })
    title: string;

    @Field(() => String, { nullable: false, defaultValue: "" })
    description: string;

    @Field(() => [SubCategoryOption], { nullable: true })
    subcategories?: SubCategoryOption[];

    constructor(
        id: number,
        title: string,
        description?: string,
        subcategories?: SubCategoryOption[]
    ) {
        this.id = id;
        this.title = title;
        this.description = description || "";
        this.subcategories = subcategories;
    }
}

const reportData = [
    {
        id: 1,
        title: "Hate",
        description:
            "Choose this category if you're reporting racist or sexist comments, dehumanization, hate incitement, hateful references or symbols, violent threats or wish of harm.",
        subcategories: [
            {
                categoryId: 1,
                id: 1,
                title: "Racist or sexist comments",
                description:
                    "This includes derogatory remarks or slurs based on race, ethnicity, gender, or sex.",
            },
            {
                categoryId: 1,
                id: 2,
                title: "Dehumanization",
                description:
                    "This involves content that treats people as less than human, often comparing them to animals or objects.",
            },
            {
                categoryId: 1,
                id: 3,
                title: "Incitement",
                description:
                    "This involves encouraging others to engage in violent or hateful actions.",
            },
            {
                categoryId: 1,
                id: 4,
                title: "Hateful references or symbols",
                description:
                    "This includes the use of symbols, images, or references that promote hate or intolerance.",
            },
            {
                categoryId: 1,
                id: 5,
                title: "Violent threats",
                description:
                    "This includes explicit threats of physical violence or harm towards individuals or groups.",
            },
            {
                categoryId: 1,
                id: 6,
                title: "Wish of harm",
                description:
                    "This involves expressing a desire or wish for someone to experience harm or misfortune.",
            },
        ],
    },
    {
        id: 2,
        title: "Spam",
        description:
            "Choose this category if you're reporting fake engagement, scams, malicious links or fake accounts.",
        subcategories: [
            {
                categoryId: 2,
                id: 7,
                title: "Fake engagement",
                description:
                    "This includes artificially inflating metrics such as likes, follows, or shares to mislead others.",
            },
            {
                categoryId: 2,
                id: 8,
                title: "Scams",
                description:
                    "This involves deceptive schemes designed to trick people out of money or personal information.",
            },
            {
                categoryId: 2,
                id: 9,
                title: "Malicious links",
                description:
                    "This includes links that lead to harmful websites, phishing attempts, or malware.",
            },
            {
                categoryId: 2,
                id: 10,
                title: "Fake accounts",
                description:
                    "This involves accounts created with false information or to impersonate others.",
            },
        ],
    },
    {
        id: 3,
        title: "Abuse and harassment",
        description:
            "Choose this category if you're reporting insults, targeted or incited harassment, or unwanted sexual or graphic content.",
        subcategories: [
            {
                categoryId: 3,
                id: 11,
                title: "Insults",
                description:
                    "This includes offensive name-calling or derogatory remarks intended to demean someone.",
            },
            {
                categoryId: 3,
                id: 12,
                title: "Targeted harassment",
                description:
                    "This involves persistent actions aimed at intimidating, harming, or distressing an individual or group.",
            },
            {
                categoryId: 3,
                id: 13,
                title: "Incited harassment",
                description:
                    "This includes encouraging others to harass or abuse a specific individual or group.",
            },
            {
                categoryId: 3,
                id: 14,
                title: "Child abuse",
                description:
                    "This involves any content depicting or promoting the abuse or exploitation of minors.",
            },
            {
                categoryId: 3,
                id: 15,
                title: "Sexualization of minors",
                description:
                    "This includes any sexual content involving minors, including images or discussions.",
            },
            {
                categoryId: 3,
                id: 16,
                title: "Unwanted sexual content",
                description:
                    "This involves unsolicited or non-consensual sharing of sexual content.",
            },
            {
                categoryId: 3,
                id: 17,
                title: "Unwanted graphic content",
                description:
                    "This includes violent or gory images that are shared without consent or context.",
            },
        ],
    },
    {
        id: 4,
        title: "Privacy",
        description:
            "Choose this category if you're reporting privacy violations.",
        subcategories: [
            {
                categoryId: 4,
                id: 18,
                title: "Sharing private information",
                description:
                    "This involves sharing personal details like addresses, phone numbers, or financial information without consent.",
            },
            {
                categoryId: 4,
                id: 19,
                title: "Threatening to expose private information",
                description:
                    "This includes threats to reveal someone's private information as a means of coercion or intimidation.",
            },
            {
                categoryId: 4,
                id: 20,
                title: "Sharing non-consensual images",
                description:
                    "This involves distributing images or videos of someone without their permission, particularly if they are intimate in nature.",
            },
        ],
    },
    {
        id: 5,
        title: "Suicide or self-harm",
        description:
            "Choose this category if you're reporting a user or content that is related to self-harm or suicide.",
        subcategories: [
            {
                categoryId: 5,
                id: 21,
                title: "Sharing methods that would help people self-harm",
                description:
                    "This involves describing or sharing techniques that could be used for self-harm.",
            },
            {
                categoryId: 5,
                id: 22,
                title: "This user may be in danger",
                description:
                    "This includes posts where the user expresses suicidal thoughts or intentions, indicating they may be at risk.",
            },
        ],
    },
    {
        id: 6,
        title: "Impersonation",
        description:
            "Choose this category if you're reporting impersonation cases.",
        subcategories: [
            {
                categoryId: 6,
                id: 23,
                title: "Pretending to be me or my brand",
                description:
                    "This involves someone falsely representing themselves as you or your brand.",
            },
            {
                categoryId: 6,
                id: 24,
                title: "Someone else on Zenith",
                description:
                    "This includes impersonating other users, public figures, or organizations.",
            },
        ],
    },
];

const altReportDate = [
    {
        id: 1,
        title: "Spam",
        description:
            "Choose this option if you're reporting something that may be considered spam.",
    },
    {
        id: 2,
        title: "Abusive or harmful",
        description:
            "Choose this option if you're reporting something that is abusive or harmful.",
        subcategories: [
            {
                categoryId: 2,
                id: 1,
                title: "Being disrespectful or offensive",
            },
            {
                categoryId: 2,
                id: 2,
                title: "Posting my private information",
            },
            {
                categoryId: 2,
                id: 3,
                title: "Engaging in targeted harassment",
            },
            {
                categoryId: 2,
                id: 4,
                title: "Directing hate against a protected category",
            },
            {
                categoryId: 2,
                id: 5,
                title: "Threatening violence or physical harm",
            },
            {
                categoryId: 2,
                id: 6,
                title: "Encouraging or contemplating suicide or self-harm",
            },
        ],
    },
];

function transformToReportOption(json: any): ReportOption {
    const subcategories = json.subcategories?.map(
        (sub: any) =>
            new SubCategoryOption(
                sub.categoryId,
                sub.id,
                sub.title,
                sub.description
            )
    );
    return new ReportOption(
        json.id,
        json.title,
        json.description,
        subcategories
    );
}

export const reportOptions = reportData.map(transformToReportOption);

export const altReportOptions = altReportDate.map(transformToReportOption);
