import { createSlice } from '@reduxjs/toolkit';

import { CommandId } from '@/constants';
import { getDefaultCommandView } from '@/game/commands/view';

import adapter from './commandView.adapter';
import * as reducers from './commandView.reducers';

const initialState = adapter.addMany(
    adapter.getInitialState(),
    Object.values(CommandId).map(getDefaultCommandView)
);

export default createSlice({
    name: 'commandView',
    initialState,
    reducers,
});
