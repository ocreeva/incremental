import { type PayloadAction } from '@reduxjs/toolkit';

import { type EntityId, type RoutineState } from '@/types';

import adapter from './routinesSlice.adapter';
import { type SliceState } from './routinesSlice.types';

export const addRoutine: (state: SliceState, action: PayloadAction<RoutineState>) => SliceState
= (state, { payload: routine }) => adapter.addOne(state, routine);

export const setCurrentRoutineId: (state: SliceState, action: PayloadAction<EntityId>) => SliceState
= (state, { payload: currentId }) => { return { ...state, currentId }; };
