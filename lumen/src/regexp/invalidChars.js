// Copyright 2025 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import invalidCharsGroup from './invalidCharsGroup';
import regexSupplant from '../lib/regexSupplant';
const invalidChars = regexSupplant(/[#{invalidCharsGroup}]/, {
  invalidCharsGroup
});
export default invalidChars;
