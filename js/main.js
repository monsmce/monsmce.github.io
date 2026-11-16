import { h, watch, sound, scrollTo, exists, DEV, PLAIN } from './util.js';
import { site } from './content.js';
import { hero } from './sections/hero.js';
import { carousel } from './sections/carousel.js';
import { projectsSection } from './sections/projects.js';
import { experienceSection, instagramSection } from './sections/experience.js';
import { skillsSection } from './sections/skills.js';
import { ramenSection, openCoupon } from './sections/ramen.js';
import { proofSection } from './sections/proof.js';
import { espressoSection } from './sections/espresso.js';
import { aboutSection } from './sections/about.js';
import { keysSection } from './sections/keys.js';

const root = document.documentElement;
root.classList.toggle('plain', PLAIN);
root.classList.toggle('dev', DEV);
if (window.gsap) gsap.registerPlugin(ScrollTrigger);

/* ------------------------------- nav ------------------------------------- */
function nav(el) {
  const links = [['Work', '#work'], ['Experience', '#experience'], ['Skills', '#skills'], ['Volunteering', '#volunteering'], ['About', '#about'], ['Contact', '#contact']];
  const snd = h('button.nav-sound', { type: 'button', 'aria-pressed': 'false', title: 'Sound on/off' }, 'Sound: off');
  snd.addEventListener('click', () => {
    const on = sound.toggle();
    snd.setAttribute('aria-pressed', on);
    snd.textContent = on ? 'Sound: on' : 'Sound: off';
  });
  const cv = h('a.nav-cv', { href: site.links.cv, target: '_blank', rel: 'noopener' }, 'CV');
  exists(site.links.cv).then((ok) => { if (!ok && !DEV) cv.remove(); });
  el.append(
    h('a.nav-name', { href: '#top' }, site.name),
    h('nav', { 'aria-label': 'Sections' }, links.map(([t, href]) => h('a', { href }, t))),
    h('div.nav-right', {}, h('a.avail', { href: '#contact', title: site.availability }, h('i.dot'), h('span.long', {}, site.availability), h('span.short', {}, site.availabilityShort)), snd, cv)
  );
}

/* ------------------------------ mount ------------------------------------ */
// Each section is isolated: if one fails, the rest of the page still works.
const mount = (id, fn) => {
  const el = document.getElementById(id);
  try { fn(el); } catch (err) { console.error(`Section "${id}" failed`, err); el.classList.add('failed'); }
};
mount('nav', nav);
mount('top', hero);
mount('work', carousel);
mount('projects', projectsSection);
mount('experience', experienceSection);
mount('instagram', instagramSection);
mount('skills', skillsSection);
mount('volunteering', ramenSection);
mount('proof', proofSection);
mount('espresso', espressoSection);
mount('about', aboutSection);
mount('contact', keysSection);
watch();

/* ---------------------------- smooth scroll ------------------------------ */
if (!PLAIN && window.Lenis) {
  const lenis = (window.lenis = new Lenis({ lerp: 0.11 }));
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  const target = a && document.querySelector(a.getAttribute('href'));
  if (!target) return;
  e.preventDefault();
  scrollTo(target);
  history.replaceState(null, '', a.getAttribute('href'));
});

/* --------------------- colour flip: black act -> cream act ---------------- */
// A hard cut: the moment the cream act reaches the nav, the accent flips.
const act2 = document.getElementById('act2');
const setAct = (n) => {
  if (document.body.dataset.act === String(n)) return;
  document.body.dataset.act = n;
  document.querySelector('meta[name="theme-color"]').content = n === 2 ? '#F4EEE3' : '#0B0B0C';
  sound.play('whoosh');
};
if (window.ScrollTrigger) {
  ScrollTrigger.create({ trigger: act2, start: 'top 56px', onEnter: () => setAct(2), onLeaveBack: () => setAct(1) });
} else {
  addEventListener('scroll', () => setAct(act2.getBoundingClientRect().top < 56 ? 2 : 1), { passive: true });
}

/* ----------------------------- easter egg -------------------------------- */
let typed = '';
addEventListener('keydown', (e) => {
  if (e.key.length !== 1 || e.target.closest?.('input, textarea')) return;
  typed = (typed + e.key.toLowerCase()).slice(-5);
  if (typed === 'ramen') openCoupon();
});

/* ------------------------------- ready ----------------------------------- */
const ready = () => { root.classList.add('ready'); window.ScrollTrigger?.refresh(); };
(document.fonts?.ready || Promise.resolve()).then(ready);
addEventListener('load', () => window.ScrollTrigger?.refresh());
setTimeout(ready, 2500);
