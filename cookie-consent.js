/**
 * AliTested - Cookie Consent Logic
 * Handles GDPR-compliant cookie consent for Cloudflare RUM tracking.
 */

(function() {
    const CONSENT_KEY = 'cookie_consent';
    const RUM_SCRIPT_URL = 'https://static.cloudflareinsights.com/beacon.min.js';
    const CLOUDFLARE_TOKEN = 'YOUR_CLOUDFLARE_TOKEN'; // Replace with your actual token

    /**
     * Injects the Cloudflare RUM script into the page.
     */
    function loadCloudflareRUM() {
        if (document.querySelector(`script[src="${RUM_SCRIPT_URL}"]`)) return;

        const script = document.createElement('script');
        script.src = RUM_SCRIPT_URL;
        script.defer = true;
        script.setAttribute('data-cf-beacon', JSON.stringify({ token: CLOUDFLARE_TOKEN }));
        document.body.appendChild(script);
        console.log('Cloudflare RUM loaded.');
    }

    /**
     * Creates and shows the cookie consent banner.
     */
    function showBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.className = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-content">
                <p>Nous utilisons des cookies et des technologies similaires afin de mesurer l’audience et améliorer l’expérience utilisateur. Vous pouvez accepter ou refuser la collecte de données.</p>
                <div class="cookie-actions">
                    <button id="cookie-accept" class="cookie-btn cookie-btn-accept">Accepter</button>
                    <button id="cookie-refuse" class="cookie-btn cookie-btn-refuse">Refuser</button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        // Add event listeners
        document.getElementById('cookie-accept').addEventListener('click', () => {
            localStorage.setItem(CONSENT_KEY, 'accepted');
            loadCloudflareRUM();
            hideBanner();
        });

        document.getElementById('cookie-refuse').addEventListener('click', () => {
            localStorage.setItem(CONSENT_KEY, 'refused');
            hideBanner();
        });

        // Trigger animation
        setTimeout(() => banner.classList.add('show'), 100);
    }

    /**
     * Hides the cookie consent banner.
     */
    function hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => banner.remove(), 500);
        }
    }

    /**
     * Initializes the consent check.
     */
    function init() {
        const consent = localStorage.getItem(CONSENT_KEY);

        if (consent === 'accepted') {
            loadCloudflareRUM();
        } else if (consent === null) {
            showBanner();
        }
    }

    // Run on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
