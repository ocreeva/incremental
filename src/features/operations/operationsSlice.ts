import { createSlice } from '@reduxjs/toolkit';

import adapter from './operationsSlice.adapter';
import extraReducers from './operationsSlice.extras';
import * as reducers from './operationsSlice.reducers';

const initialState = adapter.getInitialState();

export default createSlice({
    name: 'operations',
    initialState,
    reducers,
    extraReducers,
});
