# SEO / GEO audit and repair register

Audit: 2026-11-16 (Asia/Shanghai). Baseline: `cf4cae1f68e00c8af19cf3b39442d2417d8a63b6`. Source inventory: 232 HTML files; 106 articles under news/articles; 31 standalone root articles; 84 refresh pages (81 news wrappers, two legacy readers and product.html). No AGENTS.md present. Changes stay on a review branch.

## Findings before implementation

| Priority | Finding / evidence | Planned resolution |
|---|---|---|
| P0 | index/about/contact Organization nodes have different URLs, emails, phones and no stable ID | One repository-backed organization record and stable /#organization; reuse for publisher/author; align primary visible contact; preserve form recipient |
| P0 | All four product H1/lead/TDS blocks include all products, initially showing GGBFS | Keep only the current product blocks; English visible without JS; Chinese lang attributes; static correct hero |
| P0 | product-page.js GBFS lead2 lists clinker C2S/C3S/C3A/C4AF as principal constituents | Correct both language data and HTML to oxide composition and glassy phase, no invented values |
| P1 | Product schema created only by JS and falsely declares SENLAN manufacturer | Static Product + BreadcrumbList with stable IDs; no unverified manufacturer, offers, inventory, ratings or certification |
| P1 | sitemap generator reads redirect wrapper before canonical content; uses filesystem mtime/today as lastmod; does not reject noindex/missing target | Only self-canonical, indexable, existing pages; use explicit valid article modification date, otherwise omit lastmod |
| P1 | checked-in News sitemap contains old articles; date-only cutoff can exceed 48h | Timezone-aware rolling 48h, reject future/ambiguous timestamps, scheduled refresh instructions and regression tests |
| P1 | 81 root article wrappers use refresh + JS | Explicit server 301 for verified target files, canonical retained; normal fallback link when server rules unavailable |
| P1 | homepage index.html rewrite can match internal DirectoryIndex; no host/HTTPS rule | Guard with THE_REQUEST; add canonical host/scheme rule and local Apache integration tests |
| P1 | ?p= overrides product identity even on dedicated product URLs | Dedicated pathname wins; keep legacy parameter routing on product.html only |
| P1 | clinker overview defaults hidden / Chinese first; other pages include unrelated GBFS factory sections | Correct initial visibility; remove unrelated sections; language toggle updates html lang |
| P2 | Technical data mainly image-based, some existing sample highlights; clinker copy includes unsupported general guarantees | Add readable HTML tables with source/batch caveats and product-specific purchasing FAQ; do not invent missing values |
| P2 | Debug page indexable; product nav href=# on some pages; internal index/wrapper links add redirects | noindex debug page; canonical internal links and functional product nav |
| P2 | CSS hero starts empty until JS; offscreen molecule loads immediately; TDS images lack intrinsic dimensions | Preload/set current hero in HTML, defer 3D until near viewport, dimensions where local image is verified |
| P2 | Large source imagery/video and third-party fonts may affect LCP/CLS/INP | Inventory file sizes and active uses; preserve originals; targeted safe improvements and measured follow-up |

## Verified baseline / boundaries

- All scanned static href/src/poster targets and canonicals exist in Git; all JSON-LD parses. JS-generated URLs and remote destinations need separate checks.
- Main canonical pages already have title, description, robots, OG and Twitter tags. robots.txt allows crawling and references both sitemaps.
- 31 root news pages contain original articles with self canonicals, not compatibility wrappers. Keep these stable URLs in this repair (no mass migration).
- Single URL language toggle: English default; Chinese marked per block. Do not advertise two hreflang URLs pointing to one language-switching page.
- Search Console verification file exists; account ownership, submitted sitemaps, indexed status and Google-selected canonicals require Search Console access.
- Repository text is evidence of what is published, not independent confirmation of lab results, company contacts or social account ownership.
- No prices, reviews, availability, delivery guarantees, MOQ, new certifications or fabricated test results will be introduced. Schema semantics do not promise Google rich-result eligibility.

## External references

- https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap
- https://developers.google.com/search/docs/appearance/structured-data/product

## Implementation and validation results

