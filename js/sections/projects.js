import { h, slot, DEV, PLAIN } from '../util.js';
import { projects, skills } from '../content.js';

// Neutral designed screen, shown when a screenshot is missing.
const ui = (p) =>
  h('div.ui', { 'aria-hidden': 'true' },
    h('div.ui-bar', {}, h('i'), h('i'), h('i')),
    h('div.ui-body', {}, h('strong', {}, p.title), h('span.ui-line'), h('span.ui-line.short'), h('div.ui-blocks', {}, h('i'), h('i'), h('i')))
  );

const miniArch = () =>
  h('ol.mini-arch', { 'aria-label': 'Architecture: three tiers' },
    skills.layers.flatMap((l) => [h('li.node', {}, h('small', {}, l.tier), l.name), l.wire && h('li.edge', {}, l.wire)])
  );

function project(p, i) {
  const d = `assets/projects/${p.slug}`;
  const rows = [['Problem', p.problem], ['My role', p.role], ['Key decision', p.decision], ['Result', p.result]];
  const link = (label, url) =>
    url ? h('a.btn', { href: url, target: '_blank', rel: 'noopener' }, label)
        : DEV ? h('span.btn.btn-todo', {}, `TODO ${label} link`) : null;
  const lid = h('div.lid', {}, slot({ src: `${d}/laptop.jpg`, alt: `${p.title}: screenshot on a laptop`, ratio: '16:10 · 1600x1000', cls: 'screen', fallback: ui(p) }));
  const media = h('div.p-media', {},
    h('div.laptop', {}, lid, h('div.base')),
    p.phone && h('div.phone', {}, slot({ src: `${d}/phone-1.jpg`, alt: `${p.title}: screenshot on a phone`, ratio: '9:19.5 · 1080x2340', cls: 'screen', fallback: ui(p) })),
    p.architecture && h('div.p-arch', {}, slot({ src: `${d}/architecture.svg`, alt: `${p.title}: architecture diagram`, ratio: 'free · svg', fallback: miniArch() }))
  );
  const art = h('article.project' + (i % 2 ? '.flip' : ''), { id: `p-${p.slug}` },
    h('div.p-text', { 'data-reveal': '' },
      h('p.eyebrow', {}, `${String(i + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')} · ${p.year} · ${p.tag}`),
      h('h3.display', {}, p.title),
      h('p.p-sum', {}, p.summary),
      h('dl', {}, rows.map(([k, v]) => v && h('div', {}, h('dt', {}, k), h('dd', {}, v)))),
      h('ul.chips', {}, p.stack.map((s) => h('li', {}, s))),
      h('div.btn-row', {}, link('Repo', p.links.repo), link('Demo', p.links.demo))
    ),
    media
  );
  if (!PLAIN) {
    // The laptop opens as the project scrolls in.
    gsap.fromTo(lid, { rotateX: -78 }, { rotateX: 0, ease: 'none', scrollTrigger: { trigger: media, start: 'top 95%', end: 'top 35%', scrub: true } });
    gsap.fromTo(media.querySelectorAll('.phone, .p-arch'), { y: 90 }, { y: -30, ease: 'none', scrollTrigger: { trigger: media, start: 'top bottom', end: 'bottom top', scrub: true } });
  }
  return art;
}

export function projectsSection(root) {
  root.append(
    h('header.sec-head', {}, h('p.eyebrow', {}, 'Case studies'), h('h2.display', {}, 'What I built, ', h('em', {}, 'and why.'))),
    ...projects.map(project)
  );
}
