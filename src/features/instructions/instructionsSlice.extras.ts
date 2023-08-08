import { type ActionReducerMapBuilder, type PayloadAction } from '@reduxjs/toolkit';

import { type DeleteScriptProps } from '@/features/scripts';

import adapter, { selectById } from './instructionsSlice.adapter';
import { type SliceState } from './instructionsSlice.types';

const extraReducers: (builder: ActionReducerMapBuilder<SliceState>) => void
= (builder) => {
    builder.addCase<string, PayloadAction<DeleteScriptProps>>(
        'scripts/deleteScript',
        (state, { payload: { scriptId } }) => {
            const instructionIds = state.ids
                .map(id => selectById(state, id))
                .filter(entity => entity.parentScriptId === scriptId)
                .map(entity => entity.id);
            return adapter.removeMany(state, instructionIds);
        }
    );
};

export default extraReducers;
