import { type PayloadAction } from '@reduxjs/toolkit';

import type { CommandState } from '@/types';

import adapter from './commandsSlice.adapter';
import type { SliceState } from './commandsSlice.types';

export const updateCommands: (state: SliceState, action: PayloadAction<CommandState[]>) => SliceState
= (state, { payload: commandUpdates }) => adapter.upsertMany(state, commandUpdates);
