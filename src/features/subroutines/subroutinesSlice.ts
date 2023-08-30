import { createSlice } from '@reduxjs/toolkit';

import adapter from './subroutinesSlice.adapter';
import extraReducers from './subroutinesSlice.extras';
import * as reducers from './subroutinesSlice.reducers';

const initialState = adapter.getInitialState();

export default createSlice({
    name: 'subroutines',
    initialState,
    reducers,
    extraReducers,
});
