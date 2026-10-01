import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BarChart3, Building2, Settings2, ShoppingBag, ShoppingCart, Target, UsersRound } from 'lucide-react';

const sectors = [
  {
    name: 'FMCG & Consumer Goods', short: 'FMCG', image: 'industry-fmcg.png', icon: ShoppingCart,
    summary: 'Accélérer la valeur, de la marque au consommateur.',
    challenges: ['Visibilité de la performance par marque', 'Exécution en point de vente', 'Gestion des assortiments et promotions', 'Pilotage des ventes multi-canaux'],
    approach: ['Tableaux de bord retail et sell-in/sell-out', 'Suivi de l’exécution terrain', 'Analyses prédictives de la demande', 'Intégration avec vos données distributeurs'],
    results: ['Croissance sur vos marques clés', 'Meilleure exécution en point de vente', 'Décisions plus rapides et fondées sur les données', 'Un ROI mesurable'],
  },
  {
    name: 'Retail & Distribution', short: 'Retail', image: 'industry-retail.png', icon: ShoppingBag,
    summary: 'Des expériences client plus fluides, plus rentables.',
    challenges: ['Performance des magasins et réseaux', 'Expérience client omnicanale', 'Gestion des stocks et ruptures', 'Animation des équipes terrain'],
    approach: ['Vision unifiée du réseau', 'Pilotage de la performance en temps réel', 'Outils d’aide à la décision pour les opérations', 'Accompagnement au changement'],
    results: ['Une meilleure satisfaction client', 'Des opérations plus efficaces', 'Une croissance rentable et durable', 'Des équipes plus autonomes'],
  },
  {
    name: 'Professional Services', short: 'Services', image: 'industry-services.png', icon: UsersRound,
    summary: 'Valoriser l’expertise, amplifier l’impact.',
    challenges: ['Suivi de la rentabilité par mission', 'Allocation des ressources', 'Pilotage de la facturation et du pipeline', 'Visibilité sur la charge et les compétences'],
    approach: ['Tableaux de bord projet et rentabilité', 'Planification intelligente des ressources', 'Suivi du pipeline commercial', 'Analyses de performance par practice'],
    results: ['Une meilleure rentabilité des missions', 'Une utilisation optimisée des talents', 'Un pilotage plus fiable de l’activité', 'Une croissance maîtrisée'],
  },
  {
    name: 'Multi-Site Organizations', short: 'Multi-Site', image: 'industry-multisite.png', icon: Building2,
    summary: 'Plus de cohérence. Plus d’efficacité. À plus grande échelle.',
    challenges: ['Pilotage de réseaux multisites', 'Harmonisation des processus', 'Suivi de la performance locale', 'Engagement des équipes terrain'],
    approach: ['Vue unifiée de la performance réseau', 'Standardisation et automatisation', 'Outils collaboratifs pour les équipes terrain', 'Accompagnement au déploiement'],
    results: ['Une exécution plus cohérente', 'Des gains d’efficacité opérationnelle', 'Un meilleur engagement des équipes', 'Une croissance maîtrisée à grande échelle'],
  },
];

function SectorList({ title, icon: Icon, items, tone }) {
  return <div className={`industries-ref-list industries-ref-list-${tone}`}><h4><Icon aria-hidden="true" />{title}</h4><ul>{items.map(item => <li key={item}>{item}</li>)}</ul></div>;
}

export default function IndustriesReferencePage() {
  const track = useRef(null);
  const scroll = direction => track.current?.scrollBy({ left: direction * (track.current.querySelector('article')?.getBoundingClientRect().width + 14 || 300), behavior: 'smooth' });

  return <main id="main" className="industries-ref">
    <section className="industries-ref-hero" aria-labelledby="industries-title">
      <img className="industries-ref-hero-photo" src="/assets/costera-intelligence-hero.png" alt="Une professionnelle dans un bureau lumineux" fetchPriority="high" />
      <div className="container industries-ref-hero-inner"><div className="industries-ref-hero-copy">
        <span className="industries-ref-eyebrow">INDUSTRIES</span>
        <h1 id="industries-title">Des solutions pensées pour vos <em>réalités métier.</em></h1>
        <p>Chez Costera Suite, nous comprenons que chaque secteur a ses propres enjeux, ses contraintes et ses ambitions. C’est pourquoi nous proposons des solutions adaptées à vos métiers, co-construites avec des experts de votre industrie, pour transformer vos défis en opportunités durables.</p>
        <div className="industries-ref-actions"><Link className="button button-primary" to="/contact?subject=Expert%20industrie#contact-form">Parler à un expert <ArrowRight aria-hidden="true" /></Link><a className="industries-ref-text-link" href="#industries-sectors">Découvrir notre approche <ArrowRight aria-hidden="true" /></a></div>
        <div className="industries-ref-assurances"><div><Target aria-hidden="true" /><span>Des experts sectoriels<br />à vos côtés</span></div><div><UsersRound aria-hidden="true" /><span>Des cas d’usage réels<br />et éprouvés</span></div><div><BarChart3 aria-hidden="true" /><span>Des résultats mesurables<br />et durables</span></div></div>
      </div><div className="industries-ref-hero-note">Des industries plus performantes, plus humaines.<span>Costera Suite</span></div></div>
    </section>

    <section className="industries-ref-sectors" id="industries-sectors"><div className="container"><div className="industries-ref-section-head"><div><span className="industries-ref-eyebrow">NOS SECTEURS</span><h2>Des expertises sectorielles pour un impact réel.</h2></div><div className="industries-ref-carousel-controls"><button type="button" onClick={() => scroll(-1)} aria-label="Voir les secteurs précédents"><ArrowLeft aria-hidden="true" /></button><button type="button" onClick={() => scroll(1)} aria-label="Voir les secteurs suivants"><ArrowRight aria-hidden="true" /></button></div></div>
      <div className="industries-ref-grid" ref={track}>{sectors.map(({ name, short, image, icon: Icon, summary, challenges, approach, results }) => <article className="industries-ref-card" key={name}><div className="industries-ref-card-photo"><img src={`/assets/${image}`} alt="" loading="lazy" /></div><div className="industries-ref-card-body"><span className="industries-ref-card-icon"><Icon aria-hidden="true" /></span><h3>{name}</h3><p className="industries-ref-card-summary">{summary}</p><SectorList title="Défis courants" icon={Target} items={challenges} tone="challenge" /><SectorList title="Notre approche" icon={Settings2} items={approach} tone="approach" /><SectorList title="Résultats attendus" icon={BarChart3} items={results} tone="result" /><Link to={`/contact?subject=${encodeURIComponent(name)}#contact-form`}>Découvrir nos solutions {short} <ArrowRight aria-hidden="true" /></Link></div></article>)}</div>
    </div></section>

    <section className="industries-ref-cta"><div className="container industries-ref-cta-inner"><div><span>INDUSTRIES</span><h2>Votre secteur. Nos expertises. Des résultats concrets.</h2><p>Échangez avec nos experts pour découvrir comment Costera Suite peut répondre à vos enjeux métier.</p></div><Link className="button" to="/contact?subject=Industries#contact-form">Parler à un expert <ArrowRight aria-hidden="true" /></Link></div></section>
  </main>;
}
