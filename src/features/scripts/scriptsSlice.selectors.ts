import { type RootState } from '@/App/store';
import { type EntityId, type ScriptState } from '@/types';

import { selectById, selectIds } from './scriptsSlice.adapter';

export const selectCurrentScriptId: (state: RootState) => EntityId
= ({ scripts: { currentId } }) => currentId;

export const selectScript: (state: RootState, id: EntityId) => ScriptState
= ({ scripts }, id) => selectById(scripts, id);

export const selectScriptIds: (state: RootState) => EntityId[]
= ({ scripts }) => selectIds(scripts);
