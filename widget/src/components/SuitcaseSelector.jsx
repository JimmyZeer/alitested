import React, { useState } from 'react';
import { ChevronRight, RotateCcw, CheckCircle2, Car, Wallet, Award, ShoppingCart, ExternalLink } from 'lucide-react';

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
        image: '/media/placeholder.png', // Remplacer par la vraie image
        strengths: ['Diag Tous Systèmes', 'Mises à jour à vie', 'Bidirectionnel'],
        link: 'https://alitested.com/guides/mucar-892bt-test-avis.html'
    },
    {
        id: 'thinkcar-tkey',
        name: 'Thinkcar TKey 101',
        price: 'Environ 120€',
        budgets: ['100-300'],
        levels: ['confirme', 'pro'],
        image: '/media/placeholder.png',
        strengths: ['Programmation Clés', 'Sans Token', 'Facile d\'utilisation'],
        link: 'https://alitested.com/guides/thinkcar-tkey-101-test-avis.html'
    },
    {
        id: 'mucar-vo7',
        name: 'Mucar VO7',
        price: 'Environ 180€',
        budgets: ['100-300'],
        levels: ['debutant', 'confirme'],
        image: '/media/placeholder.png',
        strengths: ['Tablette 7 pouces', '34 Fonctions Reset', 'Coque Renforcée'],
        link: 'https://alitested.com/guides/mucar-vo7-test-avis.html'
    },
    {
        id: 'kingbolen-k7',
        name: 'Kingbolen K7',
        price: 'Environ 250€',
        budgets: ['100-300', 'pro'],
        levels: ['confirme', 'pro'],
        image: '/media/placeholder.png',
        strengths: ['Compatible CAN-FD', 'Mises à jour à vie', 'Idéal Garage'],
        link: 'https://alitested.com/guides/kingbolen-k7-test-avis.html'
    },
    {
        id: 'autel-mk900',
        name: 'Autel MK900-BT',
        price: 'Plus de 500€',
        budgets: ['pro'],
        levels: ['confirme', 'pro'],
        image: '/media/placeholder.png',
        strengths: ['Vitesse Extrême', 'Codage Avancé', 'Bluetooth Longue Portée'],
        link: 'https://alitested.com/guides/autel-maxicom-mk900-bt-test-avis.html'
    }
];

