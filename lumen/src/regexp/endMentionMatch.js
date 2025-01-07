// Copyright 2025 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import atSigns from './atSigns';
import latinAccentChars from './latinAccentChars';
import regexSupplant from '../lib/regexSupplant';
const endMentionMatch = regexSupplant(/^(?:#{atSigns}|[#{latinAccentChars}]|:\/\/)/, { atSigns, latinAccentChars });
export default endMentionMatch;
