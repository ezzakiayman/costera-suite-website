import { Link } from 'react-router-dom';

const A = '/assets/';

const clouds = [
  { name: 'Growth Cloud', text: 'Attirez, convertissez et développez votre marché.', icon: 'icon_performance_commerciale.png', href: '/solutions/growth-cloud', tone: 'violet' },
  { name: 'Sales Cloud', text: 'Équipez vos commerciaux pour vendre plus et mieux.', icon: 'icon_crm_clients_prospects.png', href: '/solutions/sales-cloud', tone: 'blue' },
  { name: 'Revenue Performance', text: 'Pilotez votre performance de bout en bout.', icon: 'icon_dashboard_analytics.png', href: '/solutions/revenue-performance', tone: 'teal' },
  { name: 'Operations Cloud', text: 'Fluidifiez vos opérations et gagnez en efficacité.', icon: 'icon_activites_relances.png', href: '/contact?subject=Operations%20Cloud#contact-form', tone: 'violet' },
  { name: 'Finance Cloud', text: 'Gagnez en visibilité et en contrôle sur votre activité.', icon: 'icon_facturation.png', href: '/contact?subject=Finance%20Cloud#contact-form', tone: 'amber' },
  { name: 'People & Academy', text: 'Développez les talents et une culture de la croissance.', icon: 'icon_crm_clients_prospects.png', href: '/contact?subject=People%20et%20Academy#contact-form', tone: 'pink' },
  { name: 'Intelligence Cloud', text: 'Transformez vos données en décisions éclairées.', icon: 'icon_performance_commerciale.png', href: '/costera-intelligence', tone: 'blue' },
];

const stories = [
  { type: 'GUIDE', title: 'Digitalisation : par où commencer ?', text: 'Les étapes clés pour structurer votre transformation digitale.', image: 'costera-leadership-hero.png', href: '/resources/demarrer-digitalisation' },
  { type: 'CAS D’USAGE', title: 'Automatiser sa facturation', text: 'Reliez vos documents et gardez les validations visibles.', image: 'hero-dashboard.png', href: '/resources/automatiser-facturation' },
  { type: 'COMPARATIF', title: 'Choisir sa gestion commerciale', text: 'Comparez les usages, l’adoption et l’accompagnement.', image: 'pricing-dashboard.png', href: '/resources/choisir-gestion-commerciale' },
];

const steps = [
  ['Cadrer', 'Nous clarifions vos enjeux, vos objectifs et le premier périmètre utile.', 'icon_crm_clients_prospects.png'],
  ['Déployer', 'Nous activons les capacités prioritaires avec vos équipes.', 'icon_pipeline_commercial.png'],
  ['Accélérer', 'Nous mesurons les usages et faisons évoluer la solution.', 'icon_performance_commerciale.png'],
];

const questions = [
  ['Qu’est-ce que Costera Suite ?', 'Une plateforme modulaire qui relie les équipes, les données et les processus autour des usages métier.'],
  ['Quels sont les avantages d’une approche modulaire ?', 'Vous pouvez commencer par une priorité concrète, puis ajouter des capacités selon l’évolution de votre organisation.'],
  ['Combien de temps dure un déploiement ?', 'Le calendrier dépend des modules, des données et du nombre d’équipes concernés. Un échange initial permet de définir un périmètre réaliste.'],
  ['Les solutions conviennent-elles à différentes tailles d’entreprise ?', 'L’approche est configurable. Nos experts peuvent vous aider à identifier les capacités adaptées à votre contexte.'],
];

function Heading({ eyebrow, title, link, href }) {
  return <div className="solution-ref-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{link && <Link to={href}>{link} <span aria-hidden="true">→</span></Link>}</div>;
}

