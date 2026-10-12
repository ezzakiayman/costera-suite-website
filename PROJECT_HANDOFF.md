# Costera Suite website — project handoff

Package date: 2026-10-02. This handoff covers the React/Vite website in `Site Web/costera-landing`. It is separate from the Perfex CRM application and the older PHP handoff package.

## What is included

The ZIP contains the editable website source, all media used by the site, its lockfile, archived static pages, browser-check scripts, preview images, deployment configuration, and a ready-made production build in `dist/`. This guide is also inside the ZIP. `node_modules`, Git history, browser profiles, temporary test results, deployment archives, environment secrets, and server credentials are intentionally excluded.

## Pages

| Route | Page |
| --- | --- |
| `/` | Gestion Commerciale landing page |
| `/pricing` | Pricing in MAD |
| `/costera-suite` | Costera Suite platform and solutions overview |
| `/platform`, `/solutions` | Redirect to `/costera-suite` |
| `/solutions/growth-cloud` | Growth Cloud |
| `/solutions/sales-cloud` | Sales Cloud |
| `/solutions/revenue-performance` | Revenue Performance Cloud |
| `/costera-intelligence` | Costera Intelligence |
| `/industries` | Industry solutions |
| `/resources` | Resources and searchable articles |
| `/resources/:slug` | Resource article |
| `/contact` | Contact and trial inquiries |
| `/request-demo` | Personalized demo request form |

The shared navigation and footer are in `src/App.jsx`. The login link opens `https://costerasuite.com/login`. Trial buttons lead to the contact page; demo buttons lead to the demo request page, sometimes with a preselected solution.

## Main files

| Path | Purpose |
| --- | --- |
| `src/App.jsx` | Routes, shared header/footer, home page, pricing page |
| `src/RequestDemoPage.jsx` and `src/request-demo.css` | Demo request page and styling |
| `src/*ReferencePage.jsx` and matching CSS | Product, industry, resources, and contact pages |
| `src/SuitePages.jsx`, `src/CosteraSuitePage.jsx` | Suite content and article pages |
| `src/assetPath.js` | Resolves asset URLs for root or `/home/` deployment |
| `public/assets/` | Website images, logos, icons, and fonts |
| `assets/` | Additional local media retained with the project |
| `styles.css`, `pricing.css`, `src/*.css` | Site styling |
| `checks/` | Browser audit scripts and fixture page |
| `legacy/` | Archived static site files |
| `deploy/nginx-spa.conf` | Nginx SPA fallback for `/home/` |
| `dist/` | Production build ready for `/home/` |
| `previews/` | Desktop and mobile review screenshots |

## Run locally

Install Node.js and npm, extract the ZIP, and run from the `costera-landing` folder:

```powershell
npm ci
npm run dev
```

Open the URL printed by Vite, usually `http://127.0.0.1:5173/`. `npm ci` uses the included `package-lock.json` to restore dependencies.

## Build and deploy

The current live website is mounted at `https://costerasuite.com/home/`. To rebuild for that path:

```powershell
npm run build:home
```

This creates `dist/`. Deploy the **contents** of `dist/` to the site's `/home/` document directory. Preserve a backup of the existing deployment, copy assets before replacing `index.html`, and ensure the web server serves `/home/index.html` for client-side routes. The included `deploy/nginx-spa.conf` shows the Nginx rule. The included `public/.htaccess` is for a root-mounted Apache build; it is not the `/home/` Nginx configuration.

For a site mounted at the domain root, use `npm run build` and configure a root SPA fallback instead. The ZIP's `dist/` was built for `/home/`, so rebuild it if the mount path changes.

## Forms and integrations

The contact and demo forms use the optional `VITE_CONTACT_ENDPOINT`. The newsletter form uses the optional `VITE_NEWSLETTER_ENDPOINT`. Copy `.env.example` to `.env` and set endpoint URLs before building if direct submission is needed. Never put passwords or API secrets in `VITE_` variables; Vite embeds these values in browser code.

Without a configured endpoint, each form opens a prepared email in the visitor's mail application. The visitor must send that email. A production endpoint must accept the documented POST JSON, allow the website origin, and return success only after the message or subscription is stored or delivered. Test a complete submission before relying on it.

## Validation and version

The latest `npm run build:home` completed successfully before this package was created. `checks/pricing-preview.ps1` audits routes, responsive layout, assets, navigation, and pricing controls; `checks/intelligence-preview.ps1` checks reference pages. Run the relevant checks after changing page layout or links.

The packaged source corresponds to local Git commit `80e43e3ed853049ce5945debc441187692f01908` (`Add demo request page and production home deployment updates`). At packaging time, that commit had **not** been pushed to `https://github.com/ezzakiayman/costera-suite-website` because GitHub authentication was unavailable in this session. The ZIP is an independent copy of the complete website and does not require GitHub access.

## GitHub publication update (11 October 2026)

