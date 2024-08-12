// Copyright 2024 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import cashtag from './cashtag';
import punct from './punct';
import regexSupplant from '../lib/regexSupplant';
import spaces from './spaces';

const validCashtag = regexSupplant(
  '(^|#{spaces})(\\$)(#{cashtag})(?=$|\\s|[#{punct}])',
  { cashtag, spaces, punct },
  'gi'
);

export default validCashtag;
