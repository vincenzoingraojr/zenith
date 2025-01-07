// Copyright 2025 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import regexSupplant from '../lib/regexSupplant';
import validCCTLD from './validCCTLD';
import validDomainName from './validDomainName';
import validGTLD from './validGTLD';
import validPunycode from './validPunycode';
import validSubdomain from './validSubdomain';

const validDomain = regexSupplant(
  /(?:#{validSubdomain}*#{validDomainName}(?:#{validGTLD}|#{validCCTLD}|#{validPunycode}))/,
  { validDomainName, validSubdomain, validGTLD, validCCTLD, validPunycode }
);

export default validDomain;
