import { type Middleware, configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

import reducer from './reducer';

const logger = createLogger({
    collapsed: true,
});

const middleware = [
    process.env.NODE_ENV !== 'production' && logger,
].filter(Boolean) as Middleware[];

const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: { ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE] }
    }).concat(middleware),
    reducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
