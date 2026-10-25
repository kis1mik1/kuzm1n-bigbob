import { $ } from './dom.js';
import { store } from './storage.js';
import { t } from './i18n.js';
import { sfx } from './sound.js';
import { unlock } from './badges.js';

export function createShootout() {
  const cv = $('#shoot');
  const ctx = cv.getContext('2d');
  const GY = 70;
  let W = 800, H = 300, GL = 290, GR = 510;
  let s = 1, dpr = 1, aim = 400, gk = 400, dir = 1, gs = 2;
  let pk = null, shots = 0, goals = 0, best = store.get('best', 0);
  let msg = '', msgC = '#fff', msgT = 0, over = false, running = false, last = 0, tick = 0;

  function ui() {
    $('#mgGoals').textContent = goals;
    $('#mgShot').textContent = shots;
    $('#mgBest').textContent = best;
  }

  function resize() {
    const w = cv.clientWidth;
    if (!w) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const narrow = w < 600;
    W = narrow ? 420 : 800;
    H = narrow ? 400 : 300;
    GL = W / 2 - 110;
    GR = W / 2 + 110;
    aim = W / 2;
    gk = W / 2;
    s = w / W;
    cv.width = Math.round(w * dpr);
    cv.height = Math.round(H * s * dpr);
    cv.style.height = H * s + 'px';
    draw();
  }

  function reset() {
    shots = 0;
    goals = 0;
    gs = 2;
    pk = null;
    over = false;
    msg = '';
    ui();
  }

  function say(text, col, time) {
    msg = text;
    msgC = col;
    msgT = time || 50;
  }

  function finish() {
    over = true;
    if (goals > best) {
      best = goals;
      store.set('best', best);
    }
    if (goals >= 3) unlock('minigame');
    say(t('mg_over') + goals + '/5', '#ffc94d', 99999);
    ui();
  }

  function shoot() {
    if (pk || over || shots >= 5) return;
    shots++;
    pk = { x: aim, y: H - 40, vy: -10, done: false };
    sfx.shot();
    ui();
  }

  function aimAt(e) {
    const r = cv.getBoundingClientRect();
    aim = Math.max(30, Math.min(W - 30, (e.clientX - r.left) / s));
  }

  cv.addEventListener('pointermove', aimAt);
  cv.addEventListener('pointerdown', e => {
    aimAt(e);
    if (over) reset();
    else shoot();
  });

  function update(dt) {
    gk += dir * gs * dt;
    if (gk > GR - 34) { gk = GR - 34; dir = -1; }
    if (gk < GL + 34) { gk = GL + 34; dir = 1; }
    if (Math.random() < 0.01 * dt) dir *= -1;
    if (pk) {
      pk.y += pk.vy * dt;
      if (!pk.done && pk.y <= GY + 22) {
        pk.done = true;
        const inPosts = pk.x > GL + 8 && pk.x < GR - 8;
        const saved = Math.abs(pk.x - gk) < 42;
        if (!inPosts) {
          say(t('mg_miss'), '#8fa3c7');
          pk.vy = -6;
        } else if (saved) {
          say(t('mg_save'), '#7fe3ff');
          pk.vy = 5;
          sfx.hit();
        } else {
          goals++;
          gs += 0.9;
          say(t('goal'), '#ff4d6d');
          pk.vy = -3;
          sfx.goal();
        }
        ui();
        setTimeout(() => {
          pk = null;
          if (shots >= 5) finish();
        }, 700);
      }
      if (pk && pk.done && pk.vy < 0 && pk.y < 36) pk.vy = 0;
    }
    if (msgT > 0) msgT -= dt;
  }

  function draw() {
    if (!cv.width) return;
    ctx.setTransform(s * dpr, 0, 0, s * dpr, 0, 0);
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#132650');
    g.addColorStop(1, '#0b1630');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = 'rgba(255, 77, 109, 0.5)';
    ctx.fillRect(0, GY - 1, W, 2);
    ctx.beginPath();
    ctx.arc(W / 2, GY, 70, 0, Math.PI);
    ctx.fillStyle = 'rgba(63, 169, 255, 0.18)';
    ctx.fill();

    ctx.fillStyle = 'rgba(4, 8, 18, 0.75)';
    ctx.fillRect(GL, 26, GR - GL, GY - 26);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    for (let x = GL; x <= GR; x += 12) {
      ctx.beginPath();
      ctx.moveTo(x, 26);
      ctx.lineTo(x, GY);
      ctx.stroke();
    }
    for (let y = 26; y <= GY; y += 11) {
      ctx.beginPath();
      ctx.moveTo(GL, y);
      ctx.lineTo(GR, y);
      ctx.stroke();
    }
    ctx.strokeStyle = '#ff4d6d';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(GL, GY);
    ctx.lineTo(GL, 26);
    ctx.lineTo(GR, 26);
    ctx.lineTo(GR, GY);
    ctx.stroke();

    ctx.fillStyle = '#3fa9ff';
    ctx.shadowColor = '#3fa9ff';
    ctx.shadowBlur = 12 * dpr;
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(gk - 34, GY - 6, 68, 26, 8) : ctx.rect(gk - 34, GY - 6, 68, 26);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#e9f1ff';
    ctx.beginPath();
    ctx.arc(gk, GY - 14, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0b1630';
    ctx.fillRect(gk - 7, GY - 17, 14, 4);

    if (!pk && !over) {
      ctx.setLineDash([5, 8]);
      ctx.lineDashOffset = -tick;
      ctx.strokeStyle = 'rgba(255, 201, 77, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(aim, H - 40);
      ctx.lineTo(aim, GY + 24);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.ellipse(aim, H - 40, 12, 6, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#05070d';
      ctx.fill();
      ctx.strokeStyle = '#7fe3ff';
      ctx.stroke();
    }

    if (pk) {
      ctx.beginPath();
      ctx.ellipse(pk.x, pk.y, 12, 6, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#05070d';
      ctx.shadowColor = '#7fe3ff';
      ctx.shadowBlur = 14 * dpr;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = '#7fe3ff';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    ctx.textAlign = 'center';
    if (msgT > 0 && msg) {
      ctx.font = '800 40px Unbounded, sans-serif';
      ctx.fillStyle = msgC;
      ctx.shadowColor = msgC;
      ctx.shadowBlur = 20 * dpr;
      ctx.fillText(msg, W / 2, H * 0.58);
      ctx.shadowBlur = 0;
    }
    if (over) {
      ctx.font = '600 14px Manrope, sans-serif';
      ctx.fillStyle = '#8fa3c7';
      ctx.fillText(t('mg_again'), W / 2, H * 0.58 + 36);
    }
  }

  function frame(now) {
    if (!running) return;
    const dt = last ? Math.min(2, (now - last) / 16.67) : 1;
    last = now;
    tick += dt;
    update(dt);
    draw();
    requestAnimationFrame(frame);
  }

  new IntersectionObserver(list => {
    if (list[0].isIntersecting) {
      if (!running) {
        running = true;
        last = 0;
        requestAnimationFrame(frame);
      }
    } else {
      running = false;
    }
  }).observe(cv);

  $('#mgRestart').addEventListener('click', reset);

  return { resize, ui };
}
