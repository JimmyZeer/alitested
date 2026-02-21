import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import SuitcaseSelector from './components/SuitcaseSelector';
import TechDictionary from './components/TechDictionary';

// Inject Suitcase Selector if container exists
const suitcaseContainer = document.getElementById('suitcase-selector-root');
if (suitcaseContainer) {
    const root = createRoot(suitcaseContainer);
    root.render(
        <React.StrictMode>
            <div className="suitcase-widget-wrapper">
                <SuitcaseSelector />
            </div>
        </React.StrictMode>
    );
}

// Inject Tech Dictionary if container exists
const dictionaryContainer = document.getElementById('tech-dictionary-root');
if (dictionaryContainer) {
    const root = createRoot(dictionaryContainer);
    root.render(
        <React.StrictMode>
            <div className="dictionary-widget-wrapper">
                <TechDictionary />
            </div>
        </React.StrictMode>
    );
}
