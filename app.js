const I18N = {
  en: {
    hero: {
      slide1: { title: "High-Calcium Stone" },
      slide2: { title: "GGBFS" },
      slide3: { title: "GBFS" },
      slide4: { title: "Clinker" },
      changeImages: "Change Images"
    },
    cta: { getQuote: "Get Quote", learnMore: "Learn More" },
    brand: {
      title: "Built for consistency.",
      keywords: "Quality · Delivery · Partnership",
      small: "Stable specs. Clear documentation. Reliable timelines."
    },
    products: {
      title: "Products",
      powder: "Powder",
      granules: "Granules",
      ggbfs: "For cement and concrete blending applications.",
      gbfs: "For further processing and industrial use.",
      viewSpecs: "View Specs"
    },
    process: {
      title: "From inquiry to shipment.",
      s1: "Inquiry",
      s2: "Specs",
      s3: "Quote",
      s4: "Loading",
      s5: "Shipment"
    },
    contact: {
      title: "Get a quote in 24 hours.",
      small: "Tell us your product, quantity, and destination port."
    },
    form: {
      product: "Product",
      qty: "Quantity",
      port: "Destination Port",
      notes: "Specs / Notes (optional)",
      submit: "Submit"
    },
    footer: { backTop: "Back to top" }
  },
  zh: {
    hero: {
      slide1: { title: "高钙石" },
      slide2: { title: "GGBFS" },
      slide3: { title: "GBFS" },
      slide4: { title: "熟料" },
      changeImages: "更换图片"
    },
    cta: { getQuote: "获取报价", learnMore: "了解更多" },
    brand: {
      title: "稳定，才是长期合作的基础。",
      keywords: "品质 · 交付 · 合作",
      small: "指标稳定 · 单证清晰 · 交期可靠"
    },
    products: {
      title: "产品",
      powder: "粉体",
      granules: "颗粒",
      ggbfs: "用于水泥与混凝土体系的掺合应用。",
      gbfs: "适用于再加工及工业用途。",
      viewSpecs: "查看参数"
    },
    process: {
      title: "从询盘到发运，一条线走完。",
      s1: "询盘",
      s2: "确认指标",
      s3: "报价",
      s4: "装载",
      s5: "发运"
    },
    contact: {
      title: "24小时内给到报价。",
      small: "请填写产品、数量与目的港。"
    },
    form: {
      product: "产品",
      qty: "数量",
      port: "目的港",
      notes: "指标/备注（可选）",
      submit: "提交"
    },
    footer: { backTop: "返回顶部" }
  }
};

let state = { lang: 'en', slide: 1 };

// Autoplay (carousel)
const AUTOPLAY_MS = 4000;
const USER_PAUSE_MS = 12000;
let autoplayTimer = null;
let userPauseTimer = null;
let isHoverPaused = false;

function get(obj, path){
  return path.split('.').reduce((o,k)=> (o ? o[k] : undefined), obj);
}

function applyI18n(){
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = get(I18N[state.lang], key);
    if (typeof val === 'string') el.textContent = val;
  });
}

function setSlide(n){
  const slides = [...document.querySelectorAll('.hero__slide')];
  const dots = [...document.querySelectorAll('.dot')];
  const total = slides.length;
  const next = ((n - 1 + total) % total) + 1;

  slides.forEach(s => s.classList.toggle('is-active', Number(s.dataset.slide) === next));
  dots.forEach(d => d.classList.toggle('is-active', Number(d.dataset.to) === next));

  state.slide = next;

  // GBFS (slide 3) gets a taller hero
  const hero = document.querySelector('.hero');
  if (hero) hero.classList.toggle('hero--tall', next === 3);

  // Only one big title in hero, swap per slide + animate
  const titleEl = document.querySelector('[data-i18n^="hero.slide"][data-i18n$=".title"]');
  if (titleEl) {
    titleEl.classList.remove('is-animating');
    // restart animation
    void titleEl.offsetWidth;
    titleEl.setAttribute('data-i18n', `hero.slide${next}.title`);
    applyI18n();
    titleEl.classList.add('is-animating');
  } else {
    applyI18n();
  }

  // Learn More → product detail page (based on current slide)
  const learn = document.querySelector('[data-learnmore]');
  if (learn) {
    if (next === 1) learn.setAttribute('href', 'product.html?p=highcalcium');
    else if (next === 2) learn.setAttribute('href', 'product.html?p=ggbfs');
    else if (next === 3) learn.setAttribute('href', 'product.html?p=gbfs');
    else if (next === 4) learn.setAttribute('href', 'product.html?p=clinker');
    else learn.setAttribute('href', 'product.html?p=highcalcium');
  }
}


