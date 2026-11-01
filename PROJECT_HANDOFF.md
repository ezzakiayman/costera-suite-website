# Costera Suite website — project handoff

## Démarrer opens selected pack in Facturation (1 November 2026, latest)

The six pricing card buttons now open `https://costerasuite.com/clients/?subscription&costera_plan=<slug>` for the exact monthly or annual pack. Perfex sends signed-out visitors to login and retains the original URL for the login return. The billing view validates the slug, selects its monthly/annual group and marks the card; its action remains the explicit step that starts a trial or changes subscription. This supersedes the signup-button URLs documented below. The live marketing `index.html` SHA-256 is `d7e73b244ac7ea866a364b7771433dc31f79b7ae26cba2c745bde82f48077db2`; main JS is `b17e4cc86124d80a899cca16907be4b5f1c0f907b8f94a73ebc16b757f09648c`. The full home backup is `/root/costera-backups/2026-11-01-selected-pack-home/home-before.tar.gz`. Live Chrome verified six URLs/prices, desktop/mobile layout, generic trial navigation and signed-out login redirect. Authenticated selection and purchase remain untested. Perfex file changes and backup are documented in `C:\Users\EDITO\Downloads\costera suite\recovered-live\selected-pack-flow\HANDOFF.md`.

## Pricing to Perfex SaaS packs deployed (1 November 2026)

The user chose the existing Perfex SaaS monthly offers as the source of truth. The `/home/pricing` page now shows 490/890/1489 MAD monthly, 4900/8900/14890 MAD annually (two months free), 3 users per offer, and a 7-day trial. Feature lists reflect the enabled core capabilities and modules. Each Démarrer button links to `/authentication/register?ps_plan=<verified-package-slug>` for the selected plan and billing period. General trial CTAs lead to `/home/pricing#offres` to let visitors select a pack. Live desktop/mobile checks passed all six links, prices and user labels, with no horizontal overflow. Final `index.html` SHA-256: `fb1e15a6b459a097078ba42791e325fb24c6bf17a89950473205a3fffb871fd4`; new JS asset: `6628158adb4f6bb5189a37f2aa7a7f04947a52f080c14c9e6807c63a69646a87`. The prior live RAS simulator chunk was preserved. Full home backups: `/root/costera-backups/2026-11-01-pricing-plan-links/` and `2026-11-01-pricing-plan-links-v2/`.

Perfex changes are outside this React repository: three annual packages added in the live SaaS database; successful trial selection now opens `/clients/?subscription`; the annual Business card is highlighted. See the local handoff at `C:\Users\EDITO\Downloads\costera suite\recovered-live\plan-link-integration\HANDOFF.md`. No test purchase or real signup was performed, so the complete customer journey remains unverified.

## RAS V2.5 deployed and verified (19 October 2026)

This supersedes the pending-access/deployment notes below. The user supplied
working SSH access. The complete live `home` directory was backed up and the
archive listing checked before installing three new hashed assets, then
atomically replacing `index.html`. Existing assets were retained. Backup:
`/root/costera-home-pre-ras-v25-20261019T211854Z.tar.gz`, SHA-256
`698e8d07c5cf45b0a3b46e0b0de86d7c1fa8457a9a01fea302ac1c309bbe62bc`.

Deployed files: `index-gG6TZqOY.js`, `RasSimulatorPage-Y2iKsTea.js`,
`RasSimulatorPage-C0c-G0xr.css`, and `index.html`. Uploaded asset hashes matched
local bytes. The public HTML SHA-256 matches the local build:
`36fc388b81a66190d75e7c132d96f67b36239982a382e23fabdff4b3c24934a4`.
The old/new main JS are identical after normalizing simulator chunk filenames.
The shared CSS and PDF library were already identical and were not overwritten.

Public HTTP checks returned 200 for the home, tools hub, simulator, pricing,
login and all five required build assets. A live Brave session rendered V2.5,
showed no uncertainty answer, calculated the reference net 100,000 DH
(5,000 DH IS and 15,000 DH TVA retained), and displayed the successful PDF
download message. No browser console error was captured. This verifies the
download handler; the downloaded PDF was not separately inspected. The supplied
Node PDF test had passed with 2 pages. Mobile visual QA and full route-remount
audit remain pending. No CRM, database or server configuration was changed.

