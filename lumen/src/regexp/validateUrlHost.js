// Copyright 2025 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import regexSupplant from '../lib/regexSupplant';
import validateUrlDomain from './validateUrlDomain';
import validateUrlIp from './validateUrlIp';

const validateUrlHost = regexSupplant(
  '(?:' + '#{validateUrlIp}|' + '#{validateUrlDomain}' + ')',
  { validateUrlIp, validateUrlDomain },
  'i'
);

export default validateUrlHost;
