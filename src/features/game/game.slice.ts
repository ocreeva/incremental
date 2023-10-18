import { createSlice } from '@reduxjs/toolkit';

import initialState from './game.initial';
import * as reducers from './game.reducers';

export default createSlice({
    name: 'game',
    initialState,
    reducers
});
