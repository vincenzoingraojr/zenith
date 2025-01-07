// Copyright 2025 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import autoLinkEntities from './autoLinkEntities';
import extractCashtagsWithIndices from './extractCashtagsWithIndices';

export default function(text, options) {
  const entities = extractCashtagsWithIndices(text);
  return autoLinkEntities(text, entities, options);
}
