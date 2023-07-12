import { selectById } from './instructionsSlice.adapter';

import type { EntityId } from '@reduxjs/toolkit';
import type { RootState } from '@/App/store';
import type { InstructionState } from '@/types';

export const selectInstruction: (state: RootState, id: EntityId) => InstructionState
= ({ instructions }, id) => selectById(instructions, id);
