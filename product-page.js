const I18N = {
  en: {
    nav: { products: 'Products', about: 'About', daily: 'News', contact: 'Contact' },
    footer: { home: 'Home' },
    p: {
      tds: 'Technical Datasheet',
      benefitsTitle: 'Key Application Value',
      benefitsLead: 'Construction materials and diversified industrial applications:',
      partnersTitle: 'Secured Factory-Direct GBFS Supply',
      partnersLead: 'We maintain long-term contractual partnerships with multiple blast furnace slag producers in Tangshan, enabling us to source GBFS directly from the factory. This stable upstream integration ensures consistent product quality, reliable supply volumes, and full traceability from production to delivery. By working closely with our partner factories, we are able to respond efficiently to market demand while maintaining strict quality and logistics control for both domestic and international customers.',
      partner: {
        donghua: 'Tangshan Donghua Iron & Steel Enterprise Group Co., Ltd.',
        ruifeng: 'Tangshan Ruifeng Iron & Steel (Group) Co., Ltd.',
        anfeng: 'Hebei Anfeng Iron & Steel Group Co., Ltd.',
        anfengZh: '河北安丰钢铁集团有限公司',
        songting: 'Tangshan Songting Iron & Steel Co., Ltd.',
        songtingZh: '唐山松汀钢铁有限公司'
      },
      logisticsTitle: 'Optimized Logistics, Lower Delivered Cost',
      logisticsLead: 'Because our GBFS is sourced directly from partner factories, we are able to eliminate unnecessary intermediaries, resulting in a more cost-effective supply structure for our customers. In addition, our partner plants are strategically located near major ports in the Tangshan region, significantly reducing inland transportation distance and handling costs. This proximity allows for faster turnaround, optimized loading operations, and lower overall logistics expenses, providing customers with competitive pricing and a more efficient end-to-end delivery solution.',
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
    nav: { products: '产品', about: '关于我们', daily: '每日热点', contact: '联系' },
    footer: { home: '首页' },
    p: {
      tds: '技术数据表',
      benefitsTitle: '关键应用价值',
      benefitsLead: '面向建筑材料与多元工业应用：',
      partnersTitle: '稳定的工厂直供 GBFS',
      partnersLead: '我们与唐山多家高炉矿渣生产商保持长期合同合作关系，能够直接从工厂采购 GBFS。这种稳定的上游整合确保了产品质量的一致性、供应量的可靠性以及从生产到交付的全程可追溯性。通过与合作伙伴工厂的紧密协作，我们能够高效响应市场需求，同时为国内外客户严格把控质量与物流。',
      partner: {
        donghua: '唐山东华钢铁企业集团有限公司',
        ruifeng: '唐山瑞丰钢铁（集团）有限公司',
        anfeng: '河北安丰钢铁集团有限公司',
        anfengZh: 'Hebei Anfeng Iron & Steel Group Co., Ltd.',
        songting: '唐山松汀钢铁有限公司',
        songtingZh: 'Tangshan Songting Iron & Steel Co., Ltd.'
      },
      logisticsTitle: '优化物流，降低到岸成本',
      logisticsLead: '由于我们的 GBFS 直接采购自合作工厂，能够消除不必要的中介环节，从而为客户提供更具成本效益的供应结构。此外，我们的合作工厂战略性地位于唐山地区主要港口附近，显著缩短了内陆运输距离和装卸成本。这种地理优势带来了更快的周转速度、优化的装载作业以及更低的整体物流费用，为客户提供有竞争力的价格和更高效的端到端交付解决方案。',
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

const SITE_URL = 'https://senlantrading.org/';

const DATA = {
  ggbfs: {
    bg: 'img/ggbfs-hero-nanobanana-2k_compressed.webp',
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
      'img/tds/ggbfs-tds-1_compressed.webp',
      'img/tds/ggbfs-tds-2_compressed.webp'
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
    benefitImage: 'img/ggbfs-hero-nanobanana-2k_compressed.webp'
  },

  gbfs: {
    bg: 'img/gbfs-hero-nanobanana-1k-v2_compressed.webp',
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
      'img/tds/gbfs-tds-1_compressed.webp',
      'img/tds/gbfs-tds-2_compressed.webp'
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
    benefitImage: 'img/gbfs-real-crop-tight_compressed.jpg'
  },

  highcalcium: {
    bg: 'img/highcalcium-product-nanobanana-2k_compressed.webp',
    headline: {
      en: 'High-calcium limestone for cement, clinker, and industrial use.',
      zh: '高钙石灰石，适用于水泥、熟料与多元工业用途'
    },
    lead: {
      en: 'High-calcium limestone is an important industrial raw material used in cement, clinker, steelmaking, and other mineral-processing applications. The current sample datasheet shows a high-CaO profile suitable for customers who need stable calcium-bearing material for blending, fluxing, or raw mix adjustment.',
      zh: '高钙石灰石是重要的工业原料，广泛用于水泥、熟料、炼钢及其他矿物加工场景。当前样品数据表显示其具备较高 CaO 特征，适合用于需要稳定含钙原料的配料、熔剂或生料校正应用。'
    },
    lead2: {
      en: 'Third-party lab data from the sample indicates 54.49% CaO, 0.18% SiO₂, and 1.72% MgO. Final supply specification, sizing, and commercial terms remain subject to contract and shipment requirements.',
      zh: '样品第三方检测数据显示：CaO 54.49%、SiO₂ 0.18%、MgO 1.72%。最终供货指标、粒度与商务条款以合同及实际装运要求为准。'
    },
    tdsPages: [
      'img/tds/highcalcium-tds-1_compressed.webp',
      'img/tds/highcalcium-tds-2_compressed.webp'
    ],
    highlights: [],
    benefits: {
      en: [
        'Production of building materials: used in carpet, vinyl tile, mortars, plastics, and roofing shingles, where calcium limestone can improve strength, durability, and cost efficiency.',
        'Agriculture and animal feed: a cost-effective calcium source for poultry, cattle, and pigs, supporting bone development, eggshell quality, and egg production.',
        'Soil amendment: used to raise soil pH in acidic conditions, helping improve nutrient availability and crop performance.',
        'Glass production: provides calcium input that supports hardness and durability in finished glass products.',
        'Construction aggregates: used in road base, asphalt, and concrete applications where strength and durability are required.',
        'Flue gas cleaning: used in industrial gas treatment systems where calcium reacts with sulfur dioxide to support pollutant removal.'
      ],
      zh: [
        '建材生产：可用于地毯、乙烯基地砖、砂浆、塑料和屋面瓦等产品，帮助提升强度、耐久性，并优化材料成本。',
        '农业与饲料：作为禽类、牛和猪等动物饲料中高性价比的钙源，有助于骨骼发育、蛋壳质量和产蛋表现。',
        '土壤改良：可用于改善酸性土壤，通过提升土壤 pH 值来增强养分有效性并促进作物生长。',
        '玻璃生产：为玻璃制造提供钙源，有助于成品玻璃的硬度与耐久性。',
        '建筑骨料：可用于道路、沥青和混凝土相关场景，为最终产品提供强度与耐久支持。',
        '烟气净化：可用于工业烟气处理系统，通过与二氧化硫反应，帮助实现污染物去除。'
      ]
    },
    benefitImage: 'img/highcalcium-product-nanobanana-2k_compressed.webp'
  },

  clinker: {
    bg: 'img/clinker-product-nanobanana-2k_compressed.webp',
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
      'img/tds/clinker-tds-1_compressed.webp',
      'img/tds/clinker-tds-2_compressed.webp'
    ],
    highlights: [],
    benefits: { en: [], zh: [] },
    benefitImage: 'img/clinker-product-nanobanana-2k_compressed.webp'
  }
};

let state = { lang: 'en', product: 'ggbfs' };

const HIGHCALCIUM_SPEC_IMAGES = {
  '10mm-26mm': 'img/highcalcium-10mm-26mm.jpg',
  '20mm-40mm': 'img/highcalcium-20mm-40mm.jpg',
  '30mm-50mm': 'img/highcalcium-30mm-50mm.jpg',
  '40mm-80mm': 'img/highcalcium-40mm-80mm.png'
};

let cleanup3d = null;

const STATIC_PRODUCTS = ['ggbfs', 'gbfs', 'highcalcium', 'clinker'];

function getProductFromLocation() {
  const sp = new URLSearchParams(location.search);
  const queryProduct = (sp.get('p') || '').toLowerCase();
  if (queryProduct && DATA[queryProduct]) return queryProduct;

  const file = (location.pathname.split('/').pop() || '').toLowerCase();
  const fileMap = {
    'ggbfs.html': 'ggbfs',
    'gbfs.html': 'gbfs',
    'highcalcium.html': 'highcalcium',
    'clinker.html': 'clinker'
  };
  return fileMap[file] || '';
}

function applyStaticProductContent() {
  document.querySelectorAll('[data-static-product][data-static-lang]').forEach(el => {
    const show = el.getAttribute('data-static-product') === state.product
      && el.getAttribute('data-static-lang') === state.lang;
    if (el.matches('#p-meta > div')) {
      el.style.display = show ? 'contents' : 'none';
    } else {
      el.style.display = show ? '' : 'none';
    }
  });
}

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

function applyLangBlocks() {
  document.querySelectorAll('[data-lang-block]').forEach(el => {
    el.style.display = el.getAttribute('data-lang-block') === state.lang ? '' : 'none';
  });
}

function applyProductSections() {
  document.querySelectorAll('[data-product-section]').forEach(el => {
    el.style.display = el.getAttribute('data-product-section') === state.product ? '' : 'none';
  });
}

function render() {
  const p = DATA[state.product];
  const seo = {
    ggbfs: {
      title: 'GGBFS Supplier from China | SENLAN TRADING',
      desc: 'Ground Granulated Blast Furnace Slag (GGBFS) supply from China for cement and concrete applications, with technical datasheets and export support.'
    },
    gbfs: {
      title: 'GBFS Granules Supplier from China | SENLAN TRADING',
      desc: 'Granulated Blast Furnace Slag (GBFS) supply from China for further processing and industrial applications, with export logistics support.'
    },
    highcalcium: {
      title: 'High-Calcium Limestone Supplier | SENLAN TRADING',
      desc: 'High-calcium limestone supply for cement and industrial applications, supported by technical datasheets and export logistics from China.'
    },
    clinker: {
      title: 'Cement Clinker Supplier from China | SENLAN TRADING',
      desc: 'Cement clinker supply from China for global trading and cement production, with technical datasheets and shipment support.'
    }
  };
  const s = seo[state.product];
  if (s) {
    document.title = s.title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', s.desc);

    let ogt = document.querySelector('meta[property="og:title"]');
    if (!ogt) {
      ogt = document.createElement('meta');
      ogt.setAttribute('property', 'og:title');
      document.head.appendChild(ogt);
    }
    ogt.setAttribute('content', s.title);

    let ogd = document.querySelector('meta[property="og:description"]');
    if (!ogd) {
      ogd = document.createElement('meta');
      ogd.setAttribute('property', 'og:description');
      document.head.appendChild(ogd);
    }
    ogd.setAttribute('content', s.desc);

    const canonicalHref = `${SITE_URL}${encodeURIComponent(state.product)}.html`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalHref);

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
    ogi.setAttribute('content', new URL(p.bg, SITE_URL).href);

    let twTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twTitle) {
      twTitle = document.createElement('meta');
      twTitle.setAttribute('name', 'twitter:title');
      document.head.appendChild(twTitle);
    }
    twTitle.setAttribute('content', s.title);

    let twDesc = document.querySelector('meta[name="twitter:description"]');
    if (!twDesc) {
      twDesc = document.createElement('meta');
      twDesc.setAttribute('name', 'twitter:description');
      document.head.appendChild(twDesc);
    }
    twDesc.setAttribute('content', s.desc);

    let twImage = document.querySelector('meta[name="twitter:image"]');
    if (!twImage) {
      twImage = document.createElement('meta');
      twImage.setAttribute('name', 'twitter:image');
      document.head.appendChild(twImage);
    }
    twImage.setAttribute('content', new URL(p.bg, SITE_URL).href);

    let schemaScript = document.getElementById('product-schema');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      schemaScript.id = 'product-schema';
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: s.title.replace(' | SENLAN TRADING', ''),
      description: s.desc,
      image: [new URL(p.bg, SITE_URL).href],
      brand: {
        '@type': 'Organization',
        name: 'SENLAN TRADING'
      },
      manufacturer: {
        '@type': 'Organization',
        name: 'SENLAN TRADING'
      },
      url: canonicalHref,
      category: 'Construction Materials'
    });
  }
  // background
  document.getElementById('p-bg').style.backgroundImage = `url('${p.bg}')`;

  // headline + lead + highlights
  const meta = document.getElementById('p-meta');
  if (STATIC_PRODUCTS.includes(state.product)) {
    applyStaticProductContent();
    meta.style.display = ['highcalcium', 'clinker'].includes(state.product) ? 'none' : '';
  } else {
    document.getElementById('p-headline').textContent = p.headline[state.lang];
    const lead = [p.lead[state.lang], p.lead2?.[state.lang]].filter(Boolean).join('\n\n');
    document.getElementById('p-lead').textContent = lead;

    meta.innerHTML = '';
    p.highlights.forEach(item => {
      const div = document.createElement('div');
      div.className = 'meta-item';
      div.innerHTML = `<div class="meta-k">${t('p.k.' + item.k)}</div><div class="meta-v">${item.v}</div>`;
      meta.appendChild(div);
    });
    meta.style.display = p.highlights.length ? '' : 'none';
  }

  // benefits
  const list = document.getElementById('p-benefits');
  const benefits = (p.benefits?.[state.lang] || []).filter(Boolean);
  if (list) {
    if (!['ggbfs', 'gbfs'].includes(state.product)) {
      list.innerHTML = '';
      benefits.forEach(text => {
        const li = document.createElement('li');
        li.textContent = text;
        list.appendChild(li);
      });
    }
    const sec = document.getElementById('benefits');
    if (sec) sec.style.display = (['ggbfs', 'gbfs'].includes(state.product) || (benefits.length && state.product !== 'highcalcium')) ? '' : 'none';
  }

  // factory partners section (GBFS only)
  const partnersSec = document.getElementById('factory-partners');
  if (partnersSec) {
    partnersSec.style.display = state.product === 'gbfs' ? '' : 'none';
  }

  applyProductSections();

  // logistics partners section (GBFS only)
  const logisticsSec = document.getElementById('logistics-partners');
  if (logisticsSec) {
    logisticsSec.style.display = state.product === 'gbfs' ? '' : 'none';
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
  if (!STATIC_PRODUCTS.includes(state.product)) {
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
  }

  applyI18n();
  applyLangBlocks();
  initHighcalciumSpecsPreview();
}

