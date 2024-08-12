// Copyright 2024 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import invalidChars from './regexp/invalidChars';

export default function(text) {
  return invalidChars.test(text);
}