function pauseAutoplayForUser(){
  if (userPauseTimer) clearTimeout(userPauseTimer);
  userPauseTimer = setTimeout(() => {
    userPauseTimer = null;
  }, USER_PAUSE_MS);
}

function startAutoplay(){
  stopAutoplay();
  autoplayTimer = setInterval(() => {
    if (isHoverPaused) return;
    if (userPauseTimer) return; // user recently interacted
    setSlide(state.slide + 1);
  }, AUTOPLAY_MS);
}

function stopAutoplay(){
  if (autoplayTimer) clearInterval(autoplayTimer);
  autoplayTimer = null;
}

function setLang(lang){
  state.lang = lang;
  document.querySelectorAll('.lang__btn').forEach(b => b.classList.toggle('is-active', b.dataset.lang === lang));
  // keep Learn More link correct
  const learn = document.querySelector('[data-learnmore]');
  if (learn) {
    if (state.slide === 2) learn.setAttribute('href', 'product.html?p=ggbfs');
    else if (state.slide === 3) learn.setAttribute('href', 'product.html?p=gbfs');
    else learn.setAttribute('href', 'product.html?p=ggbfs');
  }
  applyI18n();
}


// Events
document.querySelectorAll('.dot').forEach(btn => btn.addEventListener('click', () => {
  pauseAutoplayForUser();
  setSlide(Number(btn.dataset.to));
}));

document.querySelectorAll('.hero__arrow').forEach(btn => btn.addEventListener('click', () => {
  pauseAutoplayForUser();
  setSlide(state.slide + Number(btn.dataset.dir));
}));

document.querySelectorAll('.lang__btn').forEach(btn => btn.addEventListener('click', () => setLang(btn.dataset.lang)));

// Hover pause
const heroEl = document.querySelector('.hero');
if (heroEl) {
  heroEl.addEventListener('mouseenter', () => { isHoverPaused = true; });
  heroEl.addEventListener('mouseleave', () => { isHoverPaused = false; });
}

// Init
applyI18n();
setSlide(1);
document.getElementById('year').textContent = new Date().getFullYear();
startAutoplay();

// Title FX: fade/slide in on enter
(() => {
  const el = document.querySelector('[data-titlefx]');
  if (!el) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        el.classList.add('is-in');
        io.disconnect();
      }
    });
  }, { threshold: 0.35 });
  io.observe(el);
})();

// On page entry: play the same fade-up transition once (even without switching slides)
(() => {
  const active = document.querySelector('.hero__slide.is-active');
  if (!active) return;
  // Force a visible transition by toggling a helper class
  active.classList.add('is-entering');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      active.classList.remove('is-entering');
    });
  });
})();

// (removed) footprint dashboard pixels

