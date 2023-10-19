import { createSlice } from '@reduxjs/toolkit';

import extraReducers from './routineView.extras';
import initialState from './routineView.initial';
import * as reducers from './routineView.reducers';

export default createSlice({
    name: 'routineView',
    initialState,
    reducers,
    extraReducers,
});
