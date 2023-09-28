import { createSlice } from '@reduxjs/toolkit';

import { CommandId } from '@/constants';
import { CommandView } from '@/types';

import adapter from './commandView.adapter';
import * as reducers from './commandView.reducers';

const createDefaultCommandView: (id: CommandId) => CommandView
= (id) => ({
    id,
    isEnabled: false,
    isVisible: false,
    level: 0,
    progress: 0,
});

const initialState = adapter.addMany(
    adapter.getInitialState(),
    Object.values(CommandId).map(createDefaultCommandView)
);

export default createSlice({
    name: 'commandView',
    initialState,
    reducers,
});
