import React from 'react';
import App from './app/App';
import { createRoot } from 'react-dom/client';

const container = document.querySelector('#root');
if (container === null) throw new Error('Root container missing in index.html');
const root = createRoot(container);
root.render(<App />);
