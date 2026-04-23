const I18N = {
  en: {
    nav: { products: 'Products', gallery: 'Gallery', contact: 'Contact' },
    cta: { getQuote: 'Get Quote' },
    gallery: { title: 'Gallery', sub: 'A minimal visual overview of products and shipments.' },
    footer: { home: 'Home' },
    items: {
      ggbfs: { title: 'GGBFS', desc: 'Powder product visual (2K) — demo image.' },
      gbfs: { title: 'GBFS', desc: 'Granules product visual (2K) — demo image.' },
      port: { title: 'Shipment', desc: 'Port loading / shipment visuals (placeholder).' }
    }
  },
  zh: {
    nav: { products: '产品', gallery: '画廊', contact: '联系' },
    cta: { getQuote: '获取报价' },
    gallery: { title: '画廊', sub: '以极简方式展示产品与发运场景。' },
    footer: { home: '首页' },
    items: {
      ggbfs: { title: 'GGBFS', desc: '粉体产品视觉（2K）— 演示图。' },
      gbfs: { title: 'GBFS', desc: '颗粒产品视觉（2K）— 演示图。' },
      port: { title: '发运', desc: '装船码头/装载发运场景（占位）。' }
    }
  }
};

let state = { lang: 'en' };

const items = [
  { key: 'port', src: null },
  { key: 'ggbfs', src: 'img/ggbfs-hero-nanobanana-2k.png' },
  { key: 'gbfs', src: 'img/gbfs-hero-nanobanana-1k-v2.png' },
  { key: 'port', src: null },
  { key: 'port', src: null }
];

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

function buildGallery(){
  const grid = document.getElementById('gallery');
  grid.innerHTML = '';

  items.forEach((it, idx) => {
    const meta = I18N[state.lang].items[it.key];

    const tile = document.createElement('article');
    tile.className = 'tile';
    tile.tabIndex = 0;

    const img = document.createElement('img');
    img.className = 'tile__img';
    img.loading = 'lazy';

    if (it.src) {
      img.src = it.src;
    } else {
      // Placeholder gradient (until user provides real port/facility images)
      img.src = makePlaceholder(idx);
    }

    const metaBox = document.createElement('div');
    metaBox.className = 'tile__meta';

    const title = document.createElement('div');
    title.className = 'tile__title';
    title.textContent = meta.title;

    const desc = document.createElement('div');
    desc.className = 'tile__desc';
    desc.textContent = meta.desc;

    metaBox.appendChild(title);
    metaBox.appendChild(desc);

    tile.appendChild(img);
    tile.appendChild(metaBox);

    tile.addEventListener('click', () => openLightbox(img.src, meta.title, meta.desc));
    tile.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') openLightbox(img.src, meta.title, meta.desc);
    });

    grid.appendChild(tile);
  });
}

function makePlaceholder(seed){
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f3f5f9"/>
        <stop offset="1" stop-color="#eaf0ff"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="800" fill="url(#g)"/>
    <rect x="80" y="90" width="1040" height="620" rx="40" fill="#ffffff" opacity="0.55"/>
    <text x="120" y="180" font-family="Inter, Arial" font-size="44" fill="#0b1220" opacity="0.35">Placeholder ${seed+1}</text>
  </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

function openLightbox(src, title, desc){
  const lb = document.getElementById('lightbox');
  lb.classList.add('is-open');
  lb.setAttribute('aria-hidden', 'false');
  lb.querySelector('.lightbox__img').src = src;
  lb.querySelector('.lightbox__img').alt = title;
  lb.querySelector('.lightbox__title').textContent = title;
  lb.querySelector('.lightbox__desc').textContent = desc;
}

function closeLightbox(){
  const lb = document.getElementById('lightbox');
  lb.classList.remove('is-open');
  lb.setAttribute('aria-hidden', 'true');
}

function setLang(lang){
  state.lang = lang;
  document.querySelectorAll('.lang__btn').forEach(b => b.classList.toggle('is-active', b.dataset.lang === lang));
  applyI18n();
  buildGallery();
}

// Events
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target.id === 'lightbox') closeLightbox();
});
document.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
document.querySelectorAll('.lang__btn').forEach(btn => btn.addEventListener('click', () => setLang(btn.dataset.lang)));

// Init
applyI18n();
buildGallery();
document.getElementById('year').textContent = new Date().getFullYear();
