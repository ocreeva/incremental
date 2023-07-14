import { type EntityState } from '@reduxjs/toolkit';
import { type OperationState } from '@/types';

export declare type AdditionalSliceState = Record<string, never>;
export declare type SliceState = EntityState<OperationState> & AdditionalSliceState;
