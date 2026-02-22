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

    for (const file of htmlFiles) {
        const relativeFilePath = path.relative(BASE_DIR, file);
        const content = fs.readFileSync(file, 'utf8');
        const root = parse(content);

        // 1. Check Links
        const links = root.querySelectorAll('a');
        for (const link of links) {
            const href = link.getAttribute('href');
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

        // 2. Check SEO Basics
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

    console.log('\n--- AUDIT SUMMARY ---');
    console.log(`Broken Internal Links Found: ${brokenLinksCount}`);
    console.log(`SEO Issues Found: ${seoIssuesCount}`);
    console.log('--- END AUDIT ---');
}

checkLinksAndSeo();
