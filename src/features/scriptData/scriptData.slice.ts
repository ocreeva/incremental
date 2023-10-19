import { createSlice } from '@reduxjs/toolkit';

import extraReducers from './scriptData.extras';
import initialState from './scriptData.initial';
import * as reducers from './scriptData.reducers';

export default createSlice({
    name: 'scriptData',
    initialState,
    reducers,
    extraReducers,
});
