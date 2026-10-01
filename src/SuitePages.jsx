import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { IndustryApproach, PlatformDetails, ProductJourney } from './RecommendationSections';

const A = '/assets/';
const DEMO = 'https://costerasuite.com/home/request-demo';

const icons = {
  crm: 'icon_crm_clients_prospects.png',
  pipeline: 'icon_pipeline_commercial.png',
  activity: 'icon_activites_relances.png',
  quote: 'icon_devis.png',
  invoice: 'icon_facturation.png',
  payment: 'icon_paiements.png',
  performance: 'icon_performance_commerciale.png',
  dashboard: 'icon_dashboard_analytics.png',
};

const productPages = {
  growth: {
    eyebrow: 'GROWTH CLOUD', title: <>Plus de leads. Plus d’opportunités.<br /><em>Une croissance durable.</em></>,
    description: 'Attirez les bons prospects, engagez vos audiences et transformez chaque interaction en opportunité grâce à la donnée, l’automatisation et l’intelligence artificielle.',
    image: 'costera-leadership-hero.png', visual: 'growth',
    stats: [['Ciblage', 'Audiences pertinentes'], ['Campagnes', 'Actions coordonnées'], ['Parcours', 'Engagement personnalisé'], ['Analyses', 'Résultats visibles']],
    features: [['crm', 'Lead Generation', 'Attirez des prospects qualifiés grâce à des campagnes multicanales.'], ['activity', 'Campaign Management', 'Créez et optimisez vos campagnes depuis un espace unique.'], ['performance', 'Audience Intelligence', 'Identifiez les audiences à plus fort potentiel.'], ['pipeline', 'Journey Orchestration', 'Personnalisez les parcours sur chaque canal.'], ['quote', 'Opportunity Creation', 'Transformez l’engagement en opportunités qualifiées.'], ['dashboard', 'Performance Analytics', 'Mesurez et améliorez vos résultats en temps réel.']],
    process: [['1', 'Attirer', 'Ciblez vos audiences sur les bons canaux.'], ['2', 'Engager', 'Captez leur intérêt avec du contenu utile.'], ['3', 'Qualifier', 'Enrichissez et scorez chaque lead.'], ['4', 'Nurturer', 'Automatisez des parcours personnalisés.'], ['5', 'Convertir', 'Alimentez le pipeline commercial.']],
  },
  sales: {
    eyebrow: 'SALES CLOUD', title: <>Transformez vos opportunités en<br /><em>croissance durable.</em></>,
    description: 'Pilotez l’ensemble de votre cycle de vente : prospection, opportunités, devis, facturation, relances et performance commerciale.',
    image: 'hero-dashboard.png', visual: 'dashboard',
    stats: [['Pipeline', 'Opportunités suivies'], ['Devis', 'Propositions centralisées'], ['Factures', 'Suivi commercial'], ['Rapports', 'Décisions éclairées']],
    features: [['pipeline', 'Gestion des opportunités', 'Centralisez les étapes, probabilités et informations de chaque vente.'], ['quote', 'Devis & facturation', 'Créez vos devis et transformez-les en factures.'], ['activity', 'Relances intelligentes', 'Automatisez les rappels et prochaines actions.'], ['performance', 'Performance commerciale', 'Suivez les KPI, objectifs et prévisions de chiffre d’affaires.']],
    process: [['1', 'Prospecter', 'Centralisez vos prospects et contacts.'], ['2', 'Qualifier', 'Priorisez les opportunités importantes.'], ['3', 'Proposer', 'Créez et envoyez vos devis.'], ['4', 'Conclure', 'Transformez les ventes en factures.']],
  },
  revenue: {
    eyebrow: 'REVENUE PERFORMANCE CLOUD', title: <>De la donnée à la décision,<br /><em>plus de performance.</em></>,
    description: 'Fixez vos objectifs, anticipez vos résultats, simplifiez vos commissions et donnez à vos équipes une vision fiable de leur performance.',
    image: 'pricing-dashboard.png', visual: 'dashboard',
    stats: [['Objectifs', 'Priorités partagées'], ['Prévisions', 'Scénarios de revenus'], ['Commissions', 'Calculs structurés'], ['KPI', 'Pilotage continu']],
    features: [['performance', 'Objectifs & KPI', 'Définissez et suivez les objectifs de l’entreprise et des équipes.'], ['dashboard', 'Forecasting avancé', 'Anticipez les résultats avec des modèles et scénarios fiables.'], ['crm', 'Commissions simplifiées', 'Automatisez les calculs et partagez une information transparente.'], ['invoice', 'Tableaux de bord', 'Analysez revenus, tendances, équipes et opportunités.']],
    process: [['1', 'Définir', 'Alignez les objectifs avec votre stratégie.'], ['2', 'Prévoir', 'Projetez les résultats et scénarios.'], ['3', 'Piloter', 'Suivez les écarts en temps réel.'], ['4', 'Optimiser', 'Transformez les données en décisions.']],
  },
  intelligence: {
    eyebrow: 'COSTERA INTELLIGENCE', title: <>L’IA au service d’une croissance<br /><em>plus humaine.</em></>,
    description: 'Des assistants, des agents et des automatisations intelligentes pour libérer le potentiel de vos équipes et créer plus de valeur durablement.',
    image: 'costera-leadership-hero.png', visual: 'ai',
    stats: [['Copilot', 'Assistance contextuelle'], ['Agents', 'Tâches spécialisées'], ['Workflows', 'Processus orchestrés'], ['Knowledge', 'Savoir accessible']],
    features: [['crm', 'Costera Copilot', 'Un assistant contextuel pour obtenir des réponses et préparer les actions.'], ['activity', 'AI Agents', 'Des agents spécialisés qui exécutent des tâches avec vos équipes.'], ['performance', 'Automation Hub', 'Orchestrez les processus métier de bout en bout.'], ['quote', 'Knowledge Hub', 'Activez la connaissance présente dans vos données et documents.']],
    process: [['1', 'Connecter', 'Reliez les données utiles à vos métiers.'], ['2', 'Comprendre', 'Contextualisez chaque demande et décision.'], ['3', 'Automatiser', 'Confiez les tâches répétitives aux agents.'], ['4', 'Gouverner', 'Gardez le contrôle, la sécurité et la traçabilité.']],
  },
};

