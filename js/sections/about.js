import { h, slot, doodle, DEV, PLAIN } from '../util.js';
import { about } from '../content.js';

const DOODLES = ['star', 'heart', 'smiley', 'steam', 'star'];

export function aboutSection(root) {
  // First 5 arches always show (flat colour + doodle when the photo is missing); the rest only when filled.
  const arches = about.photos.map((p, i) =>
    slot({
      src: p.src, alt: p.alt, ratio: '3:4 · 1200x1600', cls: `arch collage-item c${i % 5}`,
      fallback: i < 5 ? h('span.arch-fill', {}, doodle(DOODLES[i])) : null,
    })
  );
  const lists = about.lists
    .filter((l) => l.items.length || DEV)
    .map((l, i) =>
      h('div.about-list', { 'data-reveal': '', style: `--d:${i}` },
        h('h3.eyebrow', {}, l.title),
        h('ul', {}, l.items.length ? l.items.map((t) => h('li', {}, t)) : h('li.todo', {}, 'TODO: add items in js/content.js')))
    );
  const collage = h('div.collage', {}, arches);
  root.append(
    h('header.sec-head', {}, h('p.eyebrow', {}, 'About me'), h('h2.display', {}, about.heading)),
    collage,
    h('blockquote.about-quote.hand', { 'data-reveal': '' }, about.quote, doodle('squiggle')),
    h('div.about-lists', {}, lists)
  );
  if (!PLAIN) {
    collage.querySelectorAll('.collage-item').forEach((el, i) =>
      gsap.fromTo(el, { y: 40 + (i % 3) * 50 }, { y: -(20 + (i % 3) * 30), ease: 'none', scrollTrigger: { trigger: collage, start: 'top bottom', end: 'bottom top', scrub: true } }));
  }
}
