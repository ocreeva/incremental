import type { RootState } from '@/App/store';
import type { RoutineState } from '@/types';

export const selectCurrentRoutine: (state: RootState) => RoutineState
= ({ execution: { currentRoutine } }) => currentRoutine;
