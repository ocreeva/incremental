import { EntityId } from '@reduxjs/toolkit';

import { RootState } from '@/App/store';
import { ScriptData } from '@/types';

import { selectById, selectIds } from './scriptData.adapter';

export const selectCurrentScriptId: (state: RootState) => EntityId
= ({ scriptData: { currentId } }) => currentId;

export const selectScript: (state: RootState, id: EntityId) => ScriptData
= ({ scriptData }, id) => selectById(scriptData, id);

export const selectScriptIds: (state: RootState) => EntityId[]
= ({ scriptData }) => selectIds(scriptData);
