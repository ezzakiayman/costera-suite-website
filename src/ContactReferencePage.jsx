import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, BarChart3, Check, Clock3, Mail, Monitor, ShieldCheck, UserRound } from 'lucide-react';
import { ContactForm } from './SuitePages';

const support = [
  { icon: Mail, label: 'Nous écrire', detail: 'contact@costerasuite.com', href: 'mailto:contact@costerasuite.com' },
  { icon: UserRound, label: 'Parler à un expert', detail: 'Échangeons sur votre projet', href: '/contact?subject=expert#contact-form' },
  { icon: Monitor, label: 'Découvrir la suite', detail: 'Explorez notre plateforme', href: '/costera-suite' },
  { icon: Clock3, label: 'À votre rythme', detail: 'Présentez-nous vos priorités', href: '/contact?subject=priorites#contact-form' },
];

export default function ContactReferencePage() {
  const [params] = useSearchParams();
  const topic = params.get('subject') || '';
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

  return <main id="main" className="contact-ref">
    <section className="contact-ref-hero" aria-labelledby="contact-ref-title"><img className="contact-ref-hero-photo" src="/assets/contact-consultation.png" alt="Un conseiller échange avec une cliente dans un bureau lumineux" fetchPriority="high" /><div className="container contact-ref-hero-inner"><div className="contact-ref-hero-copy"><nav className="contact-ref-breadcrumb" aria-label="Fil d’Ariane"><Link to="/">Accueil</Link><span aria-hidden="true">›</span><span>Contact</span></nav><h1 id="contact-ref-title">Parlons de votre projet de digitalisation</h1><p>Nos experts sont à votre écoute pour comprendre vos enjeux et vous accompagner vers une croissance durable.</p><div className="contact-ref-assurances"><div><Clock3 aria-hidden="true" /><span><strong>Premier échange</strong><small>Décrivez-nous votre projet</small></span></div><div><UserRound aria-hidden="true" /><span><strong>Accompagnement expert</strong><small>Des réponses adaptées à vos besoins</small></span></div><div><ShieldCheck aria-hidden="true" /><span><strong>Sans engagement</strong><small>Échangez librement avec nous</small></span></div></div></div><div className="contact-ref-hero-note">Des idées d’aujourd’hui à des solutions de demain.</div></div></section>

    <section className="contact-ref-content" id="contact-form"><div className="container contact-ref-content-grid"><ContactForm endpoint={endpoint} topic={topic} /><div className="contact-ref-aside"><article className="contact-ref-offer contact-ref-demo"><div className="contact-ref-offer-copy"><span className="contact-ref-offer-icon"><Monitor aria-hidden="true" /></span><h2>Demander une démo</h2><p>Découvrez Costera Suite en action avec un expert métier.</p><ul><li><Check aria-hidden="true" />Présentation personnalisée</li><li><Check aria-hidden="true" />Réponses à vos questions</li><li><Check aria-hidden="true" />Sans engagement</li></ul><Link className="button button-primary" to="/contact?subject=demo#contact-form">Demander une démo <ArrowRight aria-hidden="true" /></Link></div><img src="/assets/pricing-dashboard.png" alt="Aperçu du tableau de bord Costera Suite" loading="lazy" /></article><article className="contact-ref-offer contact-ref-diagnostic"><img src="/assets/contact-diagnostic.png" alt="Des professionnels analysent un rapport" loading="lazy" /><div className="contact-ref-offer-copy"><span className="contact-ref-offer-icon"><BarChart3 aria-hidden="true" /></span><h2>Demander un diagnostic</h2><p>Faites le point sur votre maturité digitale et vos priorités.</p><ul><li><Check aria-hidden="true" />Analyse de votre situation</li><li><Check aria-hidden="true" />Recommandations sur mesure</li><li><Check aria-hidden="true" />Prochaines étapes claires</li></ul><Link className="button button-outline" to="/contact?subject=diagnostic#contact-form">Demander un diagnostic <ArrowRight aria-hidden="true" /></Link></div></article></div></div></section>

    <section className="contact-ref-support"><div className="container"><h2>Une équipe à vos côtés</h2><p>Échangeons sur vos enjeux à chaque étape de votre projet.</p><div className="contact-ref-support-grid">{support.map(({ icon: Icon, label, detail, href }) => href.startsWith('mailto:') ? <a href={href} key={label}><Icon aria-hidden="true" /><span><strong>{label}</strong><small>{detail}</small></span></a> : <Link to={href} key={label}><Icon aria-hidden="true" /><span><strong>{label}</strong><small>{detail}</small></span></Link>)}</div></div></section>
  </main>;
}
