import { selectById } from './operationsSlice.adapter';

import type { EntityId } from '@reduxjs/toolkit';
import type { RootState } from '@/App/store';
import type { OperationState } from '@/types';

export const selectOperation: (state: RootState, id: EntityId) => OperationState
= ({ operations }, id) => selectById(operations, id);
