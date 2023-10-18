import { createSlice } from '@reduxjs/toolkit';

import extraReducers from './commandView.extras';
import initialState from './commandView.initial';
import * as reducers from './commandView.reducers';

export default createSlice({
    name: 'commandView',
    initialState,
    reducers,
    extraReducers,
});
