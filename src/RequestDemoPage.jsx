import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, BarChart3, Check, CircleEllipsis, Clock3, Layers3, Monitor, ShieldCheck, Sparkles, UsersRound } from 'lucide-react';
import { ASSET_BASE as ASSET } from './assetPath';

const solutions = [
  { value: 'costera-suite', label: 'Costera Suite', detail: 'La plateforme unifiée', icon: Layers3 },
  { value: 'growth-cloud', label: 'Growth Cloud', detail: 'Acquisition et conversion', icon: UsersRound },
  { value: 'sales-cloud', label: 'Sales Cloud', detail: 'Ventes et pipeline', icon: Monitor },
  { value: 'revenue-performance', label: 'Revenue Performance', detail: 'Pilotage des revenus', icon: BarChart3 },
  { value: 'costera-intelligence', label: 'Costera Intelligence', detail: 'IA et automatisation', icon: Sparkles },
  { value: 'other', label: 'Autre besoin', detail: 'Une solution sur mesure', icon: CircleEllipsis },
];

const industries = ['Agroalimentaire & FMCG', 'Retail & Distribution', 'Services professionnels', 'Organisation multisite', 'Industrie', 'Technologie', 'Santé', 'Finance', 'Secteur public / association', 'Autre'];
const companySizes = ['1–10 collaborateurs', '11–50 collaborateurs', '51–250 collaborateurs', '251–1 000 collaborateurs', 'Plus de 1 000 collaborateurs'];
const roles = ['Direction générale', 'Direction commerciale / Ventes', 'Marketing / Growth', 'Finance / Revenue Operations', 'Opérations', 'Informatique / Transformation digitale', 'Autre'];

