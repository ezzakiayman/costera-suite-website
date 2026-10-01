import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  BellRing,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CirclePlay,
  Clock3,
  FileText,
  Quote,
  Target,
  Trophy,
  UsersRound,
} from 'lucide-react';

const features = [
  {
    title: 'Gestion des opportunités',
    text: 'Centralisez et suivez toutes vos opportunités dans un pipeline clair et collaboratif.',
    points: ['Pipeline personnalisable', 'Suivi des étapes et probabilités', 'Vue à 360° des comptes'],
    icon: Target,
  },
  {
    title: 'Devis & facturation',
    text: 'Créez vos devis en quelques clics et transformez-les en factures depuis la même plateforme.',
    points: ['Modèles personnalisables', 'Validation et signature en ligne', 'Facturation intégrée'],
    icon: FileText,
  },
  {
    title: 'Relances intelligentes',
    text: 'Ne laissez plus aucune opportunité sans suivi grâce à des relances automatisées et contextuelles.',
    points: ['Rappels automatiques', 'Suggestions d’actions par l’IA', 'Suivi des échanges multicanaux'],
    icon: BellRing,
  },
  {
    title: 'Performance commerciale',
    text: 'Pilotez votre activité avec des tableaux de bord en temps réel et des analyses poussées.',
    points: ['KPI personnalisés', 'Prévisions de CA', 'Rapports partageables'],
    icon: BarChart3,
  },
];

const results = [
  { value: '+32%', label: 'de chiffre d’affaires', note: 'en moyenne après 12 mois', icon: BarChart3 },
  { value: '-40%', label: 'de temps sur les tâches admin', note: 'pour se concentrer sur l’essentiel', icon: Clock3 },
  { value: '3x', label: 'plus d’opportunités traitées', note: 'grâce à une meilleure visibilité', icon: UsersRound },
  { value: '+25%', label: 'de taux de conversion', note: 'en moyenne chez nos clients', icon: Trophy },
];

function ReferenceCrop({ type, label }) {
  return <span className={`sales-ref-crop sales-ref-crop-${type}`} role="img" aria-label={label}>
    <img src={type === 'dashboard' ? '/assets/sales-cloud-dashboard-dh.png' : '/assets/sales-cloud-reference.png'} alt="" draggable="false" />
    {type === 'dashboard' && <span className="sales-ref-dashboard-logo" aria-hidden="true"><img src="/assets/costera-logo-official.png" alt="" /></span>}
  </span>;
}

function TrustLogoGroup({ duplicate = false }) {
  return <div className="sales-ref-trust-group" aria-hidden={duplicate || undefined}>
      <strong className="sales-ref-veolia"><i />VEOLIA</strong>
      <strong className="sales-ref-auchan">Auchan</strong>
      <strong className="sales-ref-leroy">LEROY MERLIN</strong>
      <strong className="sales-ref-saint">SAINT-GOBAIN</strong>
      <strong className="sales-ref-sonepar">sonepar</strong>
      <strong className="sales-ref-bureau">BUREAU<br />VERITAS</strong>
      <strong className="sales-ref-doctolib">Doctolib</strong>
      <span className="sales-ref-trust-count"><b>+500 entreprises</b> accélèrent leurs ventes<br />avec Costera Suite</span>
  </div>;
}

function TrustRow() {
  return <section className="sales-ref-trust" aria-label="Ils nous font confiance"><div className="container">
    <span className="sales-ref-trust-label">ILS NOUS FONT CONFIANCE</span>
    <div className="sales-ref-trust-viewport" role="region" aria-label="Entreprises clientes, carrousel animé">
      <div className="sales-ref-trust-track"><TrustLogoGroup /><TrustLogoGroup duplicate /></div>
    </div>
  </div></section>;
}

