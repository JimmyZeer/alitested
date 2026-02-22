import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import SuitcaseSelector from './components/SuitcaseSelector';
import TechDictionary from './components/TechDictionary';
import ExpertComparison from './components/ExpertComparison';
import ObdCodeResolver from './components/ObdCodeResolver';
import DynamicComparator from './components/DynamicComparator';
import LeadMagnet from './components/LeadMagnet';
import ReviewComments from './components/ReviewComments';

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

// Inject OBD Code Resolver if container exists
const obdContainer = document.getElementById('obd-code-root');
if (obdContainer) {
    const root = createRoot(obdContainer);
    root.render(
        <React.StrictMode>
            <div className="obd-widget-wrapper">
                <ObdCodeResolver />
            </div>
        </React.StrictMode>
    );
}

// Inject Dynamic Comparator if container exists
const comparatorContainer = document.getElementById('dynamic-comparator-root');
if (comparatorContainer) {
    const s1 = comparatorContainer.dataset.scanner1 || 'thinktool-lite';
    const s2 = comparatorContainer.dataset.scanner2 || 'autel-mk900';
    const root = createRoot(comparatorContainer);
    root.render(
        <React.StrictMode>
            <div className="dynamic-comparator-wrapper">
                <DynamicComparator defaultScanner1={s1} defaultScanner2={s2} />
            </div>
        </React.StrictMode>
    );
}

// Inject Lead Magnet if container exists
const leadMagnetContainer = document.getElementById('lead-magnet-root');
if (leadMagnetContainer) {
    const mode = leadMagnetContainer.dataset.mode || 'inline';
    const root = createRoot(leadMagnetContainer);
    root.render(
        <React.StrictMode>
            <div className={`lead-magnet-wrapper ${mode === 'modal' ? 'modal-mode' : ''}`}>
                <LeadMagnet mode={mode} />
            </div>
        </React.StrictMode>
    );
}

// Inject Review Comments if container exists
const reviewsContainer = document.getElementById('reviews-root');
if (reviewsContainer) {
    const productId = reviewsContainer.dataset.productId || 'default';
    const root = createRoot(reviewsContainer);
    root.render(
        <React.StrictMode>
            <div className="reviews-wrapper">
                <ReviewComments productId={productId} />
            </div>
        </React.StrictMode>
    );
}
