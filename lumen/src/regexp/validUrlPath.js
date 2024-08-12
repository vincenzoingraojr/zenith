// Copyright 2024 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import regexSupplant from '../lib/regexSupplant';
import validGeneralUrlPathChars from './validGeneralUrlPathChars';
import validUrlBalancedParens from './validUrlBalancedParens';
import validUrlPathEndingChars from './validUrlPathEndingChars';

// Allow @ in a url, but only in the middle. Catch things like http://example.com/@user/
const validUrlPath = regexSupplant(
  '(?:' +
    '(?:' +
    '#{validGeneralUrlPathChars}*' +
    '(?:#{validUrlBalancedParens}#{validGeneralUrlPathChars}*)*' +
    '#{validUrlPathEndingChars}' +
    ')|(?:@#{validGeneralUrlPathChars}+/)' +
    ')',
  {
    validGeneralUrlPathChars,
    validUrlBalancedParens,
    validUrlPathEndingChars
  },
  'i'
);

export default validUrlPath;
