import { selectStateEntityById } from '../_utility';
import adapter from './routinesSlice.adapter';

import type { RootState } from '@/App/store';
import type { RoutineState } from '@/types';

const { selectById } = adapter.getSelectors();

export const selectCurrentRoutine: (state: RootState) => RoutineState
= ({ routines }) => selectStateEntityById('routines', selectById, routines, routines.currentId);
