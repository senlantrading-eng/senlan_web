const I18N = {
  en: {
    nav: { home: 'Home', gallery: 'Gallery', details: 'Details', contact: 'Contact' },
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
      checkbox: 'I agree to be contacted by SENLAN TRADING.',
      details: 'Project Details (required)',
      submit: 'Submit'
    },
    aside: {
      brand: 'SENLAN TRADING',
      slogan: 'Quality First · Stable Supply · Integrity Always',
      company: 'Company',
      location: 'Location',
      contact: 'Contact'
    },
    footer: { home: 'Home' }
  },
  zh: {
    nav: { home: '首页', gallery: '画廊', details: '详情', contact: '联系' },
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
      checkbox: '我同意森澜贸易通过以上信息与我联系。',
      details: '项目需求（必填）',
      submit: '提交'
    },
    aside: {
      brand: '森澜贸易',
      slogan: 'Quality First · Stable Supply · Integrity Always',
      company: '公司',
      location: '地址',
      contact: '联系方式'
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
}

function setLang(lang) {
  state.lang = lang;
  document.querySelectorAll('.lang__btn').forEach(b => b.classList.toggle('is-active', b.dataset.lang === lang));
  applyI18n();
}

applyI18n();
document.getElementById('year').textContent = new Date().getFullYear();
document.querySelectorAll('.lang__btn').forEach(btn => btn.addEventListener('click', () => setLang(btn.dataset.lang)));
