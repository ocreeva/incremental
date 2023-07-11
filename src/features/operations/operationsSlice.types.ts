import type { EntityState } from '@reduxjs/toolkit';
import type { OperationState } from '@/types';

export type AdditionalSliceState = Record<string, never>;
export type SliceState = EntityState<OperationState> & AdditionalSliceState;
