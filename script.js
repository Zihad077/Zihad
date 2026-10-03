/* ===== EDIT YOUR INFO HERE ===== */
const portfolioConfig = {
  name: "Zihad",
  email: "Zihad.Dev.Pro@gmail.com",
  github: "https://github.com/Zihad077",
  telegram: "https://t.me/Zihad0770",
  projects: { // empty = no link shown. Add URLs when ready.
    focuslock: "#focuslock",
    focuslockDetails: "https://focuslockz.vercel.app",

    pocketai: "", bots: "", web: ""
  }
};
/* =============================== */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const C = portfolioConfig;

$$('[data-cfg]').forEach(a => {
  const k = a.dataset.cfg;
  a.href = a.hasAttribute('data-mail') ? 'mailto:' + C.email : C[k];
});
$$('[data-email-text]').forEach(e => e.textContent = C.email);
$$('[data-proj-link]').forEach(a => {
  const u = C.projects[a.dataset.projLink];
  if (u) { a.href = u; if (u.startsWith('http')) { a.target = '_blank'; a.rel = 'noopener'; } } else a.remove();
});

// Theme
const root = document.documentElement;
$('#theme').onclick = () => {
  const t = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = t;
  $('meta[name=theme-color]').content = t === 'dark' ? '#06080c' : '#eef0f5';
  try { localStorage.setItem('theme', t); } catch (e) {}
};

// Nav scroll state + back to top
const nav = $('#nav'), toTop = $('#totop');
const onScroll = () => {
  nav.classList.toggle('solid', scrollY > 30);
  toTop.classList.toggle('show', scrollY > 700);
  const h = $('.hero-img img'); if (h && scrollY < innerHeight) h.style.transform = `translateY(${scrollY * 0.08}px) scale(1.04)`;
};
addEventListener('scroll', onScroll, { passive: true }); onScroll();
toTop.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });

// Dropdown menu
const menu = $('#menu'), burger = $('#burger');
const setMenu = o => { menu.classList.toggle('open', o); burger.setAttribute('aria-expanded', o); menu.setAttribute('aria-hidden', !o); };
burger.onclick = e => { e.stopPropagation(); setMenu(!menu.classList.contains('open')); };
$$('a', menu).forEach(a => a.onclick = () => setMenu(false));
document.addEventListener('click', e => { if (!menu.contains(e.target)) setMenu(false); });
addEventListener('keydown', e => e.key === 'Escape' && setMenu(false));
addEventListener('resize', () => innerWidth > 820 && setMenu(false));

// Active nav link
const links = $$('.links a');
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(l => l.classList.toggle('on', l.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
$$('main section[id]').forEach(s => spy.observe(s));

// Reveal on scroll
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: 0.12 });
$$('.rv').forEach((el, i) => { el.style.setProperty('--d', (i % 4) * 70 + 'ms'); io.observe(el); });

// Stat count-up
$$('.stats b').forEach(b => {
  const n = parseInt(b.textContent), s = b.textContent.replace(/[0-9]/g, '');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  new IntersectionObserver(([e], o) => {
    if (!e.isIntersecting) return; o.disconnect();
    const t0 = performance.now();
    (function f(t) { const p = Math.min((t - t0) / 900, 1); b.textContent = String(Math.round(n * p)).padStart(2, '0') + s; if (p < 1) requestAnimationFrame(f); })(t0);
  }).observe(b);
});

// Custom cursor (fine pointers only)
if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
  const c = $('.cursor'); document.body.classList.add('has-cursor');
  addEventListener('mousemove', e => { c.style.transform = `translate(${e.clientX}px,${e.clientY}px)`; c.style.opacity = 1; });
  $$('a,button,.proj').forEach(el => { el.onmouseenter = () => c.classList.add('big'); el.onmouseleave = () => c.classList.remove('big'); });
}
