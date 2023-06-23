import { combineReducers } from 'redux';

import game from '@/features/game';
import operations from '@/features/operations';
import program from '@/features/program';
import routines from '@/features/routines';
import subroutines from '@/features/subroutines';

const rootReducer = combineReducers({
    game,
    operations,
    program,
    routines,
    subroutines,
});

export default rootReducer;
