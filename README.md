# SENLAN TRADING demo

Tesla-style minimal bilingual homepage demo.

## Run locally
From this folder:

```bash
python3 -m http.server 5173
```

Then open:

- http://localhost:5173

## News structure

- Root news landing page: `daily.html`
- Canonical news article pages: `news/articles/`
- Legacy JS-era news files: `news/legacy/`
- Root-level historical article URLs are kept as lightweight redirect wrappers so old links do not break.

## Replace images
Edit `styles.css` and replace the `.hero__slide[data-slide="X"]{background-image:...}` rules with real image URLs.
