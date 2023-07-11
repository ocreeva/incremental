import adapter from './scriptsSlice.adapter';
import { _selectScriptById } from './scriptsSlice.utility';

import type { RootState } from '@/App/store';
import type { ScriptState } from '@/types';

const { selectIds } = adapter.getSelectors();

export const selectCurrentScriptId: (state: RootState) => string
= ({ scripts: { currentId } }) => currentId;

export const selectScript: (state: RootState, id: string) => ScriptState
= ({ scripts }, id) => _selectScriptById(scripts, id);

export const selectScriptIds: (state: RootState) => string[]
= ({ scripts }) => selectIds(scripts) as string[];
