import { $ } from './dom.js';
import { store } from './storage.js';
import { t } from './i18n.js';
import { svg } from './icons.js';
import { sfx } from './sound.js';

export const BADGES = ['first_move', 'all', 'goal', 'minigame', 'reader', 'secret'];
const got = new Set(store.get('badges', []).filter(b => BADGES.includes(b)));
let paused = false;

export function unlock(id) {
  if (got.has(id) || paused) return;
  got.add(id);
  store.set('badges', [...got]);
  document.dispatchEvent(new CustomEvent('progress'));
  sfx.ach();
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = '<div class="medal">' + svg('star') + '</div><div><small>' + t('toast_k') + '</small><b>' + t('badges')[id] + '</b></div>';
  $('#toasts').appendChild(el);
  setTimeout(() => el.remove(), 4200);
}


export const badgeCount = () => got.size;

export function pauseBadges(value) {
  paused = value;
}
