import {
    ComprehendClient,
    DetectSentimentCommand,
    DetectToxicContentCommand,
    DetectPiiEntitiesCommand,
    LanguageCode,
    SentimentType,
    ToxicContentType,
} from "@aws-sdk/client-comprehend";
import { logger } from "./logger";

interface ContentAnalysisResult {
    isAppropriate: boolean;
    reasons: string[];
    confidence: number;
    sentiment?: {
        type: SentimentType;
        confidence: number;
    };
    toxicity?: {
        labels: ToxicContentType[];
        maxConfidence: number;
    };
    piiDetected?: boolean;
}

interface FilterConfig {
    enableSentimentAnalysis: boolean;
    enableToxicityDetection: boolean;
    enablePiiDetection: boolean;
    sentimentThreshold: number;
    toxicityThreshold: number;
    maxTextLength: number;
}

const DEFAULT_CONFIG: FilterConfig = {
    enableSentimentAnalysis: true,
    enableToxicityDetection: true,
    enablePiiDetection: true,
    sentimentThreshold: 0.7, // Block if negative sentiment > 70%
    toxicityThreshold: 0.6, // Block if any toxicity > 60%
    maxTextLength: 5000, // AWS Comprehend limit
};

class EnhancedContentFilter {
    private client: ComprehendClient;
    private config: FilterConfig;
    private cache: Map<string, ContentAnalysisResult>;
    private cacheTimeout: number = 3600000; // 1 hour

    constructor(config: Partial<FilterConfig> = {}) {
        this.client = new ComprehendClient({
            region: process.env.AWS_REGION || "us-east-1",
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            },
        });

        this.config = { ...DEFAULT_CONFIG, ...config };
        this.cache = new Map();

