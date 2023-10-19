import { ActionReducerMapBuilder, EntityId, PayloadAction } from '@reduxjs/toolkit';

import { SubroutineViewState } from '@/types';

import adapter, { selectById } from './subroutineView.adapter';
import initialState from './subroutineView.initial';

const extraReducers: (builder: ActionReducerMapBuilder<SubroutineViewState>) => void
= (builder) => {
    builder.addCase('game/reset', () => initialState);
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
