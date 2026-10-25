import { $ } from './dom.js';
import { t } from './i18n.js';
import { sfx } from './sound.js';
import { unlock } from './badges.js';

export function createArena() {
  const box = $('#arenaBox');
  const cv = $('#rink');
  const ctx = cv.getContext('2d');
  const layer = document.createElement('canvas');
  const lctx = layer.getContext('2d');
  const W = 1000, H = 500, R0 = 120, L = 20, TOP = 20, RT = 980, B = 480;
  const ST = [
    { id: 'about', x: 500, y: 250 },
    { id: 'experience', x: 230, y: 150 },
    { id: 'skills', x: 230, y: 350 },
    { id: 'projects', x: 500, y: 95 },
    { id: 'timeline', x: 770, y: 150 },
    { id: 'travel', x: 770, y: 350 },
    { id: 'achievements', x: 500, y: 405 },
    { id: 'minigame', x: 76, y: 250, goal: -1 },
    { id: 'contact', x: 924, y: 250, goal: 1 }
  ];
  const START = { x: 385, y: 250 };
  const puck = { x: START.x, y: START.y, vx: 0, vy: 0, r: 12 };
  const keys = {};
  const visited = new Set();
  const scratches = [];
  let vert = false, s = 1, ox = 0, oy = 0, dpr = 1, cw = 0, ch = 0;
  let trail = [], sparks = [];
  let drag = null, inside = null, armed = false, running = false, moved = false, gold = false;
  let resetAt = 0, last = 0, tick = 0;

  for (let i = 0; i < 110; i++) {
    const x = 40 + Math.random() * 920, y = 40 + Math.random() * 420, a = Math.random() * Math.PI, l = 20 + Math.random() * 90;
    scratches.push([x, y, x + Math.cos(a) * l * 0.5 + (Math.random() - 0.5) * 20, y + Math.sin(a) * l * 0.5, x + Math.cos(a) * l, y + Math.sin(a) * l]);
  }

  function setWorld(c) {
    if (vert) c.setTransform(0, s * dpr, s * dpr, 0, ox * dpr, oy * dpr);
    else c.setTransform(s * dpr, 0, 0, s * dpr, ox * dpr, oy * dpr);
  }

  function toScreen(x, y) {
    return vert ? [ox + y * s, oy + x * s] : [ox + x * s, oy + y * s];
  }

  function toWorld(sx, sy) {
    return vert ? [(sy - oy) / s, (sx - ox) / s] : [(sx - ox) / s, (sy - oy) / s];
  }

  function rr(c, x, y, w, h, r) {
    c.beginPath();
    c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r);
    c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r);
    c.arcTo(x, y, x + w, y, r);
    c.closePath();
  }

  function line(c, x1, y1, x2, y2, col, w) {
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.strokeStyle = col;
    c.lineWidth = w;
    c.stroke();
  }

  function drawRink() {
    const c = lctx;
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.fillStyle = '#070d1c';
    c.fillRect(0, 0, layer.width, layer.height);
    setWorld(c);

    rr(c, L, TOP, RT - L, B - TOP, R0);
    const g = c.createRadialGradient(500, 250, 30, 500, 250, 560);
    g.addColorStop(0, '#18305a');
    g.addColorStop(1, '#0b1630');
    c.fillStyle = g;
    c.fill();

    c.save();
    c.clip();
    c.lineWidth = 1;
    c.strokeStyle = 'rgba(210, 235, 255, 0.06)';
    scratches.forEach(a => {
      c.beginPath();
      c.moveTo(a[0], a[1]);
      c.quadraticCurveTo(a[2], a[3], a[4], a[5]);
      c.stroke();
    });
    line(c, 500, TOP, 500, B, 'rgba(255, 77, 109, 0.5)', 6);
    line(c, 350, TOP, 350, B, 'rgba(63, 169, 255, 0.5)', 7);
    line(c, 650, TOP, 650, B, 'rgba(63, 169, 255, 0.5)', 7);
    line(c, 90, TOP, 90, B, 'rgba(255, 77, 109, 0.45)', 2);
    line(c, 910, TOP, 910, B, 'rgba(255, 77, 109, 0.45)', 2);

    c.beginPath();
    c.arc(500, 250, 75, 0, Math.PI * 2);
    c.strokeStyle = 'rgba(127, 227, 255, 0.3)';
    c.lineWidth = 2;
    c.stroke();
    c.beginPath();
    c.arc(500, 250, 5, 0, Math.PI * 2);
    c.fillStyle = 'rgba(127, 227, 255, 0.6)';
    c.fill();

    [[90, false, 62], [910, true, 910]].forEach(([gx, ccw, nx]) => {
      c.beginPath();
      c.moveTo(gx, 210);
      c.arc(gx, 250, 40, -Math.PI / 2, Math.PI / 2, ccw);
      c.closePath();
      c.fillStyle = 'rgba(63, 169, 255, 0.18)';
      c.fill();
      c.strokeStyle = 'rgba(255, 77, 109, 0.5)';
      c.lineWidth = 2;
      c.stroke();

      c.fillStyle = 'rgba(4, 8, 18, 0.7)';
      c.fillRect(nx, 226, 28, 48);
      c.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      c.lineWidth = 1;
      for (let i = 0; i <= 48; i += 6) line(c, nx, 226 + i, nx + 28, 226 + i, 'rgba(255, 255, 255, 0.14)', 1);
      for (let i = 0; i <= 28; i += 6) line(c, nx + i, 226, nx + i, 274, 'rgba(255, 255, 255, 0.14)', 1);
      c.strokeStyle = '#ff4d6d';
      c.lineWidth = 3;
      c.strokeRect(nx, 226, 28, 48);
    });
    c.restore();

    rr(c, L, TOP, RT - L, B - TOP, R0);
    c.strokeStyle = 'rgba(200, 232, 255, 0.6)';
    c.lineWidth = 5;
    c.shadowColor = '#7fe3ff';
    c.shadowBlur = 18 * dpr;
    c.stroke();
    c.shadowBlur = 0;
  }

  function resize() {
    cw = box.clientWidth;
    if (!cw) return;
    vert = cw < 640;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ww = vert ? H : W, wh = vert ? W : H;
    ch = vert ? Math.min(cw * 2, window.innerHeight * 0.72) : cw / 2;
    s = Math.min(cw / ww, ch / wh);
    ox = (cw - ww * s) / 2;
    oy = (ch - wh * s) / 2;
    cv.width = layer.width = Math.round(cw * dpr);
    cv.height = layer.height = Math.round(ch * dpr);
    cv.style.height = ch + 'px';
    drawRink();
    if (!running) draw();
  }

  function burst(x, y, n, col) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, v = 1 + Math.random() * 4;
      sparks.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, l: 1, c: col || '#dff6ff' });
    }
  }

  function firstMove() {
    if (moved) return;
    moved = true;
    unlock('first_move');
  }

  function visit(st) {
    visited.add(st.id);
    $('#hudCount').textContent = visited.size + '/' + ST.length;
    if (visited.size === ST.length) unlock('all');
    document.dispatchEvent(new CustomEvent('progress'));
  }

  function openPanel(st) {
    const d = t('st')[st.id];
    $('#panelK').textContent = t('station') + ' ' + String(ST.indexOf(st) + 1).padStart(2, '0');
    $('#panelT').textContent = d[0];
    $('#panelP').textContent = d[1];
    $('#panelGo').href = '#' + st.id;
    const [psx] = toScreen(puck.x, puck.y);
    $('#panel').classList.toggle('right', !vert && psx < cw / 2);
    $('#panel').hidden = false;
  }

  function enter(st) {
    sfx.station();
    burst(st.x, st.y, 10, '#ffc94d');
    visit(st);
    openPanel(st);
  }

  function goal(st) {
    const f = $('#flash');
    f.textContent = t('goal');
    f.classList.remove('go');
    void f.offsetWidth;
    f.classList.add('go');
    sfx.goal();
    burst(puck.x, puck.y, 18, '#ff4d6d');
    puck.vx *= 0.15;
    puck.vy *= 0.15;
    resetAt = performance.now() + 1100;
    visit(st);
    openPanel(st);
    if (st.id === 'contact') unlock('goal');
  }

  function collide() {
    const r = puck.r;
    let hit = false;
    const cx = puck.x < L + R0 ? L + R0 : puck.x > RT - R0 ? RT - R0 : null;
    const cy = puck.y < TOP + R0 ? TOP + R0 : puck.y > B - R0 ? B - R0 : null;
    if (cx !== null && cy !== null) {
      const dx = puck.x - cx, dy = puck.y - cy, d = Math.hypot(dx, dy), lim = R0 - r;
      if (d > lim) {
        const nx = dx / d, ny = dy / d;
        puck.x = cx + nx * lim;
        puck.y = cy + ny * lim;
        const dot = puck.vx * nx + puck.vy * ny;
        if (dot > 0) {
          puck.vx -= 1.8 * dot * nx;
          puck.vy -= 1.8 * dot * ny;
          hit = true;
        }
      }
    } else {
      if (puck.x < L + r) { puck.x = L + r; if (puck.vx < 0) { puck.vx *= -0.8; hit = true; } }
      if (puck.x > RT - r) { puck.x = RT - r; if (puck.vx > 0) { puck.vx *= -0.8; hit = true; } }
      if (puck.y < TOP + r) { puck.y = TOP + r; if (puck.vy < 0) { puck.vy *= -0.8; hit = true; } }
      if (puck.y > B - r) { puck.y = B - r; if (puck.vy > 0) { puck.vy *= -0.8; hit = true; } }
    }
    if (hit) {
      const sp = Math.hypot(puck.vx, puck.vy);
      if (sp > 2) {
        sfx.hit();
        burst(puck.x, puck.y, Math.min(12, Math.round(sp)));
      }
    }
  }

  function checkStations() {
    if (resetAt) return;
    for (const st of ST) {
      if (st.goal) {
        if (Math.abs(puck.y - 250) < 22 && (st.goal < 0 ? puck.x < 90 : puck.x > 910)) {
          goal(st);
          return;
        }
        continue;
      }
      const d = Math.hypot(puck.x - st.x, puck.y - st.y);
      if (d < 46 && inside !== st.id) {
        inside = st.id;
        enter(st);
      } else if (d > 70 && inside === st.id) {
        inside = null;
      }
    }
  }

  function update(dt) {
    if (resetAt && performance.now() > resetAt) {
      resetAt = 0;
      puck.x = START.x;
      puck.y = START.y;
      puck.vx = 0;
      puck.vy = 0;
      trail = [];
      inside = null;
    }
    if (armed && !resetAt) {
      let ix = (keys.ArrowRight || keys.KeyD ? 1 : 0) - (keys.ArrowLeft || keys.KeyA ? 1 : 0);
      let iy = (keys.ArrowDown || keys.KeyS ? 1 : 0) - (keys.ArrowUp || keys.KeyW ? 1 : 0);
      if (ix || iy) {
        if (!inside) $('#panel').hidden = true;
        const n = Math.hypot(ix, iy);
        ix /= n;
        iy /= n;
        const wx = vert ? iy : ix, wy = vert ? ix : iy;
        puck.vx += wx * 0.6 * dt;
        puck.vy += wy * 0.6 * dt;
        firstMove();
      }
      if (keys.Space) {
        puck.vx *= 0.88;
        puck.vy *= 0.88;
      }
    }
    const sp = Math.hypot(puck.vx, puck.vy);
    if (sp > 16) {
      puck.vx *= 16 / sp;
      puck.vy *= 16 / sp;
    }
    const f = Math.pow(0.985, dt);
    puck.vx *= f;
    puck.vy *= f;
    puck.x += puck.vx * dt;
    puck.y += puck.vy * dt;
    collide();
    if (Math.hypot(puck.vx, puck.vy) > 0.4) {
      trail.push([puck.x, puck.y]);
      if (trail.length > 40) trail.shift();
    } else if (trail.length) {
      trail.shift();
    }
    sparks.forEach(p => {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= 0.94;
      p.vy *= 0.94;
      p.l -= 0.03 * dt;
    });
    sparks = sparks.filter(p => p.l > 0);
    checkStations();
  }

  function draw() {
    if (!cw) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(layer, 0, 0);
    setWorld(ctx);

    ST.forEach(st => {
      const v = visited.has(st.id);
      const col = v ? '255, 201, 77' : '127, 227, 255';
      if (st.goal) {
        const nx = st.goal < 0 ? 62 : 910;
        const a = 0.35 + Math.sin(tick * 0.08) * 0.25;
        ctx.strokeStyle = 'rgba(255, 77, 109, ' + a + ')';
        ctx.lineWidth = 4;
        ctx.shadowColor = '#ff4d6d';
        ctx.shadowBlur = 16 * dpr;
        ctx.strokeRect(nx - 4, 222, 36, 56);
        ctx.shadowBlur = 0;
        return;
      }
      const near = inside === st.id;
      const pulse = 1 + Math.sin(tick * 0.06 + st.x) * 0.04;
      ctx.beginPath();
      ctx.arc(st.x, st.y, 58 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(12, 24, 52, 0.88)';
      ctx.fill();
      ctx.fillStyle = 'rgba(' + col + ', ' + (near ? 0.18 : 0.07) + ')';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(' + col + ', ' + (near ? 1 : 0.75) + ')';
      ctx.shadowColor = 'rgb(' + col + ')';
      ctx.shadowBlur = 14 * dpr;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.setLineDash([6, 8]);
      ctx.lineDashOffset = -tick * 0.6;
      ctx.beginPath();
      ctx.arc(st.x, st.y, 44, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(' + col + ', 0.35)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.setLineDash([]);
    });

    ctx.lineCap = 'round';
    for (let i = 1; i < trail.length; i++) {
      const k = i / trail.length;
      ctx.beginPath();
      ctx.moveTo(trail[i - 1][0], trail[i - 1][1]);
      ctx.lineTo(trail[i][0], trail[i][1]);
      ctx.strokeStyle = gold ? 'rgba(255, 201, 77, ' + k * 0.5 + ')' : 'rgba(200, 240, 255, ' + k * 0.4 + ')';
      ctx.lineWidth = puck.r * 1.6 * k;
      ctx.stroke();
    }

    sparks.forEach(p => {
      ctx.globalAlpha = Math.max(0, p.l);
      ctx.fillStyle = p.c;
      ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
    });
    ctx.globalAlpha = 1;

    if (drag) {
      const dx = puck.x - drag.x, dy = puck.y - drag.y, d = Math.hypot(dx, dy);
      if (d > 4) {
        const p = Math.min(16, d * 0.09) / 16;
        ctx.setLineDash([4, 8]);
        ctx.beginPath();
        ctx.moveTo(puck.x, puck.y);
        ctx.lineTo(puck.x + dx / d * (60 + p * 220), puck.y + dy / d * (60 + p * 220));
        ctx.strokeStyle = 'rgba(255, 201, 77, 0.9)';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(puck.x, puck.y);
        ctx.lineTo(drag.x, drag.y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    if (!moved) {
      const pr = puck.r + 10 + Math.sin(tick * 0.08) * 5;
      ctx.beginPath();
      ctx.arc(puck.x, puck.y, pr, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 201, 77, 0.7)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(puck.x, puck.y, puck.r, 0, Math.PI * 2);
    if (gold) {
      const g = ctx.createRadialGradient(puck.x - 4, puck.y - 4, 2, puck.x, puck.y, puck.r);
      g.addColorStop(0, '#fff3c4');
      g.addColorStop(1, '#e0a020');
      ctx.fillStyle = g;
      ctx.shadowColor = '#ffc94d';
    } else {
      ctx.fillStyle = '#05070d';
      ctx.shadowColor = '#7fe3ff';
    }
    ctx.shadowBlur = 18 * dpr;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = gold ? '#fff3c4' : 'rgba(127, 227, 255, 0.9)';
    ctx.stroke();

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.textAlign = 'center';
    const fs = Math.max(10, Math.min(13, 9 * s + 3));
    ST.forEach((st, i) => {
      const v = visited.has(st.id);
      const name = (t('nav_' + st.id) || t('st')[st.id][0]).toUpperCase();
      if (st.goal) {
        const [gx, gy] = vert ? toScreen(st.x, 345) : toScreen(st.goal < 0 ? 140 : 860, 250);
        ctx.font = '700 ' + fs + 'px "JetBrains Mono", monospace';
        ctx.fillStyle = v ? '#ffc94d' : '#ff8fa3';
        const arrow = vert ? '' : (st.goal < 0 ? '← ' : '');
        const arrow2 = vert ? '' : (st.goal > 0 ? ' →' : '');
        ctx.fillText(arrow + name + arrow2, gx, gy + fs / 3);
        return;
      }
      const [sx, sy] = toScreen(st.x, st.y);
      ctx.font = '800 ' + (fs + 7) + 'px Unbounded, sans-serif';
      ctx.fillStyle = v ? '#ffc94d' : 'rgba(233, 241, 255, 0.9)';
      const numY = vert ? sy + (fs + 7) / 3 : sy - 4;
      const nameY = vert ? sy + 58 * s + fs + 6 : sy + 22 * s + fs / 2;
      ctx.fillText(String(i + 1).padStart(2, '0'), sx, numY);
      ctx.font = '700 ' + fs + 'px "JetBrains Mono", monospace';
      ctx.fillStyle = v ? '#ffc94d' : '#e9f1ff';
      ctx.fillText(name, sx, nameY);
    });
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

  function shootTo(x, y) {
    const dx = x - puck.x, dy = y - puck.y, d = Math.hypot(dx, dy);
    if (d < 5) return;
    const v = Math.min(16, d * 0.0165 + 1);
    puck.vx = dx / d * v;
    puck.vy = dy / d * v;
    sfx.shot();
    firstMove();
  }

  function pos(e) {
    const r = cv.getBoundingClientRect();
    return toWorld(e.clientX - r.left, e.clientY - r.top);
  }

  cv.addEventListener('pointerdown', e => {
    armed = true;
    box.focus({ preventScroll: true });
    $('#panel').hidden = true;
    if (resetAt) return;
    const [x, y] = pos(e);
    if (Math.hypot(x - puck.x, y - puck.y) < 55) {
      drag = { x, y };
      cv.setPointerCapture(e.pointerId);
      cv.classList.add('drag');
    } else {
      shootTo(x, y);
    }
  });

  cv.addEventListener('pointermove', e => {
    if (!drag) return;
    const [x, y] = pos(e);
    drag.x = x;
    drag.y = y;
  });

  function release() {
    if (!drag) return;
    const dx = puck.x - drag.x, dy = puck.y - drag.y, d = Math.hypot(dx, dy);
    if (d > 8) {
      const p = Math.min(16, d * 0.09);
      puck.vx = dx / d * p;
      puck.vy = dy / d * p;
      sfx.shot();
      firstMove();
    }
    drag = null;
    cv.classList.remove('drag');
  }

  cv.addEventListener('pointerup', release);
  cv.addEventListener('pointercancel', release);

  document.addEventListener('pointerdown', e => {
    if (!box.contains(e.target)) armed = false;
  });

  window.addEventListener('keydown', e => {
    if (!armed) return;
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space'].includes(e.code)) {
      keys[e.code] = true;
      e.preventDefault();
    }
  });

  window.addEventListener('keyup', e => {
    keys[e.code] = false;
  });

  window.addEventListener('blur', () => {
    Object.keys(keys).forEach(k => { keys[k] = false; });
  });

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
  }).observe(box);

  $('#panelX').addEventListener('click', () => { $('#panel').hidden = true; });

  return {
    resize,
    visitedCount: () => visited.size,
    total: ST.length,
    arm() {
      armed = true;
      box.focus({ preventScroll: true });
    },
    goldOn() {
      if (gold) return;
      gold = true;
      burst(puck.x, puck.y, 24, '#ffc94d');
      unlock('secret');
    }
  };
}
