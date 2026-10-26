import { $, isTouch } from './dom.js';
import { lang, t } from './i18n.js';
import { svg } from './icons.js';
import { SKILLS, PROJECTS, TIMELINE, COUNTRIES, ACHIEVEMENTS, HOBBIES, TECH } from './content.js';

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

const list = (items, fn) => items.map(fn).join('');

function renderStatic() {
  document.documentElement.lang = lang;
  document.title = lang === 'ru' ? 'Михаил Кузьмин · Player 01' : 'Mikhail Kuzmin · Player 01';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const value = t(el.dataset.i18n);
    if (typeof value === 'string') el.innerHTML = value;
  });
  document.querySelectorAll('.lang span').forEach(s => s.classList.toggle('on', s.dataset.l === lang));
  $('#hudHint').textContent = t(isTouch ? 'hint_touch' : 'hint_keys');
  $('#score').title = t('badges_hint');
  $('#soundBtn').title = t('sound_hint');
  $('#soundBtn').setAttribute('aria-label', t('sound_hint'));
  $('#modeBtn').title = t('mode_hint');
}

function renderHero() {
  $('#chips').innerHTML = list(t('chips'), c => `<li>${c}</li>`);
}

function renderAbout() {
  $('#factsList').innerHTML = list(t('facts'), ([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`);
  $('#hobbyList').innerHTML = list(HOBBIES, h => {
    const [title, text] = h[lang];
    return `<li><span class="hobby-icon">${svg(h.ic)}</span><div><b>${title}</b><span>${text}</span></div></li>`;
  });
}

function renderExperience() {
  $('#steps').innerHTML = list(t('steps'), ([title, text], i) =>
    `<li class="${i === 2 ? 'now' : ''}"><b>${title}</b><span>${text}</span></li>`);
}

function renderSkills() {
  $('#skillsList').innerHTML = list(SKILLS, s => {
    const [title, type, text] = s[lang];
    let bars = '';
    for (let n = 1; n <= 5; n++) bars += `<i class="${n <= s.lvl ? 'f' : ''}"></i>`;
    return `<article class="skill reveal" style="--c:${s.c}">
      <div class="skill-icon">${svg(s.ic)}</div>
      <h3>${title}</h3>
      <span class="skill-type mono">${type}</span>
      <p>${text}</p>
      <div class="skill-level">${bars}<span>${t('lvl')} ${s.lvl}/5</span></div>
    </article>`;
  });
  $('#techList').innerHTML = list(TECH, g =>
    `<div class="tech-group"><span class="mono">${g[lang]}</span><div>${list(g.items[lang], i => `<b>${i}</b>`)}</div></div>`);
}

function renderProjects() {
  $('#projectsList').innerHTML = list(PROJECTS, p => {
    const d = p[lang];
    const link = p.link
      ? `<a class="project-link" href="${p.link}" target="_blank" rel="noopener">GitHub →</a>`
      : p.link === null ? `<span class="project-link off">${t('private')}</span>` : '';
    return `<article class="project ${p.type} reveal">
      <div class="project-head"><span class="project-type mono">${t('pt_' + p.type)}</span><div class="project-icon">${svg(p.ic)}</div></div>
      <h3>${d.t}</h3>
      <div class="project-case">
        <div><b>${t('lbl_task')}</b>${d.task}</div>
        <div><b>${t('lbl_did')}</b>${d.did}</div>
        <div><b>${t('lbl_res')}</b>${d.res}</div>
      </div>
      <div class="project-foot"><div class="project-tags">${list(p.stack, s => `<span>${s}</span>`)}</div>${link}</div>
    </article>`;
  });
}

function renderTimeline() {
  $('#timelineList').innerHTML = list(TIMELINE, item => {
    const [place, title, text] = item[lang];
    return `<li class="timeline-item ${item.s} reveal">
      <div class="timeline-head"><span class="timeline-place mono">${place}</span><span class="timeline-status mono">${t('ts_' + item.s)}</span></div>
      <h3>${title}</h3>
      <p>${text}</p>
    </li>`;
  });
}

function renderTravel() {
  $('#stampsList').innerHTML = list(COUNTRIES, c => {
    const [name, mark, text] = c[lang];
    const style = `--rot:${c.rot}deg;${c.c ? '--c:' + c.c : ''}`;
    return `<div class="stamp${c.round ? ' round' : ''}${c.locked ? ' locked' : ''}" style="${style}">
      <span class="vis">${mark}</span><div class="code">${c.code}</div><div class="cn">${name}</div><p>${text}</p>
    </div>`;
  });
}

function renderAchievements() {
  const done = ACHIEVEMENTS.filter(a => a.k !== 'locked').length;
  $('#achievementsList').innerHTML = list(ACHIEVEMENTS, a => {
    const [title, text] = a[lang];
    return `<div class="achievement ${a.k} reveal">
      <div class="medal">${svg(a.ic)}</div>
      <div><small>${t('k_' + a.k)}</small><b>${title}</b><span>${text}</span></div>
    </div>`;
  }) + `<p class="achievements-sum">${t('ach_sum')}<b>${done}/${ACHIEVEMENTS.length}</b></p>`;
}

export function render() {
  renderStatic();
  renderHero();
  renderAbout();
  renderExperience();
  renderSkills();
  renderProjects();
  renderTimeline();
  renderTravel();
  renderAchievements();
  document.querySelectorAll('.reveal:not(.in)').forEach(el => revealObserver.observe(el));
}
