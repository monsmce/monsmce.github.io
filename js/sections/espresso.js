import { h, sound, PLAIN } from '../util.js';
import { espresso as c } from '../content.js';

const POUR_END = 0.9; // the last 10% of the scroll holds the finished shot

export function espressoSection(root) {
  const cards = c.beats.map((b) =>
    h(`div.esp-card.${b.pos}` + (b.hand ? '.hand' : ''), {}, b.title && h('p.eyebrow', {}, b.title), h('p', {}, b.text)));
  const still = `${c.dir}/still.webp`;
  const head = h('h2.esp-head.hand', {}, c.heading);

  if (PLAIN) {
    root.classList.add('esp-plain');
    const img = h('img.esp-still', { src: still, alt: 'A finished espresso shot in a glass', loading: 'lazy' });
    img.onerror = () => img.remove();
    root.append(head, img, h('div.esp-cards', {}, cards));
    return;
  }

  const canvas = h('canvas.esp-canvas', { width: 1280, height: 720, role: 'img', 'aria-label': 'Espresso pouring into a glass' });
  const meter = h('p.esp-meter.hand', { 'aria-hidden': 'true' });
  root.append(head, canvas, ...cards, meter);

  const g = canvas.getContext('2d');
  const imgs = [];
  let last = -1, want = 0;
  const draw = () => {
    let k = want;
    while (k >= 0 && !(imgs[k] && imgs[k].complete && imgs[k].naturalWidth)) k--;
    if (k < 0 || k === last) return;
    g.drawImage(imgs[k], 0, 0, 1280, 720);
    last = k;
  };
  const load = () => {
    for (let i = 0; i < c.frames; i++) {
      const im = new Image();
      im.decoding = 'async';
      im.onload = draw;
      im.src = `${c.dir}/f-${String(i).padStart(3, '0')}.webp`;
      imgs[i] = im;
    }
  };
  const update = (p) => {
    const pour = Math.min(1, p / POUR_END);
    want = Math.round(pour * (c.frames - 1));
    draw();
    c.beats.forEach((b, i) => cards[i].classList.toggle('on', pour >= b.at && pour < b.out));
    meter.textContent = pour >= 1 ? 'done. drink it while it is hot.' : `pouring… ${Math.round(pour * 100)}%`;
  };

  ScrollTrigger.create({ trigger: root, start: 'top 300%', once: true, onEnter: load });
  ScrollTrigger.create({
    trigger: root, start: 'top top', end: '+=380%', pin: true,
    onUpdate: (s) => update(s.progress),
    onEnter: () => sound.play('hiss'),
  });
  update(0);
}
