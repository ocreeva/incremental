import { type Middleware, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import reducer from './reducer';

const middleware = [
    process.env.NODE_ENV !== 'production' && logger,
].filter(Boolean) as Middleware[];

const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
    reducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
