import { h, slot, PLAIN, REDUCED } from '../util.js';
import { projects } from '../content.js';

const STEP = 45; // degrees between cards (8 cards on the ring)

const cover = (p, i) =>
  h('div.cover', { 'aria-hidden': 'true' },
    h('span.cover-n', {}, String(i + 1).padStart(2, '0')),
    h('strong', {}, p.title),
    h('span', {}, p.stack.slice(0, 4).join(' · '))
  );

export function carousel(root) {
  const n = projects.length;
  const list = [...projects, ...projects]; // repeated so the ring closes: 8 cards
  const cards = list.map((p, i) =>
    h('a.ring-card', { href: `#p-${p.slug}`, style: `--i:${i}`, 'aria-hidden': i >= n ? 'true' : null, tabindex: i >= n ? '-1' : null, 'aria-label': p.title },
      slot({ src: `assets/projects/${p.slug}/cover.jpg`, alt: `${p.title} screenshot`, ratio: '16:10 · 1600x1000', fallback: cover(p, i % n) })
    )
  );
  const ring = h('div.ring', {}, cards);
  const stage = h('div.stage', { role: 'group', 'aria-label': 'Project ring' }, ring);
  const index = projects.map((p, i) =>
    h('li', {}, h('a', { href: `#p-${p.slug}` }, h('span', {}, String(i + 1).padStart(2, '0')), p.title, h('small', {}, p.tag)))
  );
  const setActive = (k) => index.forEach((li, i) => li.classList.toggle('on', i === k));
  setActive(0);

  const hint = h('p.ring-hint.hand', {}, PLAIN ? 'drag it, or use the arrows' : 'keep scrolling, it spins');
  const nav = [hint];

  if (PLAIN) {
    // Always 3D. Without scroll-pinning the ring is turned by arrows, drag and keys.
    root.classList.add('ring-free');
    let cur = 0, timer;
    const apply = () => { ring.style.setProperty('--rot', -cur * STEP + 'deg'); setActive(((cur % n) + n) % n); };
    const step = (d) => { cur += d; apply(); };
    const btn = (label, d, t) => h('button.ring-btn', { type: 'button', 'aria-label': label, onclick: () => step(d) }, t);
    nav.unshift(btn('Previous project', -1, '←'));
    nav.push(btn('Next project', 1, '→'));
    let x0 = null;
    stage.addEventListener('pointerdown', (e) => { x0 = e.clientX; });
    stage.addEventListener('pointerup', (e) => { if (x0 != null && Math.abs(e.clientX - x0) > 40) step(e.clientX < x0 ? 1 : -1); x0 = null; });
    stage.addEventListener('dragstart', (e) => e.preventDefault());
    root.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') step(-1); if (e.key === 'ArrowRight') step(1); });
    if (!REDUCED) {
      const play = () => { clearInterval(timer); timer = setInterval(() => step(1), 3600); };
      root.addEventListener('pointerenter', () => clearInterval(timer));
      root.addEventListener('pointerleave', play);
      root.addEventListener('focusin', () => clearInterval(timer));
      play();
    }
    apply();
  }

  root.append(
    h('header.sec-head', {}, h('p.eyebrow', {}, 'Selected work'), h('h2.display', {}, 'Four projects, ', h('em', {}, 'one ring.'))),
    stage,
    h('div.ring-nav', {}, nav),
    h('ol.ring-index', {}, index)
  );
  if (PLAIN) return;

  const state = { rot: 0 };
  gsap.to(state, {
    rot: -(n - 1) * STEP,
    ease: 'none',
    scrollTrigger: { trigger: root, start: 'top top', end: '+=220%', pin: true, scrub: true },
    onUpdate() {
      ring.style.setProperty('--rot', state.rot + 'deg');
      setActive(Math.round(-state.rot / STEP));
    },
  });
  // The hero "falls into" the ring.
  gsap.from(stage, { scale: 0.55, yPercent: 18, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'top top', scrub: true } });
}
