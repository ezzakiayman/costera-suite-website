import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, BookOpen, Box, CalendarDays, Clock3, Cloud, Database, LayoutGrid, Lightbulb, ShieldCheck, Sparkles, UsersRound, Zap } from 'lucide-react';

const capabilities = [
  { name: 'Costera Copilot', subtitle: 'Votre assistant IA au quotidien', text: 'Un copilote intelligent qui comprend vos enjeux, répond à vos questions et vous aide à agir plus vite.', icon: Sparkles, tone: 'purple' },
  { name: 'AI Agents', subtitle: 'Des agents IA spécialisés', text: 'Des agents autonomes pour accompagner vos équipes dans leurs processus métier.', icon: UsersRound, tone: 'blue' },
  { name: 'Automation Hub', subtitle: 'Des processus qui s’exécutent', text: 'Automatisez vos workflows et recentrez vos équipes sur ce qui compte vraiment.', icon: Box, tone: 'teal' },
  { name: 'Knowledge Hub', subtitle: 'Toute la connaissance, activée', text: 'Exploitez vos données et documents pour des réponses fiables, contextualisées et actionnables.', icon: BookOpen, tone: 'warm' },
];

const layers = [
  { name: 'Sales Cloud', detail: 'Pipeline, comptes, opportunités, relations', icon: Cloud, href: '/solutions/sales-cloud' },
  { name: 'Revenue Performance', detail: 'Prévisions, performance, croissance', icon: BarChart3, href: '/solutions/revenue-performance' },
  { name: 'Industries', detail: 'Solutions métier adaptées', icon: LayoutGrid, href: '/industries' },
  { name: 'Vos données', detail: 'CRM, ERP, documents et connaissances', icon: Database, href: '/contact?subject=Donnees%20et%20integrations#contact-form' },
];

const outcomes = [
  { title: 'Plus de temps utile', text: 'L’IA simplifie les tâches répétitives du quotidien.', icon: Zap },
  { title: 'Des processus fluides', text: 'Vos équipes gardent le fil de chaque action.', icon: Clock3 },
  { title: 'Des décisions éclairées', text: 'Des informations plus faciles à exploiter.', icon: BarChart3 },
  { title: 'Des équipes engagées', text: 'L’humain reste au centre de la transformation.', icon: UsersRound },
];

