import { EntityId, createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/App/store';
import { selectOperation } from '@/features/operationView';
import errorDesigns from '@/game/errors/designs';
import { IErrorDesign } from '@/types';

export const selectOperationErrorDesign: (state: RootState, id: EntityId) => IErrorDesign | null
= createSelector(
    [selectOperation],
    ({ error }) => errorDesigns[error]
);
