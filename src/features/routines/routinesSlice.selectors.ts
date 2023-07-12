import { selectById } from './routinesSlice.adapter';

import type { RootState } from '@/App/store';
import type { RoutineState } from '@/types';

export const selectCurrentRoutine: (state: RootState) => RoutineState
= ({ routines }) => selectById(routines, routines.currentId);
