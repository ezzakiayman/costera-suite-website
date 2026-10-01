import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ProductPage, ResourceArticlePage } from './SuitePages';
import CosteraSuitePage from './CosteraSuitePage';
import GrowthCloudReferencePage from './GrowthCloudReferencePage';
import SalesCloudReferencePage from './SalesCloudReferencePage';
import RevenuePerformanceReferencePage from './RevenuePerformanceReferencePage';
import IntelligenceReferencePage from './IntelligenceReferencePage';
import IndustriesReferencePage from './IndustriesReferencePage';
import ResourcesReferencePage from './ResourcesReferencePage';
import ContactReferencePage from './ContactReferencePage';

const ASSET = '/assets/';
const DEMO_URL = 'https://costerasuite.com/home/request-demo';
const CONTACT_URL = 'https://costerasuite.com/home/contact';

const featureContent = {
  crm: ['CRM Clients & Prospects', 'Retrouvez vos prospects, clients, contacts et leur historique commercial dans un seul espace.', ['Fiches clients et prospects', 'Contacts et historique des échanges', 'Une information partagée avec votre équipe']],
  pipeline: ['Pipeline Commercial', 'Gardez une vue claire sur vos opportunités, du premier contact jusqu’à la signature.', ['Suivi des étapes commerciales', 'Valeur et avancement des opportunités', 'Une vue d’ensemble pour vos managers']],
  activities: ['Activités & Relances', 'Organisez les actions qui font avancer vos ventes et gardez le fil de chaque relation.', ['Appels et rendez-vous', 'Tâches et prochaines actions', 'Suivi des relances commerciales']],
  quotes: ['Devis', 'Centralisez vos propositions commerciales pour suivre chaque opportunité jusqu’à sa concrétisation.', ['Création de devis', 'Suivi des propositions', 'Historique commercial centralisé']],
  invoices: ['Facturation', 'Retrouvez vos factures dans la continuité de votre activité commerciale.', ['Gestion des factures clients', 'Suivi des factures en cours', 'Visibilité sur les règlements']],
  payments: ['Paiements', 'Gardez une vue claire sur vos règlements et les montants encore à encaisser.', ['Suivi des paiements', 'Visibilité sur les factures impayées', 'Une vue consolidée de votre activité']],
  performance: ['Performance Commerciale', 'Donnez à vos managers les indicateurs nécessaires pour mieux piloter leur équipe.', ['Suivi des objectifs', 'Activité et résultats commerciaux', 'Indicateurs clés de performance']],
  dashboard: ['Dashboard', 'Visualisez les informations essentielles de votre activité commerciale en un coup d’œil.', ['Chiffre d’affaires et opportunités', 'Pipeline, devis et factures', 'Objectifs et activité de l’équipe']],
};

const featureCards = [
  ['crm', 'icon_crm_clients_prospects.png', 'CRM Clients & Prospects', <>Centralisez les informations<br />de vos prospects et clients.</>],
  ['pipeline', 'icon_pipeline_commercial.png', 'Pipeline Commercial', <>Visualisez toutes vos<br />opportunités et leur avancement.</>],
  ['activities', 'icon_activites_relances.png', 'Activités & Relances', <>Planifiez les appels,<br />rendez-vous et tâches.</>],
  ['quotes', 'icon_devis.png', 'Devis', <>Créez, envoyez et suivez<br />vos propositions commerciales.</>],
  ['invoices', 'icon_facturation.png', 'Facturation', <>Générez et suivez<br />vos factures.</>],
  ['payments', 'icon_paiements.png', 'Paiements', <>Gardez une visibilité<br />claire sur les règlements.</>],
  ['performance', 'icon_performance_commerciale.png', 'Performance Commerciale', <>Suivez l’activité et les résultats<br />de votre équipe.</>],
  ['dashboard', 'icon_dashboard_analytics.png', 'Dashboard', <>Accédez aux principaux<br />indicateurs en temps réel.</>],
];

