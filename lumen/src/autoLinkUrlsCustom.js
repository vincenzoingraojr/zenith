// Copyright 2024 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import autoLinkEntities from './autoLinkEntities';
import extractUrlsWithIndices from './extractUrlsWithIndices';

export default function(text, options) {
  const entities = extractUrlsWithIndices(text, {
    extractUrlsWithoutProtocol: true
  });
  return autoLinkEntities(text, entities, options);
}
