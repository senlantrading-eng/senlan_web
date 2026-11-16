#!/usr/bin/env python3
"""Generate canonical sitemaps. Run at publication and hourly on the serving host."""
from __future__ import annotations
import argparse
import json
from datetime import datetime, timedelta, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
SITE = 'https://senlantrading.org'
SM = 'http://www.sitemaps.org/schemas/sitemap/0.9'
NEWS = 'http://www.google.com/schemas/sitemap-news/0.9'
ET.register_namespace('', SM)
ET.register_namespace('news', NEWS)

class Metadata(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.canonical = None
        self.noindex = False
        self.redirect = False
        self.schemas = []
        self.raw = None
        self.feed(source)
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical = a.get('href')
        if tag == 'meta':
            if a.get('name', '').lower() in ('robots', 'googlebot') and 'noindex' in a.get('content', '').lower(): self.noindex = True
            if a.get('http-equiv', '').lower() == 'refresh': self.redirect = True
        if tag == 'script' and a.get('type') == 'application/ld+json': self.raw = ''
    handle_startendtag = handle_starttag
    def handle_data(self, data):
        if self.raw is not None: self.raw += data
    def handle_endtag(self, tag):
        if tag == 'script' and self.raw is not None:
            self.schemas.append(json.loads(self.raw))
            self.raw = None

def article_data(nodes):
    for node in nodes:
        if isinstance(node, list):
            found = article_data(node)
            if found: return found
        elif isinstance(node, dict):
            if node.get('@type') in ('Article', 'NewsArticle'): return node
            found = article_data(node.get('@graph', []))
            if found: return found
    return None

def instant(value):
    """Do not invent a timezone/time for date-only historical metadata."""
    if not isinstance(value, str) or 'T' not in value: return None
    try: result = datetime.fromisoformat(value.replace('Z', '+00:00'))
    except ValueError: return None
    return result.astimezone(timezone.utc) if result.tzinfo else None

def recent(article, now):
    published = instant(article.get('datePublished'))
    return published is not None and now - timedelta(hours=48) <= published <= now

def lastmod(article, now):
    value = article.get('dateModified') or article.get('datePublished')
    if not isinstance(value, str): return None
    try:
        if len(value) == 10:
            day = datetime.strptime(value, '%Y-%m-%d').date()
            return value if day <= now.date() else None
        stamp = instant(value)
        return value if stamp and stamp <= now else None
    except ValueError: return None

def collect(root):
    pages = {}
    for path in sorted(root.glob('*.html')) + sorted((root/'news/articles').glob('*.html')):
        meta = Metadata(path.read_text(encoding='utf-8'))
        if meta.noindex or meta.redirect or not meta.canonical: continue
        parsed = urlsplit(meta.canonical)
        if (parsed.scheme, parsed.netloc) != ('https', 'senlantrading.org') or parsed.query or parsed.fragment: continue
        target = root / (unquote(parsed.path).lstrip('/') or 'index.html')
        # Compatibility aliases must never supply metadata for the actual article.
        if target.resolve() != path.resolve() or not target.is_file(): continue
        pages[meta.canonical] = article_data(meta.schemas) or {}
    return pages

def write_xml(path, element):
    ET.indent(element, space='  ')
    # Atomic replacement keeps a serving host from returning a half-written file.
    temp = path.with_suffix('.xml.tmp')
    ET.ElementTree(element).write(temp, encoding='utf-8', xml_declaration=True)
    temp.replace(path)

def generate(root=ROOT, now=None):
    now = now or datetime.now(timezone.utc)
    if now.tzinfo is None: raise ValueError('now must include timezone')
    now = now.astimezone(timezone.utc)
    pages = collect(root)
    general = ET.Element(f'{{{SM}}}urlset')
    news = ET.Element(f'{{{SM}}}urlset')
    count = 0
    for url, article in sorted(pages.items()):
        entry = ET.SubElement(general, f'{{{SM}}}url')
        ET.SubElement(entry, f'{{{SM}}}loc').text = url
        modified = lastmod(article, now)
        if modified: ET.SubElement(entry, f'{{{SM}}}lastmod').text = modified
        if not article.get('headline') or not recent(article, now): continue
        if count >= 1000: raise ValueError('More than 1000 recent articles: split the News sitemap before publication')
        entry = ET.SubElement(news, f'{{{SM}}}url')
        ET.SubElement(entry, f'{{{SM}}}loc').text = url
        details = ET.SubElement(entry, f'{{{NEWS}}}news')
        publication = ET.SubElement(details, f'{{{NEWS}}}publication')
        ET.SubElement(publication, f'{{{NEWS}}}name').text = 'SENLAN TRADING'
        ET.SubElement(publication, f'{{{NEWS}}}language').text = 'en'
        ET.SubElement(details, f'{{{NEWS}}}publication_date').text = article['datePublished']
        ET.SubElement(details, f'{{{NEWS}}}title').text = article['headline']
        count += 1
    write_xml(root/'sitemap.xml', general)
    write_xml(root/'news-sitemap.xml', news)
    print(f'Generated {len(pages)} canonical URLs; {count} news articles within 48 hours')
    return len(pages), count

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--now', help='Reproducible timestamp with timezone; omit in production')
    args = parser.parse_args()
    now = instant(args.now) if args.now else None
    if args.now and now is None: parser.error('--now requires a full timestamp with timezone')
    generate(now=now)
