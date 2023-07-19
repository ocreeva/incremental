import { type Update, type PayloadAction } from '@reduxjs/toolkit';

import { type EntityId, type InstructionState } from '@/types';

import adapter from './instructionsSlice.adapter';
import { type SliceState } from './instructionsSlice.types';

export const addInstruction: (state: SliceState, action: PayloadAction<InstructionState>) => SliceState
= (state, { payload: instruction }) => adapter.addOne(state, instruction);

export const removeInstruction: (state: SliceState, action: PayloadAction<EntityId>) => SliceState
= (state, { payload: id }) => adapter.removeOne(state, id);

export const updateInstruction: (state: SliceState, action: PayloadAction<Update<InstructionState>>) => SliceState
= (state, { payload: instruction }) => adapter.updateOne(state, instruction);
