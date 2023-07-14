import { type RootState } from '@/App/store';
import { type EntityId, type InstructionState } from '@/types';

import { selectById } from './instructionsSlice.adapter';

export const selectInstruction: (state: RootState, id: EntityId) => InstructionState
= ({ instructions }, id) => selectById(instructions, id);
