import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import commandData from '@/features/commandData';
import commandView from '@/features/commandView';
import game from '@/features/game';
import instructionData from '@/features/instructionData';
import operationView from '@/features/operationView';
import routineView from '@/features/routineView';
import scriptData from '@/features/scriptData';
import subroutineView from '@/features/subroutineView';

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
        operationView,
        routineView,
        scriptData,
        subroutineView,
    })
);


export default rootReducer;
