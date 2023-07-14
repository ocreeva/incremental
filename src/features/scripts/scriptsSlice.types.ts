import { type EntityState } from '@reduxjs/toolkit';

import { type EntityId, type ScriptState } from '@/types';

export type AdditionalSliceState = {
    currentId: EntityId;
};

export type SliceState = EntityState<ScriptState> & AdditionalSliceState;
