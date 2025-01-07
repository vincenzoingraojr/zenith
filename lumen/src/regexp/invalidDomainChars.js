// Copyright 2025 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import directionalMarkersGroup from './directionalMarkersGroup';
import invalidCharsGroup from './invalidCharsGroup';
import punct from './punct';
import spacesGroup from './spacesGroup';
import stringSupplant from '../lib/stringSupplant';

const invalidDomainChars = stringSupplant('#{punct}#{spacesGroup}#{invalidCharsGroup}#{directionalMarkersGroup}', {
  punct,
  spacesGroup,
  invalidCharsGroup,
  directionalMarkersGroup
});

export default invalidDomainChars;
