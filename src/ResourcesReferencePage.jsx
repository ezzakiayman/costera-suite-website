import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, BookOpen, CircleHelp, Clock3, FileText, GraduationCap, Lightbulb, LockKeyhole, Mail, Search, Settings2, ShieldCheck, UsersRound } from 'lucide-react';
import { resourceArticles } from './SuitePages';

const topics = [
  { label: 'Guides pratiques', detail: 'Pas à pas pour mettre en œuvre', icon: BookOpen, filter: 'Guide' },
  { label: 'Cas d’usage', detail: 'Des exemples concrets dans votre secteur', icon: Lightbulb, filter: 'Cas d’usage' },
  { label: 'Comparatifs', detail: 'Faites le bon choix', icon: BarChart3, filter: 'Comparatif' },
  { label: 'Automatisation', detail: 'Gagnez en efficacité', icon: Settings2, filter: 'Automatisation' },
  { label: 'Facturation', detail: 'Simplifiez votre gestion', icon: FileText, filter: 'Facturation' },
  { label: 'FAQ', detail: 'Nos réponses à vos questions', icon: CircleHelp, filter: 'FAQ' },
];

const questions = [
  ['Par où commencer une digitalisation ?', 'Identifiez d’abord un processus précis à simplifier, puis mesurez son utilisation et ses résultats avant d’étendre le projet.'],
  ['Comment automatiser la facturation ?', 'Reliez les informations de vos devis aux factures, définissez les validations nécessaires et suivez les règlements dans un même parcours.'],
  ['Comment choisir un logiciel de gestion commerciale ?', 'Comparez les usages réels, le coût complet, les intégrations et la facilité d’adoption avec vos équipes.'],
];

const benefits = [
  { title: 'Des contenus d’experts', text: 'Rédigés pour vos enjeux métier et produit.', icon: GraduationCap },
  { title: 'Des cas concrets', text: 'Basés sur des situations de travail réelles.', icon: ShieldCheck },
  { title: 'Des ressources mises à jour', text: 'Des conseils utiles au fil des évolutions.', icon: Clock3 },
  { title: 'Orientés business', text: 'Pour des résultats concrets au quotidien.', icon: UsersRound },
];

function matchesTopic(article, topic) {
  if (topic === 'Tout') return true;
  if (topic === 'Automatisation' || topic === 'Facturation') return article.slug === 'automatiser-facturation';
  return article.type === topic;
}

