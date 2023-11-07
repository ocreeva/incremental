import { EntityId, ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';

import { OperationViewState } from '@/types';

import adapter, { selectById } from './operationView.adapter';
import initialState from './operationView.initial';

const extraReducers: (builder: ActionReducerMapBuilder<OperationViewState>) => void
= (builder) => {
    builder.addCase('game/reset', () => initialState);
    builder.addCase<string, PayloadAction<EntityId>>(
        'routineView/removeRoutine',
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
