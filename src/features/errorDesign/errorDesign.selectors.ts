import { EntityId, createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/App/store';
import { selectOperation } from '@/features/operationView';
import errorDesigns, { getUnhandledErrorDesign } from '@/game/errors/designs';
import { IErrorDesign } from '@/types';
import { ErrorCode } from '@/constants';

export const selectOperationErrorDesign: (state: RootState, id: EntityId) => IErrorDesign | null
= createSelector(
    [selectOperation],
    ({ error }) => {
        if (error === ErrorCode.None) return null;
        return errorDesigns[error] ?? getUnhandledErrorDesign(error);
    }
);
