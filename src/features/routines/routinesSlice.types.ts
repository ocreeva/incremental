import type { EntityState } from '@reduxjs/toolkit';
import type { RoutineState } from '@/types';

export type AdditionalSliceState = {
    currentId: string;
};

export type SliceState = EntityState<RoutineState> & AdditionalSliceState;
