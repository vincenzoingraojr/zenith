// Copyright 2025 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import regexSupplant from '../lib/regexSupplant';
import validateUrlPchar from './validateUrlPchar';

const validateUrlQuery = regexSupplant(/(#{validateUrlPchar}|\/|\?)*/i, {
  validateUrlPchar
});

export default validateUrlQuery;
