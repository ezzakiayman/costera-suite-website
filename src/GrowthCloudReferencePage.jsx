import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  Database,
  FileText,
  Mail,
  Megaphone,
  MessageCircle,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
  UsersRound,
  Workflow,
} from 'lucide-react';

const features = [
  { title: 'Lead Generation', text: 'Attirez des prospects qualifiés grâce à des campagnes multicanales et à l’intelligence de la donnée.', icon: UserRound },
  { title: 'Campaign Management', text: 'Créez, orchestrez et optimisez vos campagnes marketing sur tous les canaux.', icon: Megaphone },
  { title: 'Audience Intelligence', text: 'Identifiez et ciblez les bonnes audiences avec des insights prédictifs.', icon: UsersRound },
  { title: 'Journey Orchestration', text: 'Personnalisez les parcours et engagez vos prospects au bon moment, sur le bon canal.', icon: Workflow },
  { title: 'Opportunity Creation', text: 'Transformez l’engagement en opportunités qualifiées pour vos équipes commerciales.', icon: Target },
  { title: 'Performance Analytics', text: 'Mesurez, analysez et pilotez vos performances en temps réel grâce à des dashboards avancés.', icon: BarChart3 },
];

const metrics = [
  { value: '12 450', label: 'Leads qualifiés générés', change: '+ 320%', note: 'vs. période précédente', icon: UsersRound },
  { value: '8,4%', label: 'Taux de conversion', change: '+ 2,6 pts', note: 'vs. période précédente', icon: Target },
  { value: '- 42%', label: 'Coût d’acquisition', change: '- 42%', note: 'vs. période précédente', icon: Database },
  { value: '3 680', label: 'Opportunités dans le pipeline', change: '+ 48%', note: 'vs. période précédente', icon: BarChart3 },
];

const journey = [
  { title: 'Attirer', text: 'Lancez des campagnes ciblées sur les bons canaux.', mockup: 'attract' },
  { title: 'Engager', text: 'Capturez des leads qualifiés grâce à du contenu à forte valeur.', mockup: 'engage' },
  { title: 'Qualifier', text: 'Enrichissez et scorez vos leads avec l’IA.', mockup: 'qualify' },
  { title: 'Nurturer', text: 'Orchestrez des parcours personnalisés et automatisés.', mockup: 'nurture' },
  { title: 'Convertir', text: 'Générez des opportunités et alimentez votre pipeline commercial.', mockup: 'convert' },
];

function MiniTrend({ conversion = false }) {
  return <div className={`growth-ref-mini-trend${conversion ? ' is-line' : ''}`} aria-hidden="true">
    {conversion ? <svg viewBox="0 0 130 58"><path d="M4 50C25 46 29 33 48 36S76 14 94 21s22-3 32-17" /><circle cx="126" cy="4" r="3" /></svg> : <div>{[18, 25, 33, 45, 62, 78].map((height, index) => <span key={height} style={{ height: `${height}%`, opacity: .45 + index * .1 }} />)}</div>}
  </div>;
}

function JourneyMockup({ type }) {
  if (type === 'attract') return <div className="growth-ref-mockup growth-ref-mockup-attract" aria-hidden="true"><div><strong>Votre solution<br />pour un monde<br />plus humain.</strong><span className="growth-ref-mockup-button">En savoir</span></div><img src="/assets/costera-leadership-hero.png" alt="" /></div>;
  if (type === 'engage') return <div className="growth-ref-mockup growth-ref-mockup-engage" aria-hidden="true"><strong>Téléchargez notre guide</strong><span /><span /><span className="growth-ref-mockup-button">Recevoir le guide</span></div>;
  if (type === 'qualify') return <div className="growth-ref-mockup growth-ref-mockup-qualify" aria-hidden="true"><div className="growth-ref-lead"><span className="growth-ref-avatar">SM</span><div><strong>Lead qualifié</strong><small>Score 92</small></div></div><dl><div><dt>Secteur</dt><dd>Technologie</dd></div><div><dt>Taille</dt><dd>200–500</dd></div><div><dt>Intérêt</dt><dd>Solution Costera</dd></div></dl></div>;
  if (type === 'nurture') return <div className="growth-ref-mockup growth-ref-mockup-nurture" aria-hidden="true">{[[Mail, 'Email personnalisé'], [CalendarDays, 'Invitation webinar'], [FileText, 'Étude de cas'], [MessageCircle, 'Relance automatique']].map(([Icon, label]) => <span key={label}><Icon aria-hidden="true" />{label}</span>)}</div>;
  return <div className="growth-ref-mockup growth-ref-mockup-convert" aria-hidden="true"><strong>Opportunité créée 🎉</strong><div><span className="growth-ref-avatar">SM</span><p><b>Sophie Martin</b><small>Directrice Innovation<br />Tech&amp;Co</small></p></div><span className="growth-ref-mockup-button">Voir dans le CRM</span></div>;
}

