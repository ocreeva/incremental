import { EntityId, PayloadAction } from '@reduxjs/toolkit';

import { RoutineView, RoutineViewState } from '@/types';

import adapter from './routineView.adapter';

export const addRoutine: (state: RoutineViewState, action: PayloadAction<RoutineView>) => RoutineViewState
= (state, { payload: routine }) => adapter.addOne(state, routine);

export const removeRoutine: (state: RoutineViewState, action: PayloadAction<EntityId>) => RoutineViewState
= (state, { payload: id }) => adapter.removeOne(state, id);

export const setCurrentRoutineId: (state: RoutineViewState, action: PayloadAction<EntityId>) => RoutineViewState
= (state, { payload: currentId }) => { return { ...state, currentId }; };

export const updateCurrentRoutine: (state: RoutineViewState, action: PayloadAction<Partial<RoutineView>>) => RoutineViewState
= (state, { payload: changes }) => adapter.updateOne(state, { id: state.currentId, changes });
