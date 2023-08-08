import { type RootState } from '@/App/store';
import { EntityId, type RoutineState } from '@/types';

import { selectById } from './routinesSlice.adapter';

export const selectCurrentRoutine: (state: RootState) => RoutineState
= ({ routines }) => selectById(routines, routines.currentId);

export const selectCurrentRoutineId: (state: RootState) => EntityId
= ({ routines: { currentId } }) => currentId;
