import adapter from './operationsSlice.adapter';

import type { PayloadAction, Update } from '@reduxjs/toolkit';
import type { OperationState } from '@/types';
import type { SliceState } from './operationsSlice.types';

export const addOperations: (state: SliceState, action: PayloadAction<OperationState[]>) => void
= (state, { payload }) => { adapter.addMany(state, payload); }

export const updateOperations: (state: SliceState, action: PayloadAction<Update<OperationState>[]>) => void
= (state, { payload }) => { adapter.updateMany(state, payload); };
