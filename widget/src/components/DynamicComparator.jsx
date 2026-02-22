import React, { useState } from 'react';
import { ArrowLeftRight, Check, X, ShoppingCart, Award, ShieldCheck } from 'lucide-react';

// Centralized Catalog of Scanners
const SCANNERS = {
    'mucar-892bt': {
        id: 'mucar-892bt',
        name: 'Mucar 892BT',
        shortName: '892BT',
        brand: 'Mucar',
        priceLabel: 'Environ 450€',
        target: 'Semi-Pro / Mécanicien',
        image: '/favicon.png', // Fallback, would normally use product image
        link: 'https://s.click.aliexpress.com/e/_DEK9kO3',
        updates: 'À vie (Gratuit)',
        canFd: true,
        bidirectional: true,
        ecuCoding: true,
        systems: 'Tous les systèmes',
        resets: 28,
        rating: 4.8
    },
    'mucar-v06': {
        id: 'mucar-v06',
        name: 'Mucar V06',
        shortName: 'V06',
        brand: 'Mucar',
        priceLabel: 'Autour de 150€',
        target: 'Amateur Éclairé',
        image: '/favicon.png',
        link: 'https://s.click.aliexpress.com/e/_c2wgnY4R',
        updates: 'À vie (Gratuit)',
        canFd: true,
        bidirectional: true,
        ecuCoding: false,
        systems: 'Tous les systèmes',
        resets: 28,
        rating: 4.6
    },
    'thinktool-lite': {
        id: 'thinktool-lite',
        name: 'Thinkcar Thinktool Lite',
        shortName: 'Lite',
        brand: 'Thinkcar',
        priceLabel: 'Autour de 350€',
        target: 'Semi-Pro / Mécanicien',
        image: '/favicon.png',
        link: 'https://s.click.aliexpress.com/e/_DkM7n53',
        updates: '2 Ans Gratuits',
        canFd: true,
        bidirectional: true,
        ecuCoding: true,
        systems: 'Tous + Topologie Réseau',
        resets: 34,
        rating: 4.9
    },
    'kingbolen-k7': {
        id: 'kingbolen-k7',
        name: 'Kingbolen K7',
        shortName: 'K7',
        brand: 'Kingbolen',
        priceLabel: 'Autour de 350€',
        target: 'Semi-Pro',
        image: '/favicon.png',
        link: 'https://s.click.aliexpress.com/e/_DBrbJqT',
        updates: '3 Ans Gratuits',
        canFd: true,
        bidirectional: true,
        ecuCoding: true,
        systems: 'Tous les systèmes',
        resets: 31,
        rating: 4.7
    },
    'autel-mk900': {
        id: 'autel-mk900',
        name: 'Autel MaxiCOM MK900-BT',
        shortName: 'MK900-BT',
        brand: 'Autel',
        priceLabel: 'Autour de 450€',
        target: 'Pro / Expert',
        image: '/favicon.png',
        link: 'https://s.click.aliexpress.com/e/_c4TUMhHv',
        updates: '1 An Gratuit (Très cher après)',
        canFd: true,
        bidirectional: true,
        ecuCoding: false, // Hidden coding only on some models
        systems: 'OE-Level',
        resets: 40,
        rating: 4.8
    }
};

const ScannerSelect = ({ value, onChange, options, exclude, label }) => (
    <div className="flex flex-col gap-1.5 w-full">
        <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-white border-2 border-slate-200 text-slate-800 font-bold text-lg rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 cursor-pointer transition-all appearance-none"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 7l5 5 5-5'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 1rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em',
                paddingRight: '2.5rem'
            }}
        >
            {Object.values(options).map(scanner => (
                <option
                    key={scanner.id}
                    value={scanner.id}
                    disabled={scanner.id === exclude}
                >
                    {scanner.name} {scanner.id === exclude ? '(Déjà sélectionné)' : ''}
                </option>
            ))}
        </select>
    </div>
);

