import { EntityId, createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/App/store';
import { selectOperation } from '@/features/operationView';
import errorDesigns, { getUnhandledErrorDesign } from '@/game/errors/designs';
import { IErrorDesign } from '@/types';

export const selectOperationErrorDesigns: (state: RootState, id: EntityId) => IErrorDesign[]
= createSelector(
    [selectOperation],
    ({ errors }) => errors.map(error => errorDesigns[error] ?? getUnhandledErrorDesign(error))
);
