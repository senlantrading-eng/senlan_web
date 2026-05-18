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
      why: 'Why it matters'
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
      why: '这意味着什么'
    }
  }
};

const NEWS = [
  {
    date: '2026-05-18',
    tag: { en: 'Shipping', zh: '海运' },
    image: 'img/port-loading-2k.png',
    title: {
      en: 'Dry bulk sentiment is strengthening as vessel supply stays tight.',
      zh: '在船舶供给偏紧的背景下，干散货市场情绪正在转强。'
    },
    desc: {
      en: 'Recent market coverage suggests that tighter vessel supply and longer-haul demand are helping support freight sentiment across dry bulk lanes.',
      zh: '近期市场信息显示，船舶供给偏紧与更长航程需求，正在为干散货航线的运价情绪提供支撑。'
    },
    why: {
      en: 'For bulk building-material exporters, freight timing, loading windows and vessel planning remain critical to quote accuracy and shipment reliability.',
      zh: '对于大宗建材出口商来说，运价窗口、装港时间以及船期安排，仍然直接影响报价准确性与发运可靠性。'
    },
    source: 'Seatrade Maritime'
  },
  {
    date: '2026-05-18',
    tag: { en: 'Shipping', zh: '海运' },
    image: 'img/gbfs-in-use-2k.png',
    title: {
      en: 'Dry bulk performance is becoming more selective across shipping operators.',
      zh: '干散货市场表现正在出现更明显的航运主体分化。'
    },
    desc: {
      en: 'Recent reporting indicates that fewer listed dry bulk owners are outperforming the broader market, pointing to a more selective operating environment.',
      zh: '最新报道显示，跑赢整体市场的上市干散货船东数量正在减少，这意味着当前航运营商所处的经营环境更具分化特征。'
    },
    why: {
      en: 'For cargo buyers, this means logistics reliability matters more than ever. Stable coordination, documentation and loading execution can be a competitive advantage.',
      zh: '对于货主和买家而言，这意味着物流稳定性变得更重要。稳定的协调、单证衔接与装港执行，本身就是竞争力。'
    },
    source: 'MarineLink / Vesselindex'
  },
  {
    date: '2026-05-18',
    tag: { en: 'Cement', zh: '水泥' },
    image: 'img/ggbfs-hero-nanobanana-2k.png',
    title: {
      en: 'Low-carbon cement materials remain central to industry attention.',
      zh: '低碳水泥材料仍然处于行业关注的核心位置。'
    },
    desc: {
      en: 'Ongoing green cement discussions continue to highlight clinker-efficient systems and supplementary cementitious materials as long-term industry priorities.',
      zh: '持续进行的绿色水泥行业讨论，仍在强调高熟料替代效率体系与补充胶凝材料在中长期内的重要性。'
    },
    why: {
      en: 'For producers and traders, materials that improve cement performance while aligning with lower-carbon goals are likely to keep attracting market interest.',
      zh: '对生产商和贸易商来说，那些既能改善水泥性能、又契合低碳目标的材料，预计仍将持续吸引市场关注。'
    },
    source: 'Green cement market coverage'
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
    article.style.cssText = 'padding:0;border:1px solid var(--line);border-radius:22px;background:#fff;box-shadow:0 10px 30px rgba(15,23,42,.05);overflow:hidden';

    article.innerHTML = `
      <div style="display:grid;grid-template-columns:${index === 0 ? '1.05fr .95fr' : '1fr'};gap:0;align-items:stretch">
        <div style="min-height:${index === 0 ? '360px' : '250px'};background-image:url('${item.image}');background-size:cover;background-position:center"></div>
        <div style="padding:${index === 0 ? '30px' : '22px'}">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:16px">
            <div style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)">${item.date}</div>
            <div style="padding:7px 10px;border-radius:999px;background:#f3f5f8;border:1px solid var(--line);font-size:12px;color:#111827">${item.tag[state.lang]}</div>
          </div>
          <h2 style="margin:0 0 10px;font-size:clamp(22px,3vw,30px);line-height:1.12;letter-spacing:-.03em">${item.title[state.lang]}</h2>
          <p style="margin:0 0 16px;color:var(--muted);line-height:1.75">${item.desc[state.lang]}</p>
          <div style="margin:0 0 18px;padding:14px 16px;border-radius:16px;background:#f8fafc;border:1px solid var(--line)">
            <div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-bottom:8px">${I18N[state.lang].daily.why}</div>
            <div style="line-height:1.75;color:#111827">${item.why[state.lang]}</div>
          </div>
          <div style="font-size:13px;color:var(--muted)">${I18N[state.lang].daily.source}: ${item.source}</div>
        </div>
      </div>
    `;

    if (index === 0) {
      article.style.gridColumn = '1 / -1';
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
