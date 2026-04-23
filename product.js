const I18N = {
  en: {
    nav: { products: 'Products', gallery: 'Gallery', contact: 'Contact' },
    cta: { getQuote: 'Get Quote' },
    footer: { home: 'Home' },
    p: {
      viewSpecs: 'View Specs',
      specs: 'Specifications',
      specsNote: 'Provide your target standard and requirements. TDS/COA available upon request.',
      apps: 'Applications',
      ctaTitle: 'Get a quote',
      ctaNote: 'Send us quantity and destination port. We respond within 24 hours.',
      item: {
        standard: 'Standard',
        fineness: 'Fineness',
        density: 'Density',
        moisture: 'Moisture',
        packaging: 'Packaging',
        incoterms: 'Incoterms',
        particle: 'Particle size',
        bulk: 'Bulk density'
      },
      ggbfs: {
        lead: 'For cement and concrete blending applications.',
        app1: 'Cement blending',
        app2: 'Ready-mix concrete',
        app3: 'Infrastructure projects'
      },
      gbfs: {
        lead: 'For further processing and industrial use.',
        app1: 'Grinding / processing',
        app2: 'Industrial raw material',
        app3: 'Custom requirements'
      }
    }
  },
  zh: {
    nav: { products: '产品', gallery: '画廊', contact: '联系' },
    cta: { getQuote: '获取报价' },
    footer: { home: '首页' },
    p: {
      viewSpecs: '查看参数',
      specs: '产品参数',
      specsNote: '请提供目标标准与需求，TDS/COA 可按需提供。',
      apps: '应用',
      ctaTitle: '获取报价',
      ctaNote: '请发送数量与目的港，我们将在24小时内回复。',
      item: {
        standard: '标准',
        fineness: '比表面积',
        density: '密度',
        moisture: '含水率',
        packaging: '包装',
        incoterms: '贸易条款',
        particle: '粒度',
        bulk: '堆积密度'
      },
      ggbfs: {
        lead: '用于水泥与混凝土体系的掺合应用。',
        app1: '水泥掺合',
        app2: '预拌混凝土',
        app3: '基础设施项目'
      },
      gbfs: {
        lead: '适用于再加工及工业用途。',
        app1: '粉磨/加工',
        app2: '工业原料',
        app3: '按需定制'
      }
    }
  }
};

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

function setLang(lang) {
  state.lang = lang;
  document.querySelectorAll('.lang__btn').forEach(b => b.classList.toggle('is-active', b.dataset.lang === lang));
  applyI18n();
}

// init
applyI18n();
document.getElementById('year').textContent = new Date().getFullYear();
document.querySelectorAll('.lang__btn').forEach(btn => btn.addEventListener('click', () => setLang(btn.dataset.lang)));
