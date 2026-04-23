// Products mega menu (nav): hover + click to pin
(() => {
  const trigger = document.querySelector('[data-products-trigger]');
  const mega = document.querySelector('[data-products-mega]');
  if (!trigger || !mega) return;

  // On pages using the compact topbar header, hover can flicker.
  // Switch to click-to-toggle mode for stability.
  const clickOnly = !!document.querySelector('.topbar');

  const panel = mega.querySelector('.pMega__panel');
  const backdrop = mega.querySelector('.pMega__backdrop');
  const items = Array.from(mega.querySelectorAll('[data-pm-item]'));
  const imgs = Array.from(mega.querySelectorAll('[data-pm-img]'));

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
