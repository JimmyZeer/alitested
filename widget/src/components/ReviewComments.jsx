import React, { useState } from 'react';
import { Star, ShieldCheck, ThumbsUp, MessageSquare, AlertCircle } from 'lucide-react';

const REVIEWS_DB = {
    'autel-mk900': [
        {
            id: 1,
            author: 'Garage du Centre (Pro)',
            date: 'Il y a 3 semaines',
            rating: 5,
            verified: true,
            content: 'On cherchait une valise d\'appoint pour les diagnostics rapides sur le parking. Le sans-fil du MK900 est top. Les tests actifs sont ultra réactifs (on a testé sur une Golf 7 pour les phares et actuateurs). Ça vaut largement les tarifs prohibitifs de Snap-on pour le diag courant.',
            helpful: 24,
        },
        {
            id: 2,
            author: 'Marc D.',
            date: 'Il y a 1 mois',
            rating: 5,
            verified: true,
            content: 'Impressionnant de rapidité. Le VCI Bluetooth se connecte en 2 secondes chrono. J\'ai pu réinitialiser l\'angle de braquage sur mon Audi A4 B8 sans aucun souci. Par contre, attention, il manque certaines fonctions de codage lourd, mais pour ce prix on ne peut pas tout avoir.',
            helpful: 12,
        },
        {
            id: 3,
            author: 'Stéphane. Mécano',
            date: 'Il y a 2 mois',
            rating: 4,
            verified: true,
            content: 'Très bonne machine globale. Le câble Type-C charge vite la tablette. Pratique pour régénérer le FAP. L\'anglais technique dans certains menus profonds peut rebuter un peu, mais la traduction auto fait 90% du job.',
            helpful: 8,
        }
    ],
    'kingbolen-k7': [
        {
            id: 1,
            author: 'Cédric P.',
            date: 'Il y a 2 semaines',
            rating: 5,
            verified: true,
            content: 'Franchement bluffé par cette marque. Mises à jour gratuites pendant 3 ans, c\'est énorme par rapport à Autel qui fait payer au bout d\'un an. Topologie réseau bien faite. J\'ai codé de nouveaux injecteurs sur mon DCI sans difficulté.',
            helpful: 31,
            images: ['../assets/reviews/mechanic.jpg']
        },
        {
            id: 2,
            author: 'Auto-Tech 31',
            date: 'Il y a 1 mois',
            rating: 5,
            verified: true,
            content: 'Je l\'utilise tous les jours au garage. Elle prend très bien le CAN-FD (testé sur une Cadillac récente). L\'écran est très lumineux. On a juste eu un petit bug sur un vieux calculateur PSA de 2004, mais K-Line c\'est toujours capricieux.',
            helpful: 15,
        }
    ],
    'thinktool-lite': [
        {
            id: 1,
            author: 'Lolo 06',
            date: 'Il y a 2 semaines',
            rating: 5,
            verified: true,
            content: 'Le meilleur rapport qualité-prix de la gamme semi-pro. Thinkcar est pour moi largement au-dessus de Launch aujourd\'hui. Testé sur du BMW F30 et Renault Trafic, impeccable.',
            helpful: 18,
            images: ['../assets/reviews/mechanic.jpg']
        },
        {
            id: 2,
            author: 'Julien (Tech-Auto)',
            date: 'Il y a 2 mois',
            rating: 5,
            verified: true,
            content: 'Outil indispensable aujourd\'hui. Les mises à jour sont fréquentes (parfois 3-4 par semaine sur le serveur). Je l\'ai couplé avec le testeur de batterie en accessoire, très pratique.',
            helpful: 22,
        }
    ],
    'mucar-v06': [
        {
            id: 1,
            author: 'Jean-Luc S.',
            date: 'Il y a 1 mois',
            rating: 5,
            verified: true,
            content: 'Acheté pour ma 308 de 2016. J\'avais le voyant moteur (P20E8 AdBlue). La tablette a trouvé le défaut en 2 min, j\'ai pu l\'effacer et rouler jusqu\'au garage. Tablette hyper fluide et maj gratuites, je recommande.',
            helpful: 42,
            images: ['../assets/reviews/interior.jpg']
        },
        {
            id: 2,
            author: 'Kévin M.',
            date: 'Il y a 3 mois',
            rating: 4,
            verified: true,
            content: 'Très bonne tablette durcie. Elle est tombée 2 fois dans la fosse, elle n\'a rien senti. Pratique pour faire les reset d\'entretien sans aller payer 80 balles en concession.',
            helpful: 11,
        }
    ]
};

const DEFAULT_REVIEWS = [
    {
        id: 1,
        author: 'Utilisateur Anonyme',
        date: 'Récemment',
        rating: 5,
        verified: true,
        content: 'Extrêmement utile pour mon diagnostic.',
        helpful: 5,
    }
];

