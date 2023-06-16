import { PayloadAction } from '@reduxjs/toolkit';
import { ExecutionState } from './executionSlice.types';
import { Routine } from '@/types';

interface RoutinePayload {
    routine: Routine;
}

export const setCurrentRoutine: (state: ExecutionState, action: PayloadAction<RoutinePayload>) => void
= (state, { payload: { routine } }) => { state.currentRoutine = routine; };