A `costera-project` skill was created with verified project references and
installed at `C:\Users\EDITO\.codex\skills\costera-project`. Its ignored local
`private/credentials.dpapi` holds the user-provided access under Windows
CurrentUser encryption. The credential loader was exercised successfully without
displaying values. Matching source is in the workspace's `costera-skills-reference`
checkout. No credential, encrypted bundle or private inventory belongs in GitHub.
Website source commit `daf9c41` was pushed to GitHub main. The Costera skill
was also published to `ezzakiayman/codex-skills` main (initial commit `1fecb12`)
and its installed reference is synchronized. The private DPAPI bundle remains
local and excluded from GitHub.

## RAS V2.5 integration prepared locally (19 October 2026)

Access follow-up: found the private access inventory in the older Costera
project's `.private/` directory. It records the hosting/panel address and
username, but explicitly states that SSH and panel passwords/keys are not
stored in that file. Do not copy that inventory into this repository. Opened
the recorded aaPanel endpoint in Brave; it displays Login with no active
hosting session. The username is entered, the password field is empty, and
the tab is marked for handoff. User was asked to sign in there. Windows SSH
configuration points to a different VPS, and the inspected Windows/Ubuntu SSH
directories contain no private key. No authentication reset or login guessing
was attempted. Deployment remains pending authenticated hosting access.

Additional browser check passed: a fresh private-enterprise journey (500m DH
CA band, invoice 2026-10-19, payment 2026-10-30, personnel transport, attestation
explicitly yes, 250,000 DH HT, TVA 10%) returns net 256,250 DH, TVA retained
18,750 DH, zero IS. Both attestation choices initially have aria-pressed false.
The viewport override was reset after a 375px check; mobile visual QA remains
inconclusive and is not recorded as passed.

The user requested updating the **production** simulator using the supplied
`Costera_Dossier_Complet_Integration_Simulateur_RAS_V2_5_FINAL` package and
explicitly authorized proceeding. Production target confirmed by browser:
`https://costerasuite.com/home/resources/tools/simulateur-ras`.

This checkout was cloned from GitHub `main` at `dc76629`. The older Desktop
`costera-landing` copy lacks the simulator and must not be used to replace the
current production site. Production still displayed the old uncertainty option
when inspected. No server upload, production edit, GitHub push or deployment
has been performed for V2.5 in this session.

Local changes copy the supplied modular V2.5 files into
`src/ras-simulator/source/` and regenerate the scoped CSS and React controller.
The supplied amount script binds on initial script execution; React now imports
the generated `amount-controller.js`, which exposes an explicit `bind(input)`
called after mount. The generator disconnects its MutationObserver and aborts
the delegated container click handler on unmount. The obsolete reminder timer
cleanup was removed because V2.5 no longer defines that timer. Shared navigation,
footer, simulator route, and lazy same-origin PDF library loading are retained.
The source fiscal rules are copied from the supplied package, without additional
fiscal changes or independent legal validation.

Checks completed:

- Supplied package tests: 43 scenarios, 93 services, 11 amount cases, 13 reference
  cases passed; PDF test generated 2 pages.
- `node src/ras-simulator/generate.mjs` and `npm run build:home` passed.
- Production-build browser preview at port 4174 with `--base /home/`: simulator
  mounts, uncertainty option absent, sample returns net 100,000 DH with 5,000 DH
  IS and 15,000 DH TVA retained.
- Clicking PDF displayed the application's successful-download status. The
  browser automation download-event wait timed out; no downloaded PDF file was
  inspected in this session. The supplied Node PDF-generation test passed.
- Transport du personnel hides IS qualification; 250,000 DH HT, TVA 10%, bank
  client and attestation yes returns 256,250 DH net, 18,750 DH TVA retention,
  zero IS. Direct calculation, previous/next, and amount grouping were exercised.
- Desktop screenshot inspected; mobile layout, complete fresh-input private
  enterprise journey, and a full route-remount audit remain to be checked.

Pending: obtain a usable hosting/SSH deployment session or the path to an
existing credential bundle from the user. Authorization is already received;
do not request publication approval again. Back up the live website before
deployment, verify existing production build/environment compatibility, copy
hashed assets before replacing HTML, and verify the live route and PDF after
upload. Do not replace CRM files or server configuration.

No installed Costera project skill was found. The GitHub `codex-skills` main
branch was also inspected via a separate workspace clone and contains Escolia,
Skillgate and Zakoura project skills, with no matching Costera skill. Unrelated
skills remain unchanged. This handoff is saved locally only.

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

## Free tools and RAS simulator (14 October 2026)

