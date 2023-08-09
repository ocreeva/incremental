import type { EntityState } from '@reduxjs/toolkit';
import type { CommandState } from '@/types';

export declare type AdditionalSliceState = Record<string, never>;
export declare type SliceState = EntityState<CommandState> & AdditionalSliceState;
