import { Link } from 'react-router-dom';

const capabilities = [
  ['Modulaire', 'Activez les briques utiles à votre rythme.'],
  ['Ouverte', 'Reliez vos outils et vos équipes autour des mêmes informations.'],
  ['Sécurisée', 'Gardez le contrôle de vos données et de vos accès.'],
];

const intelligence = [
  ['Costera Copilot', 'Une aide contextuelle pour avancer dans le travail quotidien.'],
  ['AI Agents', 'Des agents spécialisés pour accompagner vos processus.'],
  ['Automation Hub', 'Des actions coordonnées et moins de tâches répétitives.'],
  ['Knowledge Hub', 'La connaissance de l’entreprise plus facile à retrouver.'],
];

export function PlatformDetails() {
  return <>
    <section className="reference-band"><div className="container"><div className="reference-heading"><div><span className="eyebrow">ARCHITECTURE</span><h2>Une architecture pensée pour la performance</h2><p>Une plateforme qui s’adapte à vos besoins d’aujourd’hui et de demain.</p></div><Link to="/contact?subject=architecture#contact-form">Parler de votre architecture <span aria-hidden="true">→</span></Link></div><div className="reference-columns count-3">{capabilities.map(([title, text], index) => <article key={title}><span className="reference-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="reference-band reference-band-soft"><div className="container"><div className="reference-heading"><div><span className="eyebrow">COSTERA INTELLIGENCE</span><h2>Une intelligence intégrée à votre travail</h2><p>La technologie reste au service des personnes et de leurs décisions.</p></div><Link to="/costera-intelligence">Découvrir Costera Intelligence <span aria-hidden="true">→</span></Link></div><div className="reference-columns count-4">{intelligence.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
  </>;
}

const questions = [
  ['Qu’est-ce que Costera Suite ?', 'Costera Suite réunit des capacités commerciales, opérationnelles et d’aide à la décision dans une expérience modulaire.'],
  ['Puis-je commencer avec un seul module ?', 'Oui. Vous pouvez démarrer par la gestion commerciale, puis discuter des autres capacités selon vos priorités.'],
  ['Comment préparer un déploiement ?', 'Un échange avec l’équipe permet de définir les usages prioritaires, les utilisateurs et les données à reprendre.'],
];

export function SolutionsDetails() {
  return <>
    <section className="reference-band reference-intro"><div className="container"><div><span className="eyebrow">UNE APPROCHE UNIQUE</span><h2>Bien plus qu’un CRM, un espace de travail connecté.</h2><p>Costera relie les équipes, les processus et les données pour que chaque nouvelle capacité renforce les précédentes.</p></div><div className="reference-intro-points"><span>Une vision unifiée</span><span>Des équipes alignées</span><span>Un déploiement progressif</span></div></div></section>
    <section className="reference-band"><div className="container"><div className="reference-heading"><div><span className="eyebrow">PAR OÙ COMMENCER ?</span><h2>Un parcours adapté à votre priorité</h2></div><Link to="/resources">Lire nos guides <span aria-hidden="true">→</span></Link></div><div className="reference-columns count-3">{[['Structurer vos ventes', 'Prospects, pipeline, devis et factures dans un même flux.', '/solutions/sales-cloud'], ['Développer votre marché', 'Des campagnes aux opportunités commerciales.', '/solutions/growth-cloud'], ['Piloter les résultats', 'Des objectifs et des tableaux de bord partagés.', '/solutions/revenue-performance']].map(([title, text, href]) => <Link className="reference-linked-card" to={href} key={title}><h3>{title}</h3><p>{text}</p><strong>Explorer <span aria-hidden="true">→</span></strong></Link>)}</div></div></section>
    <section className="reference-band reference-band-soft"><div className="container reference-faq"><div><span className="eyebrow">FAQ</span><h2>Vos questions, nos réponses.</h2><p>Pour un besoin plus précis, parlons de votre contexte.</p><Link to="/contact">Contacter l’équipe <span aria-hidden="true">→</span></Link></div><div>{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>
  </>;
}

const productPaths = {
  growth: { eyebrow: 'DU MARKETING AU PIPELINE', title: 'De la campagne à l’opportunité', steps: ['Attirer', 'Engager', 'Qualifier', 'Accompagner', 'Convertir'], next: '/solutions/sales-cloud', nextLabel: 'Continuer avec Sales Cloud' },
  sales: { eyebrow: 'DU PROSPECT AU PAIEMENT', title: 'Un cycle commercial sans rupture', steps: ['Prospecter', 'Qualifier', 'Proposer', 'Conclure', 'Piloter'], next: '/pricing', nextLabel: 'Comparer les offres' },
  revenue: { eyebrow: 'DE LA DONNÉE À LA DÉCISION', title: 'Transformez vos données en décisions', steps: ['Définir', 'Mesurer', 'Anticiper', 'Aligner', 'Optimiser'], next: '/costera-intelligence', nextLabel: 'Explorer Costera Intelligence' },
  intelligence: { eyebrow: 'UNE IA TRANSVERSALE', title: 'L’intelligence au cœur de la plateforme', steps: ['Connecter', 'Comprendre', 'Assister', 'Automatiser', 'Gouverner'], next: '/costera-suite#architecture', nextLabel: 'Explorer Costera Suite' },
};

export function ProductJourney({ type }) {
  const path = productPaths[type];
  return <section className="reference-band reference-journey"><div className="container"><div className="reference-heading"><div><span className="eyebrow">{path.eyebrow}</span><h2>{path.title}</h2><p>Chaque étape reste visible et reliée au reste de votre activité.</p></div><Link to={path.next}>{path.nextLabel} <span aria-hidden="true">→</span></Link></div><ol>{path.steps.map((step, index) => <li key={step}><span>0{index + 1}</span><strong>{step}</strong></li>)}</ol></div></section>;
}

export function IndustryApproach() {
  return <section className="reference-band reference-band-soft"><div className="container"><div className="reference-heading"><div><span className="eyebrow">NOTRE APPROCHE</span><h2>Une méthode commune, adaptée à votre métier</h2></div><Link to="/contact?subject=industrie#contact-form">Parler à un expert <span aria-hidden="true">→</span></Link></div><div className="reference-columns count-3">{[['Comprendre', 'Vos équipes, vos contraintes et vos objectifs métier.'], ['Configurer', 'Les parcours et les données qui comptent vraiment.'], ['Faire évoluer', 'Les usages à mesure que votre organisation grandit.']].map(([title, text], index) => <article key={title}><span className="reference-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>;
}
