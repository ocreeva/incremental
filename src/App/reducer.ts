import { combineReducers } from 'redux';

import gameReducer from '@/features/game';
import programReducer from '@/features/program';

const rootReducer = combineReducers({
    game: gameReducer,
    program: programReducer,
});

export default rootReducer;
