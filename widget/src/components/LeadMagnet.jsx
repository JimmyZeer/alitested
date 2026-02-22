import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle, ArrowRight, ShieldCheck, X } from 'lucide-react';

export default function LeadMagnet({ mode = 'inline' }) {
    // mode can be 'inline' or 'modal'
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [isVisible, setIsVisible] = useState(mode === 'inline');
    const [hasBeenDismissed, setHasBeenDismissed] = useState(false);

    // If modal mode, handle the scroll trigger
    useEffect(() => {
        if (mode === 'modal' && !hasBeenDismissed && status !== 'success') {
            const handleScroll = () => {
                // Show modal when scrolled down 40% of the page
                const scrollPos = window.scrollY;
                const windowHeight = window.innerHeight;
                const docHeight = document.documentElement.scrollHeight;

                if (scrollPos > (docHeight - windowHeight) * 0.4) {
                    setIsVisible(true);
                    window.removeEventListener('scroll', handleScroll);
                }
            };
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [mode, hasBeenDismissed, status]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic email validation
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            setStatus('error');
            return;
        }

        setStatus('loading');

        // Simulate API call to email marketing service (e.g., Mailchimp/Brevo)
        setTimeout(() => {
            setStatus('success');
            // If it's a modal, auto-close after 4 seconds
            if (mode === 'modal') {
                setTimeout(() => {
                    setIsVisible(false);
                    setHasBeenDismissed(true);
                }, 4000);
            }
        }, 1200);
    };

    const handleDismiss = () => {
        setIsVisible(false);
        setHasBeenDismissed(true);
    };

    if (!isVisible) return null;

    const Content = () => (
        <div className={`bg-white font-sans overflow-hidden w-full ${mode === 'inline' ? 'rounded-3xl border border-slate-200 shadow-sm max-w-4xl mx-auto my-12' : 'rounded-3xl shadow-2xl relative'}`}>

            {mode === 'modal' && (
                <button
                    onClick={handleDismiss}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors z-20"
                    aria-label="Fermer"
                >
                    <X size={20} />
                </button>
            )}

            <div className="flex flex-col md:flex-row">
                {/* Visual / Image Side */}
                <div className="md:w-5/12 bg-gradient-to-br from-slate-900 to-blue-900 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    {/* Decorative background elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10 w-48 h-64 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-2xl flex flex-col items-center justify-center p-4 rotate-3 hover:rotate-0 transition-transform duration-500">
                        <ShieldCheck className="w-16 h-16 text-blue-400 mb-4" />
                        <div className="text-white font-black uppercase tracking-widest text-sm mb-1">E-BOOK</div>
                        <h4 className="text-white font-bold text-xl leading-tight mb-2">Guide<br />Anti-Arnaque<br /><span className="text-blue-400">2026</span></h4>
                        <div className="w-12 h-1 bg-blue-500 rounded-full mt-2"></div>
                    </div>
                </div>

                {/* Form / Content Side */}
                <div className="md:w-7/12 p-8 md:p-10 flex flex-col justify-center bg-white relative">
                    {status === 'success' ? (
                        <div className="text-center py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10 text-emerald-500" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-3">Vérifiez votre boîte mail !</h3>
                            <p className="text-slate-600 text-lg mb-6">
                                Le guide vient de vous être envoyé à <strong className="text-slate-900">{email}</strong>. Pensez à vérifier vos spams.
                            </p>
                            <button
                                onClick={mode === 'modal' ? handleDismiss : () => setStatus('idle')}
                                className="text-blue-600 font-bold hover:text-blue-700 underline"
                            >
                                {mode === 'modal' ? 'Fermer cette fenêtre' : 'Retour à l\'accueil'}
                            </button>
                        </div>
                    ) : (
                        <div className="animate-in fade-in duration-300">
                            <div className="inline-flex flex-wrap gap-2 mb-4">
                                <span className="bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">100% Gratuit</span>
                                <span className="bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">PDF (12 Pages)</span>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 leading-tight">
                                Ne vous faîtes plus avoir par les devis abusifs.
                            </h2>
                            <p className="text-slate-600 mb-8 text-base md:text-lg">
                                Recevez immédiatement mon <strong>Guide Anti-Arnaque Garagiste</strong>.
                                Découvrez les 3 techniques pour diagnostiquer vous-même et économiser plus de 500€/an.
                            </p>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className={`h-5 w-5 ${status === 'error' ? 'text-red-400' : 'text-slate-400'}`} />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="Votre adresse e-mail"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (status === 'error') setStatus('idle');
                                        }}
                                        className={`block w-full pl-14 pr-4 py-4 bg-slate-50 border ${status === 'error' ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'} rounded-xl placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-4 transition-all text-slate-800 text-lg font-medium`}
                                        disabled={status === 'loading'}
                                    />
                                    {status === 'error' && (
                                        <p className="text-red-500 text-sm font-bold mt-2 absolute -bottom-6 left-1">Email invalide ou vide.</p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className={`relative mt-2 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-blue-600/20 focus:outline-none focus:ring-4 focus:ring-blue-500/30 overflow-hidden ${status === 'loading' ? 'cursor-not-allowed opacity-90' : ''}`}
                                >
                                    {status === 'loading' ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span>Envoi en cours...</span>
                                        </div>
                                    ) : (
                                        <>
                                            Recevoir mon E-Book maintenant <ArrowRight size={20} />
                                        </>
                                    )}
                                </button>
                                <p className="text-center text-xs text-slate-400 mt-2">
                                    Vos données restent confidentielles. 100% garanti sans spam.
                                </p>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    // Render logic based on mode
    if (mode === 'modal') {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    onClick={handleDismiss}
                ></div>
                {/* Modal Content */}
                <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
                    <Content />
                </div>
            </div>
        );
    }

    // Inline mode
    return <Content />;
}
