/**
 * AliTested - Cookie Consent Logic (FINAL – GTM ONLY)
 */

(function () {
    const CONSENT_KEY = 'cookie_consent';

    function updateConsentGranted() {
        gtag('consent', 'update', {
            analytics_storage: 'granted',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
        });
    }

    function showBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.className = 'cookie-banner'; // Keep the styling
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

        // Trigger animation (if defined in CSS)
        setTimeout(() => banner.classList.add('show'), 100);

        document.getElementById('cookie-accept').addEventListener('click', () => {
            localStorage.setItem(CONSENT_KEY, 'accepted');
            updateConsentGranted();
            setTimeout(() => location.reload(), 300);
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
