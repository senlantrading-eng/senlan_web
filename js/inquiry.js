/* Quote UX and local event hooks. No analytics vendor is loaded here. */
(() => {
  'use strict';
  const products = {ggbfs: 'GGBFS', gbfs: 'GBFS', highcalcium: 'High-Calcium Limestone', clinker: 'Clinker'};
  const params = new URLSearchParams(location.search);
  const pageProduct = location.pathname.split('/').pop().replace('.html', '');
  const product = products[pageProduct] ? pageProduct : (products[params.get('product')] ? params.get('product') : '');
  const form = document.querySelector('.contact-form');
  const emit = (event, extra = {}) => {
    // Do not send names, contact details, message text or query strings to analytics.
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({event, product: form?.elements.product?.value || product || 'unspecified', ...extra});
  };
  // Carry only campaign labels in same-origin page links, without persistent storage.
  const campaignKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  const campaign = {};
  campaignKeys.forEach(key => {
    const value = params.get(key);
    if (value && value.length <= 150 && /^[\p{L}\p{N} _./-]+$/u.test(value)) campaign[key] = value;
  });
  document.querySelectorAll('a[href]').forEach(link => {
    const url = new URL(link.href, location.href);
    if (url.origin === location.origin && /(?:\.html|\/)$/i.test(url.pathname)) {
      Object.entries(campaign).forEach(([key, value]) => url.searchParams.set(key, value));
      if (Object.keys(campaign).length) link.href = url.href;
    }
  });
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link) return;
    const url = new URL(link.href, location.href);
    if (url.hostname === 'wa.me') emit('whatsapp_click');
    else if (url.protocol === 'mailto:') emit('email_click');
    else if (url.origin === location.origin && url.pathname.endsWith('/contact.html')) emit('quote_click');
  });
  if (!form) return;
  if (product) form.elements.product.value = product;
  function updateWhatsApp() {
    const selected = products[form.elements.product.value];
    document.querySelectorAll('a[href^="https://wa.me/"]').forEach(link => {
      const url = new URL(link.href);
      url.searchParams.set('text', selected ? 'Hello, I would like a quote for ' + selected + '.' : 'Hello, I would like to discuss a materials inquiry.');
      link.href = url.href;
    });
  }
  updateWhatsApp();
  form.elements.product.addEventListener('change', updateWhatsApp);
  Object.entries(campaign).forEach(([name, value]) => {
    const field = document.createElement('input');
    field.type = 'hidden'; field.name = name; field.value = value; form.append(field);
  });
  const status = document.getElementById('inquiry-status');
  const button = form.querySelector('button[type="submit"]');
  let pending = false;
  let statusKey = '';
  const messages = {
    en: {sending: 'Submitting…', submit: 'Submit', success: 'Your inquiry has been accepted by our form service. If you need to follow up, please contact us by email or WhatsApp.', error: 'We could not confirm your submission. Your details are still here. Please try again or contact us by email or WhatsApp.', returned: 'You have returned from the form service. If you did not see a submission confirmation, please contact us by email or WhatsApp.'},
    zh: {sending: '正在提交…', submit: '提交', success: '表单服务已接受您的询盘。如需跟进，请通过邮箱或 WhatsApp 联系我们。', error: '暂时无法确认提交结果，您填写的信息已保留。请重试，或通过邮箱、WhatsApp 联系我们。', returned: '您已从表单服务返回。如未看到提交确认，请通过邮箱或 WhatsApp 联系我们。'}
  };
  function render() {
    const copy = messages[document.documentElement.lang.startsWith('zh') ? 'zh' : 'en'];
    button.textContent = pending ? copy.sending : copy.submit;
    if (statusKey) status.textContent = copy[statusKey];
  }
  function show(key) {
    statusKey = key; status.hidden = false; status.dataset.state = key === 'error' ? 'error' : 'info'; render(); status.focus();
  }
  new MutationObserver(render).observe(document.documentElement, {attributes: true, attributeFilter: ['lang']});
  // A query string is not proof of a submission; never emit success from it.
  if (params.get('submitted') === '1') show('returned');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (pending || !form.reportValidity()) return;
    pending = true; button.disabled = true; form.setAttribute('aria-busy', 'true');
    status.hidden = true; statusKey = ''; render();
    const submittedProduct = form.elements.product.value;
    const payload = Object.fromEntries(new FormData(form));
    payload.product = products[submittedProduct] || submittedProduct;
    delete payload._next;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    try {
      const endpoint = new URL(form.action);
      endpoint.pathname = '/ajax' + endpoint.pathname;
      const response = await fetch(endpoint.href, {
        method: 'POST', headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify(payload), signal: controller.signal
      });
      const result = await response.json();
      if (!response.ok || !(result.success === true || result.success === 'true')) throw new Error('Submission not accepted');
      emit('inquiry_accepted', {product: submittedProduct, confirmation_source: 'formsubmit'});
      form.reset();
      if (product) form.elements.product.value = product;
      updateWhatsApp();
      show('success');
    } catch (_) {
      show('error');
    } finally {
      clearTimeout(timer); pending = false; button.disabled = false; form.removeAttribute('aria-busy'); render();
    }
  });
})();
