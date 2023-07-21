import { type PayloadAction, type Update } from '@reduxjs/toolkit';

import { type SubroutineState } from '@/types';

import adapter from './subroutinesSlice.adapter';
import { type SliceState } from './subroutinesSlice.types';

export const addSubroutines: (state: SliceState, action: PayloadAction<SubroutineState[]>) => SliceState
= (state, { payload: subroutines }) => adapter.addMany(state, subroutines);

export const updateSubroutines: (state: SliceState, action: PayloadAction<Update<SubroutineState>[]>) => SliceState
= (state, { payload: updates }) => adapter.updateMany(state, updates);
