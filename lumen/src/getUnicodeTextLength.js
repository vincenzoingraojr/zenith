// Copyright 2025 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import nonBmpCodePairs from './regexp/nonBmpCodePairs';

export default function(text) {
  return text.replace(nonBmpCodePairs, ' ').length;
}