// Reveal-on-scroll (capacity title)
(() => {
  const els = [...document.querySelectorAll('[data-reveal]')];
  if (!els.length) return;

  function dustBurst(target) {
    const rect = target.getBoundingClientRect();
    const canvas = document.createElement('canvas');
    canvas.className = 'dust-canvas';
    canvas.style.position = 'absolute';
    canvas.style.left = '0';
    canvas.style.top = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '2';

    // ensure target can host absolute children
    const prevPos = getComputedStyle(target).position;
    if (prevPos === 'static') target.style.position = 'relative';

    target.appendChild(canvas);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(rect.width));
    const h = Math.max(1, Math.round(rect.height));
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // Particles emit along the reveal edge (left→right)
    const particles = [];
    const baseCount = Math.min(140, Math.max(80, Math.floor(w * 0.22)));
    for (let i = 0; i < baseCount; i++) {
      particles.push({
        y: h * (0.18 + Math.random() * 0.64),
        s: 0.6 + Math.random() * 1.6,
        a: 0.28 + Math.random() * 0.22,
        jitter: Math.random() * 20,
        drift: 0.6 + Math.random() * 1.4,
      });
    }

    const start = performance.now();
    const dur = 1650;
    function frame(t) {
      const p = Math.min(1, (t - start) / dur);
      ctx.clearRect(0, 0, w, h);

      // reveal edge position
      const edgeX = Math.max(0, Math.min(w, p * w));
      const fade = 1 - p;
      ctx.fillStyle = `rgba(235,240,248,${0.9 * fade})`;

      for (const s of particles) {
        const x = edgeX - 16 + (Math.random() * 18) + Math.sin((p * 6 + s.jitter) * 1.3) * 2;
        const y = s.y + Math.sin(p * 8 + s.jitter) * 2 - p * (8 * s.drift);
        const a = s.a * fade;
        ctx.globalAlpha = a;
        ctx.beginPath();
        ctx.arc(x, y, s.s, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (p < 1) {
        requestAnimationFrame(frame);
      } else {
        canvas.remove();
      }
    }
    requestAnimationFrame(frame);
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-visible');
      dustBurst(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: 0.35 });
  els.forEach(el => io.observe(el));
})();

// World map hover init (footprint)
(() => {
  const el = document.getElementById('map2d');
  if (!el) return;
  let cleanup = null;
  let started = false;

  async function start() {
    if (started) return;
    started = true;
    try {
      const mod = await import('./js/worldmap-hover.js');
      cleanup = mod.initWorldMapHover(el);
    } catch (err) {
      console.warn('[map2d] failed to init', err);
    }
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      start();
    });
  }, { threshold: 0.25 });

  io.observe(el);

  // Fallback: if IO doesn't fire (some environments), start anyway.
  setTimeout(() => {
    if (!started) start();
  }, 900);
})();