The public React site now has `Ressources > Outils gratuits` at
`/home/resources/tools`, with a card linking to
`/home/resources/tools/simulateur-ras`. Both routes use the existing shared
header and footer. The simulator is adapted from the separate static package
under `Desktop/zakoura lms/module 2/Costera_Dossier_Complet_Integration_Simulateur_RAS (1)`;
its copied source is in `src/ras-simulator/source/`. Run
`node src/ras-simulator/generate.mjs` after changing the copied CSS or
controller source. The generator scopes CSS to the simulator and adapts the
standalone DOM handlers to its React mount. `src/RasSimulatorPage.jsx` loads
pdf-lib as a same-origin script on the first PDF request, because importing
the UMD bundle directly did not expose `window.PDFLib` in the production build.

The user stated that a Moroccan tax professional approved the package's
2026-2028 rules for publication. This is user-provided approval, not an
independent legal review. The supplied 11 amount and 13 reference calculation
tests passed. `npm run build:home` passed. A production-mode local browser
verified the sample calculation (100,000 DH HT, 20,000 DH TVA, 5,000 DH IS
retained, 15,000 DH TVA retained, 100,000 DH net), PDF generation, and a
375px mobile viewport without horizontal overflow. Public HTTPS returned 200
for both routes, and a live browser verified the same sample and successful
PDF generation. The deployed `index.html` SHA-256 is
`265543d3004a077287875b15c9fa0c5c5354b6e6b80ed2914dad6369a0ea6b3e`.
The pre-integration and pre-PDF-fix deployment backups are at
`/root/costera-home-pre-ras-20261014.tar.gz` and
`/root/costera-home-pre-pdf-fix-20261014.tar.gz`. Only the new hashed build
assets and `index.html` were installed in `/www/wwwroot/costerasuite.com/home`;
Perfex templates were not changed for this feature.

## CRM client cleanup (14 October 2026)

At the user's explicit direction, the main Perfex database was backed up and
then older customer records were removed in one checked transaction. The cutoff
was `2026-10-14 00:00:00` in the application's `Africa/Casablanca` timezone.
Active SaaS tenant client ID 1 was explicitly preserved as an exception, along
with client IDs 6073, 6074, and 6075 created on 14 October. Both SaaS company
records, including today's active tenant, remain active.

The transaction deleted 6,071 old clients, 6,070 contacts, 48,560 contact
permissions, 6,070 contact user-metadata rows, 2 paid invoices and 2 payment
records, 4 estimates, 1 expense, 1 contract, and their audited item/tax,
activity, file-index, related-item, and customer-group rows. Independent
post-checks found exactly the four protected clients, four contacts, seven
invoices belonging to the preserved tenant, and both active SaaS companies.
The SQL backup covers all 455 main-database tables, is root-only (`0600`), and
is stored at `/root/costera-backups/2026-10-14/client-cleanup/main-before.sql`
with SHA-256
`2f494500063d1ba9b666de7598bc5e3cb57c796b179a6ed2c35bfe1843f50e1e`.
The root-only cleanup script and result audit are in the same server directory;
a credential-free local copy of the script is in the workspace's ignored
`private/` directory. The expense file's database index was removed but the
physical upload file was not deleted. Do not restore the full backup into a
running production database without first accounting for newer records.

## Client #1 removal and Perfex access repair (14 October 2026)

The user later authorized permanent removal of client ID 1 and its `ltd`
tenant, superseding the exception above. A fresh root-only full database dump
and tenant upload archive were validated before execution. The guarded cleanup
removed the client, contact, seven invoices and linked records, SaaS company
ID 1, 187 `ltd_` tables, and the `ltd` uploads. Independent checks found only
today's client IDs 6073, 6074, and 6075, with the active `coin` tenant on
client 6074 and its 126 tables. The backup and audit are under
`/root/costera-backups/2026-10-14/client-1-delete/`; do not publish them or
restore the full dump over newer production data.

For client 6074, Perfex's `admin/clients/login_as_client` action set the
client session but redirected to `/`, which the public Nginx site routes to
the marketing `/home`. The live `Clients.php` action now redirects to
`site_url('clients')`; `php -l` passed. The active primary contact was verified.
An authenticated browser click still needs user validation.

