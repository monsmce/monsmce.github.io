import { h, doodle, exists, DEV } from '../util.js';
import { hero as c, site } from '../content.js';

export function hero(root) {
  // "hiii!" — hover it and it gets more excited.
  const letters = h('span', { 'aria-hidden': 'true', translate: 'no' }, [...c.hi].map((ch, i) => h('span', { style: `--i:${i}` }, ch)));
  const hi = h('p.hero-hi.hand', {}, h('span.sr', {}, 'Hi!'), letters, doodle('smiley'));
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
      ? [m[1], h('em.high', {}, m[2], doodle('circle')), m[3], h('span.hero-note.hand', {}, doodle('arrow'), c.note)]
      : [text];
    return h('span.line', { style: `--i:${i}` }, h('span.line-in', {}, inner));
  };

  const cv = h('a.btn.btn-solid', { href: site.links.cv, target: '_blank', rel: 'noopener' }, 'Download CV');
  exists(site.links.cv).then((ok) => { if (!ok) DEV ? cv.append(' (missing)') : cv.remove(); });

  root.append(
    h('div.hero-main', {},
      hi,
      h('h1.display', {}, c.lines.map(line))
    ),
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
    )
  );
  setTimeout(() => root.classList.add('revealed'), 1900);
}