- Primary identity uses the pre-existing homepage contact: `Senlantrading@outlook.com`, `+8619931552887`, the existing Tangshan address and LinkedIn/Facebook sameAs. No answer to the optional contact preference question was received before implementation. The contact page retains the existing alternative Outlook address and the FormSubmit recipient unchanged. `scripts/organization.json` is the reference record; static checks detect entity drift.
- Four products now ship their own English H1, description, highlights, technical images, static Product/BreadcrumbList and hero background. Other products' body blocks are removed, not merely hidden. No manufacturer/price/stock/rating is asserted. English technical reference/FAQ sections explicitly retain `lang=en` when Chinese UI is selected; no URL or hreflang migration.
- GBFS chemistry describes oxides and the glass phase. Clinker mineral names remain only in the correct clinker context; unsupported generic percentage/strength guarantees were removed.
- Existing product-page numbers are retained as references: GGBFS S95/S105/S115 and the displayed ranges; GBFS 98.1%, 9.40%, 99.86%, 0.34%; limestone CaO ≥53%, SiO₂ ≤1%, MgO ≤3% and existing sizes. Older shared JavaScript contained different values; it is aligned to the actual product HTML. No independent lab verification is claimed. Clinker numeric parameters remain in the linked PDF pending validated transcription.
- Ordinary sitemap contains 146 self-canonical pages. News sitemap has 0 entries on 2026-11-16. Historical articles remain in the ordinary sitemap. Date-only metadata remains unchanged; recent entries require actual timezone-aware publication timestamps rather than invented publication times.
- 81 exact news wrapper redirects, legacy reader ID mappings, product parameter redirects and canonical host/scheme rules are in `.htaccess`. 31 original root article URLs are intentionally retained.
- 207 images total approximately 341.2 MB in the source repository; `image-inventory.json` records dimensions and sizes. Some news PNGs approach 10 MB despite their names containing `compressed`. Source assets are retained; product images gain verified intrinsic dimensions/async decoding, each hero is available before JS and preloaded, and GGBFS 3D starts near the viewport with reduced-motion fallback.
- `python3 scripts/check_seo.py`: 232 HTML pages, 157 JSON-LD blocks, 5,283 local references, zero errors. Includes sitemap identity, schema identity, English initial visibility, product isolation, GBFS chemistry and verification-token checks.
- `python3 scripts/test_sitemaps.py`: 3 tests, including exact 48h boundary, stale/future/timezone/invalid timestamps, canonical-source selection, noindex exclusion, XML escaping and aging out.
- `node --check product-page.js` and `git diff --check`: pass.
- Local Apache 2.4: configuration syntax pass; actual root 200, index redirect without DirectoryIndex loop, all 81 news redirects, four product redirects, host/scheme normalization and sample legacy reader ID mapping pass.
- In-app browser: all four product English headings/body/technical references rendered; GBFS Chinese → English switching verified. Full automated desktop/mobile matrix could not run because local headless Chrome terminated at launch; do not interpret this as full visual/CWV certification.

## Deployment requirements and remaining verification

1. Deploy the PR only after review. Ensure Apache/LiteSpeed honors `.htaccess`, `mod_rewrite`, `AllowOverride`, TLS and the canonical domain. The HTTPS condition assumes the origin exposes HTTPS correctly; if a reverse proxy terminates TLS, configure trusted scheme handling at the host before deployment. Do not trust arbitrary client Forwarded headers in application rewrite rules.
2. Run `python3 scripts/generate_sitemaps.py` on publication and a host scheduler, preferably at least hourly, to age News entries out. Deploy both generated XML files atomically. This repository change does not install a production scheduler or deploy files. A static News sitemap can become stale between runs; use request-time generation if strict continuous 48h expiry is required.
3. New news articles should have genuine timezone-aware `datePublished` (e.g. a real `+08:00` timestamp), matching visible publication time, an accurate headline and an indexable self canonical. Never rewrite old dates to make content appear fresh. Entries lacking a precise timezone-aware timestamp are conservatively omitted from News sitemap, not the ordinary sitemap.
4. Search Console ownership, sitemap submission/processing, coverage, URL inspection, Google-selected canonicals, manual actions and crawl statistics require account access. The repository verification token is preserved, but a file alone does not prove ownership.
5. Verify redirects and HTTP response headers after deployment behind Hostinger/CDN, including `X-Robots-Tag`, cache behavior, HTTPS www certificate and redirect chains. Clear relevant caches. Local tests do not prove production configuration.
6. Run Google Rich Results Test / Schema validator on deployed pages. Product entity markup without offers/reviews is intentional and does not imply eligibility for Product rich results. No FAQ rich-result claim is made.
7. Validate company contacts/social ownership, lab reports and batch specifications with the business. This repair does not send an inquiry email or certify delivery.
8. Follow-up performance priority: create responsive compressed derivatives for actively used large news photos; retain legible TDS sources; measure fonts, homepage video, GGBFS WebGL CPU and mobile layout before broader asset changes. No Lighthouse/CrUX field measurement is available here.

## Suggested monitoring after deployment

- Weekly for 4–6 weeks: indexed canonical product/news URLs, sitemap discovered/indexed counts, duplicate/redirect/404/soft-404 exclusions and crawl errors.
- Compare Search Console impressions, clicks, CTR and position by product URL, country and query intent; segment brand/non-brand.
- Mobile field p75 LCP, INP and CLS; investigate regressions by template and active image size, not repository size alone.
- Confirm legacy 301 hit rate and target 200s, HTTP/www consolidation and stable canonical selection.
- Track product inquiry acceptance and qualified inquiries separately from quote/WhatsApp clicks; no tracking vendor was added.
- Review AI/search citations for correct entity, product identity and technical claims; treat referral/citation samples as observations, not a guaranteed GEO ranking metric.

## Production baseline observed before deployment

Read-only HTTP checks on 2026-11-16: HTTP non-www redirects to HTTPS non-www; HTTP www redirects to HTTPS www; HTTPS www still returns 200 (duplicate origin). robots.txt and the existing verification file return 200. These observations are of the old live site, not this unmerged branch.

## Delivery status

GitHub connector rejected both tree creation and branch creation with HTTP 403 `Resource not accessible by integration`. Local GitHub CLI has no authenticated host. Therefore the review branch/commit is saved locally and exported as a patch; no remote branch or PR has been created, merged or deployed. Restore repository Contents write access (and PR write access) or authenticate local Git before remote publication. The local commit uses the explicit agent identity `Codex <codex@localhost>`.
