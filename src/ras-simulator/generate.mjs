import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';

const here = dirname(fileURLToPath(import.meta.url));
const source = name => readFileSync(join(here, 'source', name), 'utf8');

const css = postcss.parse(['style.css', 'journey.css', 'feedback.css', 'is-review.css'].map(source).join('\n'));
css.walkAtRules('font-face', rule => rule.remove());
css.walkRules(rule => {
  if (rule.parent?.name?.includes('keyframes')) return;
  rule.selectors = rule.selectors.map(selector => {
    if (selector === '*') return '.ras-simulator, .ras-simulator *';
    if (/^(:root|html|body)(?=$|[\s.:#[])/.test(selector)) {
      return selector.replace(/^(:root|html|body)/, '.ras-simulator');
    }
    return `.ras-simulator ${selector}`;
  });
});
writeFileSync(join(here, 'simulator-scoped.css'), css.toString());

const adapt = code => code
  .replaceAll('document.getElementById(id)', 'container.querySelector(`#${id}`)')
  .replaceAll('document.querySelectorAll(', 'container.querySelectorAll(')
  .replaceAll('document.querySelector(', 'container.querySelector(')
  .replaceAll("document.addEventListener('click'", "container.addEventListener('click'");

const originalUrl = "function url(){return location.protocol==='file:'?'https://simulateur-reglements-maj.soufiane1977.chatgpt.site':location.origin+location.pathname}";
const app = adapt(source('app.js'));
if (!app.includes(originalUrl)) throw new Error('Simulator share URL changed; review the integration');
if (!app.includes('download(await CosteraReport.pdf(c)')) throw new Error('Simulator PDF handler changed; review the integration');
const help = adapt(source('help-feedback.js'))
  .replace("$('modify').addEventListener('click',hideFeedback)", "modify.addEventListener('click',hideFeedback)");
const controller = [
  'export function mountSimulator(container, ensurePdfLib) {',
  'const { CosteraRAS, CosteraAmount, CosteraReport } = window;',
  "const missing = ['form','client','ca','invoiceDate','paymentDate','service','ht','vat','isScope','isEvent','eventDate','publicScope','small','arf','result'].filter(id => !container.querySelector(`#${id}`));",
  "if (missing.length) throw new Error(`Champs du simulateur absents : ${missing.join(', ')}`);",
  "CosteraAmount.bind(container.querySelector('#ht'));",
  app.replace(originalUrl, "function url(){return location.origin+import.meta.env.BASE_URL+'resources/tools/simulateur-ras'}")
    .replace('download(await CosteraReport.pdf(c)', 'await ensurePdfLib();download(await CosteraReport.pdf(c)'),
  help,
  adapt(source('is-review.js')),
  'return () => clearTimeout(reminderTimer);',
  '}',
].join('\n');
writeFileSync(join(here, 'simulator-controller.js'), controller);
