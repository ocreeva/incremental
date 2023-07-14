import { type EntityState } from '@reduxjs/toolkit';

import { type EntityId, type RoutineState } from '@/types';

export declare type AdditionalSliceState = {
    currentId: EntityId;
};

export declare type SliceState = EntityState<RoutineState> & AdditionalSliceState;
