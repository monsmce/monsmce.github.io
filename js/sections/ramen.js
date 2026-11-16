import { h, probe, doodle, sound, scrollTo, DEV, PLAIN } from '../util.js';
import { volunteering, coupon } from '../content.js';

/* ---- The bowl: drawn in SVG, seen from above. Ingredients sit every 90 degrees. ---- */
const C = 300; // centre of the 600x600 drawing
const at = (deg, inner) => `<g transform="rotate(${deg} ${C} ${C}) translate(${C + 165} ${C})">${inner}</g>`;

function noodles() {
  let out = '';
  for (const [color, w] of [['#C9963F', 13], ['#F3D58A', 8]]) {
    for (let k = 0; k < 7; k++) {
      const pts = [];
      for (let a = 0; a < 360; a += 5) {
        const t = (a * Math.PI) / 180;
        const r = 34 + k * 24 + 8 * Math.sin(5 * t + k * 1.3) + 5 * Math.sin(9 * t + k * 2.1);
        pts.push(`${(C + r * Math.cos(t)).toFixed(1)},${(C + r * Math.sin(t)).toFixed(1)}`);
      }
      out += `<polygon points="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linejoin="round"/>`;
    }
  }
  return out;
}
const spiral = () => {
  const pts = [];
  for (let a = 0; a <= 900; a += 20) { const t = (a * Math.PI) / 180, r = 3 + a / 36; pts.push(`${(r * Math.cos(t)).toFixed(1)},${(r * Math.sin(t)).toFixed(1)}`); }
  return `<polyline points="${pts.join(' ')}" fill="none" stroke="#EE6C98" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`;
};
const scallops = Array.from({ length: 12 }, (_, i) => { const t = (i * Math.PI) / 6; return `<circle cx="${(38 * Math.cos(t)).toFixed(1)}" cy="${(38 * Math.sin(t)).toFixed(1)}" r="11" fill="#FFFDF7"/>`; }).join('');
const scallions = [[250, 150], [390, 180], [200, 330], [330, 420], [420, 380], [300, 215], [215, 245], [370, 300], [270, 370], [345, 135]]
  .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#DDEFC4" stroke="#5FA052" stroke-width="4"/>`).join('');

const egg = (y) => `<ellipse cx="-6" cy="${y}" rx="40" ry="31" fill="#FFFDF7"/><circle cx="-2" cy="${y}" r="16" fill="#F29A2E"/><circle cx="-7" cy="${y - 5}" r="4" fill="#F9C56B"/>`;
const chashu = (x, y) => `<circle cx="${x}" cy="${y}" r="44" fill="#D79C79"/><circle cx="${x}" cy="${y}" r="29" fill="none" stroke="#B4714F" stroke-width="7"/><circle cx="${x}" cy="${y}" r="11" fill="#EBC5AC"/>`;

const bowlSVG = `
<svg viewBox="0 0 600 600" aria-hidden="true">
  <circle cx="${C}" cy="${C}" r="294" fill="#F4F1EA"/>
  <circle cx="${C}" cy="${C}" r="272" fill="none" stroke="var(--accent)" stroke-width="6"/>
  <circle cx="${C}" cy="${C}" r="254" fill="#D98E32"/>
  <circle cx="220" cy="210" r="22" fill="#E3A44C"/><circle cx="395" cy="250" r="14" fill="#E3A44C"/><circle cx="330" cy="440" r="18" fill="#E3A44C"/>
  ${noodles()}
  ${scallions}
  ${at(0, egg(-36) + egg(36))}
  ${at(90, `<rect x="-6" y="-66" width="118" height="60" rx="7" fill="#1E3A2B"/><rect x="2" y="4" width="118" height="60" rx="7" fill="#24493A" transform="rotate(6)"/>`)}
  ${at(180, chashu(0, -38) + chashu(8, 42))}
  ${at(270, `${scallops}<circle r="39" fill="#FFFDF7"/>${spiral()}`)}
</svg>`;

/* ---- Photo gallery: arrows only, scroll never changes the photo. ---- */
function gallery(ev) {
  const frame = h('div.gal-frame.arch');
  const cap = h('figcaption');
  const count = h('span.gal-count', { 'aria-live': 'polite' });
  let list = [], i = 0;
  const show = (k) => {
    if (!list.length) return;
    i = (k + list.length) % list.length;
    const ph = list[i];
    frame.replaceChildren(ph.ok
      ? h('img', { src: ph.src, alt: ph.alt })
      : h('span.slot-label', {}, h('b', {}, 'EMPTY SLOT'), ph.src, h('i', {}, '3:4 · 1200x1600')));
    cap.textContent = ph.caption || (DEV ? 'TODO: caption for this photo' : '');
    count.textContent = `${i + 1}/${list.length}`;
  };
  const btn = (label, d, arrow) => h('button.gal-btn', { type: 'button', 'aria-label': label, onclick: () => { show(i + d); sound.play('click'); } }, arrow);
  const controls = h('div.gal-controls', {}, btn('Previous photo', -1, '←'), count, btn('Next photo', 1, '→'));
  const fig = h('figure.gal', { 'aria-label': `Photos: ${ev.org}` }, frame, controls, cap);
  fig.step = (d) => show(i + d);
  Promise.all(ev.photos.map(async (p) => ({ ...p, ok: await probe(p.src) }))).then((all) => {
    list = DEV ? all : all.filter((p) => p.ok);
    if (!list.length) return fig.remove();
    controls.hidden = list.length < 2;
    show(0);
  });
  return fig;
}

