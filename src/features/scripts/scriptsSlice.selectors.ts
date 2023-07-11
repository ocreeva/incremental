import { selectStateEntityById } from '../_utility';
import adapter from './scriptsSlice.adapter';

import type { EntityId } from '@reduxjs/toolkit';
import type { RootState } from '@/App/store';
import type { ScriptState } from '@/types';

const { selectById, selectIds } = adapter.getSelectors();

export const selectCurrentScriptId: (state: RootState) => EntityId
= ({ scripts: { currentId } }) => currentId;

export const selectScript: (state: RootState, id: EntityId) => ScriptState
= ({ scripts }, id) => selectStateEntityById('scripts', selectById, scripts, id);

export const selectScriptIds: (state: RootState) => EntityId[]
= ({ scripts }) => selectIds(scripts) as string[];
