// Copyright 2025 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import invalidDomainChars from './invalidDomainChars';
import regexSupplant from '../lib/regexSupplant';

const validDomainChars = regexSupplant(/[^#{invalidDomainChars}]/, {
  invalidDomainChars
});

export default validDomainChars;
