import React, { useState, useMemo } from 'react';
import { Search, BookOpen, AlertCircle, Info, Zap } from 'lucide-react';

const DICTIONARY_TERMS = [
    {
        id: 'can-fd',
        term: 'CAN-FD',
        definition: 'Controller Area Network Flexible Data-Rate. Protocole de communication moderne, 5x plus rapide que le CAN classique, utilisé sur les véhicules récents (post 2020) pour faire transiter de gros volumes de données.',
        complexity: 3, // 1 to 5
        category: 'Protocole'
    },
    {
        id: 'doip',
        term: 'DoIP (Diag over IP)',
        definition: 'Diagnostic Over Internet Protocol. Utilise le réseau Ethernet du véhicule pour un diagnostic et flashage ultra-rapide. Indispensable pour VAG, Volvo et Land Rover récents.',
        complexity: 4,
        category: 'Protocole'
    },
    {
        id: 'sgw',
        term: 'SGW (Secure Gateway)',
        definition: 'Pare-feu installé par les constructeurs (FCA, Mercedes, VAG) qui bloque l\'écriture (effacement défauts, codage) si l\'outil de diag n\'est pas déverrouillé officiellement par internet.',
        complexity: 2,
        category: 'Sécurité'
    },
    {
        id: 'k-line',
        term: 'K-Line / L-Line',
        definition: 'Ancienne ligne de communication unidirectionnelle, principalement utilisée sur les véhicules européens et asiatiques avant l\'an 2000.',
        complexity: 1,
        category: 'Protocole Ancien'
    },
    {
        id: 'j2534',
        term: 'Passthru J2534',
        definition: 'Norme universelle qui permet à une interface de liaison (VCI) de se connecter aux logiciels officiels des constructeurs (Odis, Diagbox) pour la reprogrammation ECU.',
        complexity: 5,
        category: 'Standardisation'
    },
    {
        id: 'ecu',
        term: 'ECU',
        definition: 'Electronic Control Unit. C\'est un "calculateur" (ordinateur) qui gère une fonction spécifique de la voiture (Moteur, ABS, Airbag, Confort).',
        complexity: 1,
        category: 'Composant'
    },
    {
        id: 'obd2',
        term: 'OBD2 / EOBD',
        definition: 'Standard de diagnostic obligatoire depuis 2001 (essence) et 2004 (diesel) en Europe, qui normalise la prise 16 broches et les codes défauts liés à la pollution.',
        complexity: 1,
        category: 'Standardisation'
    },
    {
        id: 'immo',
        term: 'IMMO (Antidémarrage)',
        definition: 'Système de sécurité qui empêche le démarrage du moteur sans la clé ou le transpondeur RFID correctement codé et reconnu par le véhicule.',
        complexity: 3,
        category: 'Sécurité'
    }
];

export default function TechDictionary() {
    const [searchQuery, setSearchQuery] = useState('');

    // Filtrage dynamique
    const filteredTerms = useMemo(() => {
        return DICTIONARY_TERMS.filter(item =>
            item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    // Rendu de la barre de complexité
    const renderComplexity = (level) => {
        return (
            <div className="flex items-center gap-1 mt-3" title={`Complexité : ${level}/5`}>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mr-2">Technique :</span>
                {[1, 2, 3, 4, 5].map(i => (
                    <div
                        key={i}
                        className={`h-1.5 w-6 rounded-full transition-colors ${i <= level ? (level > 3 ? 'bg-amber-500' : 'bg-blue-500') : 'bg-slate-200'}`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="w-full max-w-5xl mx-auto my-12 font-sans">

            {/* Search Header Style Apple/Stripe */}
            <div className="relative mb-8 pt-4">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none pt-4">
                    <Search className="h-6 w-6 text-slate-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                    placeholder="Rechercher un terme (ex: CAN-FD, SGW, J2534...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 mt-2 hidden sm:flex items-center gap-2">
                    <span className="bg-slate-100 text-slate-500 text-xs font-bold px-2 py-1 rounded-md border border-slate-200">Recherche Rapide</span>
                </div>
            </div>

            {/* Grid of Terms */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTerms.length > 0 ? (
                    filteredTerms.map((item) => (
                        <div
                            key={item.id}
                            className="group relative bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col h-full cursor-default"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-xl font-bold text-slate-900 m-0 group-hover:text-blue-600 transition-colors">
                                    {item.term}
                                </h3>
                                <span className="inline-flex items-center bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-full border border-slate-200">
                                    {item.category}
                                </span>
                            </div>

                            <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                                {item.definition}
                            </p>

                            <div className="mt-auto border-t border-slate-100 pt-4">
                                {renderComplexity(item.complexity)}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-slate-200 border-dashed">
                        <Info className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-slate-900 mb-1">Aucun terme trouvé</h3>
                        <p className="text-slate-500">Essayez une autre recherche (ex: protocole, diag, OBD).</p>
                    </div>
                )}
            </div>

        </div>
    );
}
