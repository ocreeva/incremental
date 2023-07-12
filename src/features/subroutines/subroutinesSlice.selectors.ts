import { selectById } from './subroutinesSlice.adapter';

import type { RootState } from '@/App/store';
import type { SubroutineState } from '@/types';
import type { EntityId } from '@reduxjs/toolkit';

export const selectSubroutine: (state: RootState, id: EntityId) => SubroutineState
= ({ subroutines }, id) => selectById(subroutines, id);
