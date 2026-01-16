/**
 * AliTested - Cookie Consent Logic (BULLETPROOF – GTM ONLY)
 */

(function () {
    const CONSENT_KEY = 'cookie_consent';

    function updateConsentGranted() {
        // 1. Mise à jour officielle Consent Mode
        gtag('consent', 'update', {
            analytics_storage: 'granted',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
        });

        // 2. Event personnalisé pour forcer le déclenchement GTM
        window.dataLayer.push({
            'event': 'consent_update_event',
            'consent_type': 'analytics'
        });
    }

    function showBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.className = 'cookie-banner';
        banner.innerHTML = `
      <div class="cookie-content">
        <p>Nous utilisons des cookies afin de mesurer l’audience et améliorer l’expérience utilisateur.</p>
        <div class="cookie-actions">
          <button id="cookie-accept" class="cookie-btn cookie-btn-accept">Accepter</button>
          <button id="cookie-refuse" class="cookie-btn cookie-btn-refuse">Refuser</button>
        </div>
      </div>
    `;
        document.body.appendChild(banner);

        setTimeout(() => banner.classList.add('show'), 100);

        document.getElementById('cookie-accept').addEventListener('click', () => {
            localStorage.setItem(CONSENT_KEY, 'accepted');
            updateConsentGranted();
            // On attend un peu que GTM traite l'event avant de reload
            setTimeout(() => location.reload(), 400);
        });

        document.getElementById('cookie-refuse').addEventListener('click', () => {
            localStorage.setItem(CONSENT_KEY, 'refused');
            banner.classList.remove('show');
            setTimeout(() => banner.remove(), 500);
        });
    }

    function init() {
        const consent = localStorage.getItem(CONSENT_KEY);

        if (consent === 'accepted') {
            updateConsentGranted();
        } else if (!consent) {
            showBanner();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
