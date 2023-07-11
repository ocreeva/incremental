import { selectStateEntityById } from '../_utility';
import adapter from './operationsSlice.adapter';

import type { EntityId } from '@reduxjs/toolkit';
import type { RootState } from '@/App/store';
import type { OperationState } from '@/types';

const { selectById } = adapter.getSelectors();

export const selectOperation: (state: RootState, id: EntityId) => OperationState
= ({ operations }, id) => selectStateEntityById('operations', selectById, operations, id);
