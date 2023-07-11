import adapter from './scriptsSlice.adapter';
import { _createScript, _selectCurrentScript } from './scriptsSlice.utility';

import type { PayloadAction, Update } from '@reduxjs/toolkit';
import type { ScriptState } from '@/types';
import type { SliceState } from './scriptsSlice.types';


export const addInstructionToCurrentScript: (state: SliceState, action: PayloadAction<string>) => SliceState
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

export const removeInstructionFromCurrentScript: (state: SliceState, action: PayloadAction<string>) => SliceState
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
