import type { EntityState } from '@reduxjs/toolkit';
import type { ScriptState } from '@/types';

export type AdditionalSliceState = {
    currentId: string;
};

export type SliceState = EntityState<ScriptState> & AdditionalSliceState;
