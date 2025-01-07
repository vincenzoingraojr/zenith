// Copyright 2025 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import directionalMarkersGroup from './directionalMarkersGroup';
import invalidCharsGroup from './invalidCharsGroup';
import regexSupplant from '../lib/regexSupplant';
const validUrlPrecedingChars = regexSupplant(
  /(?:[^A-Za-z0-9@＠$#＃#{invalidCharsGroup}]|[#{directionalMarkersGroup}]|^)/,
  {
    invalidCharsGroup,
    directionalMarkersGroup
  }
);
export default validUrlPrecedingChars;
