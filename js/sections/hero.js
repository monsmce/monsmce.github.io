import { h, slot, doodle, exists, DEV } from '../util.js';
import { hero as c, site } from '../content.js';

const star = '<path d="M100 62v76M62 100h76M73 73l54 54M127 73l-54 54" stroke="currentColor" stroke-width="9" stroke-linecap="round"/>';

export function hero(root) {
  // "hiii!" — hover it and it gets more excited.
  const letters = h('span', { 'aria-hidden': 'true', translate: 'no' }, [...c.hi].map((ch, i) => h('span', { style: `--i:${i}` }, ch)));
  const hi = h('p.hero-hi.brush', {}, h('span.sr', {}, 'Hi!'), letters, doodle('smiley'));
  let timer;
  hi.addEventListener('pointerenter', () => {
    timer = setInterval(() => {
      if (letters.children.length > 16) return clearInterval(timer);
      letters.lastElementChild.before(h('span.extra', {}, 'i'));
    }, 70);
  });
  hi.addEventListener('pointerleave', () => { clearInterval(timer); letters.querySelectorAll('.extra').forEach((e) => e.remove()); });

  const line = (text, i) => {
    const m = text.match(/^(.*)\{(.+)\}(.*)$/);
    const inner = m
      ? [m[1], h('em.high.brush', {}, m[2], doodle('circle')), m[3], h('span.hero-note.hand', {}, doodle('arrow'), c.note)]
      : [text];
    return h('span.line', { style: `--i:${i}` }, h('span.line-in', {}, inner));
  };

  const cv = h('a.btn.btn-solid', { href: site.links.cv, target: '_blank', rel: 'noopener' }, 'Download CV');
  exists(site.links.cv).then((ok) => { if (!ok) DEV ? cv.append(' (missing)') : cv.remove(); });

  // Arch portrait with a spinning "open to work" sticker. Empty slot = coloured arch with a smiley.
  const art = h('div.hero-art', {},
    slot({ src: c.portrait.src, alt: c.portrait.alt, ratio: '3:4 · 1200x1600', cls: 'arch hero-portrait', fallback: h('span.arch-fill', {}, doodle('smiley')) }),
    h('div.badge-spin', { 'aria-hidden': 'true', html: `<svg viewBox="0 0 200 200"><defs><path id="bc" d="M100 100m-80 0a80 80 0 1 1 160 0a80 80 0 1 1-160 0"/></defs><circle cx="100" cy="100" r="98" fill="currentColor"/><text class="badge-text"><textPath href="#bc" textLength="498" lengthAdjust="spacing">${c.badge.toUpperCase()}</textPath></text><g class="badge-star">${star}</g></svg>` })
  );

  const sep = () => h('i');
  const words = [...c.marquee, ...c.marquee].flatMap((w) => [h('span', {}, w), sep()]);

  root.append(
    h('div.hero-main', {},
      hi,
      h('h1.display', {}, c.lines.map(line))
    ),
    art,
    h('div.hero-foot', {},
      h('div.hero-intro', {},
        h('p', {}, c.intro),
        h('p.hero-avail', {}, h('i.dot'), site.availability),
        h('div.btn-row', {},
          cv,
          h('a.btn', { href: site.links.github, target: '_blank', rel: 'noopener' }, 'GitHub'),
          h('a.btn', { href: site.links.linkedin, target: '_blank', rel: 'noopener' }, 'LinkedIn'),
          h('a.btn', { href: '#contact' }, 'Contact')
        )
      ),
      h('p.hero-hint.hand', {}, c.scrollHint, doodle('down'))
    ),
    h('div.marquee', { 'aria-hidden': 'true' }, h('div.marquee-track', {}, words))
  );
  setTimeout(() => root.classList.add('revealed'), 1900);
}
