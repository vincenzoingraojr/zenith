// Copyright 2025 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import extractUrlsWithIndices from './extractUrlsWithIndices';

export default function(text, options) {
  const urlsOnly = [];
  const urlsWithIndices = extractUrlsWithIndices(text, options);

  for (let i = 0; i < urlsWithIndices.length; i++) {
    urlsOnly.push(urlsWithIndices[i].url);
  }

  return urlsOnly;
}
