import { createSlice } from '@reduxjs/toolkit';

import extraReducers from './commandData.extras';
import initialState from './commandData.initial';
import * as reducers from './commandData.reducers';

export default createSlice({
    name: 'commandData',
    initialState,
    reducers,
    extraReducers,
});
