#!/usr/bin/env python3
"""Generate general and Google News sitemaps from canonical HTML metadata."""

from __future__ import annotations

import html
import json
import re
from datetime import date, timedelta
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[1]
SITE = "https://senlantrading.org"


def html_files() -> list[Path]:
    return sorted(ROOT.glob("*.html")) + sorted((ROOT / "news" / "articles").glob("*.html"))


def canonical(source: str) -> str | None:
    match = re.search(r'<link\s+rel="canonical"\s+href="([^"]+)"', source, re.I)
    if not match or not match.group(1).startswith(SITE):
        return None
    return match.group(1)


def article_data(source: str) -> dict | None:
    for raw in re.findall(r'<script\s+type="application/ld\+json">(.*?)</script>', source, re.I | re.S):
        try:
            data = json.loads(raw)
        except json.JSONDecodeError:
            continue
        if data.get("@type") in {"Article", "NewsArticle"}:
            return data
    return None


def page_lastmod(path: Path, source: str, article: dict | None) -> str:
    if article:
        modified = article.get("dateModified") or article.get("datePublished")
        if modified:
            return str(modified)[:10]
    dated = re.search(r"(20\d{2}-\d{2}-\d{2})", path.name)
    if dated:
        return dated.group(1)
    if path.name == "daily.html":
        return date.today().isoformat()
    return date.fromtimestamp(path.stat().st_mtime).isoformat()


def priority(url: str) -> str:
    path = urlparse(url).path
    if path in {"", "/"}:
        return "1.0"
    if path in {"/ggbfs.html", "/gbfs.html", "/clinker.html", "/highcalcium.html"}:
        return "0.9"
    if path == "/daily.html":
        return "0.8"
    if re.search(r"/20\d{2}-\d{2}-\d{2}-", path):
        return "0.7"
    return "0.6"


def main() -> None:
    pages: dict[str, tuple[Path, str, dict | None]] = {}
    for path in html_files():
        source = path.read_text(encoding="utf-8", errors="ignore")
        url = canonical(source)
        if not url:
            continue
        # Canonical URL is the identity: this also removes legacy duplicate files.
        pages.setdefault(url, (path, source, article_data(source)))

    sitemap = ['<?xml version="1.0" encoding="UTF-8"?>',
               '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for url, (path, source, article) in sorted(pages.items(), key=lambda item: item[0]):
        sitemap.extend([
            "  <url>",
            f"    <loc>{html.escape(url)}</loc>",
            f"    <lastmod>{page_lastmod(path, source, article)}</lastmod>",
            f"    <priority>{priority(url)}</priority>",
            "  </url>",
        ])
    sitemap.append("</urlset>")
    (ROOT / "sitemap.xml").write_text("\n".join(sitemap) + "\n", encoding="utf-8")

    cutoff = date.today() - timedelta(days=2)
    news_rows = []
    for url, (path, source, article) in pages.items():
        if not article or not article.get("datePublished") or not article.get("headline"):
            continue
        published = date.fromisoformat(str(article["datePublished"])[:10])
        if published >= cutoff:
            news_rows.append((published, url, article))

    news = ['<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
            '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">']
    for published, url, article in sorted(news_rows, reverse=True):
        news.extend([
            "  <url>",
            f"    <loc>{html.escape(url)}</loc>",
            "    <news:news>",
            "      <news:publication>",
            "        <news:name>SENLAN TRADING</news:name>",
            "        <news:language>en</news:language>",
            "      </news:publication>",
            f"      <news:publication_date>{published.isoformat()}</news:publication_date>",
            f"      <news:title>{html.escape(str(article['headline']))}</news:title>",
            "    </news:news>",
            "  </url>",
        ])
    news.append("</urlset>")
    (ROOT / "news-sitemap.xml").write_text("\n".join(news) + "\n", encoding="utf-8")

    print(f"Generated sitemap.xml with {len(pages)} canonical URLs")
    print(f"Generated news-sitemap.xml with {len(news_rows)} recent articles")


if __name__ == "__main__":
    main()
