import { type RootState } from '@/App/store';
import { type RoutineState } from '@/types';

import { selectById } from './routinesSlice.adapter';

export const selectCurrentRoutine: (state: RootState) => RoutineState
= ({ routines }) => selectById(routines, routines.currentId);
