import { EntityId } from '@reduxjs/toolkit';

import { RootState } from '@/App/store';
import { SubroutineView } from '@/types';

import { selectById } from './subroutineView.adapter';

export const selectSubroutine: (state: RootState, id: EntityId) => SubroutineView
= ({ subroutineView }, id) => selectById(subroutineView, id);
