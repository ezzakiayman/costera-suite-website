import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, BookOpen, Bot, Box, Check, Cloud, Handshake, Landmark, Leaf, Lightbulb, Link2, MessageSquare, Monitor, Play, Settings, ShieldCheck, ShoppingCart, Sparkles, Target, UsersRound, Zap } from 'lucide-react';

const pillars = [
  { name: 'People', text: 'Des collaborateurs engagés et augmentés', icon: UsersRound, position: 'people' },
  { name: 'Processes', text: 'Des processus plus simples et plus efficaces', icon: Settings, position: 'processes' },
  { name: 'Data', text: 'Des données unifiées et activées', icon: BarChart3, position: 'data' },
  { name: 'Technology', text: 'Un écosystème ouvert et évolutif', icon: Cloud, position: 'technology' },
  { name: 'AI', text: 'Une intelligence au service de l’humain', icon: Sparkles, position: 'ai' },
];

const architecture = [
  { title: 'Modulaire', text: 'Activez les briques dont vous avez besoin, au rythme de vos priorités.', icon: Box },
  { title: 'Ouverte', text: 'Connectez vos outils et votre écosystème grâce à des standards ouverts.', icon: Link2 },
  { title: 'Sécurisée', text: 'Gardez le contrôle de vos données et de vos accès.', icon: ShieldCheck },
];

const clouds = [
  { title: 'People', text: 'Talents, compétences et expérience collaborateur', icon: UsersRound, href: '/contact?subject=People%20Cloud#contact-form' },
  { title: 'Workplace', text: 'Environnement de travail et services aux collaborateurs', icon: Monitor, href: '/contact?subject=Workplace%20Cloud#contact-form' },
  { title: 'Procurement', text: 'Achats responsables et performance fournisseur', icon: ShoppingCart, href: '/contact?subject=Procurement%20Cloud#contact-form' },
  { title: 'Finance', text: 'Pilotage financier et performance', icon: Landmark, href: '/contact?subject=Finance%20Cloud#contact-form' },
  { title: 'Customer', text: 'Expérience client et croissance durable', icon: UsersRound, href: '/solutions/sales-cloud' },
  { title: 'Operations', text: 'Excellence opérationnelle et chaîne de valeur', icon: Settings, href: '/contact?subject=Operations%20Cloud#contact-form' },
  { title: 'Sustainability', text: 'Performance durable et impact positif', icon: Leaf, href: '/contact?subject=Sustainability%20Cloud#contact-form' },
];

const intelligence = [
  { title: 'Copilot', text: 'Un assistant IA pour tous vos métiers.', detail: 'Posez vos questions et préparez les prochaines actions.', icon: MessageSquare },
  { title: 'AI Agents', text: 'Des agents spécialisés qui agissent avec vous.', detail: 'Automatisez des tâches complexes avec vos équipes.', icon: Bot },
  { title: 'Automation Hub', text: 'Des processus augmentés par l’IA.', detail: 'Orchestrez et optimisez les flux de travail.', icon: Zap },
  { title: 'Knowledge Hub', text: 'Toute la connaissance de votre entreprise, activée.', detail: 'Retrouvez et partagez les savoirs utiles.', icon: BookOpen },
];

const reasons = [
  { title: 'Centré sur l’humain', text: 'La technologie au service des personnes.', icon: Target },
  { title: 'Orienté résultats', text: 'Des usages concrets et des décisions plus claires.', icon: BarChart3 },
  { title: 'Conçu pour demain', text: 'Une plateforme évolutive et ouverte.', icon: Lightbulb },
  { title: 'À vos côtés', text: 'Une équipe engagée à chaque étape.', icon: Handshake },
];

function SectionHeading({ title, description, link, href }) {
  return <div className="platform-ref-section-heading"><div><h2>{title}</h2>{description && <p>{description}</p>}</div>{link && <Link to={href}>{link} <ArrowRight size={15} aria-hidden="true" /></Link>}</div>;
}

function PlatformOrbit() {
  return <div className="platform-ref-orbit" aria-label="Les cinq piliers de Costera Suite">
    <div className="platform-ref-orbit-ring" aria-hidden="true" />
    <div className="platform-ref-orbit-center"><span className="platform-ref-mark" aria-hidden="true">C</span><strong>Costera Suite</strong><small>PLATFORM</small></div>
    {pillars.map(({ name, text, icon: Icon, position }) => <div className={`platform-ref-pillar platform-ref-pillar-${position}`} key={name}><Icon size={24} strokeWidth={1.9} aria-hidden="true" /><strong>{name}</strong><span>{text}</span></div>)}
  </div>;
}

