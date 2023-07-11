import { selectStateEntityById } from '../_utility';
import adapter from './subroutinesSlice.adapter';

import type { RootState } from '@/App/store';
import type { SubroutineState } from '@/types';
import type { EntityId } from '@reduxjs/toolkit';

const { selectById } = adapter.getSelectors();

export const selectSubroutine: (state: RootState, id: EntityId) => SubroutineState
= ({ subroutines }, id) => selectStateEntityById('subroutines', selectById, subroutines, id);
