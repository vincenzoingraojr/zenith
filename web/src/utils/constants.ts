export const BAD_REQUEST_MESSAGE = "Bad request. Please try again.";

export const genderOptions = [
    { value: "Gender", label: "Gender" },
    { value: "Female", label: "Female" },
    { value: "Male", label: "Male" },
    { value: "Non-binary", label: "Non-binary" },
];

export const USER_TYPES = Object.freeze({
    USER: "user",
    ORGANIZATION: "organization",
});

export const POST_TYPES = Object.freeze({
    POST: "post",
    ARTICLE: "article",
    COMMENT: "comment",
    REPOST: "repost",
    ADVERTISEMENT: "advertisement",
});

const URL_MATCHER =
    /((https?:\/\/(www\.)?)|(www\.))?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

export const MATCHERS = [
    (text: string) => {
        const match = URL_MATCHER.exec(text);
        if (match === null) {
            return null;
        }

        const fullMatch = match[0];

        return {
            index: match.index,
            length: fullMatch.length,
            text: fullMatch,
            url: fullMatch.startsWith("http")
                ? fullMatch
                : `https://${fullMatch}`,
            attributes: { rel: "noopener", target: "_blank" },
        };
    },
];

export const EMPTY_CONTENT_REGEXP = /^\s+\S*/;