// Carousel controls (capacity/loading section)
(() => {
  const track = document.querySelector('[data-carousel-track]');
  const prev = document.querySelector('[data-carousel-prev]');
  const next = document.querySelector('[data-carousel-next]');
  if (!track) return;

  // loop: clone first/last slides for seamless cycling
  const slides = [...track.children];
  if (slides.length > 1) {
    const first = slides[0].cloneNode(true);
    const last = slides[slides.length - 1].cloneNode(true);
    first.setAttribute('data-clone', 'first');
    last.setAttribute('data-clone', 'last');
    track.insertBefore(last, slides[0]);
    track.appendChild(first);
  }

  // initial offset to the first real slide
  requestAnimationFrame(() => {
    const firstReal = track.querySelector('.carousel__slide:not([data-clone])');
    if (firstReal) track.scrollLeft = firstReal.offsetLeft - 0;
  });

  const scrollByAmount = () => {
    const first = track.querySelector('.carousel__slide');
    if (!first) return 520;
    const rect = first.getBoundingClientRect();
    return rect.width + 20;
  };

  function normalizeIfAtClone() {
    const all = [...track.querySelectorAll('.carousel__slide')];
    if (all.length < 3) return;
    const firstReal = all.find(el => !el.hasAttribute('data-clone'));
    const lastReal = [...all].reverse().find(el => !el.hasAttribute('data-clone'));
    const firstClone = all.find(el => el.getAttribute('data-clone') === 'first');
    const lastClone = all.find(el => el.getAttribute('data-clone') === 'last');
    if (!firstReal || !lastReal || !firstClone || !lastClone) return;

    const x = track.scrollLeft;
    const tol = 24;

    // if we are at/near the prepended last-clone (scrolling left beyond first real)
    if (x <= lastClone.offsetLeft + tol) {
      track.scrollLeft = lastReal.offsetLeft;
      return;
    }

    // if we are at/near the appended first-clone (scrolling right beyond last real)
    const rightEdge = firstClone.offsetLeft + firstClone.offsetWidth;
    if (x + track.clientWidth >= rightEdge - tol) {
      track.scrollLeft = firstReal.offsetLeft;
      return;
    }
  }

  // Only normalize at the true edges (avoid snapping in the middle)
  // This keeps the carousel smooth and allows stopping anywhere.
  function normalizeAtEdges() {
    const all = [...track.querySelectorAll('.carousel__slide')];
    if (all.length < 3) return;
    const firstReal = all.find(el => !el.hasAttribute('data-clone'));
    const lastReal = [...all].reverse().find(el => !el.hasAttribute('data-clone'));
    const firstClone = all.find(el => el.getAttribute('data-clone') === 'first');
    const lastClone = all.find(el => el.getAttribute('data-clone') === 'last');
    if (!firstReal || !lastReal || !firstClone || !lastClone) return;

    const x = track.scrollLeft;
    const max = track.scrollWidth - track.clientWidth;
    const tol = 8;

    // left edge → jump to last real
    if (x <= tol) {
      track.scrollLeft = lastReal.offsetLeft;
      return;
    }

    // right edge → jump to first real
    if (x >= max - tol) {
      track.scrollLeft = firstReal.offsetLeft;
      return;
    }
  }

  let edgeTimer = null;
  track.addEventListener('scroll', () => {
    if (edgeTimer) cancelAnimationFrame(edgeTimer);
    edgeTimer = requestAnimationFrame(() => {
      // Don't interfere while dragging; wait until user releases
      if (track.classList.contains('is-dragging')) return;
      normalizeAtEdges();
    });
  }, { passive: true });

  prev?.addEventListener('click', () => {
    track.scrollBy({ left: -scrollByAmount(), behavior: 'smooth' });
  });
  next?.addEventListener('click', () => {
    track.scrollBy({ left: scrollByAmount(), behavior: 'smooth' });
  });

  // drag to scroll (mouse)
  let isDown = false;
  let startX = 0;
  let startLeft = 0;
  let lastX = 0;
  let lastT = 0;
  let vx = 0;
  let inertiaRaf = 0;

  function stopInertia() {
    if (inertiaRaf) cancelAnimationFrame(inertiaRaf);
    inertiaRaf = 0;
  }

  function startInertia() {
    // slow + premium feel (no snap)
    const friction = 0.94;
    const minV = 0.06;
    const maxStep = 34;

    function step() {
      vx *= friction;
      if (Math.abs(vx) < minV) {
        vx = 0;
        // re-enable snap and let it settle
        track.classList.remove('no-snap');
        // normalize only if we're truly at an edge
        normalizeAtEdges();
        return;
      }
      const delta = Math.max(-maxStep, Math.min(maxStep, -vx));
      track.scrollLeft += delta;
      inertiaRaf = requestAnimationFrame(step);
    }

    inertiaRaf = requestAnimationFrame(step);
  }

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    stopInertia();
    track.classList.add('is-dragging');
    track.classList.add('no-snap');
    startX = e.pageX;
    startLeft = track.scrollLeft;
    lastX = e.pageX;
    lastT = performance.now();
    vx = 0;
  });

  window.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    track.classList.remove('is-dragging');
    startInertia();
  });

  track.addEventListener('mouseleave', () => {
    if (!isDown) return;
    isDown = false;
    track.classList.remove('is-dragging');
    startInertia();
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const dx = e.pageX - startX;
    track.scrollLeft = startLeft - dx;

    const now = performance.now();
    const dt = Math.max(16, now - lastT);
    const ddx = e.pageX - lastX;
    // px per frame-ish (slow premium)
    vx = (ddx / dt) * 20;
    lastX = e.pageX;
    lastT = now;
  });
  // touch already works via native scroll
})();

// Products hover preview (Tesla-like)
(() => {
  const root = document.querySelector('[data-productshover]');
  if (!root) return;
  const items = Array.from(root.querySelectorAll('[data-ph-item]'));
  const imgs = Array.from(root.querySelectorAll('[data-ph-img]'));

  function setActive(key) {
    items.forEach((it) => it.classList.toggle('is-active', it.dataset.key === key));
    imgs.forEach((img) => img.classList.toggle('is-active', img.dataset.phImg === key));
  }

  items.forEach((it) => {
    const key = it.dataset.key;
    if (!key) return;
    it.addEventListener('mouseenter', () => setActive(key));
    it.addEventListener('focus', () => setActive(key));
    // click should navigate (anchor), so we do NOT prevent default here.
    it.addEventListener('click', () => {
      setActive(key);
      close();
    });
  });
})();

// Products mega menu is shared across pages
// (loaded via img/nav-mega.js)
