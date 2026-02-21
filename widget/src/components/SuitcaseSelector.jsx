import React, { useState } from 'react';
import { ChevronRight, RotateCcw, CheckCircle2, Car, Wallet, Award, ShoppingCart, ExternalLink, Settings2 } from 'lucide-react';

const CAR_BRANDS = [
    'Peugeot', 'Renault', 'Citroën', 'Volkswagen', 'Audi', 'BMW',
    'Mercedes-Benz', 'Toyota', 'Ford', 'Fiat', 'Nissan', 'Autre'
];

const PRODUCTS = [
    {
        id: 'mucar-892bt',
        name: 'Mucar 892BT',
        price: 'Moins de 100€',
        budgets: ['<100'],
        levels: ['debutant', 'confirme'],
        image: '/media/placeholder.png', // Fallback, will try to use the site's real image if available later
        strengths: ['Diag Tous Systèmes', 'Mises à jour à vie', 'Bidirectionnel'],
        link: 'https://alitested.com/guides/mucar-892bt-test-avis.html',
        tag: 'Rapport Qualité/Prix'
    },
    {
        id: 'thinkcar-tkey',
        name: 'Thinkcar TKey 101',
        price: 'Environ 120€',
        budgets: ['100-300'],
        levels: ['confirme', 'pro'],
        image: '/media/placeholder.png',
        strengths: ['Programmation Clés', 'Sans Token', 'Facile d\'utilisation'],
        link: 'https://alitested.com/guides/thinkcar-tkey-101-test-avis.html',
        tag: 'Clés & Transpondeurs'
    },
    {
        id: 'mucar-vo7',
        name: 'Mucar VO7',
        price: 'Environ 180€',
        budgets: ['100-300'],
        levels: ['debutant', 'confirme'],
        image: '/media/placeholder.png',
        strengths: ['Tablette 7 pouces', '34 Fonctions Reset', 'Coque Renforcée'],
        link: 'https://alitested.com/guides/mucar-vo7-test-avis.html',
        tag: 'Tablette Atelier'
    },
    {
        id: 'kingbolen-k7',
        name: 'Kingbolen K7',
        price: 'Environ 250€',
        budgets: ['100-300', 'pro'],
        levels: ['confirme', 'pro'],
        image: '/media/placeholder.png',
        strengths: ['Compatible CAN-FD', 'Mises à jour à vie', 'Idéal Garage'],
        link: 'https://alitested.com/guides/kingbolen-k7-test-avis.html',
        tag: 'Haute Résolution'
    },
    {
        id: 'autel-mk900',
        name: 'Autel MK900-BT',
        price: 'Plus de 500€',
        budgets: ['pro'],
        levels: ['confirme', 'pro'],
        image: '/media/placeholder.png',
        strengths: ['Vitesse Extrême', 'Codage Avancé', 'Bluetooth Longue Portée'],
        link: 'https://alitested.com/guides/autel-maxicom-mk900-bt-test-avis.html',
        tag: 'Haut de gamme'
    }
];

