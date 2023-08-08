import { type PayloadAction } from '@reduxjs/toolkit';

import { type EntityId, type RoutineState } from '@/types';

import adapter from './routinesSlice.adapter';
import { type SliceState } from './routinesSlice.types';

export const addRoutine: (state: SliceState, action: PayloadAction<RoutineState>) => SliceState
= (state, { payload: routine }) => adapter.addOne(state, routine);

export const removeRoutine: (state: SliceState, action: PayloadAction<EntityId>) => SliceState
= (state, { payload: id }) => adapter.removeOne(state, id);

export const setCurrentRoutineId: (state: SliceState, action: PayloadAction<EntityId>) => SliceState
= (state, { payload: currentId }) => { return { ...state, currentId }; };

export const updateCurrentRoutine: (state: SliceState, action: PayloadAction<Partial<RoutineState>>) => SliceState
= (state, { payload: changes }) => adapter.updateOne(state, { id: state.currentId, changes });
