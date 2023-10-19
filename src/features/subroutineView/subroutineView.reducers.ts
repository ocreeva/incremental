import { PayloadAction, Update } from '@reduxjs/toolkit';

import { SubroutineView, SubroutineViewState } from '@/types';

import adapter from './subroutineView.adapter';

export const addSubroutines: (state: SubroutineViewState, action: PayloadAction<SubroutineView[]>) => SubroutineViewState
= (state, { payload: subroutines }) => adapter.addMany(state, subroutines);

export const updateSubroutines: (state: SubroutineViewState, action: PayloadAction<Update<SubroutineView>[]>) => SubroutineViewState
= (state, { payload: updates }) => adapter.updateMany(state, updates);