const FeatureRow = ({ label, val1, val2, isBoolean = false, winner = 0 }) => {

    const renderValue = (val, isWinner) => {
        if (isBoolean) {
            return val ? (
                <Check className={`w-6 h-6 mx-auto ${isWinner ? 'text-blue-500' : 'text-slate-400'}`} />
            ) : (
                <X className="w-5 h-5 mx-auto text-slate-300" />
            );
        }
        return (
            <span className={`font-medium ${isWinner ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                {val}
            </span>
        );
    };

    return (
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 py-4 md:py-5 border-b border-slate-100 items-center px-4 md:px-0 hover:bg-slate-50 transition-colors">
            {/* Mobile label shows above values */}
            <div className="col-span-3 md:col-span-1 text-sm md:text-base font-bold text-slate-700 md:text-slate-500 uppercase tracking-wide">
                {label}
            </div>

            {/* Scanner 1 Value */}
            <div className="col-span-1 border-r border-slate-100 md:border-none md:col-span-2 text-center flex flex-col items-center justify-center">
                {renderValue(val1, winner === 1)}
            </div>

            {/* View separator on mobile, hidden on desktop */}
            <div className="col-span-1 md:hidden flex justify-center items-center text-slate-200">
                <span className="h-full w-px bg-slate-100"></span>
            </div>

            {/* Scanner 2 Value */}
            <div className="col-span-1 md:col-span-2 text-center flex flex-col items-center justify-center">
                {renderValue(val2, winner === 2)}
            </div>
        </div>
    );
};

export default function DynamicComparator({ defaultScanner1 = 'thinktool-lite', defaultScanner2 = 'autel-mk900' }) {
    // Default selected scanners
    const [scanner1Id, setScanner1Id] = useState(defaultScanner1);
    const [scanner2Id, setScanner2Id] = useState(defaultScanner2);

    const s1 = SCANNERS[scanner1Id];
    const s2 = SCANNERS[scanner2Id];

    return (
        <div className="w-full max-w-5xl mx-auto my-12 font-sans bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

            {/* Header & Selectors */}
            <div className="p-6 md:p-10 bg-slate-50 border-b border-slate-100">
                <div className="text-center mb-8">
                    <span className="inline-flex items-center gap-1.5 text-blue-600 font-bold uppercase tracking-widest text-sm mb-3 bg-blue-100 px-4 py-1.5 rounded-full">
                        <ArrowLeftRight size={16} /> Le Duel
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                        Comparateur Dynamique
                    </h2>
                    <p className="text-slate-500 mt-3 text-lg">
                        Sélectionnez deux modèles ci-dessous pour filtrer leurs caractéristiques.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 justify-center max-w-3xl mx-auto">
                    <div className="w-full md:w-5/12">
                        <ScannerSelect
                            label="Valise N°1"
                            value={scanner1Id}
                            onChange={setScanner1Id}
                            options={SCANNERS}
                            exclude={scanner2Id}
                        />
                    </div>

                    <div className="hidden md:flex shrink-0 w-12 h-12 bg-white rounded-full border-2 border-slate-200 items-center justify-center text-slate-400 font-black shadow-sm z-10">
                        VS
                    </div>

                    <div className="w-full md:w-5/12">
                        <ScannerSelect
                            label="Valise N°2"
                            value={scanner2Id}
                            onChange={setScanner2Id}
                            options={SCANNERS}
                            exclude={scanner1Id}
                        />
                    </div>
                </div>
            </div>

            {/* Comparison Table Grid */}
            <div className="p-0 md:p-10">

                {/* Desktop Table Headers (Hidden on Mobile) */}
                <div className="hidden md:grid grid-cols-5 gap-4 mb-6 px-4 md:px-0 items-end">
                    <div className="col-span-1"></div> {/* Empty corner */}

                    {/* Header Scanner 1 */}
                    <div className="col-span-2 text-center p-6 bg-slate-50 rounded-2xl border border-slate-100 relative group transition-all hover:border-blue-200">
                        <div className="text-blue-500 text-sm font-bold uppercase tracking-widest mb-1">{s1.brand}</div>
                        <h3 className="text-2xl font-black text-slate-900">{s1.shortName}</h3>
                        <div className="inline-block mt-3 px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 shadow-sm">
                            {s1.priceLabel}
                        </div>
                    </div>

                    {/* Header Scanner 2 */}
                    <div className="col-span-2 text-center p-6 bg-slate-50 rounded-2xl border border-slate-100 relative group transition-all hover:border-blue-200">
                        <div className="text-blue-500 text-sm font-bold uppercase tracking-widest mb-1">{s2.brand}</div>
                        <h3 className="text-2xl font-black text-slate-900">{s2.shortName}</h3>
                        <div className="inline-block mt-3 px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 shadow-sm">
                            {s2.priceLabel}
                        </div>
                    </div>
                </div>

                {/* Mobile Heads */}
                <div className="grid grid-cols-2 md:hidden border-b border-slate-200 sticky top-0 bg-white/90 backdrop-blur-md z-20 shadow-sm">
                    <div className="p-4 text-center border-r border-slate-200">
                        <div className="text-blue-500 text-xs font-bold uppercase tracking-widest leading-none mb-1">{s1.brand}</div>
                        <h3 className="text-lg font-black text-slate-900 leading-tight">{s1.shortName}</h3>
                    </div>
                    <div className="p-4 text-center">
                        <div className="text-blue-500 text-xs font-bold uppercase tracking-widest leading-none mb-1">{s2.brand}</div>
                        <h3 className="text-lg font-black text-slate-900 leading-tight">{s2.shortName}</h3>
                    </div>
                </div>

                {/* Data Rows */}
                <div className="flex flex-col">
                    <FeatureRow
                        label="Cible"
                        val1={s1.target}
                        val2={s2.target}
                    />
                    <FeatureRow
                        label="Systèmes Scannés"
                        val1={s1.systems}
                        val2={s2.systems}
                    />
                    <FeatureRow
                        label="Mises à jour"
                        val1={s1.updates}
                        val2={s2.updates}
                        winner={s1.updates.includes('Vie') ? 1 : (s2.updates.includes('Vie') ? 2 : 0)}
                    />
                    <FeatureRow
                        label="Protocoles CAN-FD"
                        val1={s1.canFd}
                        val2={s2.canFd}
                        isBoolean={true}
                    />
                    <FeatureRow
                        label="Tests Actifs (Bi-Dir)"
                        val1={s1.bidirectional}
                        val2={s2.bidirectional}
                        isBoolean={true}
                    />
                    <FeatureRow
                        label="Codage ECU Avancé"
                        val1={s1.ecuCoding}
                        val2={s2.ecuCoding}
                        isBoolean={true}
                        winner={s1.ecuCoding && !s2.ecuCoding ? 1 : (s2.ecuCoding && !s1.ecuCoding ? 2 : 0)}
                    />
                    <FeatureRow
                        label="Fonctions de Service"
                        val1={`${s1.resets} Resets`}
                        val2={`${s2.resets} Resets`}
                        winner={s1.resets > s2.resets ? 1 : (s2.resets > s1.resets ? 2 : 0)}
                    />
                </div>

                {/* CTA Footer Row */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 px-4 md:px-0">
                    <div className="hidden md:block col-span-1"></div>

                    <div className="col-span-1 md:col-span-2 text-center">
                        <a
                            href={s1.link}
                            target="_blank"
                            rel="sponsored noopener"
                            className="w-full flex flex-col md:flex-row items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-4 md:px-6 rounded-xl transition-colors shadow-lg shadow-slate-900/20"
                        >
                            <ShoppingCart size={18} className="shrink-0" />
                            <span className="text-sm md:text-base">Voir prix {s1.shortName}</span>
                        </a>
                        <div className="flex items-center justify-center gap-1 text-slate-400 text-xs font-medium mt-3">
                            <ShieldCheck size={14} /> Distributeur Officiel
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-2 text-center">
                        <a
                            href={s2.link}
                            target="_blank"
                            rel="sponsored noopener"
                            className="w-full flex flex-col md:flex-row items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-4 md:px-6 rounded-xl transition-colors shadow-lg shadow-blue-500/20"
                        >
                            <ShoppingCart size={18} className="shrink-0" />
                            <span className="text-sm md:text-base">Voir prix {s2.shortName}</span>
                        </a>
                        <div className="flex items-center justify-center gap-1 text-slate-400 text-xs font-medium mt-3">
                            <ShieldCheck size={14} /> Distributeur Officiel
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
