// Copyright 2024 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import regexSupplant from '../lib/regexSupplant';
import validateUrlIp from './validateUrlIp';
import validateUrlUnicodeDomain from './validateUrlUnicodeDomain';

const validateUrlUnicodeHost = regexSupplant(
  '(?:' + '#{validateUrlIp}|' + '#{validateUrlUnicodeDomain}' + ')',
  { validateUrlIp, validateUrlUnicodeDomain },
  'i'
);

export default validateUrlUnicodeHost;
