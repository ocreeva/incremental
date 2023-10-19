import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { RoutineViewState } from '@/types';

import initialState from './routineView.initial';

const extraReducers: (builder: ActionReducerMapBuilder<RoutineViewState>) => void
= (builder) => {
    builder.addCase('game/reset', () => initialState);
};

export default extraReducers;