function initHighcalciumSpecsPreview() {
  const preview = document.getElementById('highcalcium-spec-preview');
  const img = document.getElementById('highcalcium-spec-preview-img');
  const empty = document.getElementById('highcalcium-spec-preview-empty');
  if (!preview || !img || !empty) return;

  const blocks = document.querySelectorAll('#highcalcium-specs .highcalcium-specs-list > [data-static-product="highcalcium"][data-static-lang]');
  const activeBlock = Array.from(blocks).find((block) => block.dataset.staticLang === state.lang);
  if (!activeBlock) return;

  const options = activeBlock.querySelectorAll('.spec-option');
  if (!options.length) return;

  const updatePreview = (option) => {
    const sizeKey = option.dataset.sizeKey;
    const src = HIGHCALCIUM_SPEC_IMAGES[sizeKey];

    options.forEach((node) => node.classList.toggle('is-active', node === option));

    if (src) {
      img.src = src;
      img.alt = option.querySelector('.meta-v')?.textContent || 'High-calcium size preview';
      img.hidden = false;
      empty.hidden = true;
    } else {
      img.hidden = true;
      empty.hidden = false;
    }
  };

  options.forEach((option) => {
    option.onmouseenter = () => updatePreview(option);
    option.onfocus = () => updatePreview(option);
  });

  const active = activeBlock.querySelector('.spec-option.is-active') || options[0];
  updatePreview(active);
}

function setLang(lang) {
  state.lang = lang;
  document.querySelectorAll('.lang__btn').forEach(b => b.classList.toggle('is-active', b.dataset.lang === lang));
  render();
}

function initFromQuery() {
  const p = getProductFromLocation();
  if (p && DATA[p]) state.product = p;
  console.log('[product] location → using', state.product);
}

// init
initFromQuery();
document.querySelectorAll('.lang__btn').forEach(btn => btn.addEventListener('click', () => setLang(btn.dataset.lang)));
document.getElementById('year').textContent = new Date().getFullYear();
render();
