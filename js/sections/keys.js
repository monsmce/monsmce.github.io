import { h, exists, sound, doodle, DEV } from '../util.js';
import { site, ending } from '../content.js';

export function keysSection(root) {
  const L = site.links;
  const key = (label, legend, attrs, cls = '') => {
    const tag = attrs.href ? 'a' : 'button';
    const el = h(`${tag}.key${cls}`, { ...attrs, type: attrs.href ? null : 'button' },
      h('span.key-top', {}, h('small', {}, legend), h('span.key-label', {}, label)));
    el.addEventListener('pointerdown', () => sound.play('click'));
    return el;
  };
  const ext = (href) => ({ href, target: '_blank', rel: 'noopener' });

  const cv = key('CV', 'pdf', ext(L.cv));
  exists(L.cv).then((ok) => { if (!ok) DEV ? cv.classList.add('key-todo') : cv.remove(); });

  const email = L.email ? key('Email', '@', { href: `mailto:${L.email}` }) : DEV ? key('Email', 'TODO', {}, '.key-todo') : null;

  // Phone: the number is only written into the page after a click.
  let phone = null;
  if (L.phone) {
    phone = key('Phone', 'tap', {});
    phone.addEventListener('click', () => {
      phone.replaceWith(key(L.phone, 'call', { href: `tel:${L.phone.replace(/\s/g, '')}` }, '.key-wide'));
    });
  } else if (DEV) phone = key('Phone', 'TODO', {}, '.key-todo');

  const hire = key('Hire me', 'enter ↵', L.email ? { href: `mailto:${L.email}?subject=${encodeURIComponent('Internship / student job')}` } : ext(L.linkedin), '.key-hire');

  root.append(
    h('header.sec-head', {}, h('p.eyebrow', {}, 'Contact'), h('h2.display', {}, ending.heading), h('p.sec-sub', {}, ending.sub)),
    h('div.keys', {}, key('LinkedIn', 'in', ext(L.linkedin)), key('GitHub', 'git', ext(L.github)), cv, email, phone, hire),
    h('p.keys-avail', {}, h('i.dot'), site.availability),
    h('p.keys-note.hand', {}, doodle('heart'), 'thank you for scrolling all the way down'),
    h('footer.foot', {}, h('span', {}, `© ${new Date().getFullYear()} ${site.name}`), h('span', {}, ending.footer))
  );
}
