import './styles/globals.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import { ReactQueryProvider } from './providers/ReactQueryProvider';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ReactQueryProvider>
            <App />
        </ReactQueryProvider>
    </StrictMode>,
);
