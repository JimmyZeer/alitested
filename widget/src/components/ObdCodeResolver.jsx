import React, { useState, useMemo } from 'react';
import { Search, AlertTriangle, Info, Wrench, ShieldCheck, ShoppingCart, ChevronRight } from 'lucide-react';

const OBD_DATABASE = {
    'P0420': {
        title: 'Système de catalyseur',
        desc: 'Le calculateur moteur a détecté que le convertisseur catalytique ne fonctionne pas efficacement (rendement inférieur au seuil).',
        causes: ['Sonde lambda (O2) défectueuse', 'Fuite d\'échappement', 'Catalyseur encrassé ou HS'],
        severity: 2, // 1: Low, 2: Medium, 3: High
        action: 'Vérifiez d\'abord les sondes lambda en temps réel (Live Data) avant de changer le catalyseur. Un simple effacement permet de voir si l\'erreur revient.',
    },
    'P20E8': {
        title: 'Pression du système AdBlue (Urée)',
        desc: 'Pression du liquide de réduction (AdBlue) trop faible. Code très commun sur les moteurs Peugeot/Citroën (BlueHDi).',
        causes: ['Pompe AdBlue HS (dans le réservoir)', 'Cristallisation dans l\'injecteur d\'urée', 'Faisceau endommagé'],
        severity: 3,
        action: 'Le moteur refusera de démarrer si le compte à rebours kilométrique expire. Un effacement est crucial après réparation ou nettoyage du système.',
    },
    'P0300': {
        title: 'Ratés d\'allumage aléatoires/multiples',
        desc: 'Un ou plusieurs cylindres ne s\'allument pas correctement. Le moteur tremble et perd de la puissance.',
        causes: ['Bougies usées', 'Bobines d\'allumage HS', 'Injecteur bouché', 'Problème de compression'],
        severity: 3,
        action: 'Stoppez le véhicule si le voyant clignote (risque pour le catalyseur). Utilisez une valise pour isoler le cylindre défaillant (P0301 = cylindre 1, etc.).',
    },
    'P0171': {
        title: 'Mélange trop pauvre (Banc 1)',
        desc: 'Le moteur reçoit trop d\'air ou pas assez de carburant.',
        causes: ['Débitmètre d\'air massique (MAF) sale', 'Prise d\'air sur l\'admission', 'Filtre à carburant bouché'],
        severity: 2,
        action: 'Inspectez visuellement les durites d\'air. Nettoyez le débitmètre avec un spray spécifique avant d\'acheter des pièces.',
    },
    'P0102': {
        title: 'Circuit du débitmètre d\'air massique (Bas)',
        desc: 'Le signal du capteur MAF est trop faible.',
        causes: ['Débitmètre d\'air sale ou défectueux', 'Faux contact dans le connecteur', 'Prise d\'air'],
        severity: 2,
        action: 'Nettoyez ou remplacez le MAF. Effacez le code pour éteindre le voyant et réadapter les valeurs idéales.',
    },
    'P0401': {
        title: 'Recyclage des gaz d\'échappement (EGR)',
        desc: 'Débit de la vanne EGR insuffisant. Les gaz ne sont plus correctement redirigés vers l\'admission.',
        causes: ['Vanne EGR encrassée (calamine)', 'Soupape bloquée', 'Capteur de pression (DPFE) HS'],
        severity: 2,
        action: 'Démontez et nettoyez la vanne EGR au solvant. Utilisez la fonction "EGR Reset" de votre valise après remontage.',
    },
    'C1145': {
        title: 'Capteur de vitesse de roue (ABS)',
        desc: 'Le système ABS ne reçoit pas de données correctes d\'un capteur de roue (souvent avant droit).',
        causes: ['Capteur ABS encrassé ou HS', 'Faisceau coupé', 'Cible magnétique du roulement endommagée'],
        severity: 2, // Orange car pas d'ABS/ESP
        action: 'Lisez les données "Live Data" des 4 roues en roulant. La roue affichant 0 km/h est la coupable.',
    },
    'U0100': {
        title: 'Perte de communication avec l\'ECM/PCM',
        desc: 'Le réseau CAN bus n\'arrive pas à communiquer avec le calculateur moteur principal.',
        causes: ['Batterie faible', 'Câble principal corrodé', 'Faux contact sur une prise', 'Calculateur HS'],
        severity: 3,
        action: 'C\'est une panne réseau pure. Nettoyez les contacts de la batterie et des calculateurs au spray contact. Utilisez une valise qui scanne tous les modules pour voir où la communication bloque.',
    },
};

const SEVERITY_CONFIG = {
    1: { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: Info, label: 'Mineur' },
    2: { color: 'bg-amber-100 text-amber-700 border-amber-200', icon: AlertTriangle, label: 'Avertissement' },
    3: { color: 'bg-red-100 text-red-700 border-red-200', icon: AlertTriangle, label: 'Majeur / Urgent' }
};

