import { combineReducers } from 'redux';

import programReducer from "@/features/program";

const rootReducer = combineReducers({
    program: programReducer,
});

export default rootReducer;
