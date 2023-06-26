import { _selectScript } from './scriptsSlice.utility';

import type { RootState } from '@/App/store';
import type { ScriptState } from '@/types';

export const selectCurrentScriptId: (state: RootState) => string
= ({ scripts: { currentId } }) => currentId;

export const selectScript: (state: RootState, id: string) => ScriptState
= ({ scripts }, id) => _selectScript(scripts, id);
