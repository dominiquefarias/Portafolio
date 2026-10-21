// Iconos (solo en las páginas que cargan Lucide)
if (window.lucide) lucide.createIcons();

// 1. Aparición escalonada al hacer scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// 2. Índice lateral: resalta la sección que se está leyendo
const tocLinks = [...document.querySelectorAll('.toc a')];
if (tocLinks.length) {
  const linkById = new Map(tocLinks.map((a) => [a.hash.slice(1), a]));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      tocLinks.forEach((a) => a.removeAttribute('aria-current'));
      linkById.get(entry.target.id)?.setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  linkById.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) spy.observe(section);
  });
}

// 3. Capturas: marcador si la imagen no existe y visor a pantalla completa
const shots = [...document.querySelectorAll('.shot')];

shots.forEach((shot) => {
  const img = shot.querySelector('img');
  const markMissing = () => {
    shot.classList.add('is-missing');
    shot.querySelector('.shot-btn').disabled = true;
  };
  if (img.complete && img.naturalWidth === 0) markMissing();
  else img.addEventListener('error', markMissing);
});

if (shots.length) {
  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.innerHTML = `
    <figure class="lightbox-figure"><img alt=""><figcaption></figcaption></figure>
    <button class="lightbox-btn lightbox-close" type="button" aria-label="Cerrar">✕</button>
    <button class="lightbox-btn lightbox-prev" type="button" aria-label="Captura anterior">←</button>
    <button class="lightbox-btn lightbox-next" type="button" aria-label="Captura siguiente">→</button>`;
  document.body.append(dialog);

  const bigImg = dialog.querySelector('img');
  const caption = dialog.querySelector('figcaption');
  const prev = dialog.querySelector('.lightbox-prev');
  const next = dialog.querySelector('.lightbox-next');
  const available = () => shots.filter((s) => !s.classList.contains('is-missing'));
  let current = 0;

  const show = (index) => {
    const list = available();
    current = (index + list.length) % list.length;
    const img = list[current].querySelector('img');
    bigImg.src = img.currentSrc || img.src;
    bigImg.alt = img.alt;
    caption.textContent = list[current].querySelector('figcaption')?.textContent ?? '';
    prev.hidden = next.hidden = list.length < 2;
  };

  shots.forEach((shot) => {
    shot.querySelector('.shot-btn').addEventListener('click', () => {
      show(available().indexOf(shot));
      dialog.showModal();
    });
  });

  prev.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
}
