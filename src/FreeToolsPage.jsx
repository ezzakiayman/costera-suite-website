import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, FileDown } from 'lucide-react';

export default function FreeToolsPage() {
  return <main id="main" className="free-tools-page">
    <section className="container free-tools-intro">
      <span className="eyebrow">RESSOURCES / OUTILS GRATUITS</span>
      <h1>Des outils utiles pour décider avec clarté.</h1>
      <p>Des calculateurs pratiques pour mieux comprendre vos chiffres et préparer vos échanges avec vos clients.</p>
    </section>
    <section className="container free-tools-list" aria-label="Outils disponibles">
      <Link className="free-tool-card" to="/resources/tools/simulateur-ras">
        <span className="free-tool-icon"><Calculator aria-hidden="true" /></span>
        <div className="free-tool-copy"><small>FISCALITÉ · MAROC</small><h2>Simulateur de retenues à la source</h2><p>Estimez le règlement net après retenues TVA et IS, puis téléchargez le détail de votre simulation.</p><span className="free-tool-meta"><span>Sans inscription</span><span><FileDown aria-hidden="true" /> PDF disponible</span></span></div>
        <span className="free-tool-action" aria-label="Ouvrir le simulateur"><ArrowRight aria-hidden="true" /></span>
      </Link>
    </section>
  </main>;
}