export default function ObdCodeResolver() {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        const cleanQuery = query.trim().toUpperCase();
        if (cleanQuery) {
            setResult(OBD_DATABASE[cleanQuery] || null);
            setHasSearched(true);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto my-12 font-sans bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

            {/* Header section with search */}
            <div className="px-6 py-8 md:px-10 border-b border-slate-100 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <h2 className="text-3xl font-extrabold text-slate-900 mb-3 relative">
                    Décodeur de Pannes OBD2
                </h2>
                <p className="text-slate-500 text-lg mb-6 relative max-w-xl">
                    Saisissez votre code défaut (ex: P0420, P20E8) pour obtenir une explication claire et la solution recommandée sans perdre des heures sur les forums.
                </p>

                <form onSubmit={handleSearch} className="relative max-w-lg shadow-sm group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-11 pr-32 py-4 bg-white border border-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl transition-all font-bold text-slate-800 uppercase text-lg"
                        placeholder="Ex: P0420"
                        value={query}
                        onChange={(e) => setQuery(e.target.value.toUpperCase())}
                    />
                    <button
                        type="submit"
                        className="absolute inset-y-1.5 right-1.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors focus:ring-4 focus:ring-slate-900/20 outline-none"
                    >
                        Analyser
                    </button>
                </form>
            </div>

            {/* Results Section */}
            <div className="p-6 md:p-10 bg-white min-h-[100px]">

                {!hasSearched && (
                    <div className="text-center text-slate-400 py-8 flex flex-col items-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                            <Wrench className="w-6 h-6 text-slate-300" />
                        </div>
                        <p>En attente de votre code panne...</p>
                    </div>
                )}

                {hasSearched && result && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                    <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">{query}</span>
                                    {result.title}
                                </h3>
                            </div>
                            {/* Severity Badge */}
                            {(() => {
                                const sev = SEVERITY_CONFIG[result.severity];
                                const Icon = sev.icon;
                                return (
                                    <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-bold shadow-sm ${sev.color}`}>
                                        <Icon size={16} />
                                        {sev.label}
                                    </span>
                                )
                            })()}
                        </div>

                        <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 mb-6 text-slate-700 leading-relaxed text-lg">
                            <strong className="block text-slate-900 mb-2">Explication simple :</strong>
                            {result.desc}
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                    <AlertTriangle className="text-amber-500 w-5 h-5" /> Causes Probables
                                </h4>
                                <ul className="space-y-2">
                                    {result.causes.map((cause, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-slate-600">
                                            <span className="text-blue-500 font-bold mt-0.5">•</span>
                                            {cause}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                    <Wrench className="text-blue-500 w-5 h-5" /> Conseillé par l'expert
                                </h4>
                                <p className="text-slate-600">
                                    {result.action}
                                </p>
                            </div>
                        </div>

                        <hr className="border-slate-100 mb-8" />

                        {/* CTA Affiliate Block based on gravity/type */}
                        <div className="p-6 md:p-8 rounded-2xl border-2 border-slate-900 bg-slate-900 text-white relative overflow-hidden group">
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8 justify-between">
                                <div className="flex-1 text-center md:text-left">
                                    <div className="inline-flex items-center gap-1.5 text-blue-400 font-bold text-sm uppercase tracking-wider mb-2">
                                        <ShieldCheck size={16} /> Solution Recommandée
                                    </div>
                                    <h4 className="text-xl md:text-2xl font-bold mb-2">
                                        {result.severity === 3 ? "L'Outil pour Diagnostics Poussés" : "L'Outil Indispensable pour Effacer"}
                                    </h4>
                                    <p className="text-slate-400 text-sm md:text-base">
                                        Ne payez pas 80€ au garage juste pour un coup de valise. Achetez votre propre valise et effacez ce code à volonté.
                                    </p>
                                </div>
                                <div className="shrink-0 w-full md:w-auto">
                                    <a
                                        href={result.severity === 3 ? "https://s.click.aliexpress.com/e/_DkM7n53" : "https://s.click.aliexpress.com/e/_DEK9kO3"}
                                        target="_blank"
                                        rel="sponsored noopener"
                                        className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl transition-colors focus:ring-4 focus:ring-blue-500/30"
                                    >
                                        <ShoppingCart size={20} />
                                        {result.severity === 3 ? "Voir Thinktool Lite (~350€)" : "Voir Mucar 892BT (<80€)"}
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                )}

                {hasSearched && !result && (
                    <div className="animate-in fade-in bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
                        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-3 opacity-80" />
                        <h3 className="text-lg font-bold text-amber-800 mb-2">Code Inconnu dans notre base courte</h3>
                        <p className="text-amber-700/80 mb-4 max-w-lg mx-auto">
                            Le code <strong className="font-mono bg-amber-100 px-1 rounded">{query}</strong> n'est pas répertorié dans cette V1 du générateur. Assurez-vous d'avoir tapé un code OBD2 valide (ex: commence par P, C, B, ou U suivi de 4 chiffres).
                        </p>
                        {/* Generic Affiliate fallback */}
                        <div className="mt-6 pt-6 border-t border-amber-200/50">
                            <p className="text-sm font-bold text-amber-900 mb-3">Pour décrypter TOUS les codes directement sur écran :</p>
                            <a
                                href="https://s.click.aliexpress.com/e/_DEK9kO3"
                                target="_blank"
                                rel="sponsored noopener"
                                className="inline-flex items-center gap-2 bg-white text-amber-700 hover:text-amber-900 border border-amber-300 hover:border-amber-400 font-bold py-2.5 px-6 rounded-lg transition-colors shadow-sm"
                            >
                                Voir une valise OBD2 universelle autonome
                                <ChevronRight size={16} />
                            </a>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
