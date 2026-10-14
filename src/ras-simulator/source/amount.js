(function(root){
const strip=value=>String(value).replace(/[\s\u00a0\u202f]/g,'');
function parts(value){const raw=strip(value);if(!/^\d+(?:[.,]\d{0,2})?$/.test(raw))return null;const [integer,fraction]=raw.replace('.',',').split(',');return {integer:integer.replace(/^0+(?=\d)/,''),fraction};}
function parse(value){const p=parts(value);return p?Number(p.integer+(p.fraction!==undefined?'.'+p.fraction:'')):NaN;}
function format(value){if(String(value).trim()==='')return '';const p=parts(value);return p?p.integer.replace(/\B(?=(\d{3})+(?!\d))/g,' ')+(p.fraction!==undefined?','+p.fraction:''):String(value);}
function bind(input){
if(!input)throw new Error('Montant HT introuvable');
function update(){const raw=input.value,position=input.selectionStart??raw.length,chars=raw.slice(0,position).replace(/\s/g,'').length,next=format(raw);input.value=next;let caret=0,count=0;while(caret<next.length&&count<chars){if(!/\s/.test(next[caret]))count++;caret++;}input.setSelectionRange(caret,caret);input.setCustomValidity(raw.trim()!==''&&!Number.isFinite(parse(raw))?'Saisissez un montant, par exemple 2 000 000,50, avec au maximum deux décimales.':'');}
input.addEventListener('input',update);input.addEventListener('blur',update);
}
root.CosteraAmount={parse,format,bind};
if(typeof module!=='undefined')module.exports=root.CosteraAmount;
})(typeof window!=='undefined'?window:globalThis);
