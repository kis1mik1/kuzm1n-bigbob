import { $ } from './dom.js';
import { store } from './storage.js';
import { t, toggleLang } from './i18n.js';
import { sfx, isSoundOn, setSoundOn } from './sound.js';
import { BADGES, unlock, badgeCount, pauseBadges } from './badges.js';
import { render } from './render.js';
import { createArena } from './arena.js';
import { createShootout } from './shootout.js';
import { initPlayerCard } from './card.js';

const arena = createArena();
const shootout = createShootout();
const sections = [...document.querySelectorAll('main section[id]')];
const seenSections = new Set();
let simpleMode = store.get('simple', false);

function resizeGames() {
  arena.resize();
  shootout.resize();
}

function updateProgress() {
  $('#badgeCount').textContent = badgeCount();
  $('#badgeTotal').textContent = BADGES.length;
  const visible = sections.filter(s => s.offsetParent !== null).length || 1;
  const progress = seenSections.size / visible * 0.6 + arena.visitedCount() / arena.total * 0.25 + badgeCount() / BADGES.length * 0.15;
  $('#xpFill').style.width = Math.min(100, progress * 100) + '%';
}

function updateModeButton() {
  $('#modeBtn').textContent = t(simpleMode ? 'mode_game' : 'mode_simple');
}

function setSimpleMode(value) {
  simpleMode = value;
  store.set('simple', value);
  pauseBadges(value);
  document.body.classList.toggle('simple', value);
  updateModeButton();
  if (!value) requestAnimationFrame(resizeGames);
}

function renderPage() {
  render();
  updateModeButton();
  shootout.ui();
}

function setMenu(open) {
  $('#nav').classList.toggle('open', open);
  $('#menuBtn').setAttribute('aria-expanded', String(open));
}

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const id = e.target.id;
    seenSections.add(id);
    document.querySelectorAll('.nav a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + id));
    if (id === 'contact') unlock('reader');
    updateProgress();
  });
}, { threshold: 0.3 });

sections.forEach(s => sectionObserver.observe(s));

document.addEventListener('progress', updateProgress);

let typed = '';
window.addEventListener('keydown', e => {
  if (!e.code || !e.code.startsWith('Key')) return;
  typed = (typed + e.code.slice(3).toLowerCase()).slice(-4);
  if (typed === 'gold') arena.goldOn();
});

$('#langBtn').addEventListener('click', () => {
  toggleLang();
  renderPage();
});

$('#modeBtn').addEventListener('click', () => setSimpleMode(!simpleMode));
$('#simpleBtn').addEventListener('click', () => setSimpleMode(true));

$('#playBtn').addEventListener('click', () => {
  setSimpleMode(false);
  setTimeout(() => arena.arm(), 400);
});

$('#soundBtn').addEventListener('click', () => {
  setSoundOn(!isSoundOn());
  $('#soundBtn').classList.toggle('on', isSoundOn());
  sfx.station();
});

$('#menuBtn').addEventListener('click', () => setMenu(!$('#nav').classList.contains('open')));
$('#nav').addEventListener('click', e => {
  if (e.target.closest('a')) setMenu(false);
});
document.addEventListener('click', e => {
  if (!e.target.closest('.top')) setMenu(false);
});

$('#mailBtn').addEventListener('click', () => {
  const email = 'kuzmin.me@dvfu.ru';
  const hint = $('#mailHint');
  const done = () => {
    hint.textContent = t('c_copied');
    setTimeout(() => { hint.textContent = t('c_copy'); }, 2000);
  };
  if (navigator.clipboard) {
    navigator.clipboard.writeText(email).then(done).catch(() => { location.href = 'mailto:' + email; });
  } else {
    location.href = 'mailto:' + email;
  }
});

let resizeQueued = false;
window.addEventListener('resize', () => {
  if (resizeQueued) return;
  resizeQueued = true;
  requestAnimationFrame(() => {
    resizeQueued = false;
    resizeGames();
  });
});

initPlayerCard();
renderPage();
setSimpleMode(simpleMode);
$('#soundBtn').classList.toggle('on', isSoundOn());
resizeGames();
updateProgress();

if (document.fonts) document.fonts.ready.then(resizeGames);
