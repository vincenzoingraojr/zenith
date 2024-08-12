// Copyright 2024 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import regexSupplant from '../lib/regexSupplant';
import validateUrlDomainSegment from './validateUrlDomainSegment';
import validateUrlDomainTld from './validateUrlDomainTld';
import validateUrlSubDomainSegment from './validateUrlSubDomainSegment';

const validateUrlDomain = regexSupplant(
  /(?:(?:#{validateUrlSubDomainSegment}\.)*(?:#{validateUrlDomainSegment}\.)#{validateUrlDomainTld})/i,
  {
    validateUrlSubDomainSegment,
    validateUrlDomainSegment,
    validateUrlDomainTld
  }
);

export default validateUrlDomain;
