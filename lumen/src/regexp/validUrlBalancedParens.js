// Copyright 2025 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import regexSupplant from '../lib/regexSupplant';
import validGeneralUrlPathChars from './validGeneralUrlPathChars';

// Allow URL paths to contain up to two nested levels of balanced parens
//  1. Used in Wikipedia URLs like /Primer_(film)
//  2. Used in IIS sessions like /S(dfd346)/
//  3. Used in Rdio URLs like /track/We_Up_(Album_Version_(Edited))/
const validUrlBalancedParens = regexSupplant(
  '\\(' +
    '(?:' +
    '#{validGeneralUrlPathChars}+' +
    '|' +
    // allow one nested level of balanced parentheses
    '(?:' +
    '#{validGeneralUrlPathChars}*' +
    '\\(' +
    '#{validGeneralUrlPathChars}+' +
    '\\)' +
    '#{validGeneralUrlPathChars}*' +
    ')' +
    ')' +
    '\\)',
  { validGeneralUrlPathChars },
  'i'
);

export default validUrlBalancedParens;
