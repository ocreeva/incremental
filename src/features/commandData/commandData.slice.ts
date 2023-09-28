import { createSlice } from '@reduxjs/toolkit';

import adapter from './commandData.adapter';
import * as reducers from './commandData.reducers';

const initialState = adapter.getInitialState();

export default createSlice({
    name: 'commandData',
    initialState,
    reducers,
});
