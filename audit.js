const fs = require('fs');
const path = require('path');
const { parse } = require('node-html-parser'); // We'll install this first

const BASE_DIR = __dirname;

function findHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (filePath.includes('node_modules') || filePath.includes('.git') || filePath.includes('widget/')) continue;
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            findHtmlFiles(filePath, fileList);
        } else if (filePath.endsWith('.html')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

function checkLinksAndSeo() {
    console.log('--- STARTING AUDIT ---');
    const htmlFiles = findHtmlFiles(BASE_DIR);
    console.log(`Found ${htmlFiles.length} HTML files to audit.\n`);

    let brokenLinksCount = 0;
    let seoIssuesCount = 0;
    let externalLinkIssuesCount = 0;
    let imageAltIssuesCount = 0;

    for (const file of htmlFiles) {
        const relativeFilePath = path.relative(BASE_DIR, file);
        const content = fs.readFileSync(file, 'utf8');
        const root = parse(content);

        // 1. Check Links
        const links = root.querySelectorAll('a');
        for (const link of links) {
            const href = link.getAttribute('href');
            const target = link.getAttribute('target');
            const rel = link.getAttribute('rel') || '';

            if (target === '_blank') {
                if (!rel.includes('noopener')) {
                    console.log(`⚠️ EXTERNAL LINK ISSUE (noopener): Missing noopener in ${relativeFilePath}`);
                    console.log(`   -> href="${href}"`);
                    externalLinkIssuesCount++;
                }

                if (href && href.includes('s.click.aliexpress.com') && !rel.includes('sponsored')) {
                    console.log(`⚠️ EXTERNAL LINK ISSUE (affiliate): Missing sponsored rel in ${relativeFilePath}`);
                    console.log(`   -> href="${href}"`);
                    externalLinkIssuesCount++;
                }
            }

            if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
                continue; // Skip external/anchor links
            }

            // Clean up query params or hashes on internal links just in case
            const cleanHref = href.split('?')[0].split('#')[0];

            // Resolve path relative to the current HTML file
            const targetPath = path.resolve(path.dirname(file), cleanHref);

            if (!fs.existsSync(targetPath)) {
                console.log(`❌ BROKEN LINK in ${relativeFilePath}`);
                console.log(`   -> href="${href}" points to missing file: ${targetPath}`);
                brokenLinksCount++;
            }
        }

        // 2. Check image accessibility basics
        const images = root.querySelectorAll('img');
        for (const image of images) {
            const alt = image.getAttribute('alt');
            if (alt === '') {
                console.log(`⚠️ IMAGE ISSUE (Alt): Empty alt in ${relativeFilePath}`);
                console.log(`   -> src="${image.getAttribute('src')}"`);
                imageAltIssuesCount++;
            }
        }

        // 3. Check SEO Basics
        const title = root.querySelector('title');
        const metaDesc = root.querySelector('meta[name="description"]');
        const canonical = root.querySelector('link[rel="canonical"]');

        if (!title || !title.text.trim()) {
            console.log(`⚠️ SEO ISSUE (Title): Missing or empty <title> in ${relativeFilePath}`);
            seoIssuesCount++;
        }

        if (!metaDesc || !metaDesc.getAttribute('content')) {
            console.log(`⚠️ SEO ISSUE (Meta Desc): Missing or empty meta description in ${relativeFilePath}`);
            seoIssuesCount++;
        }

        if (!canonical || !canonical.getAttribute('href')) {
            console.log(`⚠️ SEO ISSUE (Canonical): Missing canonical URL in ${relativeFilePath}`);
            seoIssuesCount++;
        } else {
            const canonUrl = canonical.getAttribute('href');
            // Check if canonical URL format is correct
            if (!canonUrl.startsWith('https://alitested.com/')) {
                console.log(`⚠️ SEO ISSUE (Canonical): Canonical URL might be malformed in ${relativeFilePath} : ${canonUrl}`);
                seoIssuesCount++;
            }
        }
    }

    // 4. Check sitemap coverage
    const indexableHtmlFiles = htmlFiles.filter(file => path.basename(file) !== '404.html');
    const sitemapPath = path.join(BASE_DIR, 'sitemap.xml');
    let sitemapIssuesCount = 0;

    if (!fs.existsSync(sitemapPath)) {
        console.log('⚠️ SITEMAP ISSUE: Missing sitemap.xml');
        sitemapIssuesCount++;
    } else {
        const sitemap = fs.readFileSync(sitemapPath, 'utf8');
        const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
        const expectedUrls = indexableHtmlFiles.map(file => {
            const relativePath = path.relative(BASE_DIR, file).replace(/\\/g, '/');
            return `https://alitested.com/${relativePath.replace(/index\.html$/, '')}`;
        });
        const sitemapSet = new Set(sitemapUrls);
        const expectedSet = new Set(expectedUrls);

        for (const url of expectedUrls) {
            if (!sitemapSet.has(url)) {
                console.log(`⚠️ SITEMAP ISSUE: Missing URL ${url}`);
                sitemapIssuesCount++;
            }
        }

        for (const url of sitemapUrls) {
            if (!expectedSet.has(url)) {
                console.log(`⚠️ SITEMAP ISSUE: URL not backed by local HTML ${url}`);
                sitemapIssuesCount++;
            }
        }

        if (sitemapUrls.length !== sitemapSet.size) {
            console.log('⚠️ SITEMAP ISSUE: Duplicate URLs found in sitemap.xml');
            sitemapIssuesCount++;
        }
    }

    console.log('\n--- AUDIT SUMMARY ---');
    console.log(`Broken Internal Links Found: ${brokenLinksCount}`);
    console.log(`SEO Issues Found: ${seoIssuesCount}`);
    console.log(`External Link Issues Found: ${externalLinkIssuesCount}`);
    console.log(`Image Alt Issues Found: ${imageAltIssuesCount}`);
    console.log(`Sitemap Issues Found: ${sitemapIssuesCount}`);
    console.log('--- END AUDIT ---');
}

checkLinksAndSeo();
