import type { PayloadAction } from '@reduxjs/toolkit';
import type { RoutineState } from '@/types';
import type { ExecutionState } from './executionSlice.types';

type RoutinePayload = {
    routine: RoutineState;
}

export const setCurrentRoutine: (state: ExecutionState, action: PayloadAction<RoutinePayload>) => void
= (state, { payload: { routine } }) => { state.currentRoutine = routine; };
