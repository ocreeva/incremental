import { type ActionReducerMapBuilder, type PayloadAction } from '@reduxjs/toolkit';
import type { EntityId } from '@/types';

import adapter, { selectById } from './subroutinesSlice.adapter';
import { type SliceState } from './subroutinesSlice.types';

const extraReducers: (builder: ActionReducerMapBuilder<SliceState>) => void
= (builder) => {
    builder.addCase<string, PayloadAction<EntityId>>(
        'routines/removeRoutine',
        (state, { payload: routineId }) => {
            const subroutineIds = state.ids
                .map(id => selectById(state, id))
                .filter(entity => entity.parentRoutineId === routineId)
                .map(entity => entity.id);
            adapter.removeMany(state, subroutineIds);
        }
    );
};

export default extraReducers;
