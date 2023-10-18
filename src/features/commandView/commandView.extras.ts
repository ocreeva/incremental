import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { CommandDataState } from '@/types';

import initialState from './commandView.initial';

const extraReducers: (builder: ActionReducerMapBuilder<CommandDataState>) => void
= (builder) => {
    builder.addCase('game/reset', () => initialState);
};

export default extraReducers;
