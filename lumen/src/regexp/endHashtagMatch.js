// Copyright 2025 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import hashSigns from './hashSigns';
import regexSupplant from '../lib/regexSupplant';

const endHashtagMatch = regexSupplant(/^(?:#{hashSigns}|:\/\/)/, { hashSigns });

export default endHashtagMatch;
