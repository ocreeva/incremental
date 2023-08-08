import { type ActionReducerMapBuilder, type PayloadAction } from '@reduxjs/toolkit';
import type { EntityId } from '@/types';

import adapter, { selectById } from './operationsSlice.adapter';
import { type SliceState } from './operationsSlice.types';

const extraReducers: (builder: ActionReducerMapBuilder<SliceState>) => void
= (builder) => {
    builder.addCase<string, PayloadAction<EntityId>>(
        'routines/removeRoutine',
        (state, { payload: routineId }) => {
            const operationIds = state.ids
                .map(id => selectById(state, id))
                .filter(entity => entity.parentRoutineId === routineId)
                .map(entity => entity.id);
            adapter.removeMany(state, operationIds);
        }
    );
};

export default extraReducers;
