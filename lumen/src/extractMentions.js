// Copyright 2025 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import extractMentionsWithIndices from './extractMentionsWithIndices';

export default function(text) {
  let screenNamesOnly = [],
    screenNamesWithIndices = extractMentionsWithIndices(text);

  for (let i = 0; i < screenNamesWithIndices.length; i++) {
    const screenName = screenNamesWithIndices[i].screenName;
    screenNamesOnly.push(screenName);
  }

  return screenNamesOnly;
}
