import { useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import markup from './ras-simulator/source/index.html?raw';
import pdfLibUrl from './ras-simulator/source/pdf-lib.min.js?url';
import './ras-simulator/source/rules.js';
import './ras-simulator/source/report.js';
import './ras-simulator/source/amount.js';
import { mountSimulator } from './ras-simulator/simulator-controller';
import './ras-simulator/simulator-scoped.css';

let pdfLibraryPromise;
function ensurePdfLib() {
  if (window.PDFLib) return Promise.resolve();
  if (!pdfLibraryPromise) {
    pdfLibraryPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = pdfLibUrl;
      script.onload = () => window.PDFLib ? resolve() : reject(new Error('Bibliothèque PDF indisponible'));
      script.onerror = () => reject(new Error('Chargement PDF impossible'));
      document.head.append(script);
    }).catch(error => {
      pdfLibraryPromise = undefined;
      throw error;
    });
  }
  return pdfLibraryPromise;
}

function simulatorMarkup() {
  const doc = new DOMParser().parseFromString(markup, 'text/html');
  doc.querySelector('header')?.remove();
  doc.querySelector('footer')?.remove();
  doc.querySelector('.skip')?.remove();
  doc.querySelectorAll('script').forEach(script => script.remove());
  doc.querySelector('main')?.setAttribute('id', 'main');
  return doc.body.innerHTML;
}

export default function RasSimulatorPage() {
  const root = useRef(null);
  const html = useMemo(simulatorMarkup, []);

  useEffect(() => {
    root.current.innerHTML = html;
    const cleanup = mountSimulator(root.current, ensurePdfLib);
    return () => {
      cleanup();
    };
  }, [html]);

  return <div className="ras-page">
    <div className="container ras-page-back"><Link to="/resources/tools"><ArrowLeft aria-hidden="true" /> Tous les outils gratuits</Link></div>
    <div className="ras-simulator" ref={root} dangerouslySetInnerHTML={{ __html: html }} />
  </div>;
}
