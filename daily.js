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
      en: 'Bulk freight sentiment remains sensitive to port congestion and vessel rotation.',
      zh: '港口拥堵与船期轮换，仍在持续影响散货运价情绪。'
    },
    desc: {
      en: 'Freight discussions in the bulk market continue to focus on berth efficiency, vessel availability and loading-window certainty across major export routes.',
      zh: '当前散货市场讨论仍集中在泊位效率、可用船舶以及主要出口航线上的装港窗口确定性。'
    },
    source: 'Daily Market Note',
    url: '#'
  },
  {
    date: '2026-05-18',
    tag: { en: 'Cement', zh: '水泥' },
    title: {
      en: 'Supplementary cementitious materials remain in focus for long-term durability strategies.',
      zh: '为提升长期耐久性，补充胶凝材料仍是市场关注重点。'
    },
    desc: {
      en: 'Project owners and concrete producers continue to evaluate SCM usage for performance consistency, lower heat of hydration and lifecycle efficiency.',
      zh: '项目业主与混凝土生产商持续关注 SCM 在性能稳定性、降低水化热及全生命周期效率方面的价值。'
    },
    source: 'Industry Watch',
    url: '#'
  },
  {
    date: '2026-05-18',
    tag: { en: 'Steel', zh: '钢铁' },
    title: {
      en: 'Steel-sector operating trends continue to influence slag availability expectations.',
      zh: '钢铁板块开工走势，持续影响矿渣供应预期。'
    },
    desc: {
      en: 'Market participants are watching blast furnace operating conditions closely, as upstream production patterns shape medium-term slag supply visibility.',
      zh: '市场正在密切关注高炉运行情况，因为上游生产节奏会直接影响中期矿渣供应的可见度。'
    },
    source: 'Supply Chain Brief',
    url: '#'
  },
  {
    date: '2026-05-18',
    tag: { en: 'Export', zh: '出口' },
    title: {
      en: 'Buyers continue asking for clearer delivery windows and origin coordination.',
      zh: '买家对交付窗口与装港协调提出了更清晰要求。'
    },
    desc: {
      en: 'Inquiries remain active, but procurement decisions increasingly depend on documentation clarity, shipment timing and destination-port coordination.',
      zh: '询盘依旧活跃，但采购决策越来越依赖单证清晰度、装运节奏以及目的港协调能力。'
    },
    source: 'Trade Update',
    url: '#'
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
