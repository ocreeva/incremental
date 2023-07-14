import { type PayloadAction } from '@reduxjs/toolkit';

import { type SubroutineState } from '@/types';

import adapter from './subroutinesSlice.adapter';
import { type SliceState } from './subroutinesSlice.types';

export const addSubroutines: (state: SliceState, action: PayloadAction<SubroutineState[]>) => SliceState
= (state, { payload: subroutines }) => adapter.addMany(state, subroutines);
