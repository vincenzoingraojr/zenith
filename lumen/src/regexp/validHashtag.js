// Copyright 2025 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import hashSigns from './hashSigns';
import hashtagAlpha from './hashtagAlpha';
import hashtagAlphaNumeric from './hashtagAlphaNumeric';
import hashtagBoundary from './hashtagBoundary';
import regexSupplant from '../lib/regexSupplant';

const validHashtag = regexSupplant(
  /(#{hashtagBoundary})(#{hashSigns})(?!\uFE0F|\u20E3)(#{hashtagAlphaNumeric}*#{hashtagAlpha}#{hashtagAlphaNumeric}*)/gi,
  { hashtagBoundary, hashSigns, hashtagAlphaNumeric, hashtagAlpha }
);

export default validHashtag;
