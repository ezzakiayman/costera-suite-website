import InquiryForm from './InquiryForm';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Clock3, ShieldCheck, Sparkles, UsersRound } from 'lucide-react';
import { ASSET_BASE as ASSET } from './assetPath';

export default function RequestDemoPage() {
  const [params] = useSearchParams();
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
        <InquiryForm demo topic={params.get('solution') || ''} />

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
