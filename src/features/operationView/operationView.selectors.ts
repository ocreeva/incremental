import { EntityId } from '@reduxjs/toolkit';

import { RootState } from '@/App/store';
import { OperationView } from '@/types';

import { selectById } from './operationView.adapter';

export const selectOperation: (state: RootState, id: EntityId) => OperationView
= ({ operationView }, id) => selectById(operationView, id);
