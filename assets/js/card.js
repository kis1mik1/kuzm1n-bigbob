import { $, isTouch } from './dom.js';

export function initPlayerCard() {
  const card = $('#card');
  const photo = $('.card-photo img');

  photo.addEventListener('error', () => {
    photo.parentElement.innerHTML = '<div class="photo-fallback">MK</div>';
  });

  if (isTouch) return;

  card.addEventListener('pointermove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    card.style.setProperty('--ry', (x - 0.5) * 18 + 'deg');
    card.style.setProperty('--rx', (0.5 - y) * 18 + 'deg');
    card.style.setProperty('--mx', x * 100 + '%');
    card.style.setProperty('--my', y * 100 + '%');
  });

  card.addEventListener('pointerleave', () => {
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  });
}
