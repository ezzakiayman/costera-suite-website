'use strict';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const dialog = document.querySelector('#info-dialog');
const title = document.querySelector('#dialog-title');
const description = document.querySelector('#dialog-description');
const details = document.querySelector('#dialog-details');
const action = document.querySelector('#dialog-action');
let lastTrigger;

const featureContent = {
  crm: ['CRM Clients & Prospects', 'Retrouvez vos prospects, clients, contacts et leur historique commercial dans un seul espace.', ['Fiches clients et prospects', 'Contacts et historique des échanges', 'Une information partagée avec votre équipe']],
  pipeline: ['Pipeline Commercial', 'Gardez une vue claire sur vos opportunités, du premier contact jusqu’à la signature.', ['Suivi des étapes commerciales', 'Valeur et avancement des opportunités', 'Une vue d’ensemble pour vos managers']],
  activities: ['Activités & Relances', 'Organisez les actions qui font avancer vos ventes et gardez le fil de chaque relation.', ['Appels et rendez-vous', 'Tâches et prochaines actions', 'Suivi des relances commerciales']],
  quotes: ['Devis', 'Centralisez vos propositions commerciales pour suivre chaque opportunité jusqu’à sa concrétisation.', ['Création de devis', 'Suivi des propositions', 'Historique commercial centralisé']],
  invoices: ['Facturation', 'Retrouvez vos factures dans la continuité de votre activité commerciale.', ['Gestion des factures clients', 'Suivi des factures en cours', 'Visibilité sur les règlements']],
  payments: ['Paiements', 'Gardez une vue claire sur vos règlements et les montants encore à encaisser.', ['Suivi des paiements', 'Visibilité sur les factures impayées', 'Une vue consolidée de votre activité']],
  performance: ['Performance Commerciale', 'Donnez à vos managers les indicateurs nécessaires pour mieux piloter leur équipe.', ['Suivi des objectifs', 'Activité et résultats commerciaux', 'Indicateurs clés de performance']],
  dashboard: ['Dashboard', 'Visualisez les informations essentielles de votre activité commerciale en un coup d’œil.', ['Chiffre d’affaires et opportunités', 'Pipeline, devis et factures', 'Objectifs et activité de l’équipe']]
};

function closeDropdowns() {
  document.querySelectorAll('.nav-trigger').forEach(trigger => {
    trigger.setAttribute('aria-expanded', 'false');
    document.getElementById(trigger.getAttribute('aria-controls')).hidden = true;
  });
}

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Ouvrir le menu');
  navigation.classList.remove('is-open');
  closeDropdowns();
}

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  navigation.classList.toggle('is-open', open);
});

document.querySelectorAll('.nav-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const open = trigger.getAttribute('aria-expanded') !== 'true';
    closeDropdowns();
    trigger.setAttribute('aria-expanded', String(open));
    document.getElementById(trigger.getAttribute('aria-controls')).hidden = !open;
  });
});

document.addEventListener('click', event => {
  if (!event.target.closest('.nav-dropdown')) closeDropdowns();
  if (!event.target.closest('.site-header')) closeMenu();
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
window.matchMedia('(min-width: 1000px)').addEventListener('change', closeMenu);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    const wasOpen = navigation.classList.contains('is-open');
    const activeDropdown = document.querySelector('.nav-trigger[aria-expanded="true"]');
    closeMenu();
    if (wasOpen) menuButton.focus();
    else if (activeDropdown) activeDropdown.focus();
  }
});

function openDialog(trigger, heading, body, items = [], label = 'Parler à l’équipe Costera', url = 'https://costerasuite.com/home/request-demo') {
  lastTrigger = trigger;
  closeMenu();
  title.textContent = heading;
  description.textContent = body;
  details.replaceChildren();
  if (items.length) {
    const list = document.createElement('ul');
    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      list.append(li);
    });
    details.append(list);
  }
  action.textContent = label + ' →';
  action.href = url;
  dialog.showModal();
  document.body.classList.add('dialog-open');
}

