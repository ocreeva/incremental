import { type CommandDesign } from '@/types';

import _createCommandRecord from './_createCommandRecord';

export const [_getDesigns, _registerDesign] = _createCommandRecord<CommandDesign>();

export default _registerDesign;
