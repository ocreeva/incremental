import { CommandDataState } from '@/types';

import adapter from './commandData.adapter';

const initialState: CommandDataState = adapter.getInitialState();

export default initialState;
