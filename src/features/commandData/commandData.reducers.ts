import { PayloadAction } from '@reduxjs/toolkit';

import { CommandData, CommandDataState } from '@/types';

import adapter from './commandData.adapter';

export const upsertCommandData: (state: CommandDataState, action: PayloadAction<CommandData[]>) => CommandDataState
= (state, { payload }) => adapter.upsertMany(state, payload);