const clouds = [
  ['Growth Cloud', 'Attirez, convertissez et développez votre marché.', '/solutions/growth-cloud', 'performance'],
  ['Sales Cloud', 'Équipez vos commerciaux pour vendre plus simplement.', '/solutions/sales-cloud', 'pipeline'],
  ['Revenue Performance', 'Pilotez objectifs, forecast et revenus.', '/solutions/revenue-performance', 'dashboard'],
  ['Costera Intelligence', 'Augmentez vos équipes avec une IA utile.', '/costera-intelligence', 'crm'],
];

function SectionTitle({ eyebrow, title, text, center = false }) {
  return <div className={`suite-section-title${center ? ' is-centered' : ''}`}><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

function PageHero({ eyebrow, title, description, image = 'costera-leadership-hero.png', visual = 'photo', explore = '#page-details', exploreLabel = 'Voir les fonctionnalités', contactHero = false }) {
  return <section className={`suite-hero suite-hero-${visual}`}><div className="container suite-hero-layout"><div className="suite-hero-copy"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p><div className="suite-hero-actions"><a className="button button-primary" href={explore}>{exploreLabel} <span aria-hidden="true">↓</span></a>{contactHero ? <a className="button button-outline" href={DEMO}>Demander une démo</a> : <Link className="button button-outline" to="/contact?subject=demo#contact-form">Demander une démo</Link>}</div><ul className="suite-assurances"><li>Configuration rapide</li><li>Accompagnement expert</li><li>Sans engagement</li></ul></div><div className="suite-hero-media"><img src={`${A}${image}`} alt={visual === 'dashboard' ? 'Aperçu de la plateforme Costera' : 'Une équipe accompagnée par Costera Suite'} />{visual !== 'dashboard' && <div className="suite-floating-panel"><strong>{visual === 'ai' ? 'Une IA intégrée à vos métiers' : 'Une plateforme pour mieux décider'}</strong><span>People · Processes · Data · Technology · AI</span></div>}</div></div></section>;
}

function MetricStrip({ items }) {
  return <section className="suite-metrics"><div className="container suite-metric-grid">{items.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></section>;
}

function FeatureGrid({ features }) {
  return <div className={`suite-feature-grid count-${features.length}`}>{features.map(([icon, title, text]) => <article className="suite-feature-card" key={title}><span className="suite-icon"><img src={`${A}${icons[icon]}`} alt="" /></span><h3>{title}</h3><p>{text}</p></article>)}</div>;
}

function Process({ items }) {
  return <div className="suite-process">{items.map(([number, title, text]) => <article key={title}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>;
}

function PageCta({ title = 'Construisons votre prochaine étape de croissance.' }) {
  return <section className="suite-cta"><div className="container suite-cta-inner"><div><span className="eyebrow">PRÊT À PASSER À L’ACTION ?</span><h2>{title}</h2><p>Échangez avec nos experts et découvrez une approche adaptée à vos enjeux.</p></div><div><Link className="button button-primary" to="/contact?subject=demo#contact-form">Demander une démo <span aria-hidden="true">→</span></Link><Link className="button button-outline" to="/pricing">Voir les tarifs</Link></div></div></section>;
}

export function ProductPage({ type }) {
  const page = productPages[type];
  return <main id="main" className="suite-page"><PageHero {...page} /><MetricStrip items={page.stats} /><section id="page-details" className="suite-section"><div className="container"><SectionTitle eyebrow="FONCTIONNALITÉS" title="Tout ce dont vos équipes ont besoin" text="Une expérience simple, cohérente et connectée à toute la plateforme Costera." /><FeatureGrid features={page.features} /></div></section><ProductJourney type={type} /><section className="suite-section suite-section-soft"><div className="container"><SectionTitle eyebrow="UNE APPROCHE COMPLÈTE" title="De l’intention aux résultats" text="Un parcours clair pour déployer progressivement les capacités utiles." /><Process items={page.process} /></div></section><RelatedPages current={type} /><PageCta title={`Passez à l’étape suivante avec ${page.eyebrow.toLowerCase()}.`} /></main>;
}

function RelatedPages({ current }) {
  const currentPath = { growth: '/solutions/growth-cloud', sales: '/solutions/sales-cloud', revenue: '/solutions/revenue-performance', intelligence: '/costera-intelligence' }[current];
  return <section className="suite-section related-pages"><div className="container"><SectionTitle eyebrow="CONTINUER À EXPLORER" title="Connectez vos prochaines priorités" /><div className="related-links">{clouds.filter(([, , path]) => path !== currentPath).map(([name, text, path]) => <Link key={path} to={path}><strong>{name}</strong><span>{text}</span><span aria-hidden="true">→</span></Link>)}</div></div></section>;
}

export function PlatformPage() {
  const pillars = [['crm', 'People', 'Des collaborateurs engagés et augmentés.'], ['activity', 'Processes', 'Des processus fluides et efficaces.'], ['dashboard', 'Data', 'Une donnée unifiée, fiable et activée.'], ['pipeline', 'Technology', 'Un écosystème ouvert et évolutif.'], ['performance', 'AI', 'Une intelligence au service de l’humain.']];
  return <main id="main" className="suite-page"><PageHero eyebrow="PLATFORM" title={<>People. Processes. Data.<br />Technology & AI. <em>Together.</em></>} description="Costera connecte toute l’entreprise dans une plateforme unifiée pour transformer vos ambitions en résultats durables." image="hero-dashboard.png" visual="dashboard" exploreLabel="Découvrir l’architecture" /><section id="page-details" className="suite-section"><div className="container"><SectionTitle eyebrow="LES CINQ PILIERS" title="Une plateforme pour relier toute votre activité" text="Les personnes, les processus et les données avancent ensemble." /><FeatureGrid features={pillars} /></div></section><PlatformDetails /><section className="suite-section suite-section-soft"><div className="container"><SectionTitle eyebrow="BUSINESS CLOUDS" title="Une plateforme. Plusieurs leviers de croissance." /><CloudGrid /></div></section><PageCta title="Faites de votre transformation un avantage durable." /></main>;
}

function CloudGrid() {
  return <div className="suite-cloud-grid">{clouds.map(([name, text, href, icon]) => <Link to={href} key={name}><span className="suite-icon"><img src={`${A}${icons[icon]}`} alt="" /></span><h3>{name}</h3><p>{text}</p><strong>Découvrir <span aria-hidden="true">→</span></strong></Link>)}</div>;
}

const industries = [
  ['FMCG & Consumer Goods', 'Accélérez la valeur de la marque au consommateur.', ['Visibilité par marque et canal', 'Exécution en point de vente', 'Pilotage multi-canal'], 'invoice'],
  ['Retail & Distribution', 'Créez des expériences fluides et rentables.', ['Performance magasins et réseaux', 'Gestion des stocks', 'Décisions en temps réel'], 'quote'],
  ['Professional Services', 'Valorisez l’expertise et la rentabilité.', ['Rentabilité par mission', 'Allocation des ressources', 'Facturation et pipeline'], 'crm'],
  ['Multi-Site Organizations', 'Gagnez en cohérence à grande échelle.', ['Pilotage multisite', 'Processus harmonisés', 'Performance locale'], 'dashboard'],
];

export function IndustriesPage() {
  return <main id="main" className="suite-page"><PageHero eyebrow="INDUSTRIES" title={<>Des solutions pensées pour vos<br /><em>réalités métier.</em></>} description="Chaque secteur possède ses contraintes et ses ambitions. Costera combine une plateforme commune et des approches adaptées à votre contexte." /><section id="page-details" className="suite-section"><div className="container"><SectionTitle eyebrow="NOS SECTEURS" title="Des expertises sectorielles pour un impact réel" /><div className="industry-grid">{industries.map(([name, text, points, icon]) => <article key={name}><span className="suite-icon"><img src={`${A}${icons[icon]}`} alt="" /></span><h2>{name}</h2><p>{text}</p><h3>Défis adressés</h3><ul>{points.map(point => <li key={point}>{point}</li>)}</ul><Link to={`/contact?subject=${encodeURIComponent(name)}#contact-form`}>Parler de ce secteur <span aria-hidden="true">→</span></Link></article>)}</div><aside className="industry-custom" aria-labelledby="industry-custom-title"><span className="industry-custom-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 9 9" /><path d="M12 7v5l3 2M17 3h4v4M21 3l-5 5" /></svg></span><div><span className="eyebrow">VOTRE SECTEUR N’EST PAS LISTÉ ?</span><h2 id="industry-custom-title">Construisons une réponse adaptée à votre activité.</h2><p>Chaque métier a ses propres processus. Décrivez-nous vos enjeux et nos experts vous proposeront une approche sur mesure.</p></div><Link className="button button-primary" to="/contact?subject=Mon%20secteur%20n%27est%20pas%20list%C3%A9#contact-form">Parler de mon secteur <span aria-hidden="true">→</span></Link></aside></div></section><IndustryApproach /><PageCta title="Votre secteur. Nos expertises. Des résultats concrets." /></main>;
}

export const resourceArticles = [
  { slug: 'demarrer-digitalisation', type: 'Guide', title: 'Digitalisation : par où commencer ?', text: 'Les étapes clés pour structurer votre transformation digitale.', image: 'resources-guide.png', sections: [['Cartographier le travail actuel', 'Listez les outils utilisés, les doubles saisies et les informations qui manquent aux équipes. Cette vue révèle les premiers processus à simplifier.'], ['Choisir une priorité mesurable', 'Commencez par un parcours concret, par exemple le suivi des prospects jusqu’au devis. Définissez qui l’utilise et comment vous mesurerez son adoption.'], ['Déployer progressivement', 'Importez les données utiles, formez les équipes sur leurs tâches quotidiennes et recueillez leurs retours avant d’étendre la solution.']] },
  { slug: 'automatiser-facturation', type: 'Cas d’usage', title: 'Automatiser sa facturation', text: 'Comment gagner en productivité sans perdre le contrôle.', image: 'resources-automation.png', sections: [['Relier devis et facture', 'Une fois un devis accepté, les informations déjà validées peuvent alimenter la facture. Cela réduit les ressaisies et facilite la vérification.'], ['Garder les validations visibles', 'Définissez les rôles autorisés à créer, modifier et valider les documents. Conservez un historique clair des changements.'], ['Suivre les règlements', 'Rapprochez les paiements des factures et donnez à l’équipe une vue des montants encore à encaisser.']] },
  { slug: 'choisir-gestion-commerciale', type: 'Comparatif', title: 'Choisir sa gestion commerciale', text: 'Fonctionnalités, adoption, accompagnement et résultats.', image: 'resources-comparison.png', sections: [['Comparer les usages réels', 'Vérifiez la gestion des contacts, le pipeline, les devis, la facturation et le reporting sur des scénarios proches de votre activité.'], ['Évaluer le coût complet', 'Comparez le prix, le nombre d’utilisateurs, la configuration, l’import des données, les intégrations et l’accompagnement.'], ['Tester avec les équipes', 'Faites participer les commerciaux et les responsables. Une démonstration avec vos propres cas d’usage montre plus qu’une liste de fonctionnalités.']] },
];

export function ResourceArticlePage() {
  const { slug } = useParams();
  const article = resourceArticles.find(item => item.slug === slug);
  if (!article) return <main id="main" className="suite-page resource-article"><div className="container"><h1>Ressource introuvable</h1><Link to="/resources">Retour aux ressources</Link></div></main>;
  return <main id="main" className="suite-page resource-article"><div className="container"><Link className="back-link" to="/resources">← Toutes les ressources</Link><span className="eyebrow">{article.type}</span><h1>{article.title}</h1><p className="article-intro">{article.text}</p><img className="article-image" src={`${A}${article.image}`} alt="" /><div className="article-body">{article.sections.map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}</div><div className="article-next"><h2>Découvrir Costera en action</h2><Link className="button button-primary" to="/costera-suite#business-clouds">Explorer Costera Suite <span aria-hidden="true">→</span></Link></div></div></main>;
}

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const topic = searchParams.get('subject') || '';
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
  return <main id="main" className="suite-page contact-page"><PageHero eyebrow="CONTACT" title={<>Parlons de votre projet<br /><em>de digitalisation.</em></>} description="Nos experts sont à votre écoute pour comprendre vos enjeux et vous accompagner vers une croissance durable." image="executive.png" explore="#contact-form" exploreLabel="Nous contacter" /><section id="contact-form" className="contact-section"><div className="container contact-layout"><ContactForm endpoint={endpoint} topic={topic} /><aside className="contact-aside"><article><span className="suite-icon"><img src={`${A}hero-dashboard.png`} alt="" /></span><h2>Demander une démo</h2><p>Découvrez Costera Suite en action avec un expert métier.</p><ul><li>Présentation personnalisée</li><li>Réponses à vos questions</li><li>Sans engagement</li></ul><Link className="button button-primary" to="/contact?subject=demo#contact-form">Demander une démo</Link></article><article><span className="suite-icon"><img src={`${A}${icons.performance}`} alt="" /></span><h2>Demander un diagnostic</h2><p>Faites le point sur votre maturité digitale et vos priorités.</p><Link className="button button-outline" to="/contact?subject=diagnostic#contact-form">Échanger avec un expert</Link></article></aside></div></section></main>;
}

export function ContactForm({ endpoint, topic }) {
  const [status, setStatus] = useState('idle');
  const submit = async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (!endpoint) {
      const subject = encodeURIComponent(`Costera Suite - ${data.subject || 'Nouvelle demande'}`);
      const body = encodeURIComponent(`Nom : ${data.name}\nEmail : ${data.email}\nEntreprise : ${data.company}\nTéléphone : ${data.phone || ''}\nFonction : ${data.role || ''}\nTaille : ${data.size || ''}\n\n${data.message}`);
      window.location.href = `mailto:contact@costerasuite.com?subject=${subject}&body=${body}`;
      setStatus('compose');
      return;
    }
    setStatus('sending');
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };
  return <form className="contact-form" onSubmit={submit}><h2>Nous contacter</h2><p className="contact-form-intro">{topic === 'demo' ? 'Parlez-nous de vos besoins pour préparer une démonstration adaptée.' : topic === 'diagnostic' ? 'Décrivez vos enjeux pour préparer un premier échange.' : 'Décrivez-nous votre projet ou posez-nous vos questions.'}</p><input type="hidden" name="subject" value={topic} /><div className="form-grid"><label>Nom complet <span aria-hidden="true">*</span><input required name="name" autoComplete="name" placeholder="Votre nom" /></label><label>Email professionnel <span aria-hidden="true">*</span><input required type="email" name="email" autoComplete="email" placeholder="vous@entreprise.com" /></label><label>Entreprise <span aria-hidden="true">*</span><input required name="company" autoComplete="organization" placeholder="Nom de votre entreprise" /></label><label>Téléphone<input type="tel" name="phone" autoComplete="tel" placeholder="Votre numéro" /></label><label>Fonction<select name="role" defaultValue=""><option value="">Sélectionnez votre fonction</option><option>Direction</option><option>Commercial / Vente</option><option>Opérations</option><option>Finance</option><option>Informatique</option><option>Autre</option></select></label><label>Taille de l’entreprise<select name="size" defaultValue=""><option value="">Sélectionnez une taille</option><option>1–10</option><option>11–50</option><option>51–250</option><option>251+</option></select></label><label className="is-wide">Votre message <span aria-hidden="true">*</span><textarea required name="message" rows="5" placeholder="Décrivez votre projet, vos enjeux ou vos questions…" /></label></div><label className="consent"><input type="checkbox" name="consent" required /> J’accepte d’être contacté par l’équipe Costera Suite au sujet de ma demande.</label><button className="button button-primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Envoi en cours…' : endpoint ? 'Envoyer ma demande' : 'Préparer mon e-mail'} <span aria-hidden="true">→</span></button>{!endpoint && <p className="contact-delivery-note">Votre messagerie s’ouvrira pour envoyer la demande. Aucun message n’est envoyé automatiquement.</p>}{status === 'compose' && <p className="form-success" role="status">Vérifiez et envoyez votre message dans votre messagerie.</p>}{status === 'sent' && <p className="form-success" role="status">Votre demande a été envoyée.</p>}{status === 'error' && <p className="form-error" role="alert">L’envoi a échoué. Réessayez ou écrivez à contact@costerasuite.com.</p>}</form>;
}