The Desktop source package was used to update the public GitHub `main` branch.
Before publication, GitHub was at `863c3c4` and lacked `/request-demo`.
The Desktop `dist/` HTML, main JS, and main CSS matched the deployed files at
`/www/wwwroot/costerasuite.com/home` by SHA-256. Other live assets were not
hash-checked. No production deployment was performed during the GitHub update.

The published source changes five stylesheet URLs for the Manrope fonts and
executive image to use `public/assets/` through Vite's `/home/` base path.
This lets a clean GitHub checkout build without unresolved asset warnings;
its generated asset filenames differed from the then-deployed build until
the deployment recorded below.
`npm run build:home` passed. Desktop and mobile browser checks passed for
`/costera-intelligence` and `/request-demo` (images, links, and overflow).
The older pricing audit failed on a stale DOM selector and needs updating.

The eight home feature-card descriptions were changed to plain text on
11 October 2026. Previously hidden `<br />` elements joined words when CSS
set `display:none`; normal spaces now let the text wrap naturally. The
`/home/` build passed, and desktop/mobile browser checks found all eight
cards and images with no horizontal overflow. The source was subsequently
deployed as recorded below.

## Live deployment (11 October 2026)

The feature-card spacing build from source commit `c73b261` was deployed to
`/www/wwwroot/costerasuite.com/home`. A full pre-deployment backup is stored
on the VPS at `/root/costera-home-pre-c73b261-20261011.tar.gz`. The build was
staged and checksum-verified, then assets were copied before `index.html`.
No Perfex CRM files or server configuration were changed.

The deployed `index.html`, `index-BDxjhT5j.js`, and `index-DtcGx2zX.css`
SHA-256 hashes matched the local production build. From the VPS, public HTTP
checks returned 200 for `/home/`, `/home/pricing`, `/home/request-demo`, the
new JS/CSS assets, and the separate `/login` page. The new JS contains the
corrected phrase `informations de vos`. Full browser checks of the live domain
were not run; the matching local build passed desktop/mobile card checks.

## Resource article rewrite and deployment (11 October 2026)

The three existing `/resources/:slug` articles were rewritten in French in
`src/SuitePages.jsx`, preserving their slugs, images, categories, and the
Resources page layout. Each now has seven practical sections. The guide covers
a progressive commercial rollout; the facturation case is explicitly
illustrative and distinguishes possible automation from confirmed setup; the
comparison provides balanced selection criteria for a Moroccan business.
No invented client results, specific regulatory compliance claim, or
unverified competitor comparison was added.

`npm run build:home` passed. Local desktop/mobile browser checks passed for
the Resources hub and all three article URLs, including images, links, and
horizontal overflow. Source commit `a6ba494` was pushed to GitHub `main`.
The matching build was deployed to `/www/wwwroot/costerasuite.com/home` after
a full backup at `/root/costera-home-pre-articles-20261011.tar.gz`. The
uploaded archive, live `index.html`, and live `index-BBlAAODM.js` passed
SHA-256 checks against their staging copies. Public HTTP checks returned 200
for `/home/`, `/home/resources`, all three article routes, and the new JS.
These HTTP checks do not replace a full live-browser audit. The article
template still uses a generic CTA and generic per-route title; deeper
article-specific SEO and conversion changes were outside this content-only
request.

## Resource library expansion (11 October 2026)

The Resources library now has 15 articles: three each in Guides pratiques,
Cas d’usage, Comparatifs, Automatisation, and Facturation. Twelve new French
articles are in `src/additionalResourceArticles.js`; the three existing
articles, their slugs, and the shared article layout remain unchanged.
`ResourcesReferencePage.jsx` now filters by each article's own type, so
Automatisation and Facturation no longer reuse the same case-study result.
The unfiltered heading is "Tous les articles" to reflect the full list.

`npm run build:home` passed. Data checks found exactly three articles per
requested rubrique, unique new slugs, and five sections per new article.
Local Chrome rendered 15 cards and a new article's full body. Source commit
`2957d35` was pushed to GitHub `main` and its build deployed under
`/www/wwwroot/costerasuite.com/home`. A full pre-deployment backup is at
`/root/costera-home-pre-15articles-20261011.tar.gz`. Uploaded archive and
staged/live HTML and JS hashes matched. Public HTTPS checks returned 200 for
the Resources page, all 15 article URLs, and `index-Cw0p_Etz.js`; live Chrome
rendered all 15 cards. Full interactive filter and mobile browser audits of
the live domain remain unrun. No Perfex CRM files were changed.

## Distinct resource imagery (11 October 2026)

Each of the 15 resource articles now uses a different image file and a
different SHA-256 image hash. Twelve assignments in
`src/additionalResourceArticles.js` use existing relevant project assets or
three new 1672x941 invoice-focused images in `public/assets/`:
`article-preparer-facture.png`, `article-suivi-impayes.png`, and
`article-avoirs-corrections.png`. The three new assets were made with the
built-in image generation tool using prompts for invoice preparation,
overdue-payment review, and collaborative invoice correction. Original
resource imagery, text, slugs, layout, and category filters remain unchanged.

