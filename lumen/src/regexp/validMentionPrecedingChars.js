// Copyright 2024 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

const validMentionPrecedingChars = /(?:^|[^a-zA-Z0-9_!#$%&*@＠]|(?:^|[^a-zA-Z0-9_+~.-])(?:rt|RT|rT|Rt):?)/;
export default validMentionPrecedingChars;
