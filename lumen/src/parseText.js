// Copyright 2025 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import configs from './configs';
import extractUrlsWithIndices from './extractUrlsWithIndices';
import getCharacterWeight from './lib/getCharacterWeight';
import hasInvalidCharacters from './hasInvalidCharacters';
import modifyIndicesFromUTF16ToUnicode from './modifyIndicesFromUTF16ToUnicode';

// TODO: WEB-19861 Replace with public package after it is open sourced
import { parse as extractEmojiWithIndices } from 'twemoji-parser';
import urlHasHttps from './regexp/urlHasHttps';

/**
 * [parseText description]
 * @param  {string} text text to parse
 * @param  {Object} options config options to pass
 * @return {Object} Fields in response described below:
 *
 * Response fields:
 * weightedLength {int} the weighted length of post based on weights specified in the config
 * valid {bool} If post is valid
 * permillage {float} permillage of the post over the max length specified in config
 * validRangeStart {int} beginning of valid text
 * validRangeEnd {int} End index of valid part of the post text (inclusive) in utf16
 * displayRangeStart {int} beginning index of display text
 * displayRangeEnd {int} end index of display text (inclusive) in utf16
 */
const parseText = function(text = '', options = configs.defaults) {
  const mergedOptions = Object.keys(options).length ? options : configs.defaults;
  const { defaultWeight, emojiParsingEnabled, scale, maxWeightedTextLength, transformedURLLength } = mergedOptions;
  const normalizedText = typeof String.prototype.normalize === 'function' ? text.normalize() : text;

  // Hash all entities by their startIndex for fast lookup
  const urlEntitiesMap = transformEntitiesToHash(extractUrlsWithIndices(normalizedText));
  const emojiEntitiesMap = emojiParsingEnabled ? transformEntitiesToHash(extractEmojiWithIndices(normalizedText)) : [];
  const postLength = normalizedText.length;

  let weightedLength = 0;
  let validDisplayIndex = 0;
  let valid = true;
  // Go through every character and calculate weight
  for (let charIndex = 0; charIndex < postLength; charIndex++) {
    // If a url begins at the specified index handle, add constant length
    if (urlEntitiesMap[charIndex]) {
      const { url, indices } = urlEntitiesMap[charIndex];
      weightedLength += transformedURLLength * scale;
      charIndex += url.length - 1;
    } else if (emojiParsingEnabled && emojiEntitiesMap[charIndex]) {
      const { text: emoji, indices } = emojiEntitiesMap[charIndex];
      weightedLength += defaultWeight;
      charIndex += emoji.length - 1;
    } else {
      charIndex += isSurrogatePair(normalizedText, charIndex) ? 1 : 0;
      weightedLength += getCharacterWeight(normalizedText.charAt(charIndex), mergedOptions);
    }

    // Only test for validity of character if it is still valid
    if (valid) {
      valid = !hasInvalidCharacters(normalizedText.substring(charIndex, charIndex + 1));
    }
    if (valid && weightedLength <= maxWeightedTextLength * scale) {
      validDisplayIndex = charIndex;
    }
  }

  weightedLength = weightedLength / scale;
  valid = valid && weightedLength > 0 && weightedLength <= maxWeightedTextLength;
  const permillage = Math.floor((weightedLength / maxWeightedTextLength) * 1000);
  const normalizationOffset = text.length - normalizedText.length;
  validDisplayIndex += normalizationOffset;

  return {
    weightedLength,
    valid,
    permillage,
    validRangeStart: 0,
    validRangeEnd: validDisplayIndex,
    displayRangeStart: 0,
    displayRangeEnd: text.length > 0 ? text.length - 1 : 0
  };
};

const transformEntitiesToHash = entities =>
  entities.reduce((map, entity) => {
    map[entity.indices[0]] = entity;
    return map;
  }, {});

const isSurrogatePair = (text, cIndex) => {
  // Test if a character is the beginning of a surrogate pair
  if (cIndex < text.length - 1) {
    const c = text.charCodeAt(cIndex);
    const cNext = text.charCodeAt(cIndex + 1);
    return 0xd800 <= c && c <= 0xdbff && 0xdc00 <= cNext && cNext <= 0xdfff;
  }
  return false;
};

export default parseText;
