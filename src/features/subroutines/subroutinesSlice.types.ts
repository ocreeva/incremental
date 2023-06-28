import type { EntityState } from '@reduxjs/toolkit';
import type { SubroutineState } from '@/types';

export type AdditionalSliceState = { };
export type SliceState = EntityState<SubroutineState> & AdditionalSliceState;
