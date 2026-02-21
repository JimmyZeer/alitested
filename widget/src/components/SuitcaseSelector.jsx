import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ChevronRight, RotateCcw, CheckCircle2, Car, Wallet, Award, ShoppingCart, Crosshair } from 'lucide-react';

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
        image: '/media/placeholder.png',
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

    const timerRef = useRef(null);

    // Cleanup timer on unmount (Hygiène de code / memory leak prevention)
    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const handleAnswer = (field, value) => {
        setAnswers(prev => ({ ...prev, [field]: value }));

        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            if (step < 3) setStep(step + 1);
            else setStep(4);
        }, 200);
    };

    // Optimisation : Évite de recalculer le tri à chaque rendu
    const recommendations = useMemo(() => {
        if (step !== 4) return [];
        const scoredProducts = PRODUCTS.map(product => {
            let score = 0;
            if (product.budgets.includes(answers.budget)) score += 3;
            if (product.levels.includes(answers.level)) score += 2;
            return { ...product, score };
        });
        return scoredProducts.sort((a, b) => b.score - a.score).slice(0, 2);
    }, [answers, step]);

    const resetQuiz = () => {
        setAnswers({ budget: '', level: '', brand: '' });
        setStep(1);
    };

    return (
        <div className="alitested-verdict animate-fade-in-up" style={{
            margin: '0',
            padding: window.innerWidth > 768 ? '4rem' : '2rem',
            background: 'var(--bg-content)',
            border: '1px solid var(--border)',
            borderRadius: '1rem',
            boxShadow: 'none'
        }}>

            {/* Header (Minimaliste, intégré au site) */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 className="alitested-title" style={{ marginTop: 0, marginBottom: '0.75rem', fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-main)' }}>
                    Trouvez votre Valise Idéale
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', margin: '0 auto', maxWidth: '600px' }}>
                    Répondez à 3 questions pour obtenir notre recommandation experte.
                </p>

                {/* ProgressBar subtile */}
                {step < 4 && (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
                        {[1, 2, 3].map(i => (
                            <div
                                key={i}
                                style={{
                                    height: '4px',
                                    borderRadius: '99px',
                                    transition: 'var(--transition-bounce)',
                                    width: step >= i ? '40px' : '16px',
                                    background: step >= i ? 'var(--primary)' : 'var(--border)'
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Étapes du Quiz */}
            <div style={{ position: 'relative', minHeight: '300px' }}>

                {step === 1 && (
                    <div className="animate-fade-in-up" style={{ textAlign: 'center' }}>
                        <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontSize: '1.4rem' }}>
                            <Wallet size={28} color="var(--primary)" />
                            Quel est votre budget ?
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
                            {[
                                { id: '<100', label: 'Moins de 100€', desc: 'Basique & Efficace' },
                                { id: '100-300', label: '100€ - 300€', desc: 'Rapport Qualité/Prix' },
                                { id: 'pro', label: 'Pro (300€+)', desc: 'Sans compromis' }
                            ].map(opt => (
                                <button
                                    key={opt.id}
                                    onClick={() => handleAnswer('budget', opt.id)}
                                    className="guide-card"
                                    style={{
                                        cursor: 'pointer',
                                        padding: '2rem 1.5rem',
                                        border: '1px solid var(--border)',
                                        textAlign: 'center',
                                        minHeight: '140px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        background: 'var(--bg-content)',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--border-hover)';
                                        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--border)';
                                        e.currentTarget.style.boxShadow = 'none';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <strong style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.5rem', display: 'block', fontWeight: '800' }}>{opt.label}</strong>
                                    <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{opt.desc}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-fade-in-up" style={{ textAlign: 'center' }}>
                        <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-main)' }}>
                            <Award size={28} color="var(--primary)" />
                            Niveau en mécanique ?
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
                            {[
                                { id: 'debutant', label: 'Débutant', desc: 'Entretiens de base' },
                                { id: 'confirme', label: 'Confirmé', desc: 'Réparations fréquentes' },
                                { id: 'pro', label: 'Expert / Pro', desc: 'Codage & Diag avancé' }
                            ].map(opt => (
                                <button
                                    key={opt.id}
                                    onClick={() => handleAnswer('level', opt.id)}
                                    className="guide-card"
                                    style={{
                                        cursor: 'pointer',
                                        padding: '2rem 1.5rem',
                                        border: '1px solid var(--border)',
                                        textAlign: 'center',
                                        minHeight: '140px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        background: 'var(--bg-content)',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--border-hover)';
                                        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--border)';
                                        e.currentTarget.style.boxShadow = 'none';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <strong style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.5rem', display: 'block', fontWeight: '800' }}>{opt.label}</strong>
                                    <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{opt.desc}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-fade-in-up" style={{ textAlign: 'center' }}>
                        <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-main)' }}>
                            <Car size={28} color="var(--warning)" />
                            Marque du véhicule ?
                        </h3>
                        <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
                            <div style={{ position: 'relative' }}>
                                <select
                                    style={{
                                        width: '100%',
                                        padding: '1.25rem',
                                        borderRadius: '12px',
                                        border: '1px solid var(--border)',
                                        background: 'var(--bg-content)',
                                        color: 'var(--text-main)',
                                        fontSize: '1.1rem',
                                        fontWeight: '600',
                                        outline: 'none',
                                        cursor: 'pointer',
                                        appearance: 'none',
                                        boxShadow: 'var(--shadow-sm)',
                                        transition: 'var(--transition-smooth)'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
                                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
                                    onChange={(e) => handleAnswer('brand', e.target.value)}
                                    defaultValue=""
                                >
                                    <option value="" disabled>Sélectionner ma marque...</option>
                                    {CAR_BRANDS.map(brand => (
                                        <option key={brand} value={brand}>{brand}</option>
                                    ))}
                                </select>
                                <ChevronRight style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%) rotate(90deg)', pointerEvents: 'none', color: 'var(--text-dim)' }} />
                            </div>
                            <p style={{ marginTop: '1.5rem', fontSize: '0.95rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <CheckCircle2 size={18} color="var(--success)" />
                                Couvre plus de 99% du parc européen.
                            </p>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="animate-fade-in-up">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                            <h3 style={{ margin: 0, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Crosshair size={24} color="var(--primary)" />
                                Vos Résultats
                            </h3>
                            <button
                                onClick={resetQuiz}
                                style={{
                                    background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', fontWeight: 'bold'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                            >
                                <RotateCcw size={16} /> Refaire le test
                            </button>
                        </div>

                        <div className="guide-grid" style={{ marginTop: '1rem' }}>
                            {recommendations.map((product, idx) => (
                                <div key={product.id} className="guide-card" style={{ display: 'flex', flexDirection: 'column', position: 'relative', marginTop: 0 }}>

                                    <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                        {idx === 0 && (
                                            <span className="badge" style={{ background: 'var(--primary-gradient)', color: 'white', border: 'none' }}>
                                                🏆 Meilleur Choix
                                            </span>
                                        )}
                                        <span className="badge" style={{ background: 'var(--bg-body)' }}>{product.tag}</span>
                                    </div>

                                    <h3 style={{ marginTop: 0, fontSize: '1.5rem', marginBottom: '0.5rem' }}>{product.name}</h3>
                                    <span style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1.5rem', display: 'block' }}>
                                        {product.price.toUpperCase()}
                                    </span>

                                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', flexGrow: 1 }}>
                                        {product.strengths.map((str, i) => (
                                            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                                <CheckCircle2 size={18} color="var(--success)" />
                                                {str}
                                            </li>
                                        ))}
                                    </ul>

                                    <a href={product.link} className="cta-button" style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                                        <ShoppingCart size={20} />
                                        Voir le Test & Acheter
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
