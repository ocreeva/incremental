import { createSlice } from '@reduxjs/toolkit';

import initialState from './operationView.initial';
import extraReducers from './operationView.extras';
import * as reducers from './operationView.reducers';


export default createSlice({
    name: 'operationView',
    initialState,
    reducers,
    extraReducers,
});
