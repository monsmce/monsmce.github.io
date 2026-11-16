import { h } from '../util.js';
import { skills } from '../content.js';

export function skillsSection(root) {
  const layers = skills.layers.flatMap((l, i) => [
    h('li.layer', { 'data-reveal': '', style: `--d:${i * 2}` },
      h('div', {}, h('p.eyebrow', {}, l.tier), h('h3.display', {}, l.name)),
      h('ul.chips', {}, l.skills.map((s) => h('li', {}, s)))
    ),
    l.wire && h('li.wire', { style: `--d:${i * 2 + 1}` }, h('span', {}, l.wire)),
  ]);
  const groups = skills.groups.map((g, i) =>
    h('div.group' + (g.learning ? '.learning' : ''), { 'data-reveal': '', style: `--d:${i}` },
      h('h4', {}, g.name), h('ul.chips', {}, g.skills.map((s) => h('li', {}, s))))
  );
  root.append(
    h('header.sec-head', {},
      h('p.eyebrow', {}, 'Skills and tech stack'),
      h('h2.display', {}, 'My stack, drawn as ', h('em', {}, 'the system I built with it.')),
      h('p.sec-sub', {}, 'This is the architecture of the DESMI Seaweed Platform. Each layer lists the skills I used there.')
    ),
    h('div.arch-grid', {}, h('ol.arch-stack', {}, layers), h('div.arch-side', {}, h('p.eyebrow', {}, 'Around the system'), groups))
  );
}
