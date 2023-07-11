import adapter from './scriptsSlice.adapter';
import { _createScript, _selectCurrentScript } from './scriptsSlice.utility';

import type { EntityId, PayloadAction, Update } from '@reduxjs/toolkit';
import type { ScriptState } from '@/types';
import type { SliceState } from './scriptsSlice.types';


export const addInstructionToCurrentScript: (state: SliceState, action: PayloadAction<EntityId>) => SliceState
= (state, { payload: instructionId }) => {
    const { id, instructions } = _selectCurrentScript(state);
    const update: Update<ScriptState> = {
        id,
        changes: {
            instructions: [ ...instructions, instructionId ],
        },
    };
    return adapter.updateOne(state, update);
};

export declare type CreateScriptProps = {
    newScriptId?: string;
};
export const createScript: (state: SliceState, action: PayloadAction<CreateScriptProps>) => SliceState
= (state, { payload }) => {
    const newScript: ScriptState = _createScript();
    payload.newScriptId = newScript.id;
    return adapter.addOne(state, newScript);
};

export declare type DeleteScriptProps = {
    scriptId: EntityId;
    currentScriptId?: EntityId;
}
export const deleteScript: (state: SliceState, action: PayloadAction<DeleteScriptProps>) => SliceState
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

export const removeInstructionFromCurrentScript: (state: SliceState, action: PayloadAction<EntityId>) => SliceState
= (state, { payload: instructionId }) => {
    const { id, instructions } = _selectCurrentScript(state);
    const update: Update<ScriptState> = {
        id,
        changes: {
            instructions: instructions.filter(_ => _ !== instructionId),
        },
    };
    return adapter.updateOne(state, update);
};
