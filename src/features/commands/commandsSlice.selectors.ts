import { type RootState } from '@/App/store';
import { type CommandId } from '@/constants';
import type { CommandState } from '@/types';

import adapter from './commandsSlice.adapter';

const { selectAll, selectById } = adapter.getSelectors();

export const selectAllCommands: (state: RootState) => CommandState[]
= ({ commands }) => selectAll(commands);

export const selectCommand: (state: RootState, id: CommandId) => CommandState
= ({ commands }, id) => selectById(commands, id) || { id };
