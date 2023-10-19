import { createSlice } from '@reduxjs/toolkit';

import extraReducers from './instructionData.extras';
import initialState from './instructionData.initial';
import * as reducers from './instructionData.reducers';

export default createSlice({
    name: 'instructionData',
    initialState,
    reducers,
    extraReducers,
});