export default function SuitcaseSelector() {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({ budget: '', level: '', brand: '' });

    const handleAnswer = (field, value) => {
        setAnswers(prev => ({ ...prev, [field]: value }));
        setTimeout(() => {
            if (step < 3) setStep(step + 1);
            else setStep(4);
        }, 150); // Small delay for visual feedback
    };

    const getRecommendations = () => {
        const scoredProducts = PRODUCTS.map(product => {
            let score = 0;
            if (product.budgets.includes(answers.budget)) score += 3;
            if (product.levels.includes(answers.level)) score += 2;
            return { ...product, score };
        });
        return scoredProducts.sort((a, b) => b.score - a.score).slice(0, 2);
    };

    const resetQuiz = () => {
        setAnswers({ budget: '', level: '', brand: '' });
        setStep(1);
    };

    return (
        <div className="w-full max-w-4xl mx-auto rounded-2xl md:rounded-[24px] shadow-xl overflow-hidden border border-slate-200 mb-8 bg-white transition-all duration-500 ease-in-out relative z-10">

            {/* Header avec Design Premium */}
            <div className="p-8 md:p-12 text-center relative overflow-hidden flex flex-col items-center" style={{ background: 'var(--primary-gradient)' }}>
                {/* Lignes/Cercles de décoration */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl mix-blend-overlay pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-white opacity-10 blur-2xl mix-blend-overlay pointer-events-none"></div>

                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md mb-5 shadow-sm inline-block relative z-10">
                    <Settings2 className="w-8 h-8 text-white relative z-10" />
                </div>

                <h2 className="text-3xl md:text-4xl font-extrabold mb-3 !text-white !mt-0 relative z-10 leading-tight" style={{ letterSpacing: '-0.02em', textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                    Trouvez votre Valise Idéale
                </h2>
                <p className="text-blue-50 text-base md:text-lg max-w-md !mb-0 relative z-10 font-medium opacity-90">
                    Répondez à 3 questions rapides pour obtenir notre recommandation experte 100% personnalisée.
                </p>

                {step < 4 && (
                    <div className="mt-8 flex justify-center items-center gap-3 relative z-10">
                        {[1, 2, 3].map(i => (
                            <div
                                key={i}
                                className={`h-2.5 rounded-full transition-all duration-500 ease-out ${step >= i ? 'w-12 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'w-4 bg-white/20'}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Main Content Area */}
            <div className="p-6 md:p-10 lg:p-12 bg-[#F8FAFC]">

                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 delay-100 ease-out fill-mode-both">
                        <h3 className="text-2xl md:text-3xl font-extrabold !text-slate-900 mb-8 flex items-center justify-center gap-3 !mt-0" style={{ letterSpacing: '-0.02em' }}>
                            <Wallet className="w-8 h-8 text-blue-600 shrink-0" />
                            Quel est votre budget max ?
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                            {[
                                { id: '<100', label: 'Moins de 100€', desc: 'Fonctions de base & effacement des voyants' },
                                { id: '100-300', label: '100€ à 300€', desc: 'Rapport Qualité/Prix, resets avancés' },
                                { id: 'pro', label: 'Pro (300€+)', desc: 'Sans compromis, vitesse & codage' }
                            ].map(opt => (
                                <button
                                    key={opt.id}
                                    onClick={() => handleAnswer('budget', opt.id)}
                                    className="group relative p-6 bg-white border-2 border-slate-200 rounded-[20px] text-center hover:border-blue-500 hover:shadow-[0_8px_30px_rgb(59,130,246,0.12)] transition-all duration-300 flex flex-col items-center justify-center min-h-[160px] cursor-pointer outline-none focus:border-blue-500 hover:-translate-y-1"
                                >
                                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-full"></div>
                                    <div className="text-xl font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors mb-2">
                                        {opt.label}
                                    </div>
                                    <div className="text-sm font-medium text-slate-500 px-2 leading-relaxed">{opt.desc}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 ease-out">
                        <h3 className="text-2xl md:text-3xl font-extrabold !text-slate-900 mb-8 flex items-center justify-center gap-3 !mt-0" style={{ letterSpacing: '-0.02em' }}>
                            <Award className="w-8 h-8 text-blue-600 shrink-0" />
                            Quel est votre niveau ?
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                            {[
                                { id: 'debutant', label: 'Débutant', desc: 'Je fais mes entretiens de base (vidange, freins...)' },
                                { id: 'confirme', label: 'Confirmé', desc: 'Je répare souvent moi-même des pannes complexes' },
                                { id: 'pro', label: 'Expert / Pro', desc: 'Je fais du codage ECU et diag avancé au quotidien' }
                            ].map(opt => (
                                <button
                                    key={opt.id}
                                    onClick={() => handleAnswer('level', opt.id)}
                                    className="group relative p-6 bg-white border-2 border-slate-200 rounded-[20px] text-center hover:border-blue-500 hover:shadow-[0_8px_30px_rgb(59,130,246,0.12)] transition-all duration-300 flex flex-col items-center justify-center min-h-[160px] cursor-pointer outline-none focus:border-blue-500 hover:-translate-y-1"
                                >
                                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-full"></div>
                                    <div className="text-xl font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors mb-2">
                                        {opt.label}
                                    </div>
                                    <div className="text-sm font-medium text-slate-500 px-2 leading-relaxed">{opt.desc}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 ease-out text-center">
                        <h3 className="text-2xl md:text-3xl font-extrabold !text-slate-900 mb-8 flex items-center justify-center gap-3 !mt-0" style={{ letterSpacing: '-0.02em' }}>
                            <Car className="w-8 h-8 text-blue-600 shrink-0" />
                            Marque de votre véhicule ?
                        </h3>
                        <div className="max-w-md mx-auto relative">
                            <div className="relative group">
                                <select
                                    className="w-full p-5 pl-6 pr-12 rounded-[20px] border-2 border-slate-200 bg-white text-slate-900 font-bold text-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all cursor-pointer appearance-none shadow-sm hover:border-blue-300"
                                    onChange={(e) => handleAnswer('brand', e.target.value)}
                                    defaultValue=""
                                >
                                    <option value="" disabled>Sélectionner ma marque...</option>
                                    {CAR_BRANDS.map(brand => (
                                        <option key={brand} value={brand}>{brand}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-6 text-slate-400 group-hover:text-blue-500 transition-colors">
                                    <ChevronRight className="w-6 h-6 rotate-90" />
                                </div>
                            </div>
                            <div className="mt-6 inline-flex items-center gap-2 bg-blue-50/80 px-4 py-3 rounded-xl border border-blue-100/50 text-sm font-medium text-blue-800">
                                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                                Nos choix couvrent 99% du parc européen (OBD2).
                            </div>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="animate-in fade-in zoom-in-95 duration-500 ease-out">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-5 border-b border-slate-200 gap-4">
                            <h3 className="text-2xl font-extrabold !text-slate-900 !mt-0 !mb-0 flex items-center gap-2">
                                🎯 Vos recommandations :
                            </h3>
                            <button onClick={resetQuiz} className="text-sm font-bold flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors cursor-pointer bg-slate-200/50 hover:bg-blue-50 px-4 py-2 rounded-xl">
                                <RotateCcw className="w-4 h-4" /> Modifier mes réponses
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {getRecommendations().map((product, idx) => (
                                <div key={product.id} className="guide-card flex flex-col h-full bg-white !p-7 md:!p-8 relative" style={{ marginTop: 0 }}>

                                    {/* Badges Premium */}
                                    <div className="mb-5 flex flex-wrap gap-2">
                                        {idx === 0 && (
                                            <span className="badge inline-flex items-center gap-1.5" style={{ background: 'var(--primary-gradient)', color: 'white', border: 'none', boxShadow: '0 4px 12px rgba(59,130,246,0.35)', padding: '0.4rem 1rem' }}>
                                                🏆 Meilleur Choix
                                            </span>
                                        )}
                                        {idx === 1 && (
                                            <span className="badge inline-flex items-center gap-1.5" style={{ background: '#F1F5F9', color: 'var(--text-secondary)', borderColor: 'var(--border)', padding: '0.4rem 1rem' }}>
                                                ⭐ Alternative
                                            </span>
                                        )}
                                        <span className="badge inline-flex items-center gap-1.5" style={{ background: '#FFFBEB', color: '#B45309', borderColor: '#FEF3C7', padding: '0.4rem 1rem' }}>
                                            {product.tag}
                                        </span>
                                    </div>

                                    {/* Contenu */}
                                    <h3 className="!mt-0 !mb-3 !text-2xl leading-tight">{product.name}</h3>
                                    <div className="inline-flex items-center mb-6">
                                        <span className="text-sm font-extrabold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 shadow-sm">
                                            PRIX : {product.price.toUpperCase()}
                                        </span>
                                    </div>

                                    <ul className="mb-8 space-y-3 flex-grow">
                                        {product.strengths.map((str, i) => (
                                            <li key={i} className="flex items-start gap-3 text-base text-slate-700 font-medium leading-snug">
                                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                                <span>{str}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA Button Using Site Styles */}
                                    <a href={product.link} className="cta-button" style={{ marginTop: 'auto', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem' }}>
                                        Voir le Test / Acheter
                                        <ChevronRight className="w-5 h-5" />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
