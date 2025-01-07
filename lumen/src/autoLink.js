// Copyright 2025 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import extractEntitiesWithIndices from './extractEntitiesWithIndices';
import autoLinkEntities from './autoLinkEntities';

export default function(text, options) {
  const entities = extractEntitiesWithIndices(text, {
    extractUrlsWithoutProtocol: true
  });
  return autoLinkEntities(text, entities, options);
}
