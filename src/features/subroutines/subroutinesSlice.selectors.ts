import { type RootState } from '@/App/store';
import { type EntityId, type SubroutineState } from '@/types';

import { selectById } from './subroutinesSlice.adapter';

export const selectSubroutine: (state: RootState, id: EntityId) => SubroutineState
= ({ subroutines }, id) => selectById(subroutines, id);
