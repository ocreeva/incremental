import { EntityId } from '@reduxjs/toolkit';

import { RootState } from '@/App/store';
import { RoutineView } from '@/types';

import { selectById } from './routineView.adapter';

export const selectCurrentRoutine: (state: RootState) => RoutineView
= ({ routineView }) => selectById(routineView, routineView.currentId);

export const selectCurrentRoutineId: (state: RootState) => EntityId
= ({ routineView: { currentId } }) => currentId;
