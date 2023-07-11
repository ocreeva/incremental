import type { EntityId, EntityState } from '@reduxjs/toolkit';
import type { RoutineState } from '@/types';

export type AdditionalSliceState = {
    currentId: EntityId;
};

export type SliceState = EntityState<RoutineState> & AdditionalSliceState;
