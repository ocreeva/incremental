import adapter from './instructionsSlice.adapter';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { InstructionState } from '@/types';
import type { SliceState } from './instructionsSlice.types';

export const addInstruction: (state: SliceState, action: PayloadAction<InstructionState>) => SliceState
= (state, { payload: instruction }) => adapter.addOne(state, instruction);

export const removeInstruction: (state: SliceState, action: PayloadAction<string>) => SliceState
= (state, { payload: id }) => adapter.removeOne(state, id);