export default function RequestDemoPage() {
  const [params] = useSearchParams();
  const requestedSolution = params.get('solution') || '';
  const initialSolution = solutions.some(solution => solution.value === requestedSolution) ? requestedSolution : '';
  const [selectedSolution, setSelectedSolution] = useState(initialSolution);
  const [status, setStatus] = useState('idle');
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

  const submit = async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    data.requestType = 'demo';

    if (!endpoint) {
      const chosenSolution = data.solution === 'other' ? data.solutionOther : solutions.find(solution => solution.value === data.solution)?.label;
      const subject = encodeURIComponent(`Demande de démo Costera Suite - ${chosenSolution || 'Solution à définir'}`);
      const body = encodeURIComponent([
        `Nom : ${data.name}`,
        `Email : ${data.email}`,
        `Téléphone : ${data.phone || ''}`,
        `Entreprise : ${data.company}`,
        `Secteur : ${data.industry}`,
        `Taille : ${data.size}`,
        `Poste : ${data.role}`,
        `Solution souhaitée : ${chosenSolution || ''}`,
        '',
        'Détails du projet :',
        data.details,
      ].join('\n'));
      window.location.href = `mailto:contact@costerasuite.com?subject=${subject}&body=${body}`;
      setStatus('compose');
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      form.reset();
      setSelectedSolution('');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return <main id="main" className="request-demo-page">
    <section className="request-demo-hero" aria-labelledby="request-demo-title">
      <div className="container request-demo-hero-grid">
        <div className="request-demo-hero-copy">
          <nav className="request-demo-breadcrumb" aria-label="Fil d’Ariane"><Link to="/">Accueil</Link><span aria-hidden="true">›</span><span>Demander une démo</span></nav>
          <span className="eyebrow">DÉMONSTRATION PERSONNALISÉE</span>
          <h1 id="request-demo-title">Découvrez Costera Suite<br /><em>selon vos priorités.</em></h1>
          <p>Choisissez la solution qui vous intéresse et partagez-nous votre contexte. Un expert Costera préparera une démonstration adaptée à votre entreprise.</p>
          <div className="request-demo-assurances">
            <span><Clock3 aria-hidden="true" /><strong>30 minutes</strong><small>Un échange ciblé</small></span>
            <span><UsersRound aria-hidden="true" /><strong>Expert métier</strong><small>Selon votre secteur</small></span>
            <span><ShieldCheck aria-hidden="true" /><strong>Sans engagement</strong><small>Des réponses concrètes</small></span>
          </div>
        </div>
        <div className="request-demo-preview" aria-label="Aperçu de Costera Suite">
          <img src={`${ASSET}costera-dashboard-mad.png`} alt="Tableau de bord Costera Suite avec le logo officiel" fetchPriority="high" />
          <div className="request-demo-preview-note"><span><Sparkles aria-hidden="true" /></span><strong>Une démo conçue pour vous</strong><small>Vos enjeux. Votre secteur. Vos objectifs.</small></div>
        </div>
      </div>
    </section>

    <section className="request-demo-content" id="demo-form">
      <div className="container request-demo-layout">
        <form className="request-demo-form" onSubmit={submit}>
          <div className="request-demo-form-heading"><span>01</span><div><h2>Quelle solution souhaitez-vous découvrir ?</h2><p>Sélectionnez une solution ou indiquez un besoin spécifique.</p></div></div>
          <fieldset className="request-demo-solutions"><legend className="sr-only">Solution souhaitée</legend>{solutions.map(({ value, label, detail, icon: Icon }) => <label className={selectedSolution === value ? 'is-selected' : ''} key={value}><input type="radio" name="solution" value={value} checked={selectedSolution === value} onChange={() => setSelectedSolution(value)} required /><span className="request-demo-solution-icon"><Icon aria-hidden="true" /></span><span><strong>{label}</strong><small>{detail}</small></span><Check className="request-demo-choice-check" aria-hidden="true" /></label>)}</fieldset>
          {selectedSolution === 'other' && <label className="request-demo-other">Votre besoin <span aria-hidden="true">*</span><input name="solutionOther" required placeholder="Décrivez la solution ou le besoin recherché" /></label>}

          <div className="request-demo-divider" />
          <div className="request-demo-form-heading"><span>02</span><div><h2>Parlez-nous de votre entreprise</h2><p>Ces informations nous aident à personnaliser la démonstration.</p></div></div>
          <div className="request-demo-fields">
            <label>Nom complet <span aria-hidden="true">*</span><input required name="name" autoComplete="name" placeholder="Votre nom" /></label>
            <label>Email professionnel <span aria-hidden="true">*</span><input required type="email" name="email" autoComplete="email" placeholder="vous@entreprise.com" /></label>
            <label>Entreprise <span aria-hidden="true">*</span><input required name="company" autoComplete="organization" placeholder="Nom de votre entreprise" /></label>
            <label>Téléphone<input type="tel" name="phone" autoComplete="tel" placeholder="Votre numéro" /></label>
            <label>Secteur d’activité <span aria-hidden="true">*</span><select required name="industry" defaultValue=""><option value="" disabled>Sélectionnez votre secteur</option>{industries.map(industry => <option key={industry}>{industry}</option>)}</select></label>
            <label>Taille de l’entreprise <span aria-hidden="true">*</span><select required name="size" defaultValue=""><option value="" disabled>Sélectionnez une taille</option>{companySizes.map(size => <option key={size}>{size}</option>)}</select></label>
            <label className="is-wide">Poste / Fonction <span aria-hidden="true">*</span><select required name="role" defaultValue=""><option value="" disabled>Sélectionnez votre fonction</option>{roles.map(role => <option key={role}>{role}</option>)}</select></label>
            <label className="is-wide">Détails de votre projet <span aria-hidden="true">*</span><textarea required name="details" rows="5" placeholder="Présentez vos objectifs, vos outils actuels et les sujets que vous souhaitez voir pendant la démo…" /></label>
          </div>
          <label className="request-demo-consent"><input type="checkbox" name="consent" required /> J’accepte d’être contacté par l’équipe Costera Suite au sujet de cette demande.</label>
          <button className="button button-primary request-demo-submit" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Envoi en cours…' : endpoint ? 'Demander ma démo' : 'Préparer ma demande'} <ArrowRight aria-hidden="true" /></button>
          {!endpoint && <p className="request-demo-delivery">Votre messagerie s’ouvrira avec votre demande préremplie. Aucun message n’est envoyé automatiquement.</p>}
          {status === 'compose' && <p className="request-demo-success" role="status">Votre demande est prête. Vérifiez-la puis envoyez-la depuis votre messagerie.</p>}
          {status === 'sent' && <p className="request-demo-success" role="status">Merci. Votre demande de démo a bien été envoyée.</p>}
          {status === 'error' && <p className="request-demo-error" role="alert">L’envoi a échoué. Réessayez ou écrivez à contact@costerasuite.com.</p>}
        </form>

        <aside className="request-demo-aside">
          <div className="request-demo-aside-card">
            <span className="eyebrow">VOTRE DÉMONSTRATION</span>
            <h2>Un parcours adapté à vos enjeux</h2>
            <ul><li><span>1</span><div><strong>Nous préparons</strong><small>Votre expert étudie votre contexte et vos priorités.</small></div></li><li><span>2</span><div><strong>Nous démontrons</strong><small>Découvrez les parcours et fonctionnalités utiles à vos équipes.</small></div></li><li><span>3</span><div><strong>Nous échangeons</strong><small>Obtenez des réponses claires et les prochaines étapes.</small></div></li></ul>
          </div>
          <div className="request-demo-trust"><ShieldCheck aria-hidden="true" /><div><strong>Vos informations restent confidentielles</strong><p>Elles sont utilisées uniquement pour préparer et traiter votre demande.</p></div></div>
          <Link className="request-demo-help" to="/contact"><span>Une autre question ?</span><strong>Contacter l’équipe Costera <ArrowRight aria-hidden="true" /></strong></Link>
        </aside>
      </div>
    </section>
  </main>;
}
