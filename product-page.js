const I18N = {
  en: {
    nav: { products: 'Products', about: 'About', gallery: 'Gallery', contact: 'Contact' },
    footer: { home: 'Home' },
    p: {
      tds: 'Technical Datasheet',
      benefitsTitle: 'Key Application Value',
      benefitsLead: 'Construction materials and diversified industrial applications:',
      disclaimer: 'Datasheet values are for reference and may vary by batch and shipment conditions. Final acceptance is subject to contract.',
      k: {
        grade: 'Grade',
        sample: 'Sample',
        standard: 'Standard',
        ssa: 'Specific surface area',
        glass: 'Glassy phase content',
        ai7: 'Activity index (7d)',
        ai28: 'Activity index (28d)',
        density: 'Density',
        fluidity: 'Fluidity ratio',
        moisture: 'Moisture content',
        initSet: 'Initial setting time ratio',
        chloride: 'Chloride ion',
        so3: 'Sulfur trioxide (SO₃)',
        loi: 'Loss on ignition (LOI)',
        insoluble: 'Insoluble matter',
        size010: '0–10 mm fraction',
        appearance: 'Appearance',
        color: 'Color',
        cao: 'CaO',
        sio2: 'SiO₂',
        al2o3: 'Al₂O₃',
        fe2o3: 'Fe₂O₃',
        mgo: 'MgO',
        k2o: 'K₂O',
        na2o: 'Na₂O',
        r2o: 'R₂O',
        cl: 'Cl⁻',
        mno: 'MnO',
        tio2: 'TiO₂'
      }
    }
  },
  zh: {
    nav: { products: '产品', about: '关于我们', gallery: '画廊', contact: '联系' },
    footer: { home: '首页' },
    p: {
      tds: '技术数据表',
      benefitsTitle: '关键应用价值',
      benefitsLead: '面向建筑材料与多元工业应用：',
      disclaimer: '数据表信息仅供参考，数值可能因批次、生产与运输条件不同而变化，最终以合同约定为准。',
      k: {
        grade: '等级',
        sample: '样品',
        standard: '标准',
        ssa: '比表面积',
        glass: '玻璃体含量',
        ai7: '活性指数（7天）',
        ai28: '活性指数（28天）',
        density: '密度',
        fluidity: '流动度比',
        moisture: '含水率',
        initSet: '初凝时间比',
        chloride: '氯离子',
        so3: '三氧化硫（SO₃）',
        loi: '烧失量（LOI）',
        insoluble: '不溶物',
        size010: '0–10mm 占比',
        appearance: '外观',
        color: '颜色',
        cao: 'CaO',
        sio2: 'SiO₂',
        al2o3: 'Al₂O₃',
        fe2o3: 'Fe₂O₃',
        mgo: 'MgO',
        k2o: 'K₂O',
        na2o: 'Na₂O',
        r2o: 'R₂O',
        cl: 'Cl⁻',
        mno: 'MnO',
        tio2: 'TiO₂'
      }
    }
  }
};

