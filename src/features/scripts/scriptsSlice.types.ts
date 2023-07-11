import type { EntityId, EntityState } from '@reduxjs/toolkit';
import type { ScriptState } from '@/types';

export type AdditionalSliceState = {
    currentId: EntityId;
};

export type SliceState = EntityState<ScriptState> & AdditionalSliceState;
