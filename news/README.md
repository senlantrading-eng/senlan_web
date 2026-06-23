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
