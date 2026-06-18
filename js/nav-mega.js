// Products mega menu (nav): hover + click to pin
(() => {
  const trigger = document.querySelector('[data-products-trigger]');
  const mega = document.querySelector('[data-products-mega]');
  if (!trigger || !mega) return;

  // On pages using the compact topbar header, use click-to-toggle for stability.
  // Pages without topbar (e.g. homepage hero) use hover.
  const clickOnly = !!document.querySelector('.topbar');

  const panel = mega.querySelector('.pMega__panel');
  const backdrop = mega.querySelector('.pMega__backdrop');
  const items = Array.from(mega.querySelectorAll('[data-pm-item]'));
  const imgs = Array.from(mega.querySelectorAll('[data-pm-img]'));
  const file = (window.location.pathname.split('/').pop() || '').toLowerCase();
  const keyFromFile = {
    'ggbfs.html': 'ggbfs',
    'gbfs.html': 'gbfs',
    'highcalcium.html': 'highcalcium',
    'clinker.html': 'clinker',
    'product.html': 'ggbfs'
  }[file];

  let pinned = false;
  let hoverTimer = null;
  let closeTimer = null;
  let isOpen = false;
  let overTrigger = false;
  let overPanel = false;

  function setActive(key) {
    items.forEach((it) => it.classList.toggle('is-active', it.dataset.key === key));
    imgs.forEach((img) => img.classList.toggle('is-active', img.dataset.pmImg === key));
  }

  if (keyFromFile) setActive(keyFromFile);

  function open() {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
    if (isOpen) return;
    mega.classList.add('is-open');
    mega.setAttribute('aria-hidden', 'false');
    isOpen = true;
  }

  function close() {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
    if (!isOpen) return;
    mega.classList.remove('is-open');
    mega.setAttribute('aria-hidden', 'true');
    pinned = false;
    isOpen = false;
  }

  function scheduleClose(ms = 220) {
    if (pinned) return;
    if (closeTimer) clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      closeTimer = null;
      if (pinned) return;
      if (overTrigger || overPanel) return;
      close();
    }, ms);
  }

  if (!clickOnly) {
    trigger.addEventListener('mouseenter', () => {
      overTrigger = true;
      if (hoverTimer) clearTimeout(hoverTimer);
      hoverTimer = setTimeout(() => open(), 40);
    });

    trigger.addEventListener('mouseleave', (e) => {
      overTrigger = false;
      const rt = e.relatedTarget;
      if (panel && rt instanceof Element && panel.contains(rt)) return;
      scheduleClose(220);
    });
  }

  if (panel && !clickOnly) {
    panel.addEventListener('mouseenter', () => {
      overPanel = true;
      if (hoverTimer) clearTimeout(hoverTimer);
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
      open();
    });

    panel.addEventListener('mouseleave', () => {
      overPanel = false;
      if (hoverTimer) clearTimeout(hoverTimer);
      scheduleClose(220);
    });
  }

  if (backdrop) backdrop.addEventListener('click', () => close());

  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    pinned = !pinned;
    if (pinned) open();
    else close();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  items.forEach((it) => {
    const key = it.dataset.key;
    if (!key) return;
    it.addEventListener('mouseenter', () => setActive(key));
    it.addEventListener('focus', () => setActive(key));
    // anchors should navigate normally
  });
})();

// Social links in nav: inject once across pages using shared navigation
(() => {
  const LINKEDIN_URL = 'https://www.linkedin.com/company/tangshan-senlan-trading-co-ltd/';
  const FACEBOOK_URL = 'https://www.facebook.com/people/Sen-Lan/61586972392027/';

  function socialMarkup() {
    return `
      <div class="social-nav" aria-label="Social links">
        <a class="social-nav__link" href="${LINKEDIN_URL}" target="_blank" rel="noopener" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A2.03 2.03 0 0 0 3.2 5.02c0 1.1.9 2 2.02 2.01h.03A2.02 2.02 0 1 0 5.25 3ZM20.8 12.67c0-3.5-1.87-5.13-4.37-5.13-2.02 0-2.93 1.12-3.44 1.9V8.5H9.61c.05.63 0 11.5 0 11.5h3.38v-6.42c0-.34.02-.69.12-.93.27-.69.88-1.4 1.91-1.4 1.35 0 1.89 1.03 1.89 2.54V20h3.38v-7.33Z"/></svg>
        </a>
        <a class="social-nav__link" href="${FACEBOOK_URL}" target="_blank" rel="noopener" aria-label="Facebook">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-7.2h2.43l.36-2.8H13.5V9.22c0-.81.23-1.36 1.39-1.36h1.49V5.35c-.26-.03-1.14-.1-2.17-.1-2.15 0-3.62 1.31-3.62 3.73V11H8.16v2.8h2.43V21h2.91Z"/></svg>
        </a>
      </div>`;
  }

  const right = document.querySelector('.topbar__right');
  if (right && !right.querySelector('.social-nav')) {
    right.insertAdjacentHTML('afterbegin', socialMarkup());
  }

  const heroHeader = document.querySelector('.hero__header');
  const heroLang = heroHeader ? heroHeader.querySelector('.lang') : null;
  if (heroHeader && heroLang && !heroHeader.querySelector('.social-nav')) {
    heroLang.insertAdjacentHTML('beforebegin', socialMarkup());
  }
})();