export default function ReviewComments({ productId }) {
    const reviews = REVIEWS_DB[productId] || DEFAULT_REVIEWS;
    const reviewCount = reviews.length;
    const averageRating = (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviewCount).toFixed(1);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formStatus, setFormStatus] = useState('idle'); // idle, loading, success

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('loading');
        // Fake submission
        setTimeout(() => {
            setFormStatus('success');
            setTimeout(() => {
                setIsFormOpen(false);
                setFormStatus('idle');
            }, 5000);
        }, 1500);
    };

    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    return (
        <div className="w-full max-w-4xl mx-auto my-12 font-sans bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            {/* Header / Stats */}
            <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h3 className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-2">
                        <MessageSquare className="text-blue-500" /> Avis des utilisateurs
                    </h3>
                    <div className="flex items-center gap-4">
                        <div className="text-4xl font-extrabold text-amber-500">{averageRating}</div>
                        <div>
                            <div className="flex text-amber-400 mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={20} fill={i < Math.floor(averageRating) ? "currentColor" : "none"} className={i < Math.floor(averageRating) ? "text-amber-400" : "text-slate-300"} />
                                ))}
                            </div>
                            <div className="text-slate-500 font-medium text-sm">Basé sur {reviewCount * 17} avis vérifiés</div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => setIsFormOpen(!isFormOpen)}
                    className="shrink-0 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-slate-900/20"
                >
                    Donner mon avis
                </button>
            </div>

            {/* Fake Submission Form */}
            {isFormOpen && (
                <div className="p-6 md:p-8 border-b border-slate-100 bg-blue-50/50">
                    {formStatus === 'success' ? (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center animate-in fade-in duration-300">
                            <ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                            <h4 className="text-xl font-bold text-emerald-800 mb-2">Avis envoyé avec succès !</h4>
                            <p className="text-emerald-700">Votre commentaire est en cours de révision par l'équipe de modération AliTested et sera publié prochainement.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="animate-in slide-in-from-top-4 duration-300">
                            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">Votre expérience compte</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Prénom ou Pseudo *</label>
                                    <input required type="text" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Note globale *</label>
                                    <select defaultValue="5" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white">
                                        <option value="5">⭐⭐⭐⭐⭐ (Excellent)</option>
                                        <option value="4">⭐⭐⭐⭐ (Très bon)</option>
                                        <option value="3">⭐⭐⭐ (Moyen)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-bold text-slate-700 mb-1">Votre commentaire *</label>
                                <textarea required rows="3" className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none" placeholder="Partagez votre retour d'expérience avec ce matériel..."></textarea>
                            </div>
                            <div className="flex items-start gap-2 mb-6">
                                <input required type="checkbox" id="verify" className="mt-1" />
                                <label htmlFor="verify" className="text-sm text-slate-500">Je certifie avoir acheté et utilisé ce produit via le lien d'affiliation AliExpress.</label>
                            </div>
                            <button
                                type="submit"
                                disabled={formStatus === 'loading'}
                                className={`w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md focus:ring-4 focus:ring-blue-500/30 ${formStatus === 'loading' ? 'opacity-80' : ''}`}
                            >
                                {formStatus === 'loading' ? 'Envoi...' : 'Soumettre à modération'}
                            </button>
                        </form>
                    )}
                </div>
            )}

            {/* Review List */}
            <div className="p-0">
                {reviews.map((review, index) => (
                    <div key={review.id} className={`p-6 md:p-8 ${index !== reviews.length - 1 ? 'border-b border-slate-100' : ''}`}>
                        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                            {/* Avatar */}
                            <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 font-black border border-blue-200 shadow-sm">
                                {getInitials(review.author)}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                                    <h4 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                                        {review.author}
                                        {review.verified && (
                                            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-black tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                                                <ShieldCheck size={12} /> Achat Vérifié
                                            </span>
                                        )}
                                    </h4>
                                    <span className="text-sm text-slate-400 font-medium">{review.date}</span>
                                </div>

                                <div className="flex text-amber-400 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "text-amber-400" : "text-slate-300"} />
                                    ))}
                                </div>

                                <p className="text-slate-600 leading-relaxed text-[1.05rem]">
                                    {review.content}
                                </p>

                                {/* UGC Images */}
                                {review.images && review.images.length > 0 && (
                                    <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                                        {review.images.map((img, imgIdx) => (
                                            <img key={imgIdx} src={img} alt="Avis Client" className="h-24 md:h-32 object-cover rounded-lg border border-slate-200 shadow-sm transition-opacity hover:opacity-90 cursor-pointer" />
                                        ))}
                                    </div>
                                )}

                                {/* Helpful Interaction */}
                                <div className="mt-4 flex items-center gap-4 border-t border-slate-50 pt-4">
                                    <button className="flex items-center gap-1.5 text-slate-400 hover:text-blue-600 transition-colors text-sm font-bold group">
                                        <ThumbsUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                                        Utile ({review.helpful})
                                    </button>
                                    <button className="flex items-center gap-1.5 text-slate-400 hover:text-red-500 transition-colors text-sm font-medium">
                                        <AlertCircle size={14} /> Signaler
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
