import { createSlice } from '@reduxjs/toolkit';

import adapter from './instructionsSlice.adapter';
import extraReducers from './instructionsSlice.extras';
import * as reducers from './instructionsSlice.reducers';

const initialState = adapter.getInitialState();

export default createSlice({
    name: 'instructions',
    initialState,
    reducers,
    extraReducers,
});
