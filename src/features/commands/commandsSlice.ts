import { createSlice } from '@reduxjs/toolkit';

import adapter from './commandsSlice.adapter';
import * as reducers from './commandsSlice.reducers';
import type { AdditionalSliceState } from './commandsSlice.types';

const initialState = adapter.getInitialState<AdditionalSliceState>({ });

export default createSlice({
    name: 'commands',
    initialState,
    reducers,
});
