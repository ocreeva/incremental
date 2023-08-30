import { createSlice } from '@reduxjs/toolkit';

import adapter from './commandsSlice.adapter';
import * as reducers from './commandsSlice.reducers';
import { CommandId } from '@/constants';

let initialState = adapter.getInitialState();
initialState = adapter.addMany(initialState, Object.values(CommandId).map(id => ({ id })));

export default createSlice({
    name: 'commands',
    initialState,
    reducers,
});
