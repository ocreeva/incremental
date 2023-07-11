import adapter from './scriptsSlice.adapter';
import { _selectScriptById } from './scriptsSlice.utility';

import type { EntityId } from '@reduxjs/toolkit';
import type { RootState } from '@/App/store';
import type { ScriptState } from '@/types';

const { selectIds } = adapter.getSelectors();

export const selectCurrentScriptId: (state: RootState) => EntityId
= ({ scripts: { currentId } }) => currentId;

export const selectScript: (state: RootState, id: EntityId) => ScriptState
= ({ scripts }, id) => _selectScriptById(scripts, id);

export const selectScriptIds: (state: RootState) => EntityId[]
= ({ scripts }) => selectIds(scripts) as string[];
