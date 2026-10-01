import PlatformReferencePage from './PlatformReferencePage';
import SolutionsReferencePage from './SolutionsReferencePage';

export default function CosteraSuitePage() {
  return <main id="main" className="costera-suite-page">
    <PlatformReferencePage embedded showClouds={false} showFinal={false} eyebrow="COSTERA SUITE" />
    <SolutionsReferencePage embedded showHero={false} />
  </main>;
}
