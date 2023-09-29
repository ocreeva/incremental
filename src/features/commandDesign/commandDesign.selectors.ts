import { createCachedSelector } from 're-reselect';

import { RootState } from '@/App/store';
import { CommandId } from '@/constants';
import { selectCommandView } from '@/features/commandView';
import commandDesigns from '@/game/commands/designs';
import { ICommandDesign } from '@/types';
import { createSelector } from '@reduxjs/toolkit';

const selectId: (state: RootState, id: CommandId) => CommandId = (_state, id) => id;

export const selectCommandDesign: (state: RootState, id: CommandId) => ICommandDesign
= createCachedSelector(
    [selectCommandView, selectId],
    (view, id) => new commandDesigns[id](view)
)(selectId);

export const selectCountOfAvailableCommands: (state: RootState) => number
= createSelector(
    Object.values(CommandId).map(commandId => (state: RootState) => selectCommandDesign(state, commandId)),
    (...designs) => designs.reduce((count, design) => count += (design.isInLexicon && design.isVisible ? 1 : 0), 0)
);