`coin.costerasuite.com` resolved to the VPS but initially hit aaPanel's default
site and had no matching TLS certificate. A dedicated Nginx host now serves
the existing Perfex app, sends HTTP to HTTPS, and routes the tenant root and
`/home` to `/admin` (avoiding the app's `/home` self-redirect and the public
marketing directory). A Let's Encrypt certificate for the exact hostname is
installed with a deploy hook to reload the aaPanel Nginx instance. Issuance,
renewal dry run, Nginx syntax, certificate hostname, root-to-admin-login
redirect chain, and both tenant login pages passed. Main-site `/home/` still
returns 200. No user password or authenticated tenant sign-in was tested.

## Automatic tenant subdomains (14 October 2026)

Authoritative wildcard DNS already sends arbitrary `*.costerasuite.com` names
to the VPS. The server now has a wildcard HTTP Nginx host for ACME challenges
and an idempotent `/usr/local/sbin/costera-tenant-provision.php` job running
each minute from `/etc/cron.d/costera-tenant-provision`. It reads active Perfex
SaaS tenant slugs, validates each hostname, skips an already configured host,
and otherwise issues a hostname-specific Let's Encrypt certificate, installs
an exact Nginx vhost from `/etc/costera/tenant-vhost.template.conf`, tests the
configuration, and reloads aaPanel Nginx. A shared renewal deploy hook reloads
Nginx after Certbot renews certificates. No DNS API secret is used.

The authoritative DNS lookup and a staging ACME challenge for an unregistered
probe name passed. PHP lint, provisioner dry run and no-op execution for the
existing `coin` tenant, template comparison to the working `coin` vhost,
Nginx syntax, cron's first tick, and main/CRM/coin HTTP checks passed. No test
customer was created in production, so a complete new-tenant signup/login
remains unverified. A new active tenant's HTTPS host may take around a minute
plus certificate issuance to become available. Check
`/var/log/costera-tenant-provision.log` if provisioning fails; rate limits or
DNS/ACME outages can delay it. Credential-free local deployment sources are in
`recovered-live/perfex-tenant-provisioner/` outside this repository.

## Perfex verification and trial UI (1 November 2026)

This is a live Perfex change, separate from the React marketing source. The
`/verification` page now shows one Costera logo, clear confirmation steps, and
the existing resend action. Registration waits until email verification (and
admin approval, when enabled) before sending the welcome email. Verification
and welcome templates for French, English, and Spanish have branded layouts.
SaaS trial notices show an `Acheter` action and plan cards show
`Acheter ce forfait`, retaining the existing package-selection route.

The live page was visually checked, all changed PHP files passed lint, and
six stored mail templates were checked for their logo and action link.
Authenticated email delivery, a fresh verification click and a purchase remain
untested. Backups and exact files are described in
`C:\Users\EDITO\Downloads\costera suite\recovered-live\verification-welcome-trial\HANDOFF.md`.

## French SaaS invoice alert (1 November 2026)

The live Perfex French overdue-invoice message now reads `Votre Facture est en
Attente de Paiement !`; its existing payment link reads `Payer la facture`.
The payment route and billing logic are unchanged. PHP lint passed. The
authenticated Stunart dashboard still needs a visual recheck. Source, backup
and hash are recorded in
`C:\Users\EDITO\Downloads\costera suite\recovered-live\invoice-alert-copy-20261101\HANDOFF.md`.

## Tenant deployment email (1 November 2026)

The live Perfex SaaS customer email sent after a tenant is deployed now matches
the branded verification and welcome emails. It has distinct administrator and
client-portal buttons and fallback URLs, with French, English and Spanish copy.
The existing merge fields and provisioning flow are unchanged. PHP lint and a
post-update database check passed for all three active templates. The original
rows are backed up under `/root/costera-backups/2026-11-01-tenant-deployment-email/`.
No real email was sent, so inbox rendering and delivery remain unverified.
Local implementation and checks:
`C:\Users\EDITO\Downloads\costera suite\recovered-live\tenant-deployment-email\HANDOFF.md`.

## Pricing registration-first flow (1 November 2026)

The six `/home/pricing` pack buttons now open Perfex registration with the
selected monthly or annual package slug. Perfex saves the selected billing URL
in the same browser session, so an existing customer can sign in from the
registration page, while a new customer can complete signup and email
verification before seeing the selected package in Facturation. The public
billing route stays login-protected. The React build, PHP lint, public GETs,
and live browser checks of monthly and annual buttons passed. No signup or
purchase was performed, so the full post-verification selection remains
unverified. Local source, hashes, rollback copies and screenshot:
`C:\Users\EDITO\Downloads\costera suite\recovered-live\pricing-registration-flow\HANDOFF.md`.
