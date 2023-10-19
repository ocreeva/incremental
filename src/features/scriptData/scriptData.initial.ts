import { ScriptDataState } from '@/types';

import adapter from './scriptData.adapter';
import { createScriptData } from './scriptData.utility';

const mainScriptData = createScriptData('main', '00000000-0000-0000-0000-000000000000');
const initialState: ScriptDataState = adapter.addOne(adapter.getInitialState({
    currentId: mainScriptData.id,
}), mainScriptData);

export default initialState;
