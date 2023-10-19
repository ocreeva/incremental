import { EntityId } from '@reduxjs/toolkit';

import { RootState } from '@/App/store';
import { InstructionData } from '@/types';

import { selectById } from './instructionData.adapter';

export const selectInstruction: (state: RootState, id: EntityId) => InstructionData
= ({ instructionData }, id) => selectById(instructionData, id);
