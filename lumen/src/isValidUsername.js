// Copyright 2024 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import extractMentions from './extractMentions';

export default function(username) {
  if (!username) {
    return false;
  }

  const extracted = extractMentions(username);

  // Should extract the username minus the @ sign, hence the .slice(1)
  return extracted.length === 1 && extracted[0] === username.slice(1);
}
