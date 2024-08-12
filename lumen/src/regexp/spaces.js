// Copyright 2024 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import regexSupplant from '../lib/regexSupplant';
import spacesGroup from './spacesGroup';
export default regexSupplant(/[#{spacesGroup}]/, { spacesGroup });
