const I18N = {
  en: {
    nav: { products: 'Products', about: 'About', daily: 'News', contact: 'Contact' },
    footer: { home: 'Home' },
    daily: { back: 'Back to all briefs', insight: 'Key insight', latest: 'Latest posts', categories: 'Categories', category: 'Market Brief' }
  },
  zh: {
    nav: { products: '产品', about: '关于我们', daily: '每日热点', contact: '联系' },
    footer: { home: '首页' },
    daily: { back: '返回全部文章', insight: '核心观点', latest: '最新文章', categories: '分类', category: '市场简报' }
  }
};

const SITE_URL = 'https://senlantrading.org/';

let state = { lang: 'en', activeCategory: null };

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

function getRecentPosts(days = 4) {
  const posts = window.DAILY_POSTS || [];
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  const cutoffStr = cutoff.toISOString().split('T')[0];
  return posts.filter(p => p.date >= cutoffStr);
}

function getCategories() {
  const posts = window.DAILY_POSTS || [];
  const cats = {};
  posts.forEach(p => {
    const key = p.category?.en || 'Market & Trends';
    const zhKey = p.category?.zh || '市场趋势';
    if (!cats[key]) {
      cats[key] = { en: key, zh: zhKey, posts: [] };
    }
    cats[key].posts.push(p);
  });
  return Object.values(cats).sort((a, b) => b.posts.length - a.posts.length);
}

function renderSidebar(post) {
  const posts = window.DAILY_POSTS || [];
  const currentId = post?.id;

  // Latest posts (last 4 days)
  const recentPosts = getRecentPosts(4)
    .filter(item => item.id !== currentId)
    .slice(0, 5);

  const recentHtml = recentPosts.length
    ? recentPosts.map(item => `
      <article style="padding:0 0 16px;margin:0 0 16px;border-bottom:1px solid var(--line)">
        <p style="margin:0 0 8px;font-size:12px;color:var(--muted)">${item.date}</p>
        <p style="margin:0 0 8px;font-size:16px;line-height:1.55;font-weight:700;letter-spacing:-.02em"><a href="daily-post.html?id=${item.id}" style="color:#111827;text-decoration:none">${item.title[state.lang]}</a></p>
        <p style="margin:0;font-size:12px;color:var(--muted)">${item.category?.[state.lang] || I18N[state.lang].daily.category}</p>
      </article>
    `).join('')
    : `<p style="margin:0;color:var(--muted);font-size:14px">No posts in last 4 days.</p>`;

  // Categories
  const categories = getCategories();
  const activeCat = state.activeCategory;

  let categoryPostsHtml = '';
  if (activeCat) {
    const catData = categories.find(c => c.en === activeCat);
    if (catData) {
      categoryPostsHtml = `
        <div style="margin-top:16px;padding-top:16px;border-top:1px solid var(--line)">
          <p style="margin:0 0 12px;font-size:12px;color:var(--muted);cursor:pointer" onclick="clearCategory()">
            ← ${I18N[state.lang].daily.categories}
          </p>
          ${catData.posts.slice(0, 6).map(item => `
            <article style="padding:0 0 14px;margin:0 0 14px;border-bottom:1px solid var(--line)">
              <p style="margin:0 0 6px;font-size:11px;color:var(--muted)">${item.date}</p>
              <p style="margin:0;font-size:15px;line-height:1.5;font-weight:600;letter-spacing:-.02em"><a href="daily-post.html?id=${item.id}" style="color:#111827;text-decoration:none">${item.title[state.lang]}</a></p>
            </article>
          `).join('')}
        </div>
      `;
    }
  }

  const catsHtml = categories.map(c => `
    <button onclick="setCategory('${c.en}')" style="display:block;width:100%;text-align:left;padding:8px 10px;margin:0 0 6px;border:1px solid ${activeCat === c.en ? '#111827' : 'var(--line)'};border-radius:10px;background:${activeCat === c.en ? '#111827' : '#fff'};color:${activeCat === c.en ? '#fff' : '#374151'};font-size:13px;cursor:pointer;transition:all .15s">
      <span style="font-weight:600">${c[state.lang]}</span>
      <span style="float:right;font-size:12px;opacity:.7">${c.posts.length}</span>
    </button>
  `).join('');

  const latestRoot = document.getElementById('latest-posts-root');
  if (latestRoot) {
    latestRoot.innerHTML = `
      <aside style="position:absolute;top:8px;left:calc(50% + 470px);width:250px;padding:18px 18px 6px;border:1px solid var(--line);border-radius:20px;background:#fff;box-shadow:0 12px 36px rgba(15,23,42,.06)">
        <h3 style="margin:0 0 16px;font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted)">${I18N[state.lang].daily.latest}</h3>
        ${recentHtml}

        <div style="margin-top:20px;padding-top:18px;border-top:2px solid var(--line)">
          <h3 style="margin:0 0 14px;font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted)">${I18N[state.lang].daily.categories}</h3>
          ${catsHtml}
        </div>

        ${categoryPostsHtml}
      </aside>
    `;
  }
}

