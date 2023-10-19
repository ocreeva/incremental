import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import commandData from '@/features/commandData';
import commandView from '@/features/commandView';
import game from '@/features/game';
import instructionData from '@/features/instructionData';
import operations from '@/features/operations';
import routines from '@/features/routines';
import scriptData from '@/features/scriptData';
import subroutines from '@/features/subroutines';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [
        'commandData',
        'instructionData',
        'scriptData',
    ],
};

const rootReducer = persistReducer(
    persistConfig,
    combineReducers({
        commandData,
        commandView,
        game,
        instructionData,
        operations,
        routines,
        scriptData,
        subroutines,
    })
);


export default rootReducer;
