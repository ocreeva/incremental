import { selectStateEntityById } from '../_utility';
import adapter from './instructionsSlice.adapter';

import type { EntityId } from '@reduxjs/toolkit';
import type { RootState } from '@/App/store';
import type { InstructionState } from '@/types';

const { selectById } = adapter.getSelectors();

export const selectInstruction: (state: RootState, id: EntityId) => InstructionState
= ({ instructions }, id) => selectStateEntityById('instructions', selectById, instructions, id);