/* ---- The coupon (easter egg). ---- */
let dialog;
export function openCoupon() {
  if (!dialog) {
    dialog = h('dialog.coupon', { 'aria-label': coupon.title },
      h('div.ticket', {},
        h('div.ticket-main', {},
          h('p.eyebrow', {}, 'You found the naruto'),
          h('h2.display', {}, coupon.title),
          h('p', {}, coupon.line),
          h('p.hand.ticket-cond', {}, coupon.condition),
          h('small', {}, coupon.small)
        ),
        h('div.ticket-stub', {},
          h('span', {}, 'ADMIT ONE'), h('strong.display', {}, 'No. 001'),
          h('a.btn.btn-solid', { href: '#contact', onclick: () => dialog.close() }, coupon.cta)
        )
      ),
      h('button.coupon-close', { type: 'button', onclick: () => dialog.close() }, 'Close')
    );
    dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
    document.body.append(dialog);
  }
  dialog.showModal();
  sound.play('whoosh');
}

export function ramenSection(root) {
  const n = volunteering.length;
  const hot = (deg, label, onclick, cls = '') => {
    const t = (deg * Math.PI) / 180;
    return h('button.hot' + cls, { type: 'button', 'aria-label': label, onclick, style: `left:${50 + 27.5 * Math.cos(t)}%;top:${50 + 27.5 * Math.sin(t)}%` });
  };
  const spin = h('div.bowl-spin', { html: bowlSVG });
  const panels = volunteering.map((ev, i) =>
    h('article.ev', { id: `ev-${i}` },
      h('div.ev-text', {},
        h('p.eyebrow', {}, `${ev.ingredient} · ${i + 1}/${n}`),
        h('h3.display', {}, ev.org),
        h('p.ev-role', {}, `${ev.role} · ${ev.dates}`),
        h('ul', {}, ev.points.map((p) => h('li', {}, p)))
      ),
      gallery(ev)
    )
  );
  let step = -1, st;
  const go = (i) => {
    if (i === step) return;
    step = i;
    panels.forEach((p, k) => p.classList.toggle('on', k === i));
    if (window.gsap) gsap.to(spin, { rotation: -i * 90, duration: PLAIN ? 0.6 : 1, ease: 'power3.inOut' });
    else spin.style.transform = `rotate(${-i * 90}deg)`;
  };
  volunteering.forEach((ev, i) =>
    spin.append(hot(i * 90, `${ev.ingredient}: ${ev.org}`, () => {
      if (st) scrollTo(st.start + ((i + 0.5) / n) * (st.end - st.start));
      else { go(i); panels[i].scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    }))
  );
  spin.append(hot(270, 'Naruto. Something is hidden here.', openCoupon, '.hot-naruto'));

  root.append(
    h('div.ramen-left', {},
      h('header.sec-head', {}, h('p.eyebrow', {}, 'Volunteering and leadership'), h('h2.display', {}, 'One bowl, ', h('em', {}, 'three ingredients.'))),
      h('div.bowl', {}, spin, h('span.chopsticks', { 'aria-hidden': 'true' }), h('span.bowl-pointer.hand', { 'aria-hidden': 'true' }, doodle('arrow'))),
      h('p.ramen-hint.hand', {}, PLAIN ? 'tap an ingredient' : 'scroll to spin the bowl. look closely at the toppings.')
    ),
    h('div.ev-wrap', {}, panels)
  );
  go(0);

  // Keyboard arrows change the photo of the event on screen.
  addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    if (document.querySelector('dialog[open]')) return;
    const r = root.getBoundingClientRect();
    if (r.top > innerHeight * 0.5 || r.bottom < innerHeight * 0.5) return;
    const fig = (PLAIN ? document.activeElement?.closest?.('.ev') : panels[step])?.querySelector('.gal');
    fig?.step(e.key === 'ArrowRight' ? 1 : -1);
  });

  if (PLAIN) return;
  st = ScrollTrigger.create({
    trigger: root, start: 'top top', end: `+=${n * 90}%`, pin: true,
    onUpdate: (s) => go(Math.min(n - 1, Math.floor(s.progress * n))),
  });
}
