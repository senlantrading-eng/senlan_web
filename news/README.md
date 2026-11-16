# SENLAN News Structure

## Public entry
- `../daily.html` remains the root news landing page.

## Organized content
- `articles/` — standalone static news article pages
- `legacy/` — old JS-driven news files kept for backward compatibility

## Compatibility
- Root-level historical article URLs are preserved as lightweight redirect wrappers to `news/articles/`.
- Root-level `daily-post.html`, `daily-post.js`, and `daily-data.js` redirect to `news/legacy/`.

## Publishing rule
Future news publishing should target `news/articles/` as the canonical storage location, while preserving any required root-level compatibility wrappers when public URLs must not break.

## Image reuse and publishing (2026-11-16)

Reuse existing images across articles. Do not generate dated copies of the same picture.

```sh
python3 scripts/news_images.py import /absolute/path/to/source.jpg
# Returns {"path":"img/existing-name.jpg","created":false} for identical bytes.
python3 scripts/publish_news.py YYYY-MM-DD --dry-run
python3 scripts/publish_news.py YYYY-MM-DD
```

Use the returned path for HTML images and OG/Twitter/JSON-LD. From `news/articles/`, use `../../img/...`; metadata uses absolute HTTPS URLs. The import helper compares SHA-256 and refuses to overwrite existing content. Different encodings/crops are not auto-merged. Old duplicate files are retained to preserve historical URLs; 20 existing pages now share canonical byte-identical image paths.

The publisher validates canonical news order and images, regenerates sitemaps, rejects pre-staged changes and duplicate image additions, and stages only the chosen day's canonical articles, daily.html, sitemaps and actually referenced new images. Existing modified images require separate review. New articles belong in `news/articles/`; no new root wrapper is necessary. Run the sitemap generator regularly on the host to age out News entries between publishing runs.
