#!/usr/bin/env python3
"""Validate canonical recent news links on the bilingual news landing page."""
import argparse
import re
from pathlib import Path
from urllib.parse import urljoin
from generate_sitemaps import ROOT, SITE, SM, Metadata, collect
from check_seo import Tags

def validate(root=ROOT, count=4):
    pages=collect(root)
    articles=sorted((url for url,data in pages.items() if data and re.search(r'/20\d\d-\d\d-\d\d-',url)),key=lambda u:u.rsplit('/',1)[-1],reverse=True)[:count]
    if not articles: raise ValueError('No canonical articles found')
    source=(root/'daily.html').read_text(); tags=Tags(source).tags
    cards=[urljoin(SITE+'/',a['href']) for tag,a in tags if tag=='a' and 'news-card' in a.get('class','').split()]
    payload=Metadata(source).schemas
    listings=[urljoin(SITE+'/',item['url']) for obj in payload for item in obj.get('mainEntity',{}).get('itemListElement',[]) if 'url' in item]
    if cards[:len(articles)]!=articles: raise ValueError('Recent canonical news cards are missing or out of order')
    if listings[:len(articles)]!=articles: raise ValueError('Recent canonical JSON-LD items are missing or out of order')
    latest=[urljoin(SITE+'/',a['href']) for tag,a in tags if tag=='a' and 'btn--primary' in a.get('class','').split()]
    if articles[0] not in latest:raise ValueError('Latest article button is stale')
    langs={a.get('data-lang') for _,a in tags}
    if not {'en','zh'}<=langs:raise ValueError('Bilingual controls missing')
    print(f'PASS: {len(articles)} latest canonical articles, news cards, JSON-LD and language controls')

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--site-root',type=Path,default=ROOT);parser.add_argument('--recent-count',type=int,default=4)
    args=parser.parse_args();validate(args.site_root,args.recent_count)
