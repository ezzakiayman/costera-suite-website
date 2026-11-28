import { useRef, useState } from 'react';

export default function InquiryForm({ demo = false, topic = '' }) {
  const [status, setStatus] = useState('idle');
  const [reference, setReference] = useState('');
  const [error, setError] = useState('');
  const key = useRef('');
  const busy = useRef(false);
  const options = {'costera-suite':'Costera Suite','growth-cloud':'Growth Cloud','sales-cloud':'Sales Cloud','revenue-performance':'Revenue Performance','costera-intelligence':'Costera Intelligence'};
  async function submit(event) {
    event.preventDefault();
    if (busy.current) return;
    busy.current = true;
    const data = new FormData(event.currentTarget);
    key.current ||= crypto.randomUUID();
    data.set('key', key.current);
    data.set('topic', demo ? 'Démo · '+(options[data.get('solution')] || 'Conseil') : (topic || 'Contact'));
    setStatus('sending');
    try {
      const csrf = await fetch('/costera_intake/token', {cache:'no-store'});
      if (!csrf.ok) throw new Error();
      const token = await csrf.json();
      data.set(token.name,token.value);
      const response = await fetch('/costera_intake/submit',{method:'POST',body:data});
      if (!response.ok) throw new Error(response.status === 429 ? 'Plusieurs demandes ont déjà été envoyées. Réessayez plus tard.' : '');
      const result = await response.json();
      if (!result.reference) throw new Error();
      setReference(result.reference);
      setStatus('sent');
    } catch (e) {
      setError(e.message.startsWith('Plusieurs') ? e.message : 'Votre demande n’a pas pu être confirmée. Réessayez ou contactez contact@costerasuite.com.');
      setStatus('error');
    } finally {busy.current=false;}
  }
  return <div className="contact-form cs-inquiry"><h2>{demo?'Demander une démonstration':'Nous contacter'}</h2>{status==='sent'?
    <div role="status"><h3>Demande reçue</h3><p>Votre référence : <strong>{reference}</strong>.</p><p>Notre équipe vous répondra par e-mail.</p></div>:
    <form onSubmit={submit}><div className="form-grid">
    <label>Nom complet<input name="name" required maxLength="100" autoComplete="name"/></label>
    <label>E-mail professionnel<input name="email" required type="email" maxLength="190" autoComplete="email"/></label>
    <label>Entreprise<input name="company" required maxLength="150" autoComplete="organization"/></label>
    {demo&&<label>Solution souhaitée<select name="solution" defaultValue={topic}><option value="">Je souhaite être conseillé</option>{Object.entries(options).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select></label>}
    <label className="is-wide">Votre message (facultatif)<textarea name="message" rows="3" maxLength="3000"/></label></div>
    <label className="consent"><input type="checkbox" name="consent" required/> J’accepte d’être contacté au sujet de ma demande.</label>
    <button className="button button-primary" disabled={status==='sending'}>{status==='sending'?'Envoi en cours…':'Envoyer ma demande'}</button>
    {status==='error'&&<p role="alert">{error}</p>}</form>}</div>;
}
