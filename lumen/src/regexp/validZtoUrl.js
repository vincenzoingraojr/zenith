// Copyright 2024 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import regexSupplant from '../lib/regexSupplant';
import validUrlQueryChars from './validUrlQueryChars';
import validUrlQueryEndingChars from './validUrlQueryEndingChars';

const validZtoUrl = regexSupplant(
  /^https?:\/\/z\.to\/([a-z0-9]+)(?:\?#{validUrlQueryChars}*#{validUrlQueryEndingChars})?/,
  { validUrlQueryChars, validUrlQueryEndingChars },
  'i'
);

export default validZtoUrl;
