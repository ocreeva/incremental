import adapter from './scriptsSlice.adapter';
import { _selectCurrentScript } from './scriptsSlice.utility';

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