const DATA = {
  ggbfs: {
    bg: 'img/ggbfs-hero-nanobanana-2k.png',
    headline: {
      en: 'Built for durability and long-term performance.',
      zh: '专为耐用性和长期性能而设计'
    },
    lead: {
      en: 'Ground Granulated Blast Furnace Slag (GGBFS) is a hydraulic cementitious material made by drying and finely grinding granulated blast furnace slag. It has been used in concrete structures for over a century and is recognized for improving durability, performance consistency, and life-cycle cost efficiency in modern concrete design.',
      zh: '磨细粒化高炉矿渣（GGBFS）是一种水硬性胶凝材料，由干燥和细磨粒化高炉矿渣制成。它已在混凝土结构中应用了一个多世纪，并因其能够提高现代混凝土设计的耐久性、性能稳定性和全生命周期成本效益而广受认可。'
    },
    lead2: {
      en: 'By partially replacing Portland cement, slag powder can improve concrete performance while reducing long-term maintenance needs.',
      zh: '通过部分替代波特兰水泥，矿渣微粉可提高混凝土的性能，同时减少长期维护需求。'
    },
    // pages generated from the latest PDF ("(1)" version)
    tdsPages: [
      'img/tds/ggbfs-tds-1.png',
      'img/tds/ggbfs-tds-2.png'
    ],
    highlights: [
      { k: 'grade', v: 'S95' },
      { k: 'ssa', v: '427 m²/kg' },
      { k: 'glass', v: '97%' },
      { k: 'density', v: '2.9 g/cm³' },
      { k: 'ai7', v: '85%' },
      { k: 'ai28', v: '100%' }
    ],
    benefits: {
      en: [
        'Improved workability and easier placement',
        'Higher long-term compressive and flexural strength',
        'Lower permeability and enhanced durability',
        'Improved resistance to chemical attack',
        'Reduced heat of hydration and cracking risk',
        'More stable plastic and hardened concrete behavior',
        'Lighter concrete color and improved surface appearance'
      ],
      zh: [
        '改善和易性，施工更易成型',
        '提高长期抗压与抗折强度',
        '降低渗透性，增强耐久性',
        '提升抗化学侵蚀能力',
        '降低水化热，减少开裂风险',
        '塑性与硬化混凝土行为更稳定',
        '混凝土颜色更浅，表观质量更佳'
      ]
    },
    benefitImage: 'img/ggbfs-hero-nanobanana-2k.png'
  },

  gbfs: {
    bg: 'img/gbfs-hero-nanobanana-1k-v2.png',
    headline: {
      en: 'More Than Just Slag — A Reliable Material for Modern Construction',
      zh: '不止是矿渣——面向现代建设的可靠材料'
    },
    lead: {
      en: 'Granulated Blast Furnace Slag (GBFS) is primarily composed of reactive silicate compounds and is widely used as a construction material raw input and industrial auxiliary material. As a by-product of the ironmaking process, GBFS enables efficient resource recycling while delivering strong performance in building and infrastructure applications.',
      zh: '粒化高炉矿渣（GBFS）主要由活性硅酸盐化合物构成，广泛作为建筑材料原料与工业辅助材料使用。作为炼铁过程的副产物，GBFS 在实现资源高效循环利用的同时，在建筑与基础设施应用中提供稳定可靠的性能表现。'
    },
    lead2: {
      en: 'Core Chemical Composition: The main constituents of GBFS are dicalcium silicate (C₂S) and tricalcium silicate (C₃S), supported by tricalcium aluminate (C₃A) and tetracalcium aluminoferrite (C₄AF). Secondary components include calcium oxide (CaO), silicon dioxide (SiO₂), aluminum oxide (Al₂O₃), and magnesium oxide (MgO). Exact proportions may vary depending on iron ore and fuel sources used during production.',
      zh: '核心化学组成：GBFS 的主要成分包括硅酸二钙（C₂S）与硅酸三钙（C₃S），并含有三铝酸三钙（C₃A）与四铝铁酸四钙（C₄AF）等铝硅酸盐相关组分。次要成分包括氧化钙（CaO）、二氧化硅（SiO₂）、三氧化二铝（Al₂O₃）与氧化镁（MgO）等。具体比例会随矿石与燃料来源在一定范围内波动。'
    },
    // pages generated from the latest PDF ("(1)" version)
    tdsPages: [
      'img/tds/gbfs-tds-1.png',
      'img/tds/gbfs-tds-2.png'
    ],
    highlights: [
      { k: 'glass', v: '98.1 %' },
      { k: 'moisture', v: '9.40 %' },
      { k: 'size010', v: '99.86 %' },
      { k: 'loi', v: '0.34 %' }
    ],
    benefits: {
      en: [
        'Construction Materials Applications: When finely ground, GBFS can be used to produce slag cement, significantly improving long-term strength, impermeability, and corrosion resistance. As a concrete admixture, it enhances workability, reduces heat of hydration, and improves overall construction performance and structural durability.',
        'Diversified Industrial Applications: GBFS can be further processed into slag powder (a high-performance construction additive) or mineral wool for thermal insulation. It is also suitable for road base filling, brick manufacturing, and as a supplementary raw material in glass-ceramic production.'
      ],
      zh: [
        '建筑材料应用：GBFS 经细磨后可用于制备矿渣水泥，显著提升长期强度、抗渗性与抗腐蚀能力。作为混凝土掺合料使用时，可改善和易性、降低水化热，并提升整体施工性能与结构耐久性。',
        '多元工业应用：GBFS 可进一步加工为矿渣粉（高性能建筑外加材料）或用于生产矿棉保温材料；同时适用于道路基层填筑、制砖，以及作为玻璃陶瓷生产的补充原料等。'
      ]
    },
    benefitImage: 'img/gbfs-in-use-2k.png'
  },

  highcalcium: {
    bg: 'img/highcalcium-grades-hero-nanobanana-2k-v2.png',
    headline: {
      en: 'High-calcium limestone for industrial applications.',
      zh: '高钙石/高钙石灰石，用于工业应用'
    },
    lead: {
      en: 'High-calcium limestone is widely used in cement and other industrial applications. Please refer to the technical datasheet for details.',
      zh: '高钙石灰石广泛用于水泥及多种工业场景，具体指标请参考技术数据表。'
    },
    lead2: { en: '', zh: '' },
    tdsPages: [
      'img/tds/highcalcium-tds-1.png',
      'img/tds/highcalcium-tds-2.png'
    ],
    highlights: [],
    benefits: { en: [], zh: [] },
    benefitImage: 'img/highcalcium-detail-singlegrade-nanobanana-2k.png'
  },

  clinker: {
    bg: 'img/clinker-hero-nanobanana-2k.png',
    headline: {
      en: 'Cement clinker for global supply.',
      zh: '水泥熟料 · 面向全球供应'
    },
    lead: {
      en: 'Cement clinker for cement production and trading. Please refer to the technical datasheet for details.',
      zh: '用于水泥生产与贸易的熟料产品，具体指标请参考技术数据表。'
    },
    lead2: { en: '', zh: '' },
    tdsPages: [
      'img/tds/clinker-tds-1.png',
      'img/tds/clinker-tds-2.png'
    ],
    highlights: [],
    benefits: { en: [], zh: [] },
    benefitImage: 'img/clinker-product-nanobanana-2k.png'
  }
};

