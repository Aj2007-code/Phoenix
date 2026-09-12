/* Team Phoenix interaction polish — does not alter existing copy or image sources. */
document.addEventListener('DOMContentLoaded', () => {
  // Keep gallery filters visually in sync with their existing filtering logic.
  const filterButtons = document.querySelectorAll('#gallery .filter-btn');
  if (filterButtons.length) {
    filterButtons.forEach(btn => btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }));
  }

  // Mobile: make flip cards tappable while preserving the existing hover behaviour.
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 768px)').matches) card.classList.toggle('flipped');
    });
  });

  // Lightweight gallery lightbox. It reuses the exact existing image; no asset is modified.
  const gallery = document.querySelector('#gallery');
  if (gallery) {
    const images = [...gallery.querySelectorAll('.gallery-section img')];
    let lightbox;
    let current = 0;

    const close = () => {
      if (!lightbox) return;
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    };

    const show = index => {
      if (!images.length) return;
      current = (index + images.length) % images.length;
      const img = images[current];
      lightbox.querySelector('img').src = img.currentSrc || img.src;
      lightbox.querySelector('img').alt = img.alt || '';
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };

    lightbox = document.createElement('div');
    lightbox.className = 'px-lightbox';
    lightbox.innerHTML = `
      <button class="px-lightbox-close" aria-label="Close">×</button>
      <button class="px-lightbox-prev" aria-label="Previous">‹</button>
      <figure><img alt=""></figure>
      <button class="px-lightbox-next" aria-label="Next">›</button>`;
    document.body.appendChild(lightbox);

    images.forEach((img, index) => img.addEventListener('click', () => show(index)));
    lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
    lightbox.querySelector('.px-lightbox-close').addEventListener('click', close);
    lightbox.querySelector('.px-lightbox-prev').addEventListener('click', () => show(current - 1));
    lightbox.querySelector('.px-lightbox-next').addEventListener('click', () => show(current + 1));
    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }
});
