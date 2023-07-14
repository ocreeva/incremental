import { type EntityState } from '@reduxjs/toolkit';

import { type InstructionState } from '@/types';

export declare type AdditionalSliceState = Record<string, never>;
export declare type SliceState = EntityState<InstructionState> & AdditionalSliceState;
