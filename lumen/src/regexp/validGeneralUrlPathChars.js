// Copyright 2024 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import cyrillicLettersAndMarks from './cyrillicLettersAndMarks';
import latinAccentChars from './latinAccentChars';
import regexSupplant from '../lib/regexSupplant';

const validGeneralUrlPathChars = regexSupplant(
  /[a-z#{cyrillicLettersAndMarks}0-9!\*';:=\+,\.\$\/%#\[\]\-\u2013_~@\|&#{latinAccentChars}]/i,
  { cyrillicLettersAndMarks, latinAccentChars }
);

export default validGeneralUrlPathChars;
