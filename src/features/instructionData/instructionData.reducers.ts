import { Update, PayloadAction, EntityId } from '@reduxjs/toolkit';

import { InstructionData, InstructionDataState } from '@/types';

import adapter from './instructionData.adapter';

export const addInstruction: (state: InstructionDataState, action: PayloadAction<InstructionData>) => InstructionDataState
= (state, { payload: instruction }) => adapter.addOne(state, instruction);

export const removeInstruction: (state: InstructionDataState, action: PayloadAction<EntityId>) => InstructionDataState
= (state, { payload: id }) => adapter.removeOne(state, id);

export const updateInstruction: (state: InstructionDataState, action: PayloadAction<Update<InstructionData>>) => InstructionDataState
= (state, { payload: instruction }) => adapter.updateOne(state, instruction);
