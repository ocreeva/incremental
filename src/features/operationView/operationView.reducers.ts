import { PayloadAction, Update } from '@reduxjs/toolkit';

import { OperationView, OperationViewState } from '@/types';

import adapter from './operationView.adapter';

export const addOperations: (state: OperationViewState, action: PayloadAction<OperationView[]>) => OperationViewState
= (state, { payload: operations }) => adapter.addMany(state, operations);

export const updateOperations: (state: OperationViewState, action: PayloadAction<Update<OperationView>[]>) => OperationViewState
= (state, { payload: operationUpdates }) => adapter.updateMany(state, operationUpdates);