        // Clean cache periodically
        setInterval(() => this.cleanCache(), this.cacheTimeout);
    }

    async analyzeContent(
        text: string,
        language: LanguageCode = LanguageCode.EN,
        customConfig?: Partial<FilterConfig>
    ): Promise<ContentAnalysisResult> {
        const effectiveConfig = customConfig
            ? { ...this.config, ...customConfig }
            : this.config;

        // Input validation
        if (!text || text.trim().length === 0) {
            return { isAppropriate: true, reasons: [], confidence: 1.0 };
        }

        // Truncate text if too long
        const processedText =
            text.length > effectiveConfig.maxTextLength
                ? text.substring(0, effectiveConfig.maxTextLength)
                : text;

        // Check cache first
        const cacheKey = this.getCacheKey(
            processedText,
            language,
            effectiveConfig
        );
        const cached = this.cache.get(cacheKey);
        if (cached) {
            return cached;
        }

        try {
            const result = await this.performAnalysis(
                processedText,
                language,
                effectiveConfig
            );

            // Cache the result
            this.cache.set(cacheKey, result);

            return result;
        } catch (error) {
            logger.error("Content analysis failed", {
                error,
                textLength: processedText.length,
            });

            // Fail-open: return appropriate if analysis fails
            return {
                isAppropriate: true,
                reasons: ["Analysis failed - defaulting to appropriate"],
                confidence: 0.0,
            };
        }
    }

    private async performAnalysis(
        text: string,
        language: LanguageCode,
        config: FilterConfig
    ): Promise<ContentAnalysisResult> {
        const analyses = await Promise.allSettled([
            config.enableSentimentAnalysis
                ? this.analyzeSentiment(text, language)
                : null,
            config.enableToxicityDetection
                ? this.detectToxicity(text, language)
                : null,
            config.enablePiiDetection ? this.detectPii(text, language) : null,
        ]);

        const result: ContentAnalysisResult = {
            isAppropriate: true,
            reasons: [],
            confidence: 1.0,
        };

        // Process sentiment analysis
        if (analyses[0].status === "fulfilled" && analyses[0].value) {
            const sentiment = analyses[0].value;
            result.sentiment = sentiment;

            if (
                sentiment.type === SentimentType.NEGATIVE &&
                sentiment.confidence > config.sentimentThreshold
            ) {
                result.isAppropriate = false;
                result.reasons.push(
                    `Negative sentiment detected (${(
                        sentiment.confidence * 100
                    ).toFixed(1)}%)`
                );
            }
        }

        // Process toxicity detection
        if (analyses[1].status === "fulfilled" && analyses[1].value) {
            const toxicity = analyses[1].value;
            result.toxicity = toxicity;

            if (toxicity.maxConfidence > config.toxicityThreshold) {
                result.isAppropriate = false;
                result.reasons.push(
                    `Toxic content detected: ${toxicity.labels.join(", ")} (${(
                        toxicity.maxConfidence * 100
                    ).toFixed(1)}%)`
                );
            }
        }

        // Process PII detection
        if (analyses[2].status === "fulfilled" && analyses[2].value) {
            result.piiDetected = analyses[2].value;

            if (analyses[2].value) {
                result.isAppropriate = false;
                result.reasons.push("Personal information detected");
            }
        }

        // Calculate overall confidence
        const validAnalyses = analyses.filter(
            (a) => a.status === "fulfilled" && a.value !== null
        );
        result.confidence =
            validAnalyses.length > 0
                ? validAnalyses.length / analyses.length
                : 0.0;

        return result;
    }

    private async analyzeSentiment(text: string, language: LanguageCode) {
        const command = new DetectSentimentCommand({
            Text: text,
            LanguageCode: language,
        });

        const response = await this.client.send(command);

        return {
            type: response.Sentiment!,
            confidence: this.getMaxConfidence(response.SentimentScore!),
        };
    }

    private async detectToxicity(text: string, language: LanguageCode) {
        const command = new DetectToxicContentCommand({
            TextSegments: [{ Text: text }],
            LanguageCode: language,
        });

        const response = await this.client.send(command);
        const results = response.ResultList?.[0];

        if (!results?.Labels || results.Labels.length === 0) {
            return { labels: [], maxConfidence: 0 };
        }

        const toxicLabels = results.Labels.filter(
            (label) => label.Score && label.Score > 0.5
        ).map((label) => label.Name as ToxicContentType);

        const maxConfidence = Math.max(
            ...results.Labels.map((label) => label.Score || 0)
        );

        return {
            labels: toxicLabels,
            maxConfidence,
        };
    }

    private async detectPii(
        text: string,
        language: LanguageCode
    ): Promise<boolean> {
        const command = new DetectPiiEntitiesCommand({
            Text: text,
            LanguageCode: language,
        });

        const response = await this.client.send(command);

        // Consider high-risk PII types
        const highRiskPiiTypes = [
            "SSN",
            "CREDIT_DEBIT_NUMBER",
            "BANK_ACCOUNT_NUMBER",
            "BANK_ROUTING",
            "PHONE",
            "EMAIL",
            "ADDRESS",
        ];

        const detectedPii = response.Entities?.filter(
            (entity) =>
                highRiskPiiTypes.includes(entity.Type!) &&
                (entity.Score || 0) > 0.7
        );

        return (detectedPii?.length || 0) > 0;
    }

    private getMaxConfidence(sentimentScore: any): number {
        return Math.max(
            sentimentScore.Positive || 0,
            sentimentScore.Negative || 0,
            sentimentScore.Neutral || 0,
            sentimentScore.Mixed || 0
        );
    }

    private getCacheKey(
        text: string,
        language: LanguageCode,
        config: FilterConfig
    ): string {
        // Create a hash of the text and configuration for caching
        const configHash = JSON.stringify({
            lang: language,
            sentiment: config.enableSentimentAnalysis,
            toxicity: config.enableToxicityDetection,
            pii: config.enablePiiDetection,
            sentThreshold: config.sentimentThreshold,
            toxThreshold: config.toxicityThreshold,
        });

        // Simple hash function
        const textHash = text.length > 100 ? text.substring(0, 100) : text;
        return `${textHash.replace(/\s+/g, "_")}_${configHash}`;
    }

    private cleanCache(): void {
        // In a real implementation, you'd want to track timestamps
        // For now, just clear the cache periodically
        if (this.cache.size > 1000) {
            this.cache.clear();
            logger.info("Content filter cache cleared");
        }
    }

    // Convenience method for backward compatibility
    async isContentAppropriate(
        text: string,
        language?: LanguageCode,
        config?: Partial<FilterConfig>
    ): Promise<boolean> {
        const result = await this.analyzeContent(text, language, config);
        return result.isAppropriate;
    }

    // Method to get detailed analysis
    async getDetailedAnalysis(
        text: string,
        language?: LanguageCode,
        config?: Partial<FilterConfig>
    ): Promise<ContentAnalysisResult> {
        return this.analyzeContent(text, language, config);
    }
}

// Create singleton instance
const contentFilter = new EnhancedContentFilter();

// Export convenience functions
export const enhancedContentFilter = async (
    text: string,
    language?: LanguageCode
): Promise<boolean> => {
    return contentFilter.isContentAppropriate(text, language);
};

export const getContentAnalysis = async (
    text: string,
    language?: LanguageCode,
    config?: Partial<FilterConfig>
): Promise<ContentAnalysisResult> => {
    return contentFilter.getDetailedAnalysis(text, language, config);
};

export { EnhancedContentFilter, FilterConfig, ContentAnalysisResult };