document.querySelectorAll('[data-modal]').forEach(trigger => {
  trigger.addEventListener('click', () => {
    switch (trigger.dataset.modal) {
      case 'trial':
        openDialog(trigger, 'Commencez avec Costera', 'Contactez notre équipe pour organiser votre essai de 14 jours et définir un environnement adapté à votre activité.', ['Configuration de votre entreprise', 'Accompagnement au démarrage', 'Découverte de votre gestion commerciale'], 'Demander mon essai', 'https://costerasuite.com/home/request-demo?utm_source=gestion-commerciale&utm_campaign=essai-14-jours');
        break;
      case 'pricing':
        openDialog(trigger, 'Une offre adaptée à votre équipe', 'Échangez avec notre équipe pour connaître les tarifs et les fonctionnalités incluses dans une offre adaptée à votre organisation.', ['Vos besoins commerciaux', 'La taille de votre équipe', 'L’accompagnement souhaité'], 'Obtenir une proposition');
        break;
      case 'login':
        openDialog(trigger, 'Votre espace Costera', 'Vous êtes déjà client ? Utilisez le lien d’accès communiqué lors de votre configuration. Notre équipe peut vous aider à retrouver votre espace.', [], 'Contacter le support', 'https://costerasuite.com/home/contact');
        break;
    }
  });
});

document.querySelectorAll('[data-feature]').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const [heading, body, items] = featureContent[trigger.dataset.feature];
    openDialog(trigger, heading, body, items, 'Découvrir en démo');
  });
});

document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  lastTrigger?.focus();
});
document.querySelector('#year').textContent = new Date().getFullYear();

