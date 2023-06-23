import type { RootState } from '@/App/store';
import type { OperationState } from '@/types';

export const selectOperation: (state: RootState, id: string) => OperationState | undefined
= ({ operations: { entities } }, id) => entities[id];