export default function IntelligenceReferencePage() {
  return <main id="main" className="intelligence-ref">
    <section className="intelligence-ref-hero" aria-labelledby="intelligence-ref-title">
      <img className="intelligence-ref-hero-photo" src="/assets/costera-intelligence-hero.png" alt="Une professionnelle dans un bureau lumineux" fetchPriority="high" />
      <div className="container intelligence-ref-hero-inner">
        <div className="intelligence-ref-copy">
          <span className="intelligence-ref-eyebrow">AI / COSTERA INTELLIGENCE</span>
          <h1 id="intelligence-ref-title">L’IA au service d’une<br />croissance <em>plus humaine.</em></h1>
          <p>Des assistants, des agents et des automatisations intelligentes pour libérer le potentiel de vos équipes et créer plus de valeur, durablement.</p>
          <div className="intelligence-ref-actions"><a className="button button-primary" href="#intelligence-capabilities">Découvrir Costera Intelligence <ArrowRight aria-hidden="true" /></a><a className="button button-outline" href="#intelligence-architecture">Explorer l’architecture <ArrowRight aria-hidden="true" /></a></div>
          <div className="intelligence-ref-assurances"><div><ShieldCheck aria-hidden="true" /><span><strong>Fiable et sécurisé</strong><small>Données sous votre contrôle</small></span></div><div><UsersRound aria-hidden="true" /><span><strong>Conçu pour vos métiers</strong><small>Des cas d’usage concrets</small></span></div><div><Sparkles aria-hidden="true" /><span><strong>Une IA plus humaine</strong><small>Augmente l’humain, pas le remplace</small></span></div></div>
        </div>
        <div className="intelligence-ref-copilot" aria-label="Aperçu des usages de Costera Copilot"><div className="intelligence-ref-copilot-top"><span><Sparkles aria-hidden="true" /></span><div><strong>Costera Copilot</strong><small>Bonjour ! Comment puis-je vous aider aujourd’hui ?</small></div></div><ul><li><Sparkles aria-hidden="true" /> Analyser un compte</li><li><CalendarDays aria-hidden="true" /> Préparer une réunion</li><li><Lightbulb aria-hidden="true" /> Dégager des insights</li><li><BarChart3 aria-hidden="true" /> Générer un plan d’action</li></ul></div>
        <div className="intelligence-ref-hero-note">Des équipes plus épanouies.<br />Une croissance plus durable.</div>
      </div>
    </section>

    <section className="intelligence-ref-section intelligence-ref-capabilities" id="intelligence-capabilities"><div className="container"><div className="intelligence-ref-heading"><h2>Une IA intégrée à chaque étape de votre croissance</h2><Link to="/resources">Découvrir les cas d’usage <ArrowRight aria-hidden="true" /></Link></div><div className="intelligence-ref-capability-grid">{capabilities.map(({ name, subtitle, text, icon: Icon, tone }) => <article className={`intelligence-ref-capability tone-${tone}`} key={name}><div className="intelligence-ref-capability-top"><span className="intelligence-ref-icon"><Icon aria-hidden="true" /></span><div><h3>{name}</h3><strong>{subtitle}</strong></div></div><p>{text}</p><Link to={`/contact?subject=${encodeURIComponent(name)}#contact-form`}>En savoir plus <ArrowRight aria-hidden="true" /></Link></article>)}</div></div></section>

    <section className="intelligence-ref-section intelligence-ref-architecture" id="intelligence-architecture"><div className="container intelligence-ref-architecture-grid"><div className="intelligence-ref-architecture-copy"><h2>Une couche d’IA transversale<br />au cœur de Costera Suite</h2><p>Costera Intelligence s’intègre à la plateforme pour connecter vos données, vos processus et vos équipes. Une IA unique, au service de tous vos métiers.</p><Link className="button button-outline" to="/costera-suite">Voir l’architecture détaillée <ArrowRight aria-hidden="true" /></Link></div><div className="intelligence-ref-diagram"><div className="intelligence-ref-diagram-caption">Une seule IA. Toutes vos possibilités.</div><div className="intelligence-ref-diagram-core"><Sparkles aria-hidden="true" /><div><strong>Costera Intelligence</strong><span>Modèles · Agents · Orchestration · Sécurité · Gouvernance</span></div></div><div className="intelligence-ref-diagram-links">{layers.map(({ name, detail, icon: Icon, href }) => <Link to={href} key={name}><Icon aria-hidden="true" /><span><strong>{name}</strong><small>{detail}</small></span></Link>)}</div></div></div></section>

    <section className="intelligence-ref-section intelligence-ref-outcomes"><div className="container"><h2>Des résultats concrets pour des équipes plus humaines</h2><div className="intelligence-ref-outcome-grid">{outcomes.map(({ title, text, icon: Icon }) => <div key={title}><span className="intelligence-ref-icon"><Icon aria-hidden="true" /></span><strong>{title}</strong><p>{text}</p></div>)}</div></div></section>

    <section className="intelligence-ref-final"><div className="container intelligence-ref-final-inner"><img src="/assets/costera-intelligence-mountains.png" alt="Une personne contemple un paysage de montagnes au crépuscule" loading="lazy" /><div className="intelligence-ref-final-copy"><h2>Construisons une croissance plus humaine, ensemble.</h2><p>Découvrez comment Costera Intelligence peut accompagner votre organisation.</p><div><a className="button button-primary" href="#intelligence-capabilities">Découvrir Costera Intelligence <ArrowRight aria-hidden="true" /></a><Link className="button button-outline" to="/contact?subject=Costera%20Intelligence#contact-form">Demander une démo</Link></div></div><span className="intelligence-ref-final-note">Augmenter les humains.<br />Pas les remplacer.</span></div></section>
  </main>;
}
