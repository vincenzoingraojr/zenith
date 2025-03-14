// Copyright 2025 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import regexSupplant from '../lib/regexSupplant';
import validDomain from './validDomain';
import validPortNumber from './validPortNumber';
import validUrlPath from './validUrlPath';
import validUrlPrecedingChars from './validUrlPrecedingChars';
import validUrlQueryChars from './validUrlQueryChars';
import validUrlQueryEndingChars from './validUrlQueryEndingChars';

const extractUrl = regexSupplant(
  '(' + // $1 total match
  '(#{validUrlPrecedingChars})' + // $2 Preceeding chracter
  '(' + // $3 URL
  '(https?:\\/\\/)?' + // $4 Protocol (optional)
  '(#{validDomain})' + // $5 Domain(s)
  '(?::(#{validPortNumber}))?' + // $6 Port number (optional)
  '(\\/#{validUrlPath}*)?' + // $7 URL Path
  '(\\?#{validUrlQueryChars}*#{validUrlQueryEndingChars})?' + // $8 Query String
    ')' +
    ')',
  {
    validUrlPrecedingChars,
    validDomain,
    validPortNumber,
    validUrlPath,
    validUrlQueryChars,
    validUrlQueryEndingChars
  },
  'gi'
);

export default extractUrl;