export default function PlatformReferencePage({ embedded = false, showClouds = true, showFinal = true, eyebrow = 'PLATFORM' }) {
  const content = <>
    <section className="platform-ref-hero" aria-labelledby="platform-ref-title"><img className="platform-ref-hero-photo" src="/assets/costera-leadership-hero.png" alt="Une dirigeante au travail" fetchPriority="high" /><div className="container platform-ref-hero-inner"><div className="platform-ref-hero-copy"><span className="eyebrow">{eyebrow}</span><h1 id="platform-ref-title">People. Processes. Data.<br />Technology &amp; AI. <em>Together.</em></h1><p>Costera connecte toute l’entreprise dans une plateforme unifiée pour transformer vos ambitions en résultats durables.</p><ul><li><Check aria-hidden="true" /> Une vision à 360°</li><li><Check aria-hidden="true" /> Des équipes plus efficaces</li><li><Check aria-hidden="true" /> Un impact mesurable</li></ul><div className="platform-ref-actions"><Link className="button button-primary" to="/contact?subject=demo#contact-form">Demander une démo <ArrowRight size={17} aria-hidden="true" /></Link><a className="button button-outline" href="#architecture"><Play size={16} aria-hidden="true" /> Découvrir la plateforme</a></div></div><PlatformOrbit /><div className="platform-ref-hero-caption">Des entreprises<br />plus humaines,<br />plus agiles,<br />plus performantes.</div></div></section>

    <section className="platform-ref-section" id="architecture"><div className="container platform-ref-band"><SectionHeading title="Une architecture pensée pour la performance" description="Une plateforme moderne, conçue pour s’adapter à vos enjeux d’aujourd’hui et de demain." link="Découvrir notre approche" href="/contact?subject=architecture#contact-form" /><div className="platform-ref-architecture-grid">{architecture.map(({ title, text, icon: Icon }) => <article key={title}><span className="platform-ref-icon"><Icon aria-hidden="true" /></span><div><h3>{title}</h3><p>{text}</p><span className="platform-ref-rule" /></div></article>)}</div></div></section>

    {showClouds && <section className="platform-ref-section"><div className="container platform-ref-band"><SectionHeading title="Nos Business Clouds" description="Sept domaines métier, une plateforme unifiée, des possibilités complémentaires." link="Voir les solutions" href="/costera-suite#business-clouds" /><div className="platform-ref-cloud-grid">{clouds.map(({ title, text, icon: Icon, href }) => <Link key={title} to={href} className="platform-ref-cloud"><span className="platform-ref-icon"><Icon aria-hidden="true" /></span><h3>{title}</h3><p>{text}</p><ArrowRight size={17} aria-hidden="true" /></Link>)}</div></div></section>}

    <section className="platform-ref-section"><div className="container platform-ref-band"><SectionHeading title="Costera Intelligence" description="Une couche d’intelligence intégrée à toute la plateforme pour décupler vos capacités." link="Découvrir Costera Intelligence" href="/costera-intelligence" /><div className="platform-ref-intelligence-grid">{intelligence.map(({ title, text, detail, icon: Icon }) => <Link to="/costera-intelligence" key={title}><div className="platform-ref-intelligence-top"><span className="platform-ref-icon"><Icon aria-hidden="true" /></span><div><h3>{title}</h3><p>{text}</p></div></div><p>{detail}</p></Link>)}</div></div></section>

    <section className="platform-ref-section"><div className="container platform-ref-band"><SectionHeading title="Pourquoi Costera ?" description="Plus qu’une plateforme. Un partenaire de confiance pour une transformation durable." /><div className="platform-ref-reasons">{reasons.map(({ title, text, icon: Icon }) => <div key={title}><span className="platform-ref-icon"><Icon aria-hidden="true" /></span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div></section>

    {showFinal && <section className="platform-ref-final"><div className="container platform-ref-final-inner"><img src="/assets/costera-platform-consultation.png" alt="Un conseiller Costera échange avec une cliente" loading="lazy" /><div className="platform-ref-final-copy"><h2>Faites de votre transformation<br />un avantage durable.</h2><p>Discutez avec nos experts et découvrez comment Costera Suite peut accélérer vos projets, dès aujourd’hui.</p></div><div className="platform-ref-final-actions"><Link className="button button-primary" to="/contact?subject=demo#contact-form">Demander une démo <ArrowRight size={16} aria-hidden="true" /></Link><Link className="button button-outline" to="/contact">Nous contacter</Link></div></div></section>}
  </>;
  return embedded ? <div className="platform-ref">{content}</div> : <main id="main" className="platform-ref">{content}</main>;
}