// Motion is progressive enhancement: all content stays readable without it.
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1000px)');
  const root = document.documentElement;
  const hero = document.querySelector('.hero-inner');
  const visual = document.querySelector('.hero-visual');
  const cards = [...document.querySelectorAll('.feature-card, .problem-card, .result-card')];
  const animations = new Set();
  const revealed = new WeakSet();
  const counters = new Map();
  let observer;
  let pointerFrame = 0;
  let progressFrame = 0;
  let entranceStarted = false;

  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.append(progress);

  document.querySelectorAll('.result-card strong').forEach(number => {
    const finalText = number.textContent.trim();
    const match = finalText.match(/^([+-]?)(\d+)(%)$/);
    if (!match) return;
    const visible = document.createElement('span');
    visible.setAttribute('aria-hidden', 'true');
    visible.textContent = finalText;
    const accessible = document.createElement('span');
    accessible.className = 'sr-only';
    accessible.textContent = finalText;
    number.replaceChildren(visible, accessible);
    counters.set(number.closest('.result-card'), {visible, finalText, prefix: match[1], value: Number(match[2]), frame: 0});
  });

  function animate(element, frames, options = {}) {
    if (reducedMotion.matches || typeof element.animate !== 'function') return;
    const animation = element.animate(frames, {
      duration: 750,
      easing: 'cubic-bezier(.22,1,.36,1)',
      ...options
    });
    animations.add(animation);
    animation.finished.catch(() => {}).finally(() => animations.delete(animation));
    return animation;
  }

  function countUp(element) {
    const counter = counters.get(element);
    if (!counter || reducedMotion.matches) return;
    let started;
    const tick = time => {
      started ??= time;
      const fraction = Math.min((time - started) / 1100, 1);
      const eased = 1 - Math.pow(1 - fraction, 3);
      counter.visible.textContent = counter.prefix + Math.round(counter.value * eased) + '%';
      if (fraction < 1) counter.frame = requestAnimationFrame(tick);
      else { counter.visible.textContent = counter.finalText; counter.frame = 0; }
    };
    counter.frame = requestAnimationFrame(tick);
  }

  function reveal(element) {
    if (revealed.has(element)) return;
    revealed.add(element);
    element.dataset.revealed = 'true';
    if (element.contains(document.activeElement)) {
      countUp(element);
      return;
    }
    animate(element, [
      {opacity: 0, transform: 'translateY(26px)'},
      {opacity: 1, transform: 'translateY(0)'}
    ], {delay: Number(element.dataset.revealDelay || 0)});
    countUp(element);
  }

  function resetPointer() {
    cancelAnimationFrame(pointerFrame);
    pointerFrame = 0;
    visual.style.removeProperty('--visual-tilt-x');
    visual.style.removeProperty('--visual-tilt-y');
    cards.forEach(card => {
      card.classList.remove('pointer-active');
      card.style.removeProperty('--pointer-x');
      card.style.removeProperty('--pointer-y');
    });
  }

  function updateProgress() {
    progressFrame = 0;
    const distance = document.documentElement.scrollHeight - innerHeight;
    const fraction = distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0;
    progress.style.transform = `scaleX(${fraction})`;
  }
  function queueProgress() {
    if (!progressFrame && !reducedMotion.matches) progressFrame = requestAnimationFrame(updateProgress);
  }

  function configureMotion() {
    observer?.disconnect();
    animations.forEach(animation => animation.cancel());
    animations.clear();
    counters.forEach(counter => {
      cancelAnimationFrame(counter.frame);
      counter.frame = 0;
      counter.visible.textContent = counter.finalText;
    });
    resetPointer();
    root.classList.toggle('motion-enabled', !reducedMotion.matches);
    if (reducedMotion.matches) {
      cancelAnimationFrame(progressFrame);
      progressFrame = 0;
      return;
    }

    if (!entranceStarted) {
      entranceStarted = true;
      document.querySelectorAll('.hero-content > *').forEach((element, index) => {
        animate(element, [{opacity: 0, transform: 'translateY(20px)'}, {opacity: 1, transform: 'translateY(0)'}], {delay: index * 95, duration: 900});
      });
    }

    const targets = document.querySelectorAll('.trust-strip > p, .customer, .testimonial, .challenge-content > .eyebrow, .challenge-content > h2, .challenge-content > .section-description, .problem-card, .solution-main > .eyebrow, .solution-main > h2, .solution-main > .section-description, .pillar, .result-card, .features .eyebrow, .features h2, .feature-card, .footer-grid > *');
    document.querySelectorAll('.customer-logos, .problem-grid, .solution-pillars, .results-stack, .feature-grid, .footer-grid').forEach(group => {
      [...group.children].forEach((element, index) => { element.dataset.revealDelay = String((index % 4) * 70); });
    });
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          observer.unobserve(entry.target);
        });
      }, {threshold: 0.12, rootMargin: '0px 0px -24px 0px'});
      targets.forEach(element => { if (!revealed.has(element)) observer.observe(element); });
    }
    queueProgress();
  }

  hero.addEventListener('pointermove', event => {
    if (reducedMotion.matches || !finePointer.matches || event.pointerType === 'touch') return;
    cancelAnimationFrame(pointerFrame);
    pointerFrame = requestAnimationFrame(() => {
      pointerFrame = 0;
      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      visual.style.setProperty('--visual-tilt-x', `${(-y * 4).toFixed(2)}deg`);
      visual.style.setProperty('--visual-tilt-y', `${(x * 5).toFixed(2)}deg`);
    });
  }, {passive: true});
  hero.addEventListener('pointerleave', resetPointer);

  cards.forEach(card => {
    card.addEventListener('pointermove', event => {
      if (reducedMotion.matches || !finePointer.matches || event.pointerType === 'touch') return;
      const bounds = card.getBoundingClientRect();
      card.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
      card.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
      card.classList.add('pointer-active');
    }, {passive: true});
    card.addEventListener('pointerleave', () => card.classList.remove('pointer-active'));
  });

  // Keyboard focus never waits for a reveal animation.
  document.addEventListener('focusin', event => {
    animations.forEach(animation => {
      const element = animation.effect?.target;
      if (element && (element === event.target || element.contains(event.target))) animation.finish();
    });
  });
  document.addEventListener('visibilitychange', () => {
    root.classList.toggle('page-inactive', document.hidden);
    animations.forEach(animation => { if (document.hidden) animation.pause(); else animation.play(); });
  });
  window.addEventListener('scroll', queueProgress, {passive: true});
  window.addEventListener('resize', queueProgress, {passive: true});
  reducedMotion.addEventListener('change', configureMotion);
  finePointer.addEventListener('change', resetPointer);
  configureMotion();
})();
