import { createSlice } from '@reduxjs/toolkit';

import adapter from './operationsSlice.adapter';
import extraReducers from './operationsSlice.extras';
import * as reducers from './operationsSlice.reducers';
import { type AdditionalSliceState } from './operationsSlice.types';

const initialState = adapter.getInitialState<AdditionalSliceState>({ });

export default createSlice({
    name: 'operations',
    initialState,
    reducers,
    extraReducers,
});
