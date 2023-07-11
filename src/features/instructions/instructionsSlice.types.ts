import type { EntityState } from '@reduxjs/toolkit';
import type { InstructionState } from '@/types';

export type AdditionalSliceState = Record<string, never>;
export type SliceState = EntityState<InstructionState> & AdditionalSliceState;
