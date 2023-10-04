import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import persistor from './App/persistor';
import store from './App/store';
import { GameStateProvider } from './services/GameStateService';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ReduxProvider store={store}>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
            <GameStateProvider />
        </ReduxProvider>
    </React.StrictMode>
);
