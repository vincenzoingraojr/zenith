// Copyright 2024 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import regexSupplant from '../lib/regexSupplant';
import validateUrlUnicodeSubDomainSegment from './validateUrlUnicodeSubDomainSegment';
import validateUrlUnicodeDomainSegment from './validateUrlUnicodeDomainSegment';
import validateUrlUnicodeDomainTld from './validateUrlUnicodeDomainTld';

// Unencoded internationalized domains - this doesn't check for invalid UTF-8 sequences
const validateUrlUnicodeDomain = regexSupplant(
  /(?:(?:#{validateUrlUnicodeSubDomainSegment}\.)*(?:#{validateUrlUnicodeDomainSegment}\.)#{validateUrlUnicodeDomainTld})/i,
  {
    validateUrlUnicodeSubDomainSegment,
    validateUrlUnicodeDomainSegment,
    validateUrlUnicodeDomainTld
  }
);

export default validateUrlUnicodeDomain;
