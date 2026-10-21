// 1. Aparición escalonada al hacer scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.setProperty('--i', i % 3);
  io.observe(el);
});

// 2. Borde de luz que sigue al cursor
const cards = document.querySelectorAll('.card');
cards.forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
});

// 3. Filtros con View Transitions (si el navegador no las soporta, filtra sin animar)
const chips = document.querySelectorAll('.chip');
cards.forEach((card, i) => { card.style.viewTransitionName = `card-${i}`; });

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    const filter = chip.dataset.filter;
    const apply = () => {
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
      cards.forEach((card) => {
        card.hidden = filter !== 'all' && !card.dataset.tags.split(' ').includes(filter);
      });
    };
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (document.startViewTransition && !reduce) document.startViewTransition(apply);
    else apply();
  });
});
