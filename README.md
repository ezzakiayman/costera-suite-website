# Costera Gestion Commerciale

React/Vite website with connected client-side routes:

- `/` - Costera landing page
- `/pricing` - Pricing page
- `/costera-suite` - Unified platform and solutions overview
- `/platform` and `/solutions` - Redirect to Costera Suite
- `/solutions/growth-cloud` - Growth Cloud
- `/solutions/sales-cloud` - Sales Cloud
- `/solutions/revenue-performance` - Revenue Performance Cloud
- `/costera-intelligence` - AI and automation
- `/industries` - Industry solutions
- `/resources` - Searchable resources
- `/contact` - Contact and demo request

The header and footer are shared React components. Navigation uses React Router, so moving between the landing and pricing pages does not reload the browser.

## Local development

```powershell
npm install
npm run dev
```

Open `http://127.0.0.1:5173/` or `http://127.0.0.1:5173/pricing`.

## Production build

```powershell
npm run build
```

Upload the contents of `dist/` to the website document root. Apache uses the included `.htaccess` fallback. For Nginx, copy the `location` block from `deploy/nginx-spa.conf` into the Costera server block and reload Nginx.

The contact page always displays a form. Without `VITE_CONTACT_ENDPOINT`, submitting opens the visitor's email application with a prepared message to `contact@costerasuite.com`; the visitor must send it. To enable direct submission, set `VITE_CONTACT_ENDPOINT` in a `.env` file before building. The endpoint must accept POST JSON, allow requests from the website origin, and return a 2xx status only after saving or delivering the message. Test delivery end to end before publishing. The Resources page has three searchable articles and a newsletter form. Without `VITE_NEWSLETTER_ENDPOINT`, the form opens an email draft; with it, the endpoint must accept POST JSON containing `email` and return a 2xx status only after storing the subscription.

## Structure

- `src/App.jsx` - router, shared layout, landing page, and pricing page
- `src/SuitePages.jsx` - shared page data, articles, and contact form behavior
- `src/*ReferencePage.jsx` - reference-inspired product, industry, resource, and contact pages
- `src/PlatformReferencePage.jsx` - platform page adapted from `02_platform_reference.png`
- `src/SolutionsReferencePage.jsx` - solutions page adapted from the page reference
- `src/RecommendationSections.jsx` - sections adapted from the media pack page recommendations
- `src/suite-pages.css` - shared styles for the extended page family
- `src/recommendations.css` - recommendation page sections and interactions
- `styles.css` - shared and landing styles
- `pricing.css` - pricing styles
- `public/assets/` - production images, icons, fonts, and favicon
- `legacy/` - archived static HTML and JavaScript from before the React conversion
- `checks/pricing-preview.ps1` - pricing and route browser audit
- `checks/intelligence-preview.ps1` - desktop/mobile reference-page audit

## Validation

Run `checks/pricing-preview.ps1`. It validates responsive layout, assets, mobile navigation, monthly/annual pricing, route links, and client-side navigation, and creates desktop/mobile screenshots.
