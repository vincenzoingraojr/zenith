// Copyright 2025 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import configs from './configs';
import getTextLength from './getTextLength';
import hasInvalidCharacters from './hasInvalidCharacters';

export default function(text, options = configs.defaults) {
  if (!text) {
    return 'empty';
  }

  const mergedOptions = { ...configs.defaults, ...options };
  const maxLength = mergedOptions.maxWeightedTextLength;

  // Determine max length independent of URL length
  if (getTextLength(text, mergedOptions) > maxLength) {
    return 'too_long';
  }

  if (hasInvalidCharacters(text)) {
    return 'invalid_characters';
  }

  return false;
}
