import { EntityId, PayloadAction, Update } from '@reduxjs/toolkit';

import { ScriptData, ScriptDataState } from '@/types';

import adapter, { selectById } from './scriptData.adapter';
import { createScriptData } from './scriptData.utility';

export const addInstructionToCurrentScript: (state: ScriptDataState, action: PayloadAction<EntityId>) => ScriptDataState
= (state, { payload: instructionId }) => {
    const { id, instructions } = selectById(state, state.currentId);
    const update: Update<ScriptData> = {
        id,
        changes: {
            instructions: [ ...instructions, instructionId ],
        },
    };
    return adapter.updateOne(state, update);
};

export declare type CreateScriptProps = {
    newScriptId?: EntityId;
};
export const createScript: (state: ScriptDataState, action: PayloadAction<CreateScriptProps>) => ScriptDataState
= (state, { payload }) => {
    const newScript: ScriptData = createScriptData();
    payload.newScriptId = newScript.id;
    return adapter.addOne(state, newScript);
};

export declare type DeleteScriptProps = {
    scriptId: EntityId;
    currentScriptId?: EntityId;
}
export const deleteScript: (state: ScriptDataState, action: PayloadAction<DeleteScriptProps>) => ScriptDataState
= (state, { payload }) => {
    const { scriptId } = payload;
    if (scriptId === state.currentId) {
        let index = state.ids.indexOf(scriptId) + 1;
        if (index == state.ids.length) index -= 2;
        state.currentId = state.ids[index];
    }

    payload.currentScriptId = state.currentId;
    return adapter.removeOne(state, scriptId);
};

export const removeInstructionFromCurrentScript: (state: ScriptDataState, action: PayloadAction<EntityId>) => ScriptDataState
= (state, { payload: instructionId }) => {
    const { id, instructions } = selectById(state, state.currentId);
    const update: Update<ScriptData> = {
        id,
        changes: {
            instructions: instructions.filter(_ => _ !== instructionId),
        },
    };
    return adapter.updateOne(state, update);
};

declare type RenameScriptProps = {
    scriptId: EntityId;
    name: string;
};
export const renameScript: (state: ScriptDataState, action: PayloadAction<RenameScriptProps>) => ScriptDataState
= (state, { payload: { scriptId, name }}) => adapter.updateOne(state, { id: scriptId, changes: { name } });

export const setCurrentScriptId: (state: ScriptDataState, action: PayloadAction<EntityId>) => ScriptDataState
= (state, { payload: scriptId }) => ({ ...state, currentId: scriptId });
