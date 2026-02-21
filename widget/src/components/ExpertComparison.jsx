import React from 'react';
import { XCircle, CheckCircle2, Zap, ShieldAlert, ShieldCheck, Gauge, Headphones, AlertTriangle } from 'lucide-react';

export default function ExpertComparison({ affiliateLink = '#deal-certifie', productName = 'Édition Recommandée' }) {
    return (
        <div className="w-full max-w-4xl mx-auto my-12 font-sans bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

            {/* Header */}
            <div className="px-6 py-8 md:px-10 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center gap-3 mb-2">
                    <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">Analyse Technique</span>
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Le Verdict de notre Motoriste</h2>
                <p className="text-slate-500 text-lg">Nous avons testé la stabilité des protocoles pour vous. Ne prenez pas de risques inutiles avec le réseau multiplexé de votre voiture.</p>
            </div>

            {/* Comparison Grid (Responsive) */}
            <div className="p-0 bg-slate-50 md:bg-white flex flex-col gap-4 md:gap-0 p-4 md:p-0">

                {/* Desktop Headers */}
                <div className="hidden md:grid grid-cols-3 bg-white border-b border-slate-200">
                    <div className="p-6 font-bold text-slate-700">Critères Techniques</div>
                    <div className="p-6 font-bold text-red-600 text-center bg-red-50/30">Clone / Bas de gamme</div>
                    <div className="p-6 font-bold text-emerald-600 text-center bg-emerald-50/30 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/40 to-transparent pointer-events-none" />
                        {productName}
                    </div>
                </div>

                {/* Rows */}
                <div className="flex flex-col md:divide-y divide-slate-100 gap-4 md:gap-0">

                    {/* Row 1: Tension Stability */}
                    <div className="grid grid-cols-1 md:grid-cols-3 bg-white rounded-xl md:rounded-none border border-slate-100 md:border-none shadow-sm md:shadow-none hover:bg-slate-50 transition-colors overflow-hidden group">
                        <div className="p-4 md:p-6 font-medium text-slate-800 flex items-center justify-center md:justify-start gap-3 bg-slate-50 md:bg-transparent border-b border-slate-100 md:border-none">
                            <Zap size={20} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                            Stabilité de tension
                        </div>
                        <div className="p-4 md:p-6 flex flex-row md:flex-col items-center justify-between md:justify-center gap-2 bg-red-50/10 md:border-l border-slate-100">
                            <span className="md:hidden text-xs font-bold text-red-600 uppercase">Clone</span>
                            <div className="flex flex-col items-end md:items-center gap-1 w-1/2 md:w-full">
                                <div className="w-full bg-slate-200 rounded-full h-2.5 max-w-[120px] overflow-hidden hidden md:block">
                                    <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                                </div>
                                <span className="text-xs font-bold text-red-600 text-right md:text-center">Instable (Coupures)</span>
                            </div>
                        </div>
                        <div className="p-4 md:p-6 flex flex-row md:flex-col items-center justify-between md:justify-center gap-2 bg-emerald-50/10 border-t md:border-t-0 md:border-l border-slate-100 relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/10 to-transparent pointer-events-none hidden md:block" />
                            <span className="md:hidden text-xs font-bold text-emerald-600 uppercase">L'Original</span>
                            <div className="flex flex-col items-end md:items-center gap-1 w-1/2 md:w-full">
                                <div className="w-full bg-slate-200 rounded-full h-2.5 max-w-[120px] overflow-hidden hidden md:block">
                                    <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '98%' }}></div>
                                </div>
                                <span className="text-xs font-bold text-emerald-600 text-right md:text-center">Constante 12-14V</span>
                            </div>
                        </div>
                    </div>

                    {/* Row 2: SGW Access */}
                    <div className="grid grid-cols-1 md:grid-cols-3 bg-white rounded-xl md:rounded-none border border-slate-100 md:border-none shadow-sm md:shadow-none hover:bg-slate-50 transition-colors overflow-hidden group">
                        <div className="p-4 md:p-6 font-medium text-slate-800 flex items-center justify-center md:justify-start gap-3 bg-slate-50 md:bg-transparent border-b border-slate-100 md:border-none">
                            <ShieldAlert size={20} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                            Accès Passerelle (SGW)
                        </div>
                        <div className="p-4 md:p-6 flex flex-row md:flex-col items-center justify-between md:justify-center gap-2 bg-red-50/10 md:border-l border-slate-100">
                            <span className="md:hidden text-xs font-bold text-red-600 uppercase">Clone</span>
                            <div className="flex flex-col items-end md:items-center">
                                <XCircle size={28} className="text-red-500 hidden md:block" strokeWidth={2.5} />
                                <span className="block md:mt-1 text-xs text-slate-500 font-semibold text-right md:text-center">Bloqué (FCA, VAG)</span>
                            </div>
                        </div>
                        <div className="p-4 md:p-6 flex flex-row md:flex-col items-center justify-between md:justify-center gap-2 bg-emerald-50/10 border-t md:border-t-0 md:border-l border-slate-100 relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/10 to-transparent pointer-events-none hidden md:block" />
                            <span className="md:hidden text-xs font-bold text-emerald-600 uppercase">L'Original</span>
                            <div className="flex flex-col items-end md:items-center">
                                <ShieldCheck size={28} className="text-emerald-500 hidden md:block" strokeWidth={2.5} />
                                <span className="block md:mt-1 text-xs text-slate-500 font-semibold text-right md:text-center">Certifié Constructeur</span>
                            </div>
                        </div>
                    </div>

                    {/* Row 3: Read Speed */}
                    <div className="grid grid-cols-1 md:grid-cols-3 bg-white rounded-xl md:rounded-none border border-slate-100 md:border-none shadow-sm md:shadow-none hover:bg-slate-50 transition-colors overflow-hidden group">
                        <div className="p-4 md:p-6 font-medium text-slate-800 flex items-center justify-center md:justify-start gap-3 bg-slate-50 md:bg-transparent border-b border-slate-100 md:border-none">
                            <Gauge size={20} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                            Vitesse de lecture (CAN)
                        </div>
                        <div className="p-4 md:p-6 flex flex-row md:flex-col items-center justify-between md:justify-center gap-2 bg-red-50/10 md:border-l border-slate-100">
                            <span className="md:hidden text-xs font-bold text-red-600 uppercase">Clone</span>
                            <div className="flex flex-col items-end md:items-center gap-1 w-1/2 md:w-full">
                                <div className="w-full bg-slate-200 rounded-full h-2.5 max-w-[120px] overflow-hidden hidden md:block">
                                    <div className="bg-orange-400 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                                </div>
                                <span className="text-xs font-bold text-orange-600 text-right md:text-center">Lenteurs & Bugs</span>
                            </div>
                        </div>
                        <div className="p-4 md:p-6 flex flex-row md:flex-col items-center justify-between md:justify-center gap-2 bg-emerald-50/10 border-t md:border-t-0 md:border-l border-slate-100 relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/10 to-transparent pointer-events-none hidden md:block" />
                            <span className="md:hidden text-xs font-bold text-emerald-600 uppercase">L'Original</span>
                            <div className="flex flex-col items-end md:items-center gap-1 w-1/2 md:w-full">
                                <div className="w-full bg-slate-200 rounded-full h-2.5 max-w-[120px] overflow-hidden hidden md:block">
                                    <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                                </div>
                                <span className="text-xs font-bold text-emerald-600 text-right md:text-center">Fluide & Rapide</span>
                            </div>
                        </div>
                    </div>

                    {/* Row 4: Support */}
                    <div className="grid grid-cols-1 md:grid-cols-3 bg-white rounded-xl md:rounded-none border border-slate-100 md:border-none shadow-sm md:shadow-none hover:bg-slate-50 transition-colors overflow-hidden group">
                        <div className="p-4 md:p-6 font-medium text-slate-800 flex items-center justify-center md:justify-start gap-3 bg-slate-50 md:bg-transparent border-b border-slate-100 md:border-none">
                            <Headphones size={20} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                            Support Technique
                        </div>
                        <div className="p-4 md:p-6 flex flex-row md:flex-col items-center justify-between md:justify-center gap-2 bg-red-50/10 md:border-l border-slate-100">
                            <span className="md:hidden text-xs font-bold text-red-600 uppercase">Clone</span>
                            <span className="font-bold text-slate-500 text-right md:text-center text-sm md:text-base">Non existant</span>
                        </div>
                        <div className="p-4 md:p-6 flex flex-row md:flex-col items-center justify-between md:justify-center gap-2 bg-emerald-50/10 border-t md:border-t-0 md:border-l border-slate-100 relative text-emerald-700">
                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/10 to-transparent pointer-events-none hidden md:block" />
                            <span className="md:hidden text-xs font-bold text-emerald-600 uppercase">L'Original</span>
                            <div className="flex items-center justify-end md:justify-center gap-1.5 font-bold">
                                <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                                <span className="text-sm md:text-base">Oui, par notre expert</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* CTA Section */}
            <div className="p-6 md:p-8 bg-slate-50 border-t border-slate-200 flex flex-col md:flex-row items-center gap-6">

                {/* Jimmy's Opinion Box */}
                <div className="flex-1 bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative w-full">
                    <AlertTriangle size={24} className="text-amber-500 absolute -top-3 -right-3 bg-white rounded-full p-0.5 shadow-sm" />
                    <div className="flex items-start gap-4">
                        <img
                            src="/media/placeholder.png"
                            alt="Jimmy - Expert Auto"
                            className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 shrink-0"
                            style={{ filter: 'grayscale(20%) sepia(10%) hue-rotate(180deg)', background: '#E2E8F0' }}
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        <div>
                            <h4 className="font-bold text-slate-900 mb-1 leading-tight">Attention aux Calculateurs !</h4>
                            <p className="text-sm text-slate-600 italic">
                                "Les clones chinois à 30€ coupent souvent pendant l'écriture à cause de leur circuit d'alimentation instable. Résultat : Calculateur moteur briqué. N'hésitez pas une seconde, investissez dans l'outil certifié ci-dessous."
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="w-full md:w-auto shrink-0 flex flex-col items-center">
                    <a
                        href={affiliateLink}
                        target="_blank"
                        rel="sponsored noopener"
                        className="w-full justify-center group relative inline-flex items-center px-6 md:px-8 py-4 font-bold text-white transition-all duration-200 bg-emerald-600 rounded-xl hover:bg-emerald-700 outline-none focus:ring-4 focus:ring-emerald-600/30 overflow-hidden shadow-md hover:shadow-lg"
                    >
                        <div className="absolute inset-0 bg-white/20 group-hover:animate-ping opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-300"></div>
                        <span className="relative flex items-center gap-2 text-[1.05rem]">
                            <ShieldCheck size={22} className="shrink-0" />
                            Voir le prix officiel
                        </span>
                    </a>
                    <span className="text-xs text-slate-500 mt-2.5 font-medium flex items-center justify-center gap-1.5 opacity-90 w-full text-center">
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                        Lien fiable vérifié par AliTested
                    </span>
                </div>

            </div>

        </div>
    );
}
