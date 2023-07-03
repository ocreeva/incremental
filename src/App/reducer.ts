import { combineReducers } from '@reduxjs/toolkit';

import game from '@/features/game';
import instructions from '@/features/instructions';
import operations from '@/features/operations';
import routines from '@/features/routines';
import scripts from '@/features/scripts';
import subroutines from '@/features/subroutines';

const rootReducer = combineReducers({
    game,
    instructions,
    operations,
    routines,
    scripts,
    subroutines,
});

export default rootReducer;
