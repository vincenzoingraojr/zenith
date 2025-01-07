// Copyright 2025 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import extractHashtags from './extractHashtags';

export default function(hashtag) {
  if (!hashtag) {
    return false;
  }

  const extracted = extractHashtags(hashtag);

  // Should extract the hashtag minus the # sign, hence the .slice(1)
  return extracted.length === 1 && extracted[0] === hashtag.slice(1);
}
