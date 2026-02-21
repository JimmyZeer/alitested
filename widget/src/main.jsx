import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import SuitcaseSelector from './components/SuitcaseSelector';

// Find the root element in the HTML
const container = document.getElementById('suitcase-selector-root');

if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <div className="suitcase-widget-wrapper">
                <SuitcaseSelector />
            </div>
        </React.StrictMode>
    );
} else {
    console.warn('SuitcaseSelector Widget Error: Container element with id "suitcase-selector-root" not found.');
}
