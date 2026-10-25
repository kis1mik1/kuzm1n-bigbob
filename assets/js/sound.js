import { store } from './storage.js';

let enabled = store.get('sound', false);
let actx = null;

function beep(f, d, type, v, when) {
  if (!enabled) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const o = actx.createOscillator();
    const g = actx.createGain();
    const t0 = actx.currentTime + (when || 0);
    o.type = type || 'sine';
    o.frequency.setValueAtTime(f, t0);
    g.gain.setValueAtTime(v || 0.05, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
    o.connect(g).connect(actx.destination);
    o.start(t0);
    o.stop(t0 + d);
  } catch (e) {}
}

export const sfx = {
  hit: () => beep(170, 0.06, 'triangle', 0.08),
  shot: () => beep(110, 0.05, 'square', 0.05),
  station: () => { beep(660, 0.1, 'sine', 0.06); beep(990, 0.14, 'sine', 0.05, 0.08); },
  goal: () => { beep(220, 0.6, 'sawtooth', 0.05); beep(277, 0.6, 'sawtooth', 0.04); beep(330, 0.6, 'sawtooth', 0.03); },
  ach: () => [523, 659, 784, 1047].forEach((f, i) => beep(f, 0.16, 'triangle', 0.05, i * 0.07))
};

export const isSoundOn = () => enabled;

export function setSoundOn(value) {
  enabled = value;
  store.set('sound', value);
}
