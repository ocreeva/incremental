import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';

import { DeleteScriptProps } from '@/features/scriptData';
import { InstructionDataState } from '@/types';

import adapter, { selectById } from './instructionData.adapter';
import initialState from './instructionData.initial';

const extraReducers: (builder: ActionReducerMapBuilder<InstructionDataState>) => void
= (builder) => {
    builder.addCase('game/reset', () => initialState);
    builder.addCase<string, PayloadAction<DeleteScriptProps>>(
        'scriptData/deleteScript',
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
