// Copyright 2025 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

const validateUrlUnicodeSubDomainSegment = /(?:(?:[a-z0-9]|[^\u0000-\u007f])(?:(?:[a-z0-9_\-]|[^\u0000-\u007f])*(?:[a-z0-9]|[^\u0000-\u007f]))?)/i;
export default validateUrlUnicodeSubDomainSegment;