const planData = [
  { id: 'essential', title: 'Essential', subtitle: 'Pour démarrer simplement', monthly: '490', annual: '4 900', users: 'Jusqu’à 3 utilisateurs', features: ['Prospects & Clients', 'Pipeline commercial', 'Activités & Relances', 'Email', 'Propositions & Devis', 'Bons de livraison', 'Factures & Paiements', 'Produits / Services', 'Dashboard standard'], action: 'Essayer gratuitement', url: `${DEMO_URL}?utm_source=pricing&utm_campaign=essential-trial` },
  { id: 'business', title: 'Business', subtitle: 'Pour structurer et piloter votre équipe', monthly: '890', annual: '8 900', users: 'Jusqu’à 10 utilisateurs', featured: true, features: ['Tout Essential', 'WhatsApp Integration', 'Contrats', 'Objectifs commerciaux', 'Rôles & permissions', 'Champs personnalisés', 'Reporting avancé', 'Facturation récurrente', 'Portail client', 'API Access', 'Configuration personnalisée'], action: 'Demander une démo', url: `${DEMO_URL}?utm_source=pricing&utm_campaign=business-demo` },
  { id: 'performance', title: 'Performance', subtitle: 'Pour aller plus loin avec Costera', monthly: '1 490', annual: '14 900', users: 'Jusqu’à 25 utilisateurs', features: ['Tout Business', 'Configuration avancée', 'Dashboards personnalisés', 'KPI spécifiques', 'Segmentation avancée', 'Workflows commerciaux', 'Accompagnement renforcé', 'Intégrations spécifiques', 'Support prioritaire'], action: 'Parler à un expert', url: `${CONTACT_URL}?utm_source=pricing&utm_campaign=performance` },
];

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const titles = { '/pricing': 'Tarifs Costera', '/costera-suite': 'Costera Suite', '/platform': 'Costera Suite', '/solutions': 'Costera Suite', '/solutions/growth-cloud': 'Growth Cloud', '/solutions/sales-cloud': 'Sales Cloud', '/solutions/revenue-performance': 'Revenue Performance Cloud', '/costera-intelligence': 'Costera Intelligence', '/industries': 'Industries Costera', '/resources': 'Ressources Costera', '/contact': 'Contact Costera' };
    document.title = `${titles[pathname] || (pathname.startsWith('/resources/') ? 'Guide Costera' : 'Costera')} - Costera Suite`;
    document.body.classList.toggle('pricing-page', pathname === '/pricing');
    if (hash) requestAnimationFrame(() => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: 'smooth' }));
    else window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