let state = { lang: 'en', product: 'ggbfs' };

let cleanup3d = null;

function get(obj, path) {
  return path.split('.').reduce((o, k) => (o ? o[k] : undefined), obj);
}

function t(key) {
  const v = get(I18N[state.lang], key);
  return typeof v === 'string' ? v : key;
}

function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = get(I18N[state.lang], key);
    if (typeof val === 'string') el.textContent = val;
  });
}

function render() {
  const p = DATA[state.product];
  // background
  document.getElementById('p-bg').style.backgroundImage = `url('${p.bg}')`;

  // headline + lead
  document.getElementById('p-headline').textContent = p.headline[state.lang];
  const lead = [p.lead[state.lang], p.lead2?.[state.lang]].filter(Boolean).join('\n\n');
  document.getElementById('p-lead').textContent = lead;

  // highlights
  const meta = document.getElementById('p-meta');
  meta.innerHTML = '';
  p.highlights.forEach(item => {
    const div = document.createElement('div');
    div.className = 'meta-item';
    div.innerHTML = `<div class="meta-k">${t('p.k.' + item.k)}</div><div class="meta-v">${item.v}</div>`;
    meta.appendChild(div);
  });

  // benefits
  const list = document.getElementById('p-benefits');
  const benefits = (p.benefits?.[state.lang] || []).filter(Boolean);
  if (list) {
    list.innerHTML = '';
    benefits.forEach(text => {
      const li = document.createElement('li');
      li.textContent = text;
      list.appendChild(li);
    });
    // hide section if empty
    const sec = document.getElementById('benefits');
    if (sec) sec.style.display = benefits.length ? '' : 'none';
  }

  // 3D molecule (GGBFS only)
  const mol = document.getElementById('molecule3d');
  if (cleanup3d) {
    cleanup3d();
    cleanup3d = null;
  }
  if (mol) {
    // ensure container is visible
    mol.style.minHeight = '420px';

    if (state.product === 'ggbfs') {
      // Lazy import to keep other pages light
      import('./js/molecule-3d.js').then(mod => {
        mol.setAttribute('data-3d', 'on');
        cleanup3d = mod.initMolecule3D(mol);
      }).catch((err) => {
        mol.setAttribute('data-3d', 'on');
        console.warn('[molecule3d] failed to load module', err);
        // If module import fails, fall back to static image
        mol.style.backgroundImage = `url('${p.benefitImage || p.bg}')`;
        mol.style.backgroundSize = 'cover';
        mol.style.backgroundPosition = 'center';
      });
    } else {
      mol.setAttribute('data-3d', 'n/a');
      // Non-GGBFS: static background
      mol.style.backgroundImage = `url('${p.benefitImage || p.bg}')`;
      mol.style.backgroundSize = 'cover';
      mol.style.backgroundPosition = 'center';
    }
  }

  // Render TDS as images to fully remove viewer toolbar
  const pdf = document.getElementById('p-pdf');
  pdf.innerHTML = '';
  (p.tdsPages || []).forEach((src, idx) => {
    const wrap = document.createElement('div');
    wrap.className = 'pdf-page';
    const img = document.createElement('img');
    img.src = src;
    img.alt = `TDS page ${idx + 1}`;
    img.loading = 'lazy';
    wrap.appendChild(img);
    pdf.appendChild(wrap);
  });

  applyI18n();
}

function setLang(lang) {
  state.lang = lang;
  document.querySelectorAll('.lang__btn').forEach(b => b.classList.toggle('is-active', b.dataset.lang === lang));
  render();
}

function initFromQuery() {
  const sp = new URLSearchParams(location.search);
  const p = (sp.get('p') || '').toLowerCase();
  if (p && DATA[p]) state.product = p;
  // debug
  console.log('[product] query p=', p, '→ using', state.product);
}

// init
initFromQuery();
document.querySelectorAll('.lang__btn').forEach(btn => btn.addEventListener('click', () => setLang(btn.dataset.lang)));
document.getElementById('year').textContent = new Date().getFullYear();
render();
