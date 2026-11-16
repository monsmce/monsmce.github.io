import { h, slot, doodle, DEV } from '../util.js';
import { proof } from '../content.js';

export function proofSection(root) {
  const badges = proof.badges.map((b, i) =>
    h('li.badge', { 'data-reveal': '', style: `--d:${i}` },
      b.image && slot({ src: b.image, alt: b.alt || b.title, ratio: '4:5 · 1200x1500', cls: 'arch badge-img' }),
      h('strong.display', {}, b.title),
      h('span', {}, b.detail)
    )
  );
  const quotes = proof.quotes
    .filter((q) => q.text || DEV)
    .map((q) => h('blockquote.quote' + (q.text ? '' : '.todo'), {}, h('p', {}, q.text || 'TODO: a real quote (tutoring feedback, jury, manager)'), h('cite', {}, q.by || 'TODO: who said it')));
  root.append(
    h('header.sec-head', {}, h('p.eyebrow', {}, 'Proof'), h('h2.display', {}, 'Not only my word ', h('em', {}, 'for it.'), doodle('star'))),
    h('ul.badges', {}, badges),
    ...(quotes.length ? [h('div.quotes', {}, quotes)] : [])
  );
}
