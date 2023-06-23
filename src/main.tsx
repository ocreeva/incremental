import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';

import App from './App';
import store from './App/store';
import { GameLoopProvider } from './services/GameLoopService';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ReduxProvider store={store}>
            <App />
            <GameLoopProvider />
        </ReduxProvider>
    </React.StrictMode>
);
