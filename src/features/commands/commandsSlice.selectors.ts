import { type RootState } from '@/App/store';
import { type CommandId } from '@/constants';
import type { CommandState } from '@/types';

import { selectById } from './commandsSlice.adapter';

export const selectCommand: (state: RootState, id: CommandId) => CommandState
= ({ commands }, id) => selectById(commands, id);
