const I18N = {
  en: {
    nav: { products: 'Products', about: 'About', daily: 'News', gallery: 'Gallery', contact: 'Contact' },
    footer: { home: 'Home' },
    daily: {
      eyebrow: 'News Insights',
      title: 'Latest market signals. Curated daily.',
      lead: 'A focused stream of shipping, cement, steel, export and raw-material news that matters to international bulk materials trade.',
      stat1k: 'Focus',
      stat1v: 'Bulk materials',
      stat2k: 'Update mode',
      stat2v: 'Manual daily curation',
      source: 'Source',
      tag: 'Category',
      read: 'Read more'
    }
  },
  zh: {
    nav: { products: '产品', about: '关于我们', daily: '每日热点', gallery: '画廊', contact: '联系' },
    footer: { home: '首页' },
    daily: {
      eyebrow: '每日热点',
      title: '最新市场信号，每日整理。',
      lead: '聚焦海运、水泥、钢铁、出口与原材料相关动态，适合国际大宗建材贸易场景。',
      stat1k: '聚焦领域',
      stat1v: '大宗建材',
      stat2k: '更新方式',
      stat2v: '手动每日整理',
      source: '来源',
      tag: '分类',
      read: '查看原文'
    }
  }
};

const NEWS = [
  {
    date: '2026-05-18',
    tag: { en: 'Shipping', zh: '海运' },
    title: {
      en: 'Supply constraints and longer-haul demand are supporting dry bulk sentiment.',
      zh: '运力约束与长航程需求，正在支撑干散货市场情绪。'
    },
    desc: {
      en: 'According to Seatrade Maritime coverage, tighter vessel supply and longer-haul trade patterns are helping lift dry bulk market sentiment. For bulk building-material exporters, freight timing and vessel planning remain key decision factors.',
      zh: '根据 Seatrade Maritime 的报道，更紧张的船舶供给与更长的运输航程，正在推动干散货市场情绪走强。对于大宗建材出口商来说，运价窗口与船期安排仍然是关键决策因素。'
    },
    source: 'Seatrade Maritime',
    url: 'https://www.seatrade-maritime.com/dry-bulk/supply-constraints-and-longer-hauls-boost-dry-bulk-market'
  },
  {
    date: '2026-05-18',
    tag: { en: 'Shipping', zh: '海运' },
    title: {
      en: 'Dry bulk shipping performance is becoming more selective across listed owners.',
      zh: '上市干散货船东的市场表现分化正在加大。'
    },
    desc: {
      en: 'MarineLink reports that fewer listed dry bulk owners outperformed the market in 2025, highlighting a more selective operating environment. For cargo buyers, this reinforces the value of stable logistics coordination and reliable loading execution.',
      zh: 'MarineLink 报道称，2025 年跑赢市场的上市干散货船东数量减少，说明航运经营环境正变得更加分化。对于货主与买家来说，这进一步凸显了稳定物流协调与可靠装港执行的重要性。'
    },
    source: 'MarineLink / Vesselindex',
    url: 'https://www.marinelink.com/news/vesselindex-report-shows-fewer-listed-dry-539022'
  },
  {
    date: '2026-05-18',
    tag: { en: 'Cement', zh: '水泥' },
    title: {
      en: 'Low-carbon cement materials remain a central theme in industry discussions.',
      zh: '低碳水泥材料仍是当前行业讨论的核心主题。'
    },
    desc: {
      en: 'Recent green cement coverage continues to emphasize clinker-efficient and supplementary cementitious material solutions. This supports longer-term interest in materials that improve cement performance while aligning with lower-carbon construction goals.',
      zh: '近期绿色水泥相关内容持续强调熟料替代效率与补充胶凝材料方案的重要性。这说明，既能改善水泥性能又契合低碳建造目标的材料，仍将在中长期保持市场关注。'
    },
    source: 'openPR / Green Cement coverage',
    url: 'https://www.openpr.com/news/4513191/green-cement-manufacturing-plant-dpr-unit-setup-2026-demand'
  }
];

let state = { lang: 'en' };

function get(obj, path) {
  return path.split('.').reduce((o, k) => (o ? o[k] : undefined), obj);
}

function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = get(I18N[state.lang], key);
    if (typeof val === 'string') el.textContent = val;
  });
}

function renderNews() {
  const wrap = document.getElementById('daily-list');
  wrap.innerHTML = '';

  NEWS.forEach((item, index) => {
    const article = document.createElement('article');
    article.style.cssText = 'padding:22px;border:1px solid var(--line);border-radius:22px;background:#fff;box-shadow:0 10px 30px rgba(15,23,42,.05)';

    article.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:16px">
        <div style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)">${item.date}</div>
        <div style="padding:7px 10px;border-radius:999px;background:#f3f5f8;border:1px solid var(--line);font-size:12px;color:#111827">${item.tag[state.lang]}</div>
      </div>
      <h2 style="margin:0 0 10px;font-size:clamp(22px,3vw,30px);line-height:1.12;letter-spacing:-.03em">${item.title[state.lang]}</h2>
      <p style="margin:0 0 18px;color:var(--muted);line-height:1.75">${item.desc[state.lang]}</p>
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
        <div style="font-size:13px;color:var(--muted)">${I18N[state.lang].daily.source}: ${item.source}</div>
        <a href="${item.url}" style="font-size:13px;font-weight:700;color:#0f172a;text-decoration:none">${I18N[state.lang].daily.read} →</a>
      </div>
    `;

    if (index === 0) {
      article.style.gridColumn = '1 / -1';
      article.style.padding = '28px';
    }

    wrap.appendChild(article);
  });
}

function setLang(lang) {
  state.lang = lang;
  document.querySelectorAll('.lang__btn').forEach(b => b.classList.toggle('is-active', b.dataset.lang === lang));
  applyI18n();
  renderNews();
}

applyI18n();
renderNews();
document.getElementById('year').textContent = new Date().getFullYear();
document.querySelectorAll('.lang__btn').forEach(btn => btn.addEventListener('click', () => setLang(btn.dataset.lang)));