function Header({ onTrial, onLogin }) {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const close = (event) => {
      if (event.key === 'Escape' || (event.type === 'pointerdown' && !headerRef.current?.contains(event.target))) {
        setMenuOpen(false);
        setDropdown(null);
      }
    };
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', close);
    return () => {
      document.removeEventListener('keydown', close);
      document.removeEventListener('pointerdown', close);
    };
  }, []);

  const closeMenu = () => { setMenuOpen(false); setDropdown(null); };
  const toggleDropdown = (name) => setDropdown((current) => current === name ? null : name);

  return <header className="site-header" ref={headerRef}>
    <div className="container header-inner">
      <Link className="brand" to="/" aria-label="Costera, accueil" onClick={closeMenu}><span className="brand-logo"><img src={`${ASSET}brand-guide.png`} width="1672" height="941" alt="Costera Suite" /></span></Link>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="navigation" aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
      <nav id="navigation" className={`navigation${menuOpen ? ' is-open' : ''}`} aria-label="Navigation principale">
        <div className="nav-links">
          <NavDropdown id="solutions-menu" label="Solutions" active={pathname === '/costera-suite' || pathname === '/platform' || pathname.startsWith('/solutions') || pathname === '/costera-intelligence'} open={dropdown === 'solutions'} onToggle={() => toggleDropdown('solutions')}>
            <Link to="/costera-suite" onClick={closeMenu}>Costera Suite<small>Une plateforme unifiée et des solutions modulaires.</small></Link>
            <Link to="/solutions/growth-cloud" onClick={closeMenu}>Growth Cloud<small>Acquisition, engagement et conversion.</small></Link>
            <Link to="/solutions/sales-cloud" onClick={closeMenu}>Sales Cloud<small>Pipeline, devis et performance commerciale.</small></Link>
            <Link to="/solutions/revenue-performance" onClick={closeMenu}>Revenue Performance<small>Objectifs, forecast et pilotage des revenus.</small></Link>
            <Link to="/costera-intelligence" onClick={closeMenu}>Costera Intelligence<small>Copilot, agents et automatisations.</small></Link>
          </NavDropdown>
          <NavLink className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`} to="/industries" onClick={closeMenu}>Industries</NavLink>
          <NavDropdown id="resources-menu" label="Ressources" active={pathname.startsWith('/resources')} open={dropdown === 'resources'} onToggle={() => toggleDropdown('resources')}>
            <Link to="/resources" onClick={closeMenu}>Guides & ressources<small>Pour accompagner votre croissance.</small></Link>
            <Link to="/contact" onClick={closeMenu}>Parler à notre équipe<small>Une question ? Nous sommes là.</small></Link>
          </NavDropdown>
          <NavLink className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`} to="/pricing" onClick={closeMenu}>Tarifs</NavLink>
          <NavLink className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`} to="/contact" onClick={closeMenu}>Contact</NavLink>
        </div>
        <div className="nav-actions"><button className="login-link" onClick={() => { closeMenu(); onLogin(); }}>Se connecter</button><button className="button button-primary button-small" onClick={() => { closeMenu(); onTrial(); }}>Essayer gratuitement</button></div>
      </nav>
    </div>
  </header>;
}

function NavDropdown({ id, label, active, open, onToggle, children }) {
  return <div className="nav-dropdown">
    <button className={`nav-trigger${active ? ' is-active' : ''}`} aria-expanded={open} aria-controls={id} onClick={onToggle}>{label} <span className="chevron" /></button>
    <div id={id} className="dropdown-panel" hidden={!open}>{children}</div>
  </div>;
}

function Footer({ onTrial }) {
  return <footer className="site-footer"><div className="container footer-grid">
    <div className="footer-brand"><Link className="brand" to="/" aria-label="Costera, accueil"><span className="brand-logo"><img src={`${ASSET}brand-guide.png`} width="1672" height="941" alt="Costera Suite" /></span></Link><p>Une solution simple et puissante pour<br />centraliser, piloter et faire grandir votre<br />activité commerciale.</p><strong>Grow Smarter. Operate Better.</strong><small>© {new Date().getFullYear()} Costera. Tous droits réservés.</small></div>
    <div className="footer-column"><strong>Produit</strong><Link to="/costera-suite">Costera Suite</Link><Link to="/pricing">Tarifs</Link><Link to="/costera-intelligence">Costera Intelligence</Link></div>
    <div className="footer-column"><strong>Ressources</strong><Link to="/resources">Centre de ressources</Link><Link to="/industries">Industries</Link><Link to="/solutions/sales-cloud">Sales Cloud</Link><Link to="/solutions/growth-cloud">Growth Cloud</Link></div>
    <div className="footer-column"><strong>Entreprise</strong><Link to="/industries">Industries</Link><Link to="/solutions/revenue-performance">Revenue Performance</Link><Link to="/contact">Contact</Link><Link to="/contact?subject=demo#contact-form">Demander une démo</Link></div>
    <div className="footer-cta"><h3>Prêt à simplifier votre<br />gestion commerciale ?</h3><button className="button button-primary button-small" onClick={onTrial}>Essayer gratuitement 14 jours <span aria-hidden="true">→</span></button><a className="footer-demo" href={DEMO_URL}>Demander une démo</a><p>Sans engagement</p></div>
  </div></footer>;
}

function App() {
  const [dialog, setDialog] = useState(null);
  const trial = () => setDialog({ title: 'Commencez avec Costera', body: 'Contactez notre équipe pour organiser votre essai de 14 jours et définir un environnement adapté à votre activité.', items: ['Configuration de votre entreprise', 'Accompagnement au démarrage', 'Découverte de votre gestion commerciale'], label: 'Demander mon essai', url: `${DEMO_URL}?utm_source=gestion-commerciale&utm_campaign=essai-14-jours` });
  const login = () => setDialog({ title: 'Votre espace Costera', body: 'Vous êtes déjà client ? Utilisez le lien d’accès communiqué lors de votre configuration. Notre équipe peut vous aider à retrouver votre espace.', items: [], label: 'Contacter le support', url: CONTACT_URL });
  return <>
    <ScrollManager />
    <a className="skip-link" href="#main">Aller au contenu</a>
    <Header onTrial={trial} onLogin={login} />
    <Routes>
      <Route path="/" element={<HomePage onTrial={trial} onFeature={(key) => { const [title, body, items] = featureContent[key]; setDialog({ title, body, items, label: 'Découvrir en démo', url: DEMO_URL }); }} />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/costera-suite" element={<CosteraSuitePage />} />
      <Route path="/platform" element={<Navigate to="/costera-suite" replace />} />
      <Route path="/solutions" element={<Navigate to="/costera-suite" replace />} />
      <Route path="/solutions/growth-cloud" element={<GrowthCloudReferencePage />} />
      <Route path="/solutions/sales-cloud" element={<SalesCloudReferencePage />} />
      <Route path="/solutions/revenue-performance" element={<RevenuePerformanceReferencePage />} />
      <Route path="/costera-intelligence" element={<IntelligenceReferencePage />} />
      <Route path="/industries" element={<IndustriesReferencePage />} />
      <Route path="/resources" element={<ResourcesReferencePage />} />
      <Route path="/resources/:slug" element={<ResourceArticlePage />} />
      <Route path="/contact" element={<ContactReferencePage />} />
      <Route path="*" element={<main id="main" className="not-found container"><h1>Page introuvable</h1><p>Cette adresse n’existe pas sur le site Costera.</p><Link className="button button-primary" to="/">Retour à l’accueil</Link></main>} />
    </Routes>
    <Footer onTrial={trial} />
    <InfoDialog value={dialog} onClose={() => setDialog(null)} />
  </>;
}

function HomePage({ onTrial, onFeature }) {
  useEffect(() => {
    document.body.classList.remove('pricing-page');
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.append(progress);
    const resultsNote = document.querySelector('.results-note');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let resultsObserver;
    const updateArrowMotion = () => {
      resultsObserver?.disconnect();
      resultsNote?.classList.remove('is-animated');
      if (!resultsNote || reducedMotion.matches) return;
      resultsObserver = new IntersectionObserver(([entry]) => {
        resultsNote.classList.toggle('is-animated', entry.isIntersecting);
      }, { threshold: 0.55 });
      resultsObserver.observe(resultsNote);
    };
    const update = () => {
      const distance = document.documentElement.scrollHeight - innerHeight;
      progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, scrollY / distance) : 0})`;
    };
    addEventListener('scroll', update, { passive: true });
    reducedMotion.addEventListener('change', updateArrowMotion);
    updateArrowMotion();
    update();
    return () => {
      removeEventListener('scroll', update);
      reducedMotion.removeEventListener('change', updateArrowMotion);
      resultsObserver?.disconnect();
      progress.remove();
    };
  }, []);

  return <main id="main">
    <section className="hero" aria-labelledby="hero-title"><div className="container hero-inner">
      <div className="hero-content"><div className="product-badge"><span>GESTION COMMERCIALE</span><span>Powered by Costera Sales Cloud</span></div><h1 id="hero-title">Pilotez toute votre<br className="desktop-break" /> activité commerciale<br className="desktop-break" /> depuis <em>une seule<br className="desktop-break" /> plateforme.</em></h1><p className="hero-description">Centralisez vos prospects, clients, opportunités, devis, factures et performances commerciales avec une solution simple, moderne et conçue pour les entreprises en croissance.</p><div className="hero-actions"><button className="button button-primary" onClick={onTrial}>Essayer gratuitement 14 jours <span aria-hidden="true">→</span></button><a className="button button-outline" href={DEMO_URL}>Demander une démo</a></div><ul className="reassurance" aria-label="Les avantages de votre essai"><li><span className="check" aria-hidden="true">✓</span> Sans engagement</li><li><span className="check" aria-hidden="true">✓</span> Configuration rapide</li><li><span className="check" aria-hidden="true">✓</span> Accompagnement inclus</li></ul></div>
      <div className="hero-visual"><img className="dashboard-image" src={`${ASSET}hero-dashboard.png`} width="1672" height="941" alt="Aperçu du tableau de bord Costera" fetchPriority="high" /><div className="handwritten hero-note" aria-hidden="true">Une vision claire.<br />De meilleures décisions.<svg viewBox="0 0 100 110"><path d="M72 5C78 39 57 64 28 85M28 85l5-24M28 85l26-4" /></svg></div></div>
    </div><div className="container trust-strip"><p>Ils nous font confiance</p><div className="customer-logos" role="region" aria-label="Références clients, carrousel animé" tabIndex="0"><div className="customer-logo-track"><CustomerLogoGroup /><CustomerLogoGroup duplicate /></div></div></div></section>

    <section id="defi" className="challenge" aria-labelledby="challenge-title"><div className="challenge-inner">
      <figure className="testimonial"><img src={`${ASSET}executive.png`} width="1448" height="1086" alt="Un dirigeant devant son ordinateur dans un bureau lumineux." loading="lazy" /><figcaption><blockquote>“Enfin une solution simple et complète pour piloter nos ventes.”</blockquote><p><strong>Yassine El Alaoui</strong><span>Directeur Général, Atlas Industrie</span></p></figcaption></figure>
      <div className="challenge-content"><span className="eyebrow">LE DÉFI</span><h2 id="challenge-title">Votre activité commerciale<br className="desktop-break" /> est-elle encore dispersée ?</h2><p className="section-description">Excel, WhatsApp, emails, fichiers partagés, outils de facturation séparés… Quand les informations commerciales sont dispersées, le suivi devient plus difficile et les décisions prennent plus de temps.</p><div className="problem-grid">
        <ProblemCard image="icon_crm_clients_prospects.png" title={<>Prospects<br />difficiles à suivre</>} text="Vos opportunités sont réparties entre plusieurs outils." />
        <ProblemCard icon="eye" title={<>Manque<br />de visibilité</>} text="Vous ne savez pas toujours où en est votre pipeline commercial." />
        <ProblemCard image="icon_devis.png" tone="purple" title={<>Devis et factures<br />séparés</>} text="Vos équipes passent d’un outil à l’autre." />
        <ProblemCard icon="clock" tone="red" title={<>Reporting<br />manuel</>} text="Vous perdez du temps à consolider les informations." />
      </div></div>
    </div></section>

    <section id="solution" className="solution" aria-labelledby="solution-title"><div className="solution-background" aria-hidden="true" /><div className="container solution-inner"><div className="solution-main"><span className="eyebrow">LA SOLUTION</span><h2 id="solution-title">Tout votre cycle commercial.<br />Un seul espace.</h2><p className="section-description">Costera Gestion Commerciale centralise les étapes essentielles de votre activité commerciale afin de donner à vos équipes plus de visibilité, de simplicité et de contrôle.</p><div className="solution-pillars">
      <Pillar type="database" title="Centralisez">Prospects, clients, contacts, opportunités et historique commercial.</Pillar><Pillar type="chart" title="Suivez">Pipeline, activités, relances, devis, factures et paiements.</Pillar><Pillar type="target" title="Pilotez">Objectifs, chiffre d’affaires, performance commerciale et indicateurs clés.</Pillar>
    </div></div><div className="solution-results"><div className="handwritten results-note" aria-hidden="true">Moins d’outils.<br />Plus de résultats.<svg viewBox="0 0 100 100"><path d="M15 7c2 42 21 66 65 71M80 78 62 57M80 78l-27 5" /></svg></div><div className="results-stack"><Result value="+32%" label="Croissance du CA" tone="green" /><Result value="60%" label="Taux de conversion" /><Result value="-50%" label="Temps de reporting" /></div></div></div></section>

    <section id="fonctionnalites" className="features" aria-labelledby="features-title"><div className="container"><span className="eyebrow">FONCTIONNALITÉS</span><h2 id="features-title">Tout ce dont votre équipe commerciale a besoin</h2><div className="feature-grid">{featureCards.map(([key, image, title, text]) => <button className="feature-card" key={key} onClick={() => onFeature(key)}><span className="feature-icon"><img src={`${ASSET}${image}`} alt="" width="1254" height="1254" loading="lazy" /></span><span><strong>{title}</strong><span>{text}</span></span></button>)}</div><div className="home-next"><Link to="/costera-suite#business-clouds">Explorer Costera Suite <span aria-hidden="true">→</span></Link><Link to="/pricing">Comparer les offres <span aria-hidden="true">→</span></Link></div></div></section>
  </main>;
}

