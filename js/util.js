const q = new URLSearchParams(location.search);
const local = ['localhost', '127.0.0.1', ''].includes(location.hostname);

/** DEV: labelled placeholders for empty slots. Local by default; ?dev forces on, ?live forces off. */
export const DEV = (local || q.has('dev')) && !q.has('live');

export const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
/** PLAIN: no pinned scroll scenes (reduced motion, small screens, weak devices). */
export const PLAIN =
  q.has('plain') ||
  !window.gsap ||
  REDUCED ||
  innerWidth < 900 ||
  navigator.connection?.saveData === true ||
  (navigator.hardwareConcurrency || 8) <= 2;

/** h('div.card#id', {attrs}, ...children) */
export function h(spec, attrs = {}, ...kids) {
  const [tagId, ...cls] = spec.split('.');
  const [tag, id] = tagId.split('#');
  const el = document.createElement(tag || 'div');
  if (id) el.id = id;
  if (cls.length) el.className = cls.join(' ');
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k === 'html') el.innerHTML = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  el.append(...kids.flat(Infinity).filter((k) => k != null && k !== false));
  return el;
}

export const probe = (src) =>
  new Promise((res) => {
    if (!src) return res(false);
    const i = new Image();
    i.onload = () => res(true);
    i.onerror = () => res(false);
    i.src = src;
  });

export const exists = (url) =>
  fetch(url, { method: 'HEAD' }).then((r) => r.ok && !(r.headers.get('content-type') || '').includes('text/html')).catch(() => false);

const devLabel = (src, ratio) => h('span.slot-label', {}, h('b', {}, 'EMPTY SLOT'), src, h('i', {}, ratio));

/**
 * Media slot. Shows the file when it exists. When it is missing:
 * live site -> `fallback` node (or the slot removes itself); dev -> fallback + a label with the path.
 */
export function slot({ src, alt = '', ratio = '', cls = '', fallback = null, onMissing = null }) {
  const box = h('div.slot' + (cls ? '.' + cls.split(' ').join('.') : ''));
  const missing = () => {
    box.classList.add('is-empty');
    if (fallback) box.append(fallback);
    if (DEV) box.append(devLabel(src, ratio));
    else if (!fallback) box.remove();
    onMissing?.();
  };
  if (!src) { missing(); return box; }
  if (src.endsWith('.mp4')) {
    const v = h('video', { src, muted: true, loop: true, playsinline: true, autoplay: true, preload: 'metadata', 'aria-label': alt });
    v.muted = true;
    v.onerror = () => { v.remove(); missing(); };
    box.append(v);
    return box;
  }
  const img = h('img', { src, alt, loading: 'lazy', decoding: 'async' });
  img.onerror = () => { img.remove(); missing(); };
  box.append(img);
  return box;
}

/** Adds .is-in when an element scrolls into view (CSS does the animation). */
const io = new IntersectionObserver(
  (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }),
  { rootMargin: '0px 0px -12% 0px', threshold: 0.1 }
);
export const watch = (root = document) => root.querySelectorAll('[data-reveal], .doodle, .wire').forEach((el) => io.observe(el));

/* Hand-drawn doodles. Paths draw themselves when they scroll into view (.is-in). */
const D = {
  smiley: ['M50 8C22 6 6 28 8 52s22 42 46 40 42-22 38-48S76 6 46 9', 'M34 36c1 4 1 8 0 11', 'M62 34c2 4 2 8 1 12', 'M28 62c10 16 34 17 46-2'],
  arrow: ['M6 12c30-8 62 4 78 44', 'M66 44c8 6 14 10 18 13 0-8 2-16 6-24'],
  squiggle: ['M4 14c12-12 20 10 32 0s20 10 32 0 20 10 32 0 20 10 32 0 20 10 32 0'],
  circle: ['M96 10C52 2 8 14 6 36s40 34 92 30 88-18 84-38S128 2 60 10'],
  star: ['M50 6l10 30 32 2-25 20 9 32-26-18-27 18 9-32L8 38l31-2z'],
  heart: ['M50 84C20 62 6 44 10 26 14 10 36 6 50 26 64 6 86 10 90 26c4 18-10 36-40 58z'],
  down: ['M24 4c-6 30 8 50 2 84', 'M8 68c6 8 12 16 18 22 4-10 10-18 18-26'],
  steam: ['M20 60c-10-14 10-22 0-38S24 8 20 4', 'M50 60c-10-14 10-22 0-38S54 8 50 4'],
};
const VB = { squiggle: '0 0 200 28', circle: '0 0 190 72', steam: '0 0 70 64', down: '0 0 52 96' };
export function doodle(name, cls = '') {
  const paths = D[name].map((d, i) => `<path d="${d}" pathLength="1" style="--i:${i}"/>`).join('');
  const el = h('span.doodle.doodle-' + name + (cls ? '.' + cls : ''), {
    'aria-hidden': 'true',
    html: `<svg viewBox="${VB[name] || '0 0 100 100'}" ${name === "circle" || name === "squiggle" ? 'preserveAspectRatio="none" ' : ""}fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`,
  });
  io.observe(el); // works even when the doodle is added to the page later
  return el;
}

/* ------------------------------- sound ----------------------------------- */
// Synthesised, so no audio files are needed. Muted until the visitor turns it on.
let ctx;
export const sound = {
  on: false,
  toggle() {
    this.on = !this.on;
    if (this.on) { ctx ||= new (window.AudioContext || window.webkitAudioContext)(); ctx.resume(); this.play('click'); }
    return this.on;
  },
  play(name) {
    if (!this.on || !ctx) return;
    const t = ctx.currentTime;
    const [dur, type, f0, f1, vol] = { click: [0.05, 'bandpass', 1800, 900, 0.5], whoosh: [0.45, 'bandpass', 300, 2400, 0.18], hiss: [0.9, 'highpass', 5000, 7000, 0.07] }[name];
    const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource(); src.buffer = buf;
    const flt = ctx.createBiquadFilter(); flt.type = type; flt.Q.value = 0.8;
    flt.frequency.setValueAtTime(f0, t); flt.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + Math.min(0.02, dur / 4));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(flt).connect(g).connect(ctx.destination);
    src.start(t);
  },
};

/** Smooth scroll to an element or a pixel position (uses Lenis when it runs). */
export const scrollTo = (target) => {
  if (window.lenis) window.lenis.scrollTo(target, { offset: 0 });
  else if (typeof target === 'number') window.scrollTo({ top: target, behavior: REDUCED ? 'auto' : 'smooth' });
  else target.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth' });
};
