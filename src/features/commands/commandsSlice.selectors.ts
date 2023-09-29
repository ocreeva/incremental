import { createSelector } from '@reduxjs/toolkit';
import { createCachedSelector } from 're-reselect';

import { type RootState } from '@/App/store';
import { CommandId } from '@/constants';
import type { CommandState } from '@/types';

import { selectById } from './commandsSlice.adapter';
import { SliceState } from './commandsSlice.types';

const selectState: (state: RootState) => SliceState = ({ commands }) => commands;
const selectId: (state: RootState, id: CommandId) => CommandId = (_state, id) => id;

export const selectCommand: (state: RootState, id: CommandId) => CommandState
= createCachedSelector(
    [selectState, selectId],
    (commands, id) => selectById(commands, id)
)(selectId);