function CustomerLogoGroup({ duplicate = false }) {
  return <div className="customer-logo-group" role={duplicate ? undefined : 'list'} aria-hidden={duplicate || undefined}>
    <span className="customer atlas" role={duplicate ? undefined : 'listitem'}>ATLAS<small>INDUSTRIE</small></span>
    <span className="customer novalis" role={duplicate ? undefined : 'listitem'}><span className="logo-symbol">◈</span> NOVALIS</span>
    <span className="customer medicorp" role={duplicate ? undefined : 'listitem'}><span className="cross-symbol">✣</span> Medicorp</span>
    <span className="customer trustech" role={duplicate ? undefined : 'listitem'}><span className="round-symbol">▥</span> TRUSTECH</span>
    <span className="customer capmaroc" role={duplicate ? undefined : 'listitem'}><span className="logo-symbol">⬡</span> CapMaroc</span>
    <span className="customer sudequip" role={duplicate ? undefined : 'listitem'}><span className="logo-symbol">◌</span> SUDÉQUIP</span>
    <span className="customer orion" role={duplicate ? undefined : 'listitem'}>ORION</span>
  </div>;
}

function ProblemCard({ image, icon, tone = '', title, text }) {
  return <article className="problem-card"><div className={`problem-icon ${tone}`}>{image ? <img src={`${ASSET}${image}`} alt="" width="1254" height="1254" loading="lazy" /> : icon === 'eye' ? <svg viewBox="0 0 32 32"><path d="M2 16s5-9 14-9 14 9 14 9-5 9-14 9S2 16 2 16Z" /><circle cx="16" cy="16" r="5" /></svg> : <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" /><path d="M16 8v9l6 4" /></svg>}</div><h3>{title}</h3><p>{text}</p></article>;
}

function Pillar({ type, title, children }) {
  const paths = { database: <><ellipse cx="16" cy="8" rx="10" ry="4" /><path d="M6 8v16c0 5 20 5 20 0V8M6 16c0 5 20 5 20 0" /></>, chart: <path d="M5 4v23h23M9 21l6-9 5 5 7-10" />, target: <path d="M27 15a12 12 0 1 1-9-11M23 15a8 8 0 1 1-7-7M16 16l12-12M21 4h7v7" /> };
  return <article className="pillar"><span className="pillar-icon"><svg viewBox="0 0 32 32">{paths[type]}</svg></span><div><h3>{title}</h3><p>{children}</p></div></article>;
}

function Result({ value, label, tone = 'blue' }) {
  return <div className="result-card"><span className={`result-icon ${tone}`}><svg viewBox="0 0 24 24"><path d={tone === 'green' ? 'm3 17 6-6 5 3 7-9M15 5h6v6' : 'M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M2 21v-4c0-6 12-6 12 0v4M16 14l2 2 4-5'} /></svg></span><div><strong>{value}</strong><span>{label}</span></div></div>;
}

function PricingPage() {
  const [billing, setBilling] = useState('monthly');
  useEffect(() => {
    document.body.classList.add('pricing-page');
    return () => document.body.classList.remove('pricing-page');
  }, []);
  return <main id="main">
    <section className="pricing-hero" aria-labelledby="pricing-title"><div className="container pricing-intro"><span className="eyebrow">PRICING</span><h1 id="pricing-title">Une offre simple pour digitaliser<br className="desktop-break" /> votre gestion commerciale</h1><p>Choisissez le pack Costera qui correspond à la taille et à la maturité de votre équipe commerciale.</p><div className="billing-control"><div className="billing-toggle" role="group" aria-label="Période de facturation"><button type="button" data-billing="monthly" className={`billing-option${billing === 'monthly' ? ' is-active' : ''}`} aria-pressed={billing === 'monthly'} onClick={() => setBilling('monthly')}>Mensuel</button><button type="button" data-billing="annual" className={`billing-option${billing === 'annual' ? ' is-active' : ''}`} aria-pressed={billing === 'annual'} onClick={() => setBilling('annual')}>Annuel <span>(2 mois offerts)</span></button></div><span className="billing-saving">Économisez 17%</span></div></div>
      <div className="container pricing-grid">{planData.map((plan) => <PricingCard key={plan.id} plan={plan} billing={billing} />)}</div>
    </section>
    <section className="product-proof" aria-label="Costera en action"><div className="container proof-layout"><figure className="dashboard-showcase"><img src={`${ASSET}pricing-dashboard.png`} width="1920" height="1080" alt="Dashboard Costera présentant le chiffre d’affaires, le pipeline, les devis et les activités récentes" /></figure><blockquote className="pricing-testimonial"><img src={`${ASSET}quote_testimonial.svg`} alt="" aria-hidden="true" /><p>Une solution claire, complète et évolutive pour accompagner notre croissance.</p><footer><strong>Yassine El Alaoui</strong><span>Directeur Général, Atlas Industrie</span></footer></blockquote></div></section>
    <section className="pricing-benefits" aria-label="Informations complémentaires"><div className="container benefits-strip"><Benefit icon="user_plus.svg" title="+90 MAD" text="par utilisateur supplémentaire / mois" /><Benefit icon="gear_setup.svg" title="Setup & onboarding" text="disponibles" /><Benefit icon="gift_trial.svg" title="Essai gratuit 14 jours" text="sans engagement" /></div></section>
    <section className="pricing-final"><div className="container final-panel"><div><span className="eyebrow">PRÊT À VOUS LANCER ?</span><h2>Commencez simplement. Évoluez avec Costera.</h2><p>Lancez votre gestion commerciale dès maintenant et activez progressivement d’autres capacités Costera selon l’évolution de votre entreprise.</p></div><div className="final-actions"><div><a className="button button-primary" href={`${DEMO_URL}?utm_source=pricing&utm_campaign=final-trial`}>Essayer 14 jours <span aria-hidden="true">→</span></a><a className="button button-outline" href={`${DEMO_URL}?utm_source=pricing&utm_campaign=final-demo`}>Demander une démo</a></div><strong>Costera — <span>Grow Smarter. Operate Better.</span></strong></div></div></section>
  </main>;
}

function PricingCard({ plan, billing }) {
  return <article className={`pricing-card${plan.featured ? ' pricing-card-featured' : ''}`} aria-labelledby={`${plan.id}-title`}>{plan.featured && <span className="popular-badge">Le plus populaire</span>}<div className="plan-heading"><h2 id={`${plan.id}-title`}>{plan.title}</h2><p>{plan.subtitle}</p></div><div className="plan-price"><strong>{plan[billing]}</strong><span className="currency">MAD</span><small>HT / <span className="price-period">{billing === 'annual' ? 'an' : 'mois'}</span></small></div><p className="plan-users"><img src={`${ASSET}user_plus.svg`} alt="" />{plan.users}</p><ul className="plan-features">{plan.features.map((feature, index) => <li key={feature}>{index === 0 && plan.id !== 'essential' ? <strong>{feature}</strong> : feature}</li>)}</ul><a className={`button ${plan.featured ? 'button-primary' : 'button-outline'} plan-action`} href={plan.url}>{plan.action}</a></article>;
}

function Benefit({ icon, title, text }) {
  return <div className="benefit-item"><img src={`${ASSET}${icon}`} alt="" /><p><strong>{title}</strong><span>{text}</span></p></div>;
}

function InfoDialog({ value, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (value && node && !node.open) { node.showModal(); document.body.classList.add('dialog-open'); }
    if (!value && node?.open) node.close();
    return () => document.body.classList.remove('dialog-open');
  }, [value]);
  return <dialog ref={ref} aria-labelledby="dialog-title" onClose={onClose} onClick={(event) => { if (event.target === ref.current) onClose(); }}><button className="dialog-close" aria-label="Fermer la fenêtre" type="button" onClick={onClose}>×</button><div className="brand-symbol dialog-mark" aria-hidden="true"><img src={`${ASSET}brand-guide.png`} width="1672" height="941" alt="" /></div><span className="eyebrow">COSTERA GESTION COMMERCIALE</span><h2 id="dialog-title">{value?.title}</h2><p>{value?.body}</p><div>{value?.items?.length > 0 && <ul>{value.items.map((item) => <li key={item}>{item}</li>)}</ul>}</div><a className="button button-primary" href={value?.url || DEMO_URL}>{value?.label || 'Parler à l’équipe Costera'} <span aria-hidden="true">→</span></a></dialog>;
}

export default App;
