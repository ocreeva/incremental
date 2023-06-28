import adapter from './routinesSlice.adapter';

import type { RoutineState } from '@/types';
import type { SliceState } from './routinesSlice.types';
import type { PayloadAction } from '@reduxjs/toolkit';

export const addRoutine: (state: SliceState, action: PayloadAction<RoutineState>) => SliceState
= (state, { payload: routine }) => adapter.addOne(state, routine);

export const setCurrentRoutineId: (state: SliceState, action: PayloadAction<string>) => SliceState
= (state, { payload: currentId }) => { return { ...state, currentId }; };
