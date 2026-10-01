import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  CirclePlay,
  Clock3,
  PieChart,
  Quote,
  Target,
  UsersRound,
} from 'lucide-react';

const features = [
  {
    title: 'Objectifs & KPIs',
    text: 'Définissez, déployez et suivez vos objectifs à tous les niveaux (entreprise, équipe, individuel).',
    icon: Target,
  },
  {
    title: 'Forecasting avancé',
    text: 'Anticipez vos résultats grâce à des modèles prédictifs fiables et des scénarios en temps réel.',
    icon: BarChart3,
  },
  {
    title: 'Commissions simplifiées',
    text: 'Configurez vos plans de rémunération, automatisez les calculs et gagnez en transparence.',
    icon: UsersRound,
  },
  {
    title: 'Tableaux de bord',
    text: 'Visualisez vos performances, en temps réel avec des dashboards clairs, interactifs et personnalisés.',
    icon: PieChart,
  },
];

const results = [
  { value: '+18%', label: 'de croissance des revenus', note: 'en moyenne la première année', icon: BarChart3 },
  { value: '-30%', label: 'de temps passé sur le reporting', note: 'grâce à l’automatisation', icon: Clock3 },
  { value: '+25%', label: 'de taux d’atteinte des objectifs', note: 'avec un meilleur pilotage', icon: Target },
  { value: '+40%', label: 'd’engagement des équipes', note: 'grâce à plus de transparence', icon: UsersRound },
];

export default function RevenuePerformanceReferencePage() {
  return <main id="main" className="revenue-ref">
    <section className="revenue-ref-hero" aria-labelledby="revenue-ref-title"><div className="container revenue-ref-hero-grid">
      <div className="revenue-ref-copy">
        <span className="revenue-ref-eyebrow">REVENUE PERFORMANCE CLOUD</span>
        <h1 id="revenue-ref-title">De la donnée à la<br />décision, plus de<br />performance.</h1>
        <p>Fixez vos objectifs, anticipez vos résultats, simplifiez vos commissions et pilotez vos revenus. Donnez à vos équipes les moyens d’atteindre une performance durable.</p>
        <div className="revenue-ref-actions"><Link className="button button-primary" to="/contact?subject=Revenue%20Performance%20demo#contact-form"><CalendarDays aria-hidden="true" /> Demander une démo <ArrowRight aria-hidden="true" /></Link><a className="button button-outline" href="#revenue-results"><CirclePlay aria-hidden="true" /> Voir la vidéo</a></div>
        <ul><li><Check /> Mise en œuvre rapide</li><li><Check /> Accompagnement expert</li><li><Check /> Résultats mesurables</li></ul>
        <article className="revenue-ref-hero-quote"><img src="/assets/costera-platform-consultation.png" alt="Thomas Bernard, VP Sales" /><Quote aria-hidden="true" /><div><blockquote>« Costera Suite nous donne une visibilité unique pour piloter nos revenus et faire grandir nos équipes. »</blockquote><p><strong>Thomas Bernard</strong><span>VP Sales, Groupe Belmonte</span></p></div></article>
      </div>
      <div className="revenue-ref-dashboard-wrap">
        <div className="revenue-ref-dashboard" role="img" aria-label="Tableau de bord Revenue Performance Cloud en dirhams marocains">
          <img src="/assets/revenue-performance-dashboard-mad.png" alt="" />
          <span className="revenue-ref-dashboard-logo" aria-hidden="true"><img src="/assets/costera-logo-official.png" alt="" /></span>
        </div>
        <div className="revenue-ref-handwritten">Des équipes plus performantes.<br />Des entreprises plus humaines.<span /></div>
      </div>
    </div></section>

    <section className="revenue-ref-features" id="revenue-features"><div className="container">
      <div className="revenue-ref-heading"><span>FONCTIONNALITÉS</span><h2>Tout ce dont vous avez besoin pour une performance durable.</h2><p>Une plateforme complète et intégrée pour aligner stratégie, exécution et résultats.</p></div>
      <div className="revenue-ref-feature-grid">{features.map(({ title, text, icon: Icon }) => <article key={title}><span className="revenue-ref-icon"><Icon aria-hidden="true" /></span><h3>{title}</h3><p>{text}</p><Link to={`/contact?subject=${encodeURIComponent(`Revenue Performance - ${title}`)}#contact-form`}>En savoir plus <span><ArrowRight aria-hidden="true" /></span></Link></article>)}</div>
    </div></section>

    <section className="revenue-ref-results" id="revenue-results"><div className="container">
      <div className="revenue-ref-heading"><span>DES RÉSULTATS CONCRETS</span><h2>Des gains mesurables pour votre business.</h2><p>Nos clients constatent des améliorations significatives dès les premiers mois.</p></div>
      <div className="revenue-ref-result-grid">{results.map(({ value, label, note, icon: Icon }) => <article key={value}><span className="revenue-ref-result-icon"><Icon aria-hidden="true" /></span><div><strong>{value}</strong><b>{label}</b><small>{note}</small></div></article>)}</div>
    </div></section>

    <section className="revenue-ref-cta"><div className="container revenue-ref-cta-inner">
      <div className="revenue-ref-cta-copy"><h2>Prêt à passer à un nouveau niveau<br />de performance ?</h2><p>Découvrez comment Costera Suite peut transformer votre pilotage des revenus.</p></div>
      <div className="revenue-ref-cta-actions"><Link className="button" to="/contact?subject=Revenue%20Performance%20demo#contact-form">Demander une démo <ArrowRight aria-hidden="true" /></Link><a className="button" href="#revenue-results"><CirclePlay aria-hidden="true" /> Voir la vidéo</a></div>
      <div className="revenue-ref-summit" role="img" aria-label="Plus de performance. Plus d’humain."><img className="revenue-ref-summit-art" src="/assets/revenue-performance-cta-mountains.png" alt="" /><span className="revenue-ref-summit-note">Plus de performance.<br />Plus d’humain.</span><img className="revenue-ref-summit-hiker" src="/assets/revenue-performance-hiker.png" alt="" /></div>
    </div></section>
  </main>;
}
