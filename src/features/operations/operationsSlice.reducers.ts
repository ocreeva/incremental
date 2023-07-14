import { type PayloadAction, type Update } from '@reduxjs/toolkit';

import { type OperationState } from '@/types';

import adapter from './operationsSlice.adapter';
import { type SliceState } from './operationsSlice.types';

export const addOperations: (state: SliceState, action: PayloadAction<OperationState[]>) => void
= (state, { payload: operations }) => { adapter.addMany(state, operations); }

export const updateOperations: (state: SliceState, action: PayloadAction<Update<OperationState>[]>) => void
= (state, { payload: operationUpdates }) => { adapter.updateMany(state, operationUpdates); };
