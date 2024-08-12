// Copyright 2024 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import extractHashtagsWithIndices from './extractHashtagsWithIndices';
import autoLinkEntities from './autoLinkEntities';

export default function(text, options) {
  const entities = extractHashtagsWithIndices(text);
  return autoLinkEntities(text, entities, options);
}
