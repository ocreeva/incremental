import { createSlice } from '@reduxjs/toolkit';

import initialState from './subroutineView.initial';
import extraReducers from './subroutineView.extras';
import * as reducers from './subroutineView.reducers';


export default createSlice({
    name: 'subroutineView',
    initialState,
    reducers,
    extraReducers,
});
