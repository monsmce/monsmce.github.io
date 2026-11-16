import { h, doodle, PLAIN } from '../util.js';
import { experience, instagram } from '../content.js';

const card = (x) =>
  h('article.xp', { tabindex: '0' },
    h('p.eyebrow', {}, x.dates),
    h('h3', {}, x.role),
    h('p.xp-org', {}, x.org),
    h('p', {}, x.summary),
    h('div.xp-more', {}, h('ul', {}, x.details.map((d) => h('li', {}, d))))
  );

export function experienceSection(root) {
  const colA = h('div.xp-col', {}, experience.filter((_, i) => i % 2 === 0).map(card));
  const colB = h('div.xp-col', {}, experience.filter((_, i) => i % 2 === 1).map(card),
    h('p.xp-note.hand', {}, doodle('star'), 'hover a card. it has more to say.'));
  root.append(
    h('header.sec-head', {}, h('p.eyebrow', {}, 'Work experience · all paid'), h('h2.display', {}, 'Five roles. ', h('em', {}, 'Events in five countries.'))),
    h('div.xp-cols', {}, colA, colB)
  );
  if (!PLAIN) {
    const st = { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true };
    gsap.fromTo(colA, { y: 90 }, { y: -90, ease: 'none', scrollTrigger: st });
    gsap.fromTo(colB, { y: -70 }, { y: 110, ease: 'none', scrollTrigger: st });
  }
}

export function instagramSection(root) {
  const fmt = (n) => Math.round(n).toLocaleString('en-US');
  const nums = instagram.stats.map((s) => {
    const el = h('strong.display', {}, s.prefix + fmt(s.value) + s.suffix);
    return { s, el };
  });
  root.append(
    h('p.eyebrow', {}, instagram.eyebrow),
    h('h2.display', {}, instagram.title),
    h('ul.ig-stats', {}, nums.map(({ s, el }) => h('li', {}, el, h('span', {}, s.label)))),
    h('p.ig-note.hand', {}, instagram.note, doodle('squiggle'))
  );
  if (PLAIN) return;
  nums.forEach(({ s, el }) => {
    const o = { v: 0 };
    gsap.to(o, {
      v: s.value, duration: 1.8, ease: 'power3.out',
      scrollTrigger: { trigger: root, start: 'top 60%', once: true },
      onUpdate: () => (el.textContent = s.prefix + fmt(o.v) + s.suffix),
    });
  });
}
