#!/usr/bin/env python3
"""Dependency-free static SEO checks; run from any directory."""
import json
import re
import subprocess
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote
import xml.etree.ElementTree as ET
from generate_sitemaps import ROOT, SITE, SM, Metadata, collect

class Tags(HTMLParser):
    def __init__(self, source):
        super().__init__(); self.tags=[]; self.feed(source)
    def handle_starttag(self, tag, attrs): self.tags.append((tag,dict(attrs)))
    handle_startendtag=handle_starttag

def check():
    tracked=set(subprocess.check_output(['git','ls-tree','-rz','--name-only','HEAD'],cwd=ROOT).decode().split('\0'))
    errors=[]; pages=list(ROOT.glob('*.html'))+list((ROOT/'news').rglob('*.html')); blocks=0; links=0
    org=json.loads((ROOT/'scripts/organization.json').read_text())
    for p in pages:
        rel=p.relative_to(ROOT).as_posix(); source=p.read_text(); tags=Tags(source).tags
        try: meta=Metadata(source); blocks+=len(meta.schemas)
        except Exception as exc: errors.append(f'{rel}: invalid JSON-LD: {exc}'); continue
        for tag,a in tags:
            for attr in ('href','src','poster'):
                value=a.get(attr)
                if not value: continue
                u=urlsplit(urljoin(SITE+'/'+rel,value))
                if u.netloc!='senlantrading.org': continue
                target=unquote(u.path).lstrip('/') or 'index.html'
                links+=1
                if target not in tracked and not (ROOT/target).is_file(): errors.append(f'{rel}: missing {target}')
            if tag=='img' and not a.get('alt') and 'alt' not in a: errors.append(f'{rel}: image missing alt')
        for obj in meta.schemas:
            if obj.get('@type')=='Organization' and obj!=org: errors.append(f'{rel}: Organization drift')
        if p.stem in ('gbfs','ggbfs','highcalcium','clinker'):
            key=p.stem
            if source.count('<h1 ')!=1: errors.append(f'{rel}: expected one H1')
            for tag,a in tags:
                if a.get('data-static-product') and a['data-static-product']!=key: errors.append(f'{rel}: wrong product block')
                if a.get('data-static-lang')=='en' and 'display:none' in a.get('style','').replace(' ',''): errors.append(f'{rel}: English hidden initially')
                if a.get('data-static-lang')=='zh' and a.get('lang')!='zh-CN': errors.append(f'{rel}: missing Chinese language attribute')
            product=[x for x in meta.schemas if x.get('@type')=='Product']; crumbs=[x for x in meta.schemas if x.get('@type')=='BreadcrumbList']
            if len(product)!=1 or len(crumbs)!=1: errors.append(f'{rel}: Product/Breadcrumb missing or duplicated')
            else:
                if product[0].get('url')!=meta.canonical or not product[0].get('@id'): errors.append(f'{rel}: invalid product identity')
                if set(product[0]) & {'offers','aggregateRating','review','manufacturer'}: errors.append(f'{rel}: unverified product claims')
                if [x['position'] for x in crumbs[0]['itemListElement']]!=[1,2]: errors.append(f'{rel}: breadcrumb positions')
            for attr,value in [('name','description'),('name','robots'),('property','og:title'),('property','og:url'),('property','og:image'),('name','twitter:card'),('name','twitter:title'),('name','twitter:image')]:
                if not any(t=='meta' and a.get(attr)==value for t,a in tags): errors.append(f'{rel}: missing {value}')
    urls={n.text for n in ET.parse(ROOT/'sitemap.xml').findall(f'.//{{{SM}}}loc')}
    if urls!=set(collect(ROOT)): errors.append('sitemap does not match self-canonical indexable pages')
    ET.parse(ROOT/'news-sitemap.xml')
    if (ROOT/'googlea147cf3994cb1d6b.html').read_text().strip()!='google-site-verification: googlea147cf3994cb1d6b.html': errors.append('verification token changed')
    js=(ROOT/'product-page.js').read_text(); gbfs=js.split('  gbfs: {',1)[1].split('  highcalcium: {',1)[0]
    if any(x in gbfs for x in ('C₂S','C₃S','C₃A','C₄AF')): errors.append('GBFS clinker chemistry regression')
    print(f'{len(pages)} HTML pages, {blocks} JSON-LD blocks, {links} local references; {len(errors)} errors')
    for error in errors: print(error)
    return bool(errors)

if __name__=='__main__': raise SystemExit(check())
