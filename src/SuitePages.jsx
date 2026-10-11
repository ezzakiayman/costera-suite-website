import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { IndustryApproach, PlatformDetails, ProductJourney } from './RecommendationSections';
import { ASSET_BASE as A } from './assetPath';
import { additionalResourceArticles } from './additionalResourceArticles';

const DEMO = '/request-demo';

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
    image: 'costera-dashboard-mad.png', visual: 'dashboard',
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
  return <section className={`suite-hero suite-hero-${visual}`}><div className="container suite-hero-layout"><div className="suite-hero-copy"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p><div className="suite-hero-actions"><a className="button button-primary" href={explore}>{exploreLabel} <span aria-hidden="true">↓</span></a><Link className="button button-outline" to={DEMO}>Demander une démo</Link></div><ul className="suite-assurances"><li>Configuration rapide</li><li>Accompagnement expert</li><li>Sans engagement</li></ul></div><div className="suite-hero-media"><img src={`${A}${image}`} alt={visual === 'dashboard' ? 'Aperçu de la plateforme Costera' : 'Une équipe accompagnée par Costera Suite'} />{visual !== 'dashboard' && <div className="suite-floating-panel"><strong>{visual === 'ai' ? 'Une IA intégrée à vos métiers' : 'Une plateforme pour mieux décider'}</strong><span>People · Processes · Data · Technology · AI</span></div>}</div></div></section>;
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
  return <section className="suite-cta"><div className="container suite-cta-inner"><div><span className="eyebrow">PRÊT À PASSER À L’ACTION ?</span><h2>{title}</h2><p>Échangez avec nos experts et découvrez une approche adaptée à vos enjeux.</p></div><div><Link className="button button-primary" to="/request-demo">Demander une démo <span aria-hidden="true">→</span></Link><Link className="button button-outline" to="/pricing">Voir les tarifs</Link></div></div></section>;
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
  {
    slug: 'demarrer-digitalisation',
    type: 'Guide',
    title: 'Digitaliser sa gestion commerciale : par où commencer ?',
    text: 'Une méthode progressive pour passer des outils dispersés à un suivi commercial partagé.',
    image: 'resources-guide.png',
    sections: [
      ['Partir du travail réel', 'Avant de choisir un outil, suivez une demande client de son arrivée jusqu’au paiement. Où le prospect est-il enregistré ? Qui prépare le devis ? Comment retrouve-t-on la prochaine action et les factures en attente ? Notez les fichiers, messages et doubles saisies utilisés à chaque étape. Ce parcours concret révèle les pertes d’information sans transformer la digitalisation en projet abstrait.'],
      ['Choisir un premier parcours', 'Commencez par un périmètre que votre équipe peut réellement adopter, par exemple le suivi des prospects, des opportunités et des devis. Désignez un responsable, définissez le résultat attendu et fixez une date de revue. Vouloir migrer simultanément les ventes, les projets et tous les documents augmente la complexité. Une première étape maîtrisée donne une base plus solide pour la suite.'],
      ['Préparer des données utiles', 'Rassemblez les contacts actifs, supprimez les doublons et distinguez prospects, clients et interlocuteurs. Vérifiez les coordonnées, les responsables de compte et les opportunités encore ouvertes. Importer des archives incomplètes ne rend pas le suivi plus fiable. Prévoyez également qui peut consulter ou modifier chaque information et comment les données seront corrigées après la reprise.'],
      ['Définir un suivi commun', 'Une fiche client partagée n’est utile que si chacun sait quoi y renseigner. Choisissez quelques étapes de pipeline compréhensibles, attribuez chaque opportunité et consignez la prochaine action avec son échéance. Un commercial doit pouvoir reprendre un dossier sans rechercher le dernier échange dans plusieurs boîtes mail. Gardez les champs et les règles assez simples pour être appliqués au quotidien.'],
      ['Faire adopter la méthode', 'Formez les collaborateurs sur leurs tâches réelles : enregistrer une demande, préparer un devis, planifier une relance et retrouver un historique. Demandez-leur de traiter quelques dossiers avec le nouveau parcours, puis recueillez les points de friction. Un référent interne peut répondre rapidement aux questions et signaler les ajustements nécessaires. La qualité des habitudes compte autant que celle du logiciel.'],
      ['Observer avant d’étendre', 'Après le lancement, regardez si les dossiers ont un responsable, si les prochaines actions sont renseignées et si les devis en attente sont visibles. Comparez ces observations à la situation de départ, sans promettre un gain chiffré avant de l’avoir mesuré. Corrigez les étapes inutiles, puis envisagez d’intégrer d’autres processus, comme la facturation ou le suivi des missions, selon les besoins confirmés.'],
      ['Un exemple pour une PME', 'Une PME de distribution peut commencer avec une seule équipe commerciale et ses demandes récentes. Elle centralise les coordonnées, attribue les opportunités, suit les devis envoyés et programme les relances. Lors de la revue, le responsable vérifie quels dossiers restent sans prochaine action. Ce scénario est une méthode de travail illustrative, pas un résultat client attribué à Costera.'],
    ],
  },
  {
    slug: 'automatiser-facturation',
    type: 'Cas d’usage',
    title: 'Du devis au paiement : organiser sa facturation',
    text: 'Un scénario pratique pour limiter les ressaisies sans perdre les validations humaines.',
    image: 'resources-automation.png',
    sections: [
      ['Une situation fréquente', 'Imaginons une société de services qui prépare ses devis dans un fichier, reçoit les accords par email et recrée ensuite les factures dans un autre outil. Les équipes doivent rechercher la bonne version, vérifier les montants et demander où en est le règlement. Ce cas est illustratif : il décrit une difficulté courante, pas le témoignage ni les résultats mesurés d’un client Costera.'],
      ['Clarifier le parcours avant de l’automatiser', 'Dessinez les étapes de la demande à l’encaissement : proposition, validation du devis, éventuelle livraison ou mission, émission de la facture, échéance et paiement. Pour chaque étape, indiquez la personne responsable et le document qui fait foi. Une automatisation ne répare pas un processus où personne ne sait qui valide les prix ou confirme que la prestation a été réalisée.'],
      ['Réutiliser les informations vérifiées', 'Les coordonnées du client, les produits ou services, les quantités et les conditions convenues devraient être saisis et contrôlés au bon moment, puis réutilisés lorsque la configuration le permet. Avant toute création de facture à partir d’un devis, vérifiez ce qui doit être repris, modifié ou approuvé. Le modèle de document, la numérotation et les paramètres fiscaux doivent être validés pour votre activité.'],
      ['Garder une validation humaine', 'Définissez qui peut corriger un devis, autoriser une remise, confirmer la livraison et émettre la facture. Une notification peut rappeler une action en attente, mais elle ne doit pas déclencher une facturation erronée. Conservez une trace des décisions et prévoyez un traitement simple des exceptions : acompte, paiement partiel, changement de périmètre ou facture à rectifier. Les automatisations disponibles dépendent de la configuration retenue.'],
      ['Suivre les échéances et les règlements', 'Rendez visibles les factures envoyées, celles qui arrivent à échéance et les montants encore dus. Associez chaque paiement au bon document et prévoyez une revue des écarts avant toute relance. Un message de rappel doit rester approprié à la relation client et aux conditions convenues. La fréquence, les canaux et les déclencheurs de relance sont à confirmer lors de la mise en place.'],
      ['Un exemple de mise en œuvre', 'Pour une mission de conseil, le commercial prépare une proposition, le responsable valide les conditions et l’équipe confirme le jalon réalisé. La personne chargée de la facturation contrôle les informations avant l’envoi. À l’échéance, elle vérifie les règlements reçus et choisit les dossiers à relancer. Un outil partagé peut rendre ce parcours plus lisible, sans supprimer les contrôles nécessaires.'],
      ['Mesurer ce qui change', 'Suivez des indicateurs simples : devis acceptés en attente de facture, factures sans échéance renseignée, paiements non rapprochés et relances à traiter. Comparez-les à votre situation initiale après quelques semaines d’utilisation. La bonne question n’est pas seulement combien de clics ont été supprimés, mais si chacun sait quel dossier réclame son attention et si le client reçoit des documents cohérents.'],
    ],
  },
  {
    slug: 'choisir-gestion-commerciale',
    type: 'Comparatif',
    title: 'Choisir un logiciel de gestion commerciale au Maroc',
    text: 'Une grille de décision pour comparer Excel, la facturation seule et une plateforme commerciale.',
    image: 'resources-comparison.png',
    sections: [
      ['Commencer par les usages', 'Écrivez les situations que le futur outil doit couvrir : enregistrer une demande, suivre une opportunité, préparer un devis, connaître les factures ouvertes et retrouver les prochaines actions. Classez ces besoins en indispensables et souhaitables. Une liste de fonctionnalités impressionnante ne remplace pas un parcours de travail fluide pour les commerciaux, les responsables et l’administration.'],
      ['Quand Excel reste pertinent', 'Un tableau peut suffire à une petite activité avec peu de dossiers, un responsable unique et des processus stables. Il est flexible et familier. Ses limites apparaissent lorsque plusieurs personnes modifient les mêmes informations, que les versions se multiplient ou que les relances dépendent de la mémoire de chacun. Comparez votre usage réel, pas une opposition caricaturale entre Excel et un logiciel.'],
      ['Facturation seule ou suivi commercial complet ?', 'Un outil de facturation répond d’abord au besoin de produire et suivre des documents administratifs. Une plateforme commerciale ajoute généralement la gestion des contacts, des opportunités, des activités et du pipeline. Si votre principal problème est la création des factures, une solution spécialisée peut être suffisante. Si vous perdez le fil entre premier contact, devis et paiement, évaluez le parcours complet.'],
      ['Tester un scénario de bout en bout', 'Demandez une démonstration fondée sur un dossier représentatif de votre entreprise : un prospect arrive, un commercial le qualifie, prépare un devis, planifie une relance et transmet les informations nécessaires à la facturation. Regardez ce qui est réellement disponible dans l’offre envisagée, ce qui demande une configuration et ce qui repose sur une intégration. Faites participer les personnes qui utiliseront l’outil chaque jour.'],
      ['Comparer le coût total', 'Ne regardez pas uniquement le prix mensuel affiché. Vérifiez le nombre d’utilisateurs inclus, les frais de mise en place, l’import des données, la formation, le support et les éventuels modules complémentaires. Demandez aussi comment évolue le coût si l’équipe grandit ou si de nouveaux processus sont ajoutés. Comparez les offres sur le même périmètre, en tenant compte du temps nécessaire pour les utiliser correctement.'],
      ['Vérifier les données et l’accompagnement', 'Posez des questions concrètes sur les droits d’accès, l’export des données, les sauvegardes, le support et la reprise depuis vos fichiers actuels. Pour la facturation au Maroc, faites confirmer les paramétrages nécessaires à votre situation par les personnes compétentes ; aucun logiciel ne dispense de cette vérification. Un accompagnement adapté à l’équipe peut compter davantage qu’une fonction rarement utilisée.'],
      ['Prendre une décision démontrable', 'Attribuez une note simple à chaque solution sur vos critères prioritaires : suivi commercial, facturation, adoption, intégrations, accompagnement et coût complet. Conservez les questions restées sans réponse et demandez une démonstration complémentaire avant de signer. Costera peut être évalué sur cette même grille, sans supposer qu’il sera le meilleur choix pour tous les contextes.'],
    ],
  },
  ...additionalResourceArticles,
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
  return <main id="main" className="suite-page contact-page"><PageHero eyebrow="CONTACT" title={<>Parlons de votre projet<br /><em>de digitalisation.</em></>} description="Nos experts sont à votre écoute pour comprendre vos enjeux et vous accompagner vers une croissance durable." image="executive.png" explore="#contact-form" exploreLabel="Nous contacter" /><section id="contact-form" className="contact-section"><div className="container contact-layout"><ContactForm endpoint={endpoint} topic={topic} /><aside className="contact-aside"><article><span className="suite-icon"><img src={`${A}hero-dashboard.png`} alt="" /></span><h2>Demander une démo</h2><p>Découvrez Costera Suite en action avec un expert métier.</p><ul><li>Présentation personnalisée</li><li>Réponses à vos questions</li><li>Sans engagement</li></ul><Link className="button button-primary" to="/request-demo">Demander une démo</Link></article><article><span className="suite-icon"><img src={`${A}${icons.performance}`} alt="" /></span><h2>Demander un diagnostic</h2><p>Faites le point sur votre maturité digitale et vos priorités.</p><Link className="button button-outline" to="/contact?subject=diagnostic#contact-form">Échanger avec un expert</Link></article></aside></div></section></main>;
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
