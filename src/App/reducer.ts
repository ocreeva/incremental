import { combineReducers } from 'redux';

import execution from '@/features/execution';
import game from '@/features/game';
import program from '@/features/program';

const rootReducer = combineReducers({
    execution,
    game,
    program,
});

export default rootReducer;
