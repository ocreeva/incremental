import type { EntityState } from '@reduxjs/toolkit';
import type { OperationState } from '@/types';

export type AdditionalSliceState = { };
export type SliceState = EntityState<OperationState> & AdditionalSliceState;
