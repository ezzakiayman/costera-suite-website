'use strict';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

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
  if (event.key !== 'Escape') return;
  const wasOpen = navigation.classList.contains('is-open');
  closeMenu();
  if (wasOpen) menuButton.focus();
});

const billingOptions = [...document.querySelectorAll('.billing-option')];
const prices = [...document.querySelectorAll('.plan-price strong')];
const periods = [...document.querySelectorAll('.price-period')];

billingOptions.forEach(option => {
  option.addEventListener('click', () => {
    const mode = option.dataset.billing;
    billingOptions.forEach(button => {
      const active = button === option;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    prices.forEach(price => { price.textContent = price.dataset[mode]; });
    periods.forEach(period => { period.textContent = mode === 'annual' ? 'an' : 'mois'; });
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();
