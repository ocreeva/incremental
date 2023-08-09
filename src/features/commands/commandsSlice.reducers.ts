import { type PayloadAction, type Update } from '@reduxjs/toolkit';

import type { CommandState } from '@/types';

import adapter from './commandsSlice.adapter';
import type { SliceState } from './commandsSlice.types';

export const updateCommands: (state: SliceState, action: PayloadAction<Update<CommandState>[]>) => SliceState
= (state, { payload: commandUpdates }) => adapter.updateMany(state, commandUpdates);
