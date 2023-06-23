import type { RootState } from '@/App/store';
import type { RoutineState } from '@/types';

export const selectCurrentRoutine: (state: RootState) => RoutineState | undefined
= ({ routines: { currentId, entities } }) => {
    if (currentId === undefined) return;

    return entities[currentId];
};
