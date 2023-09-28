import { PayloadAction, Update } from '@reduxjs/toolkit';

import { CommandView, CommandViewState } from '@/types';

import adapter from './commandView.adapter';

export const updateCommandView: (state: CommandViewState, action: PayloadAction<Update<CommandView>[]>) => CommandViewState
= (state, { payload }) => adapter.updateMany(state, payload);
