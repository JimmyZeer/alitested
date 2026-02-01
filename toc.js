/**
 * toc.js - Automatic Table of Contents Generator
 * Generates a TOC based on h2 and h3 elements within the <article> tag.
 */

document.addEventListener('DOMContentLoaded', function () {
    const article = document.querySelector('article');
    if (!article) return;

    // Create TOC container
    const tocContainer = document.createElement('nav');
    tocContainer.id = 'toc';
    tocContainer.className = 'toc-container glass-panel';
    
    const tocTitle = document.createElement('h4');
    tocTitle.innerText = 'Sommaire';
    tocContainer.appendChild(tocTitle);

    const tocList = document.createElement('ul');
    
    // Select headers
    const headers = article.querySelectorAll('h2, h3');
    if (headers.length < 2) return; // Don't show if too few headers

    headers.forEach((header, index) => {
        // Add ID if missing
        if (!header.id) {
            header.id = 'section-' + index;
        }

        const li = document.createElement('li');
        li.className = header.tagName.toLowerCase();
        
        const link = document.createElement('a');
        link.href = '#' + header.id;
        link.innerText = header.innerText;
        
        // Smooth scroll
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(link.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });

        li.appendChild(link);
        tocList.appendChild(li);
    });

    tocContainer.appendChild(tocList);

    // Insert TOC - Try to put it before the first h2, or prepend to article
    const firstHeader = article.querySelector('h2');
    if (firstHeader) {
        article.insertBefore(tocContainer, firstHeader);
    } else {
        article.prepend(tocContainer);
    }

    // Optional: Intersection Observer for active state
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                document.querySelectorAll('#toc a').forEach(a => {
                    a.classList.remove('active');
                    if (a.getAttribute('href') === '#' + id) {
                        a.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-100px 0px -60% 0px' });

    headers.forEach(h => observer.observe(h));
});
