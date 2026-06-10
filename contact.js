const I18N = {
  en: {
    nav: { products: 'Products', about: 'About', daily: 'News', contact: 'Contact', home: 'Home', details: 'Details' },
    contact: {
      title: 'Get a Quote',
      lead: "Interested in working together? Fill out some info and we will be in touch shortly. We can’t wait to hear from you!"
    },
    form: {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email (required)',
      phone: 'Phone',
      laycan: 'Laycan',
      loading: 'Loading method',
      loading: { bulk: 'Bulk', jumbo: 'Jumbo Bags', other: 'Other' },
      qty: 'Quantity in MT',
      qtyPlaceholder: 'e.g., 500',
      checkbox: 'I agree to be contacted by SENLAN TRADING.',
      details: 'Project Details (required)',
      submit: 'Submit'
    },
    products: {
      cards: {
        ggbfs: { name: 'GGBFS Powder', meta: 'Cement replacement · Durability · Low heat' },
        gbfs: { name: 'GBFS Granules', meta: 'Bulk supply · Further processing' },
        highcalcium: { name: 'High-Calcium Stone', meta: 'Stable CaO · Industrial-grade' },
        clinker: { name: 'Clinker', meta: 'Cement raw material · Consistent supply' }
      }
    },
    aside: {
      brand: 'SENLAN TRADING',
      slogan: 'Quality First · Stable Supply · Integrity Always',
      company: 'Company',
      companyValue: 'Tangshan Senlan Commerce and Trade Co., Ltd R®',
      location: 'Location',
      locationValue: 'Room 1710, Rongtong Building, No. 601 Chaoyang West Road, Lubei District, Tangshan City, Hebei Province, China',
      contact: 'Contact',
      emailLabel: 'Email',
      whatsappLabel: 'WhatsApp'
    },
    footer: { home: 'Home' }
  },
  zh: {
    nav: { products: '产品', about: '关于我们', daily: '每日热点', contact: '联系', home: '首页', details: '详情' },
    contact: {
      title: '联系我们获取报价',
      lead: '有合作意向？请填写相关信息，我们会尽快与您联系并提供报价。期待您的来信！'
    },
    form: {
      firstName: '名',
      lastName: '姓',
      email: '邮箱（必填）',
      phone: '电话',
      laycan: '装期（Laycan）',
      loading: '装载方式',
      loading: { bulk: '散装', jumbo: '吨袋', other: '其他' },
      qty: '数量（MT）',
      qtyPlaceholder: '例如：500',
      checkbox: '我同意森澜贸易通过以上信息与我联系。',
      details: '项目需求（必填）',
      submit: '提交'
    },
    products: {
      cards: {
        ggbfs: { name: 'GGBFS 矿渣粉', meta: '替代水泥 · 耐久提升 · 低水化热' },
        gbfs: { name: 'GBFS 粒化矿渣', meta: '散货供应 · 适合再加工' },
        highcalcium: { name: '高钙石', meta: 'CaO 稳定 · 工业级应用' },
        clinker: { name: '熟料', meta: '水泥原料 · 供应稳定' }
      }
    },
    aside: {
      brand: '森澜贸易',
      slogan: '质量优先 · 供应稳定 · 诚信为本',
      company: '公司',
      companyValue: '唐山森澜商贸有限公司',
      location: '地址',
      locationValue: '中国河北省唐山市路北区朝阳西道601号融通大厦1710室',
      contact: '联系方式',
      emailLabel: '邮箱',
      whatsappLabel: 'WhatsApp'
    },
    footer: { home: '首页' }
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
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const val = get(I18N[state.lang], key);
    if (typeof val === 'string') el.setAttribute('placeholder', val);
  });
}

function setLang(lang) {
  state.lang = lang;
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('.lang__btn').forEach(b => {
    const active = b.dataset.lang === lang;
    b.classList.toggle('is-active', active);
    b.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
  try { localStorage.setItem('senlan_lang', lang); } catch (_) {}
  applyI18n();
}

const initialLang = (() => {
  try {
    const saved = localStorage.getItem('senlan_lang');
    if (saved === 'zh' || saved === 'en') return saved;
  } catch (_) {}
  return document.documentElement.lang && document.documentElement.lang.toLowerCase().startsWith('zh') ? 'zh' : 'en';
})();

setLang(initialLang);
document.getElementById('year').textContent = new Date().getFullYear();
document.querySelectorAll('.lang__btn').forEach(btn => btn.addEventListener('click', () => setLang(btn.dataset.lang)));
