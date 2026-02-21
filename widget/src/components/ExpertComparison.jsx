import React from 'react';
import { XCircle, CheckCircle2, Zap, ShieldAlert, ShieldCheck, Gauge, Headphones, AlertTriangle } from 'lucide-react';

export default function ExpertComparison() {
    return (
        <div className="w-full max-w-4xl mx-auto my-12 font-sans bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

            {/* Header */}
            <div className="px-6 py-8 md:px-10 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center gap-3 mb-2">
                    <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">Analyse Technique</span>
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Le Verdict de notre Motoriste</h2>
                <p className="text-slate-500 text-lg">Nous avons testé la stabilité des protocoles pour vous.</p>
            </div>

            {/* Comparison Table */}
            <div className="p-0 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white">
                            <th className="p-4 md:p-6 font-bold text-slate-700 border-b border-slate-200 w-1/3">Critères Techniques</th>
                            <th className="p-4 md:p-6 font-bold text-red-600 border-b border-slate-200 w-1/3 text-center bg-red-50/30">Clone / Bas de gamme</th>
                            <th className="p-4 md:p-6 font-bold text-emerald-600 border-b border-slate-200 w-1/3 text-center bg-emerald-50/30 relative overflow-hidden">
                                {/* Subtle highlight effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/40 to-transparent pointer-events-none" />
                                Édition Recommandée
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">

                        {/* Row 1: Tension Stability */}
                        <tr className="group hover:bg-slate-50 transition-colors">
                            <td className="p-4 md:p-6 font-medium text-slate-800 flex items-center gap-3">
                                <Zap size={20} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                                Stabilité de tension
                            </td>
                            <td className="p-4 md:p-6 text-center bg-red-50/10">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-full bg-slate-200 rounded-full h-2.5 max-w-[120px] mx-auto overflow-hidden">
                                        <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                                    </div>
                                    <span className="text-xs font-bold text-red-600">Instable (Risque de coupure)</span>
                                </div>
                            </td>
                            <td className="p-4 md:p-6 text-center bg-emerald-50/10">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-full bg-slate-200 rounded-full h-2.5 max-w-[120px] mx-auto overflow-hidden">
                                        <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '98%' }}></div>
                                    </div>
                                    <span className="text-xs font-bold text-emerald-600">Constante 12-14V</span>
                                </div>
                            </td>
                        </tr>

                        {/* Row 2: SGW Access */}
                        <tr className="group hover:bg-slate-50 transition-colors">
                            <td className="p-4 md:p-6 font-medium text-slate-800 flex items-center gap-3">
                                <ShieldAlert size={20} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                                Accès Passerelle  (SGW)
                            </td>
                            <td className="p-4 md:p-6 text-center bg-red-50/10">
                                <XCircle size={28} className="text-red-500 mx-auto" strokeWidth={2.5} />
                                <span className="block mt-1 text-xs text-slate-500 font-semibold">Bloqué (FCA, VAG)</span>
                            </td>
                            <td className="p-4 md:p-6 text-center bg-emerald-50/10">
                                <ShieldCheck size={28} className="text-emerald-500 mx-auto" strokeWidth={2.5} />
                                <span className="block mt-1 text-xs text-slate-500 font-semibold">Certifié Constructeur</span>
                            </td>
                        </tr>

                        {/* Row 3: Read Speed */}
                        <tr className="group hover:bg-slate-50 transition-colors">
                            <td className="p-4 md:p-6 font-medium text-slate-800 flex items-center gap-3">
                                <Gauge size={20} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                                Vitesse de lecture (CAN)
                            </td>
                            <td className="p-4 md:p-6 text-center bg-red-50/10">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-full bg-slate-200 rounded-full h-2.5 max-w-[120px] mx-auto overflow-hidden">
                                        <div className="bg-orange-400 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                                    </div>
                                    <span className="text-xs font-bold text-orange-600">30% (Lenteurs & Bugs)</span>
                                </div>
                            </td>
                            <td className="p-4 md:p-6 text-center bg-emerald-50/10">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-full bg-slate-200 rounded-full h-2.5 max-w-[120px] mx-auto overflow-hidden">
                                        <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                                    </div>
                                    <span className="text-xs font-bold text-emerald-600">100% (Fluide & Rapide)</span>
                                </div>
                            </td>
                        </tr>

                        {/* Row 4: Support */}
                        <tr className="group hover:bg-slate-50 transition-colors">
                            <td className="p-4 md:p-6 font-medium text-slate-800 flex items-center gap-3">
                                <Headphones size={20} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                                Support Technique
                            </td>
                            <td className="p-4 md:p-6 text-center bg-red-50/10 font-bold text-slate-500">
                                Non existant
                            </td>
                            <td className="p-4 md:p-6 text-center bg-emerald-50/10 font-bold text-slate-800">
                                <div className="flex items-center justify-center gap-2">
                                    <CheckCircle2 size={18} className="text-emerald-500" />
                                    Oui, par notre expert
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

            {/* CTA Section */}
            <div className="p-6 md:p-8 bg-slate-50 border-t border-slate-200 flex flex-col md:flex-row items-center gap-6">

                {/* Jimmy's Opinion Box */}
                <div className="flex-1 bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative">
                    <AlertTriangle size={24} className="text-amber-500 absolute -top-3 -right-3 bg-white rounded-full p-0.5" />
                    <div className="flex items-start gap-4">
                        <img
                            src="/media/placeholder.png"
                            alt="Jimmy - Expert Auto"
                            className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 shrink-0"
                            style={{ filter: 'grayscale(20%) sepia(10%) hue-rotate(180deg)', background: '#E2E8F0' }} // Placeholder visual cue
                        />
                        <div>
                            <h4 className="font-bold text-slate-900 mb-1">L'avis de Jimmy</h4>
                            <p className="text-sm text-slate-600 italic">
                                "J'ai vu des dizaines de calculateurs Moteur (ECU) "briqués" de façon irrémédiable à cause d'un clone à 30€ qui a foiré pendant une écriture à cause d'une chute de tension. Croyez-moi, investir dans la qualité officielle est la seule vraie économie que vous ferez."
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="w-full md:w-auto shrink-0 flex flex-col items-center">
                    {/* The <a> tag will have a pulse effect. Make sure to pass link via props if dynamic. */}
                    <a
                        href="#deal-certifie"
                        className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-blue-600 rounded-xl hover:bg-blue-700 outline-none focus:ring-4 focus:ring-blue-600/30 overflow-hidden"
                    >
                        {/* Subtle pulse effect on hover */}
                        <div className="absolute inset-0 bg-white/20 group-hover:animate-ping opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-300"></div>
                        <span className="relative flex items-center gap-2">
                            <ShieldCheck size={20} />
                            Acheter la version certifiée
                        </span>
                    </a>
                    <span className="text-xs text-slate-400 mt-2 font-medium flex items-center gap-1">
                        <CheckCircle2 size={12} className="text-emerald-500" />
                        Vendeur officiel validé
                    </span>
                </div>

            </div>

        </div>
    );
}