`npm run build:home` passed. Asset checks found 15 existing files with
distinct hashes; the Resources page was visually inspected locally on desktop.
Source commit `4c1be7a` was pushed to GitHub `main`. The matching build was
deployed to `/www/wwwroot/costerasuite.com/home` after backing up the prior
site to `/root/costera-home-pre-unique-images-20261011.tar.gz`. The upload,
staged/live HTML, and staged/live `index-BkcfJqdN.js` passed SHA-256 checks.
Public HTTPS checks returned 200 for the Resources page, new finance images,
and related article routes; live Chrome rendered 15 cards with 15 distinct
image URLs. Full live mobile and image-decoding audits remain unrun.

## Resource image optimization (11 October 2026)

All 15 article source PNGs remain untouched in `public/assets/`, while the
Resources page now uses 30 generated WebP variants in
`public/assets/resources/`: 720px-wide card images (quality 74) and
1600px-wide article images (quality 78), encoded with FFmpeg/libwebp. The
Resources hero also uses the optimized WebP for the contact-migration article.
The original 15 PNGs total 24.2 MiB; all card variants together are about
0.31 MiB and all article variants together are about 0.93 MiB. Cards retain
lazy loading and now request asynchronous decoding. Layout, slugs, and article
text did not change.

`npm run build:home` passed; all 30 paths resolved, and local Chrome rendered
15 distinct card images plus the optimized hero/article image. Source commit
`ba8d8b8` was pushed to GitHub `main`. The matching build was deployed to
`/www/wwwroot/costerasuite.com/home` after a full backup at
`/root/costera-home-pre-webp-20261011.tar.gz`. Uploaded archive and staged/live
HTML/JS hashes matched. Public HTTPS returned 200 with `image/webp`; a checked
invoice card was 27,142 bytes and its article image 77,680 bytes. Live Chrome
rendered all 15 unique WebP card URLs and a WebP article image. The live image
response had Last-Modified and ETag headers but no explicit Cache-Control;
server cache-header tuning and full mobile/image-decoding audits remain open.

## Favicon correction (11 October 2026)

The previous `public/assets/costera_favicon.ico` depicted a rounded purple
square with extra text, unlike the site logo. The official C mark was cropped
from the transparent `public/assets/costera-logo-official.png` and exported
with transparent padding as `public/assets/costera-favicon-v2.png` (256x256);
the ICO fallback was replaced with the same mark. The page now references
the new PNG filename in `index.html` to avoid reusing the old cached icon URL.
The source logo and other site imagery were not changed.

The mark was inspected at 16px and 32px, and the ICO retained transparency.
`npm run build:home` passed. Source commit `74d5f89` was pushed to GitHub
`main`. A full pre-deployment backup is at
`/root/costera-home-pre-favicon-20261011.tar.gz`. Only the two favicon files
and `index.html` were installed under `/www/wwwroot/costerasuite.com/home`;
uploaded archive and staged/live file hashes matched. Public HTTPS returned
200 for both icons with the expected content types, and live HTML/Chrome
included the new favicon link. No Perfex CRM files were changed.

## Perfex admin access check (11 October 2026)

Public HTTPS checks confirmed `/admin` redirects to
`https://costerasuite.com/admin/authentication`, which serves the Perfex
administrator email/password form and links to
`/admin/authentication/forgot_password`. The website navigation's `/login`
destination is a separate customer-facing page. No admin credentials were
tested, no account session was opened, and no CRM/server settings changed.

## Perfex public FAQ (11 October 2026)

The Perfex knowledge base is separate from the React website in this repository.
One public category, `Accès, inscription et essai gratuit`, and the ten French
questions and answers supplied by the user were published in Perfex's native
knowledge-base tables. The category is at
`https://costerasuite.com/knowledge-base/category/acces-inscription-essai-gratuit`.
The tables had no category or article records before insertion. The public
category listed ten article links, all ten article pages returned HTTP 200,
and a search for `Trial` found the relevant article. No CRM PHP template,
React source, or website asset was changed for this publication.

## Pricing registration buttons (12 October 2026)

The Essential, Business, and Performance card actions on `/pricing` now all
read `Démarrer` and link directly to
`https://costerasuite.com/authentication/register`. The rest of the pricing
page and shared navigation retain their previous actions. `npm run build:home`
passed; the focused desktop/mobile pricing browser audit passed 15 checks.
The full-site browser audit still stops in its unrelated resources input test.
The live `/home/pricing` page serves the new `index-BK89ZfCh.js` bundle; public
checks found three corrected labels, no old misspelling, and HTTP 200 for the
registration form. Only the built JS and `index.html` were deployed. The
previous live HTML and JS are backed up at
`/root/costera-home-pre-demarrer-20261012.tar.gz`.

## Notes for a new maintainer

- Keep the public logo and product images in `public/assets/`; references in React use `src/assetPath.js` so `/home/` URLs resolve correctly.
- Do not upload the `previews/`, `legacy/`, source files, or this guide to the public document directory when deploying. Upload only `dist/` contents.
- Keep hosting, SSH, aaPanel, CRM, and API credentials in a password manager. None are included in this package.
