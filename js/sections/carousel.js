import { h, slot, PLAIN } from '../util.js';
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
  const list = PLAIN ? projects : [...projects, ...projects]; // repeat to close the ring
  const cards = list.map((p, i) =>
    h('a.ring-card', { href: `#p-${p.slug}`, style: `--i:${i}`, 'aria-hidden': i >= n ? 'true' : null, tabindex: i >= n ? '-1' : null, 'aria-label': p.title },
      slot({ src: `assets/projects/${p.slug}/cover.jpg`, alt: `${p.title} screenshot`, ratio: '16:10 · 1600x1000', fallback: cover(p, i % n) })
    )
  );
  const ring = h('div.ring', {}, cards);
  const stage = h('div.stage', {}, ring);
  const index = projects.map((p, i) =>
    h('li', {}, h('a', { href: `#p-${p.slug}` }, h('span', {}, String(i + 1).padStart(2, '0')), p.title, h('small', {}, p.tag)))
  );
  root.append(
    h('header.sec-head', {}, h('p.eyebrow', {}, 'Selected work'), h('h2.display', {}, 'Four projects, ', h('em', {}, 'one ring.'))),
    stage,
    h('ol.ring-index', {}, index),
    h('p.ring-hint.hand', {}, PLAIN ? 'swipe sideways' : 'keep scrolling, it spins')
  );
  if (PLAIN) return;

  const setActive = (k) => index.forEach((li, i) => li.classList.toggle('on', i === k));
  setActive(0);
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