function renderPost() {
  const post = getPost();
  if (!post) return;

  document.title = `${post.title[state.lang]} | SENLAN TRADING`;
  const canonicalHref = `${SITE_URL}daily-post.html?id=${encodeURIComponent(post.id)}`;

  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', post.excerpt[state.lang]);

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', canonicalHref);

  let ogt = document.querySelector('meta[property="og:title"]');
  if (!ogt) {
    ogt = document.createElement('meta');
    ogt.setAttribute('property', 'og:title');
    document.head.appendChild(ogt);
  }
  ogt.setAttribute('content', `${post.title[state.lang]} | SENLAN TRADING`);

  let ogd = document.querySelector('meta[property="og:description"]');
  if (!ogd) {
    ogd = document.createElement('meta');
    ogd.setAttribute('property', 'og:description');
    document.head.appendChild(ogd);
  }
  ogd.setAttribute('content', post.excerpt[state.lang]);

  let ogu = document.querySelector('meta[property="og:url"]');
  if (!ogu) {
    ogu = document.createElement('meta');
    ogu.setAttribute('property', 'og:url');
    document.head.appendChild(ogu);
  }
  ogu.setAttribute('content', canonicalHref);

  let ogi = document.querySelector('meta[property="og:image"]');
  if (!ogi) {
    ogi = document.createElement('meta');
    ogi.setAttribute('property', 'og:image');
    document.head.appendChild(ogi);
  }
  ogi.setAttribute('content', new URL(post.cover, SITE_URL).href);

  let twTitle = document.querySelector('meta[name="twitter:title"]');
  if (!twTitle) {
    twTitle = document.createElement('meta');
    twTitle.setAttribute('name', 'twitter:title');
    document.head.appendChild(twTitle);
  }
  twTitle.setAttribute('content', `${post.title[state.lang]} | SENLAN TRADING`);

  let twDesc = document.querySelector('meta[name="twitter:description"]');
  if (!twDesc) {
    twDesc = document.createElement('meta');
    twDesc.setAttribute('name', 'twitter:description');
    document.head.appendChild(twDesc);
  }
  twDesc.setAttribute('content', post.excerpt[state.lang]);

  let twImage = document.querySelector('meta[name="twitter:image"]');
  if (!twImage) {
    twImage = document.createElement('meta');
    twImage.setAttribute('name', 'twitter:image');
    document.head.appendChild(twImage);
  }
  twImage.setAttribute('content', new URL(post.cover, SITE_URL).href);

  let schemaScript = document.getElementById('article-schema');
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = 'article-schema';
    document.head.appendChild(schemaScript);
  }
  schemaScript.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title.en,
    alternativeHeadline: post.title.zh,
    description: post.excerpt.en,
    inLanguage: ['en', 'zh-CN'],
    image: [new URL(post.cover, SITE_URL).href],
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: canonicalHref,
    author: {
      '@type': 'Organization',
      name: 'SENLAN TRADING'
    },
    publisher: {
      '@type': 'Organization',
      name: 'SENLAN TRADING'
    }
  });

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

  renderSidebar(post);

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

function setCategory(cat) {
  state.activeCategory = cat;
  renderPost();
}

function clearCategory() {
  state.activeCategory = null;
  renderPost();
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
