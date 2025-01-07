// Copyright 2025 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

const nonBmpCodePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/gm;
export default nonBmpCodePairs;
