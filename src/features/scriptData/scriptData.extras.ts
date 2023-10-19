import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { ScriptDataState } from '@/types';

import initialState from './scriptData.initial';

const extraReducers: (builder: ActionReducerMapBuilder<ScriptDataState>) => void
= (builder) => {
    builder.addCase('game/reset', () => initialState);
};

export default extraReducers;
