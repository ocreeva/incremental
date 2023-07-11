import type { EntityState } from '@reduxjs/toolkit';
import type { SubroutineState } from '@/types';

export type AdditionalSliceState = Record<string, never>;
export type SliceState = EntityState<SubroutineState> & AdditionalSliceState;
