// Copyright 2025 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import convertUnicodeIndices from './lib/convertUnicodeIndices';

export default function(text, entities) {
  convertUnicodeIndices(text, entities, true);
}
