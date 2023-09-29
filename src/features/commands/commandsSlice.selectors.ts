import { createSelector } from '@reduxjs/toolkit';
import { createCachedSelector } from 're-reselect';

import { type RootState } from '@/App/store';
import { CommandId } from '@/constants';
import commandDesigns from '@/game/commands/designs';
import type { CommandState, ICommandDesign } from '@/types';

import { selectById } from './commandsSlice.adapter';
import { SliceState } from './commandsSlice.types';

const selectState: (state: RootState) => SliceState = ({ commands }) => commands;
const selectId: (state: RootState, id: CommandId) => CommandId = (_state, id) => id;

export const selectCommand: (state: RootState, id: CommandId) => CommandState
= createCachedSelector(
    [selectState, selectId],
    (commands, id) => selectById(commands, id)
)(selectId);

const selectDesign: (state: RootState, id: CommandId) => ICommandDesign
= createCachedSelector(
    [selectCommand, selectId],
    (command, id) => {
        const constructor = commandDesigns[id];
        return new constructor(command);
    }
)(selectId);

export const selectNumberOfAvailableCommands: (state: RootState) => number
= createSelector(
    Object.values(CommandId).map(commandId => (state: RootState) => selectDesign(state, commandId)),
    (...designs) => designs.reduce((value, design) => value + (design.isInLexicon && design.isVisible ? 1 : 0), 0)
);
