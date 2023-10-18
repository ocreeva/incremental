import { CommandId } from '@/constants';
import { getDefaultCommandView } from '@/game/commands/view';

import adapter from './commandView.adapter';

const initialState = adapter.addMany(
    adapter.getInitialState(),
    Object.values(CommandId).map(getDefaultCommandView)
);

export default initialState;
