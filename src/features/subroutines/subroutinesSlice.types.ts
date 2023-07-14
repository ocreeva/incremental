import { type EntityState } from '@reduxjs/toolkit';

import { type SubroutineState } from '@/types';

export declare type AdditionalSliceState = Record<string, never>;
export declare type SliceState = EntityState<SubroutineState> & AdditionalSliceState;