export default function SalesCloudReferencePage() {
  return <main id="main" className="sales-ref">
    <section className="sales-ref-hero" aria-labelledby="sales-ref-title"><div className="container sales-ref-hero-grid">
      <div className="sales-ref-hero-copy">
        <div className="sales-ref-badges"><span><BriefcaseBusiness aria-hidden="true" /> SALES CLOUD</span><span>Vendez plus. Plus simplement.</span></div>
        <h1 id="sales-ref-title">Transformez vos<br />opportunités en<br /><em>croissance durable.</em></h1>
        <p>Pilotez l’ensemble de votre cycle de vente : prospection, opportunités, devis, facturation et performance commerciale. Une seule plateforme, plus de résultats.</p>
        <div className="sales-ref-actions">
          <Link className="button button-primary" to="/contact?subject=Sales%20Cloud%20demo#contact-form"><CalendarDays aria-hidden="true" /> Demander une démo <ArrowRight aria-hidden="true" /></Link>
          <a className="button button-outline" href="#sales-testimonial"><CirclePlay aria-hidden="true" /> Voir la vidéo (2 min)</a>
        </div>
        <ul aria-label="Avantages de Sales Cloud"><li><Check /> Prise en main rapide</li><li><Check /> Accompagnement dédié</li><li><Check /> Sécurisé et conforme RGPD</li></ul>
      </div>
      <div className="sales-ref-hero-product">
        <ReferenceCrop type="dashboard" label="Vue d’ensemble de Sales Cloud avec pipeline et activité commerciale" />
      </div>
    </div></section>

    <TrustRow />

    <section className="sales-ref-section" id="sales-features"><div className="container">
      <div className="sales-ref-heading"><div><span className="sales-ref-kicker">FONCTIONNALITÉS</span><h2>Un outil complet pour vendre plus efficacement</h2></div><a href="#sales-results">Découvrir toutes les fonctionnalités <ArrowRight aria-hidden="true" /></a></div>
      <div className="sales-ref-features">{features.map(({ title, text, points, icon: Icon }) => <article key={title}>
        <div className="sales-ref-feature-title"><span><Icon aria-hidden="true" /></span><h3>{title}</h3></div>
        <p>{text}</p>
        <ul>{points.map(point => <li key={point}><Check aria-hidden="true" />{point}</li>)}</ul>
        <Link to={`/contact?subject=${encodeURIComponent(`Sales Cloud - ${title}`)}#contact-form`}>En savoir plus <ArrowRight aria-hidden="true" /></Link>
      </article>)}</div>
    </div></section>

    <section className="sales-ref-section sales-ref-results" id="sales-results"><div className="container">
      <div className="sales-ref-heading"><div><span className="sales-ref-kicker">IMPACT</span><h2>Des résultats concrets pour vos équipes de vente</h2></div></div>
      <div className="sales-ref-result-grid">{results.map(({ value, label, note, icon: Icon }) => <article key={value}>
        <span><Icon aria-hidden="true" /></span><div><strong>{value}</strong><b>{label}</b><small>{note}</small></div>
      </article>)}</div>
    </div></section>

    <section className="sales-ref-section sales-ref-testimonial" id="sales-testimonial"><div className="container">
      <span className="sales-ref-kicker">TÉMOIGNAGE CLIENT</span>
      <article className="sales-ref-testimonial-card">
        <ReferenceCrop type="testimonial" label="Thomas Renaud, directeur commercial du Groupe Sequoia" />
        <div className="sales-ref-quote"><Quote aria-hidden="true" /><div><blockquote>« Costera Suite a transformé notre façon de vendre. Nos équipes sont plus alignées, plus efficaces et nous avons gagné en visibilité sur tout notre pipeline. Résultat : une croissance de +30% en un an. »</blockquote><p><strong>Thomas Renaud</strong><span>Directeur commercial, Groupe Sequoia</span></p></div></div>
        <div className="sales-ref-client"><span className="sales-ref-client-mark" aria-hidden="true" /><div>Groupe<strong>Sequoia</strong></div></div>
        <div className="sales-ref-client-stat"><strong>+30%</strong><span>de chiffre<br />d’affaires</span></div>
        <div className="sales-ref-client-stat"><strong>6 mois</strong><span>de retour sur<br />investissement</span></div>
      </article>
    </div></section>

    <section className="sales-ref-cta"><div className="container sales-ref-cta-inner">
      <div><span>PRÊT À ACCÉLÉRER VOS VENTES ?</span><h2>Passez de l’opportunité à la croissance dès aujourd’hui.</h2></div>
      <div><Link className="button" to="/contact?subject=Sales%20Cloud%20demo#contact-form"><CalendarDays aria-hidden="true" /> Demander une démo <ArrowRight aria-hidden="true" /></Link><a className="button" href="#sales-testimonial"><CirclePlay aria-hidden="true" /> Voir la vidéo</a></div>
    </div></section>
  </main>;
}
