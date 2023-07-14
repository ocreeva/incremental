import { type CommandData } from '@/types';

import _createCommandRecord from '../_createCommandRecord';

export const [_getData, _registerData] = _createCommandRecord<CommandData>();

export default _registerData;
