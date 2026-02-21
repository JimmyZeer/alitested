import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import SuitcaseSelector from './components/SuitcaseSelector';
import TechDictionary from './components/TechDictionary';
import ExpertComparison from './components/ExpertComparison';

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

// Inject Expert Comparison if container exists
const expertContainer = document.getElementById('expert-comparison-root');
if (expertContainer) {
    const affiliateLink = expertContainer.dataset.affiliateLink || '#';
    const productName = expertContainer.dataset.productName || 'Édition Recommandée';

    const root = createRoot(expertContainer);
    root.render(
        <React.StrictMode>
            <div className="expert-widget-wrapper">
                <ExpertComparison affiliateLink={affiliateLink} productName={productName} />
            </div>
        </React.StrictMode>
    );
}
