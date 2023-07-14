import { type RootState } from '@/App/store';
import { type EntityId, type OperationState } from '@/types';

import { selectById } from './operationsSlice.adapter';

export const selectOperation: (state: RootState, id: EntityId) => OperationState
= ({ operations }, id) => selectById(operations, id);