export default function GrowthCloudReferencePage() {
  return <main id="main" className="growth-ref">
    <section className="growth-ref-hero" aria-labelledby="growth-ref-title">
      <div className="growth-ref-visual" aria-hidden="true">
        <img src="/assets/costera-leadership-hero.png" alt="" />
        <div className="growth-ref-hero-stat growth-ref-hero-leads"><span>Leads qualifiés</span><strong>+ 320% <TrendingUp /></strong><small>vs. période précédente</small><MiniTrend /></div>
        <div className="growth-ref-stage-list"><span><UserRound /> Attirer</span><span><Megaphone /> Engager</span><span><Target /> Convertir</span><span><BarChart3 /> Développer</span></div>
        <div className="growth-ref-hero-stat growth-ref-hero-pipeline"><span>Opportunités pipeline</span><strong>+ 48% <TrendingUp /></strong><small>vs. période précédente</small><MiniTrend conversion /></div>
        <div className="growth-ref-hero-note">Des opportunités<br />où pour aujourd’hui.<br />Une croissance<br />demain.<svg viewBox="0 0 75 70"><path d="M4 64C14 30 35 25 62 15M48 7l14 8-5 16" /></svg></div>
        <div className="growth-ref-hero-quote"><Sparkles />De meilleurs<br />leads pour un<br />plus grand demain.</div>
      </div>
      <div className="container growth-ref-hero-inner">
        <div className="growth-ref-copy"><span className="eyebrow">TRANSFORMER L’INTÉRÊT EN CROISSANCE</span><h1 id="growth-ref-title">Growth Cloud<sup>™</sup></h1><h2>Plus de leads. Plus d’opportunités.<br />Une croissance durable.</h2><p>Une suite complète pour attirer les bons prospects, engager vos audiences et convertir plus d’opportunités, grâce à la donnée, l’automatisation et l’intelligence artificielle.</p><div className="growth-ref-actions"><Link className="button button-primary" to="/contact?subject=Growth%20Cloud%20demo#contact-form"><CalendarDays aria-hidden="true" /> Demander une démo <ArrowRight aria-hidden="true" /></Link><Link className="button button-outline" to="/contact?subject=Growth%20Cloud#contact-form"><MessageCircle aria-hidden="true" /> Échanger avec un expert</Link></div><ul><li><Check /> Démo personnalisée</li><li><Check /> Conseils d’experts</li><li><Check /> Sans engagement</li></ul></div>
      </div>
      <div className="container growth-ref-metrics">{metrics.map(({ value, label, change, note, icon: Icon }) => <article key={label}><span className="growth-ref-icon"><Icon aria-hidden="true" /></span><div><strong>{value}</strong><p>{label}</p><b><TrendingUp aria-hidden="true" /> {change}</b><small>{note}</small></div></article>)}</div>
    </section>

    <section className="growth-ref-section" id="growth-features"><div className="container"><div className="growth-ref-heading"><div><span className="eyebrow">UNE SUITE COMPLÈTE POUR ACCÉLÉRER VOTRE CROISSANCE</span><h2>Les fonctionnalités clés</h2></div><a href="#growth-journey">Découvrir toutes les fonctionnalités <ArrowRight aria-hidden="true" /></a></div><div className="growth-ref-feature-grid">{features.map(({ title, text, icon: Icon }) => <article key={title}><span className="growth-ref-icon"><Icon aria-hidden="true" /></span><h3>{title}</h3><p>{text}</p><Link to={`/contact?subject=${encodeURIComponent(`Growth Cloud - ${title}`)}#contact-form`}>En savoir plus <ArrowRight aria-hidden="true" /></Link></article>)}</div></div></section>

    <section className="growth-ref-section growth-ref-journey" id="growth-journey"><div className="container"><div className="growth-ref-heading"><div><span className="eyebrow">DU MARKETING AU REVENU</span><h2>De la campagne au pipeline</h2><p>Un parcours fluide et mesurable pour transformer chaque interaction en opportunité.</p></div><Link to="/resources">Voir plus de cas d’usage <ArrowRight aria-hidden="true" /></Link></div><div className="growth-ref-journey-grid">{journey.map((step, index) => <article className="growth-ref-flow-step" key={step.title}><JourneyMockup type={step.mockup} /><div className="growth-ref-step-copy"><span>{index + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></div></article>)}</div></div></section>

    <section className="growth-ref-cta"><div className="container growth-ref-cta-inner"><div><span>PRÊT À ACCÉLÉRER VOTRE CROISSANCE ?</span><h2>Demandez une démo de Growth Cloud<sup>™</sup></h2><p>Découvrez comment Costera Suite peut vous aider à générer plus de leads, plus d’opportunités et une croissance durable.</p></div><div className="growth-ref-cta-actions"><Link className="button" to="/contact?subject=Growth%20Cloud%20demo#contact-form"><CalendarDays aria-hidden="true" /> Demander une démo <ArrowRight aria-hidden="true" /></Link><Link className="button" to="/contact?subject=Growth%20Cloud#contact-form"><MessageCircle aria-hidden="true" /> Échanger avec un expert</Link></div><div className="growth-ref-cta-note">Construisons<br />votre prochain niveau<br />de croissance.</div></div></section>

    <section className="growth-ref-trust" aria-label="Ils nous font confiance"><div className="container"><span>VEOLIA</span><span>Auchan</span><span>LEROY MERLIN</span><span>SAINT-GOBAIN</span><span>sonepar</span><span>TotalEnergies</span><span>Capgemini</span><span>BOSCH</span></div></section>
  </main>;
}