export default function SuitcaseSelector() {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({
        budget: '',
        level: '',
        brand: ''
    });

    const handleAnswer = (field, value) => {
        setAnswers(prev => ({ ...prev, [field]: value }));
        if (step < 3) {
            setStep(step + 1);
        } else {
            setStep(4); // Résultats
        }
    };

    const getRecommendations = () => {
        // Petit algorithme de scoring basique pour trouver les meilleures valises
        const scoredProducts = PRODUCTS.map(product => {
            let score = 0;
            if (product.budgets.includes(answers.budget)) score += 3;
            if (product.levels.includes(answers.level)) score += 2;
            return { ...product, score };
        });

        // Trie par score décroissant et prend les 2 meilleurs
        return scoredProducts.sort((a, b) => b.score - a.score).slice(0, 2);
    };

    const resetQuiz = () => {
        setAnswers({ budget: '', level: '', brand: '' });
        setStep(1);
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-colors duration-300 mt-8 mb-8">

            {/* En-tête du Quiz */}
            <div className="bg-blue-600 dark:bg-blue-800 p-6 text-white text-center">
                <h2 className="text-2xl font-bold mb-2 text-white">Trouvez votre Valise Idéale</h2>
                <p className="text-blue-100/90 text-sm">Répondez à 3 questions pour obtenir notre recommandation experte.</p>

                {/* Barre de progression */}
                {step < 4 && (
                    <div className="mt-6 flex justify-center items-center gap-2">
                        {[1, 2, 3].map(i => (
                            <div
                                key={i}
                                className={`h-2 rounded-full transition-all duration-300 ${step >= i ? 'w-8 bg-white' : 'w-4 bg-white/30'}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Contenu principal */}
            <div className="p-6 md:p-8">

                {/* Étape 1 : Budget */}
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            <Wallet className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            Quel est votre budget ?
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { id: '<100', label: 'Moins de 100€', desc: 'Basique & Efficace' },
                                { id: '100-300', label: '100€ - 300€', desc: 'Rapport Qualité/Prix' },
                                { id: 'pro', label: 'Pro (300€+)', desc: 'Sans compromis' }
                            ].map(opt => (
                                <button
                                    key={opt.id}
                                    onClick={() => handleAnswer('budget', opt.id)}
                                    className="p-4 border-2 border-slate-200 dark:border-slate-800 rounded-xl text-left hover:border-blue-600 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-800 transition-all group"
                                >
                                    <div className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                        {opt.label}
                                    </div>
                                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{opt.desc}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Étape 2 : Niveau */}
                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            Quel est votre niveau en mécanique ?
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { id: 'debutant', label: 'Débutant', desc: 'Je fais mes entretiens de base' },
                                { id: 'confirme', label: 'Confirmé', desc: 'Je répare souvent moi-même' },
                                { id: 'pro', label: 'Pro / Expert', desc: 'Je fais du codage et diag avancé' }
                            ].map(opt => (
                                <button
                                    key={opt.id}
                                    onClick={() => handleAnswer('level', opt.id)}
                                    className="p-4 border-2 border-slate-200 dark:border-slate-800 rounded-xl text-left hover:border-blue-600 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-800 transition-all group"
                                >
                                    <div className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                        {opt.label}
                                    </div>
                                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{opt.desc}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Étape 3 : Marque du véhicule */}
                {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            <Car className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            Quelle est la marque de votre véhicule ?
                        </h3>
                        <div className="max-w-md mx-auto">
                            <select
                                title="Marque"
                                className="w-full p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20 outline-none transition-all cursor-pointer"
                                onChange={(e) => handleAnswer('brand', e.target.value)}
                                defaultValue=""
                            >
                                <option value="" disabled>Sélectionnez une marque...</option>
                                {CAR_BRANDS.map(brand => (
                                    <option key={brand} value={brand}>{brand}</option>
                                ))}
                            </select>
                            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
                                Nos recommandations prennent en charge la quasi-totalité du parc automobile européen.
                            </p>
                        </div>
                    </div>
                )}

                {/* Étape 4 : Résultats */}
                {step === 4 && (
                    <div className="animate-in fade-in zoom-in-95 duration-500">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Vos recommandations idéales :</h3>
                            <button onClick={resetQuiz} className="text-sm flex items-center gap-1 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
                                <RotateCcw className="w-4 h-4" /> Refaire le test
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {getRecommendations().map((product, idx) => (
                                <div key={product.id} className="relative bg-slate-50 dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
                                    {idx === 0 && (
                                        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 border border-white dark:border-slate-900">
                                            <Award className="w-3 h-3" /> Meilleur Choix
                                        </div>
                                    )}

                                    {/* Placeholder Image (peut être remplacé par les vraies images du site) */}
                                    <div className="mb-4 aspect-video bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-inner flex items-center justify-center p-2 border border-slate-100 dark:border-slate-800">
                                        <img src={product.image} alt={product.name} className="object-contain h-full w-full opacity-80 mix-blend-multiply dark:mix-blend-normal" />
                                    </div>

                                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{product.name}</h4>
                                    <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4">{product.price}</div>

                                    <ul className="space-y-2 mb-6 flex-grow">
                                        {product.strengths.map((str, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                                <span>{str}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <a
                                        href={product.link}
                                        className="mt-auto w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors shadow-md group"
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        Voir le Test / Prix
                                        <ExternalLink className="w-3 h-3 text-white/60 group-hover:text-white transition-colors" />
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
