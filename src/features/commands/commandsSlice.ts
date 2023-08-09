import { createSlice } from '@reduxjs/toolkit';

import { CommandId } from '@/constants';

import adapter from './commandsSlice.adapter';
import * as reducers from './commandsSlice.reducers';
import type { AdditionalSliceState, SliceState } from './commandsSlice.types';

let initialState = adapter.getInitialState<AdditionalSliceState>({ });
initialState = adapter.addMany<SliceState>(
    initialState,
    Object.values(CommandId).map(id => ({
        id,
        level: 0,
        progress: 0,
    }))
);

export default createSlice({
    name: 'commands',
    initialState,
    reducers,
});
