// Copyright 2024 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import isInvalidContent from './isInvalidContent';

export default function(text, options) {
  return !isInvalidContent(text, options);
}
