import { EntityId, createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/App/store';
import { selectOperation } from '@/features/operationView';
import messageDesigns, { getUnhandledMessageDesign } from '@/game/messages/designs';
import { IMessageDesign } from '@/types';

export const selectOperationMessageDesigns: (state: RootState, id: EntityId) => IMessageDesign[]
= createSelector(
    [selectOperation],
    ({ messages }) => messages.map(message => messageDesigns[message] ?? getUnhandledMessageDesign(message))
);