export default function SolutionsReferencePage({ embedded = false, showHero = true }) {
  const content = <>
    {showHero && <section className="solution-ref-hero" aria-labelledby="solutions-title">
      <img className="solution-ref-photo" src={`${A}costera-leadership-hero.png`} alt="Une dirigeante travaille avec Costera Suite" fetchPriority="high" />
      <div className="container solution-ref-hero-inner">
        <div className="solution-ref-copy"><span className="eyebrow">SOLUTIONS</span><h1 id="solutions-title">Des solutions modulaires<br />pour piloter votre croissance.</h1><p>Alignez vos équipes, vos données et vos processus grâce à un Business Operating System complet, modulaire et pensé pour les entreprises en croissance.</p><div className="solution-ref-actions"><Link className="button button-primary" to="/contact?subject=demo#contact-form">Demander une démo <span aria-hidden="true">→</span></Link><a className="button button-outline" href="#business-clouds">Découvrir nos solutions</a></div><ul className="solution-ref-assurances"><li>Modulaire et évolutif</li><li>Déployé progressivement</li><li>Adapté à vos équipes</li></ul></div>
        <div className="solution-ref-hero-note">Des entreprises plus alignées,<br />plus agiles, plus humaines.</div>
        <div className="solution-ref-hero-points" aria-label="Les avantages de Costera"><span><strong>Vue unifiée</strong><small>Des données connectées</small></span><span><strong>Équipes alignées</strong><small>Du terrain à la direction</small></span><span><strong>Impact durable</strong><small>Des décisions éclairées</small></span></div>
      </div>
    </section>}

    <section className="solution-ref-intro"><div className="container solution-ref-intro-inner"><div><span className="eyebrow">UNE APPROCHE UNIQUE</span><h2>Bien plus qu’un CRM, un Business Operating System.</h2><p>Costera centralise vos données, processus et équipes dans un système modulaire et interconnecté, de l’acquisition à la fidélisation.</p></div><div className="solution-ref-intro-values"><span>Une vision unifiée</span><span>Des équipes alignées</span><span>Un impact durable</span></div></div></section>

    <section className="solution-ref-section solution-ref-clouds" id="business-clouds"><div className="container"><Heading eyebrow="NOS BUSINESS CLOUDS" title="Des solutions complémentaires pour une performance globale." link="Découvrir l’architecture" href="/costera-suite#architecture" /><div className="solution-ref-cloud-grid">{clouds.map(cloud => <Link to={cloud.href} className={`solution-ref-cloud tone-${cloud.tone}`} key={cloud.name}><span className="solution-ref-icon"><img src={`${A}${cloud.icon}`} alt="" /></span><h3>{cloud.name}</h3><p>{cloud.text}</p><span className="solution-ref-arrow" aria-hidden="true">→</span></Link>)}</div></div></section>

    <section className="solution-ref-section solution-ref-stories"><div className="container"><Heading eyebrow="POUR ALLER PLUS LOIN" title="Des cas d’usage concrets pour avancer." link="Voir toutes les ressources" href="/resources" /><div className="solution-ref-story-grid">{stories.map(story => <Link className="solution-ref-story" to={story.href} key={story.title}><img src={`${A}${story.image}`} alt="" loading="lazy" /><div><span className="eyebrow">{story.type}</span><h3>{story.title}</h3><p>{story.text}</p><strong>Lire la ressource <span aria-hidden="true">→</span></strong></div></Link>)}</div></div></section>

    <section className="solution-ref-section solution-ref-deployment"><div className="container"><Heading eyebrow="MISE EN ŒUVRE" title="Un déploiement modulaire et adapté à votre contexte." /><p className="solution-ref-section-intro">Une approche progressive, maîtrisée et accompagnée pour maximiser l’adoption.</p><div className="solution-ref-step-grid">{steps.map(([title, text, icon], index) => <article key={title}><span className="solution-ref-icon"><img src={`${A}${icon}`} alt="" /></span><div><h3>{index + 1}. {title}</h3><p>{text}</p></div></article>)}</div></div></section>

    <section className="solution-ref-section solution-ref-faq"><div className="container"><Heading eyebrow="FAQ" title="Vos questions, nos réponses." /><div className="solution-ref-faq-grid"><aside><strong>Vous ne trouvez pas la réponse à votre question ?</strong><p>Notre équipe est là pour vous aider.</p><Link className="button button-outline" to="/contact">Contacter un expert <span aria-hidden="true">→</span></Link></aside><div>{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></div></section>

    <section className="solution-ref-bottom"><div className="container"><div><span>PRÊT À PASSER À L’ACTION ?</span><h2>Prêt à construire une croissance plus durable ?</h2><p>Échangez avec nos experts et trouvez la solution adaptée à vos enjeux.</p></div><div><Link className="button button-primary" to="/contact?subject=demo#contact-form">Demander une démo <span aria-hidden="true">→</span></Link><Link className="button button-outline" to="/contact">Parler à un expert</Link></div></div></section>
  </>;
  return embedded ? <div className="solution-ref">{content}</div> : <main id="main" className="solution-ref">{content}</main>;
}
