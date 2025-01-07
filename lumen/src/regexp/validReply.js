// Copyright 2025 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import atSigns from './atSigns';
import regexSupplant from '../lib/regexSupplant';
import spaces from './spaces';

const validReply = regexSupplant(/^(?:#{spaces})*#{atSigns}([a-zA-Z0-9_]{1,20})/, { atSigns, spaces });

export default validReply;