export default function ResourcesReferencePage() {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('Tout');
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('idle');
  const articleSection = useRef(null);
  const newsletterEndpoint = import.meta.env.VITE_NEWSLETTER_ENDPOINT;
  const filteredArticles = useMemo(() => {
    const term = query.trim().toLocaleLowerCase('fr');
    return resourceArticles.filter(article => matchesTopic(article, topic) && (!term || `${article.title} ${article.text} ${article.type} ${article.sections.flat().join(' ')}`.toLocaleLowerCase('fr').includes(term)));
  }, [query, topic]);

  function selectTopic(nextTopic) {
    setTopic(nextTopic);
    setQuery('');
    articleSection.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function subscribe(event) {
    event.preventDefault();
    if (!email.trim()) return;
    if (!newsletterEndpoint) {
      const subject = encodeURIComponent('Inscription aux ressources Costera Suite');
      const body = encodeURIComponent(`Bonjour,\n\nJe souhaite recevoir les nouvelles ressources Costera Suite à l’adresse ${email.trim()}.\n`);
      window.location.href = `mailto:contact@costerasuite.com?subject=${subject}&body=${body}`;
      setNewsletterStatus('email');
      return;
    }
    setNewsletterStatus('sending');
    try {
      const response = await fetch(newsletterEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email.trim() }) });
      if (!response.ok) throw new Error('Subscription failed');
      setNewsletterStatus('success');
      setEmail('');
    } catch {
      setNewsletterStatus('error');
    }
  }

  return <main id="main" className="resources-ref">
    <section className="resources-ref-hero" aria-labelledby="resources-title">
      <img className="resources-ref-hero-photo" src="/assets/costera-leadership-hero.png" alt="Une professionnelle utilise Costera Suite dans un bureau" fetchPriority="high" />
      <div className="container resources-ref-hero-inner"><div className="resources-ref-hero-copy"><span className="resources-ref-eyebrow">RESSOURCES</span><h1 id="resources-title">Des ressources pour aller plus loin dans votre transformation digitale</h1><p>Guides, conseils d’experts, cas d’usage et comparatifs pour réussir votre digitalisation avec Costera Suite.</p><form className="resources-ref-search" role="search" onSubmit={event => { event.preventDefault(); articleSection.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}><Search aria-hidden="true" /><label className="sr-only" htmlFor="resource-query">Rechercher une ressource</label><input id="resource-query" type="search" placeholder="Rechercher un article, un guide, un sujet..." value={query} onChange={event => { setQuery(event.target.value); setTopic('Tout'); }} /><button type="submit">Rechercher</button></form><small>Exemples : facturation, automatisation, gestion commerciale...</small></div><div className="resources-ref-hero-note">Des connaissances aujourd’hui à vos succès de demain.</div></div>
    </section>

    <section className="resources-ref-topics" aria-label="Explorer par sujet"><div className="container resources-ref-topic-grid">{topics.map(({ label, detail, icon: Icon, filter }) => <button className="resources-ref-topic" type="button" aria-pressed={topic === filter} key={label} onClick={() => selectTopic(filter)}><span className="resources-ref-topic-icon"><Icon aria-hidden="true" /></span><strong>{label}</strong><small>{detail}</small><ArrowRight className="resources-ref-topic-arrow" aria-hidden="true" /></button>)}</div></section>

    <section className="resources-ref-articles" ref={articleSection} id="resources-articles"><div className="container"><div className="resources-ref-section-head"><h2>{topic === 'FAQ' ? 'Questions fréquentes' : topic === 'Tout' && !query ? 'Articles à la une' : query ? `Résultats pour « ${query} »` : topic}</h2><button type="button" onClick={() => { setTopic('Tout'); setQuery(''); articleSection.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>Voir tous les articles <ArrowRight aria-hidden="true" /></button></div>
      {topic === 'FAQ' ? <div className="resources-ref-faq">{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}<Link to="/contact?subject=Question%20ressources#contact-form">Une autre question ? Contactez-nous <ArrowRight aria-hidden="true" /></Link></div> : <div className="resources-ref-article-grid">{filteredArticles.map(article => <Link className="resources-ref-article" to={`/resources/${article.slug}`} key={article.slug}><img src={`/assets/${article.image}`} alt="" loading="lazy" /><div><span>{article.type}</span><h3>{article.title}</h3><p>{article.text}</p><div className="resources-ref-article-foot"><span>Costera Suite</span><span>Lire l’article <ArrowRight aria-hidden="true" /></span></div></div></Link>)}{filteredArticles.length === 0 && <p className="resources-ref-empty">Aucun article ne correspond à cette recherche. <button type="button" onClick={() => { setTopic('Tout'); setQuery(''); }}>Voir tous les articles</button></p>}</div>}
    </div></section>

    <section className="resources-ref-newsletter"><div className="container resources-ref-newsletter-inner"><div className="resources-ref-newsletter-copy"><span className="resources-ref-newsletter-icon"><Mail aria-hidden="true" /></span><div><small>RESTEZ INFORMÉ</small><h2>Recevez les dernières ressources Costera Suite</h2><p>Conseils d’experts, nouveaux guides et cas d’usage.</p></div></div><form onSubmit={subscribe}><div className="resources-ref-newsletter-fields"><label className="sr-only" htmlFor="resources-email">Votre adresse e-mail</label><input id="resources-email" type="email" required autoComplete="email" placeholder="Votre adresse e-mail" value={email} onChange={event => setEmail(event.target.value)} /><button type="submit" disabled={newsletterStatus === 'sending'}>{newsletterStatus === 'sending' ? 'Envoi...' : 'S’abonner'} <ArrowRight aria-hidden="true" /></button></div><p aria-live="polite"><LockKeyhole aria-hidden="true" />{newsletterStatus === 'success' ? 'Votre inscription est confirmée.' : newsletterStatus === 'error' ? 'Envoi impossible. Veuillez réessayer.' : newsletterStatus === 'email' ? 'Confirmez votre demande dans votre messagerie.' : newsletterEndpoint ? 'Vos données sont protégées. Désabonnement possible à tout moment.' : 'Votre messagerie s’ouvrira pour envoyer la demande.'}</p></form></div></section>

    <section className="resources-ref-benefits" aria-label="Pourquoi consulter nos ressources"><div className="container resources-ref-benefit-grid">{benefits.map(({ title, text, icon: Icon }) => <div key={title}><span><Icon aria-hidden="true" /></span><div><strong>{title}</strong><p>{text}</p></div></div>)}</div></section>
  </main>;
}
