const I18N = {
  en: {
    nav: { products: 'Products', about: 'About', daily: 'News', gallery: 'Gallery', contact: 'Contact' },
    footer: { home: 'Home' },
    daily: { back: 'Back to all briefs', insight: 'Key insight', latest: 'Latest posts', category: 'Market Brief' }
  },
  zh: {
    nav: { products: '产品', about: '关于我们', daily: '每日热点', gallery: '画廊', contact: '联系' },
    footer: { home: '首页' },
    daily: { back: '返回全部文章', insight: '核心观点', latest: '最新文章', category: '市场简报' }
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

function getPost() {
  const url = new URL(window.location.href);
  const id = url.searchParams.get('id');
  return (window.DAILY_POSTS || []).find(p => p.id === id) || (window.DAILY_POSTS || [])[0];
}

function renderPost() {
  const post = getPost();
  if (!post) return;

  document.title = `${post.title[state.lang]} | SENLAN TRADING`;

  const posts = window.DAILY_POSTS || [];
  const latestPosts = posts
    .filter(item => item.id !== post.id)
    .slice(0, 5)
    .map(item => `
      <article style="padding:0 0 16px;margin:0 0 16px;border-bottom:1px solid var(--line)">
        <p style="margin:0 0 8px;font-size:12px;color:var(--muted)">${item.date}</p>
        <p style="margin:0 0 8px;font-size:16px;line-height:1.55;font-weight:700;letter-spacing:-.02em"><a href="daily-post.html?id=${item.id}" style="color:#111827;text-decoration:none">${item.title[state.lang]}</a></p>
        <p style="margin:0;font-size:12px;color:var(--muted)">${I18N[state.lang].daily.category}</p>
      </article>
    `).join('');

  const root = document.getElementById('post-root');
  root.innerHTML = `
    <article style="max-width:860px;margin:0 auto">
      <header style="padding:8px 0 24px;border-bottom:1px solid var(--line)">
        <div style="margin-bottom:14px;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted)">${post.date}</div>
        <h1 style="margin:0 0 18px;font-size:clamp(36px,5.2vw,68px);line-height:1.02;letter-spacing:-.06em;max-width:14ch">${post.title[state.lang]}</h1>
        <p style="margin:0;max-width:64ch;font-size:18px;line-height:1.95;color:var(--muted)">${post.excerpt[state.lang]}</p>
      </header>

      <section style="padding:28px 0 0">
        <figure style="margin:0 0 28px">
          <div style="min-height:420px;border-radius:28px;overflow:hidden;background-image:url('${post.cover}');background-size:cover;background-position:center;box-shadow:0 20px 56px rgba(15,23,42,.10)"></div>
        </figure>

        <section style="margin:0 0 34px;padding:22px 24px;border-left:3px solid #111827;background:#f8fafc;border-radius:0 20px 20px 0">
          <div style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-bottom:10px">${I18N[state.lang].daily.insight}</div>
          <div style="font-size:24px;line-height:1.5;letter-spacing:-.03em;font-weight:700;color:#111827">${post.excerpt[state.lang]}</div>
        </section>

        <div id="post-body" style="max-width:720px"></div>
      </section>
    </article>
  `;

  const latestRoot = document.getElementById('latest-posts-root');
  if (latestRoot) {
    latestRoot.innerHTML = `
      <aside style="position:absolute;top:8px;left:calc(50% + 470px);width:250px;padding:18px 18px 6px;border:1px solid var(--line);border-radius:20px;background:#fff;box-shadow:0 12px 36px rgba(15,23,42,.06)">
        <h3 style="margin:0 0 16px;font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted)">${I18N[state.lang].daily.latest}</h3>
        ${latestPosts || `<p style="margin:0;color:var(--muted);font-size:14px">No more posts yet.</p>`}
      </aside>
    `;
  }

  const body = document.getElementById('post-body');
  post.blocks.forEach((block, index) => {
    const el = document.createElement(block.type === 'image' ? 'figure' : block.type === 'heading' ? 'h2' : 'p');

    if (block.type === 'paragraph') {
      el.textContent = block[state.lang];
      el.style.cssText = 'margin:0 0 24px;line-height:2.05;color:#111827;font-size:18px;letter-spacing:.005em';
    } else if (block.type === 'heading') {
      el.textContent = block[state.lang];
      el.style.cssText = 'margin:44px 0 16px;font-size:clamp(28px,3.2vw,40px);line-height:1.18;letter-spacing:-.045em;color:#0f172a';
    } else if (block.type === 'image') {
      const wide = index % 4 === 1;
      el.style.cssText = `margin:38px 0; ${wide ? 'margin-left:-70px;margin-right:-70px;' : ''}`;
      el.innerHTML = `
        <div style="min-height:${wide ? '420px' : '340px'};border-radius:24px;overflow:hidden;background-image:url('${block.src}');background-size:cover;background-position:center;box-shadow:0 16px 42px rgba(15,23,42,.10)"></div>
        <figcaption style="margin-top:12px;color:var(--muted);font-size:14px;line-height:1.8;text-align:center">${block.caption[state.lang]}</figcaption>
      `;
    }

    body.appendChild(el);
  });
}

function setLang(lang) {
  state.lang = lang;
  document.querySelectorAll('.lang__btn').forEach(b => b.classList.toggle('is-active', b.dataset.lang === lang));
  applyI18n();
  renderPost();
}

applyI18n();
renderPost();
document.getElementById('year').textContent = new Date().getFullYear();
document.querySelectorAll('.lang__btn').forEach(btn => btn.addEventListener('click', () => setLang(btn.dataset.lang)));
