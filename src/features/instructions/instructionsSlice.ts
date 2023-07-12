import { createSlice } from '@reduxjs/toolkit';

import adapter from './instructionsSlice.adapter';
import extraReducers from './instructionsSlice.extras';
import * as reducers from './instructionsSlice.reducers';

import type { AdditionalSliceState } from './instructionsSlice.types';

const initialState = adapter.getInitialState<AdditionalSliceState>({ });

export default createSlice({
    name: 'instructions',
    initialState,
    reducers,
    extraReducers,
});
