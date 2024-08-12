// Copyright 2024 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import latinAccentChars from './latinAccentChars';
import regexSupplant from '../lib/regexSupplant';
import validCCTLD from './validCCTLD';
import validGTLD from './validGTLD';
import validPunycode from './validPunycode';

const validAsciiDomain = regexSupplant(
  /(?:(?:[\-a-z0-9#{latinAccentChars}]+)\.)+(?:#{validGTLD}|#{validCCTLD}|#{validPunycode})/gi,
  { latinAccentChars, validGTLD, validCCTLD, validPunycode }
);

export default validAsciiDomain;
