#!/usr/bin/env python3
"""Publish only the chosen day's canonical articles and their new image dependencies."""
from __future__ import annotations
import argparse
from datetime import datetime
import json
from pathlib import Path
import re
import subprocess
from urllib.parse import urljoin, urlsplit, unquote
from check_seo import Tags
from generate_sitemaps import ROOT, SITE, Metadata, generate
from news_images import reject_new_duplicates
from validate_news import validate


def git(root,*args):
    return subprocess.check_output(['git',*args],cwd=root,text=True).strip()

def images_in(root,path):
    refs=[]; source=path.read_text()
    for tag,attrs in Tags(source).tags:
        for name in ('src','poster'):
            if attrs.get(name):refs.append(attrs[name])
        if attrs.get('property')=='og:image' or attrs.get('name')=='twitter:image':refs.append(attrs.get('content',''))
    def walk(value):
        if isinstance(value,dict):
            for k,v in value.items():
                if k=='image':
                    for item in v if isinstance(v,list) else [v]:
                        if isinstance(item,str):refs.append(item)
                else:walk(v)
        elif isinstance(value,list):
            for item in value:walk(item)
    walk(Metadata(source).schemas)
    result=set()
    for ref in refs:
        url=urlsplit(urljoin(SITE+'/'+path.relative_to(root).as_posix(),ref))
        if url.netloc!='senlantrading.org':continue
        name=unquote(url.path).lstrip('/')
        if not name.startswith('img/'):continue
        target=(root/name).resolve()
        if not target.is_relative_to(root.resolve()) or not target.is_file():raise ValueError(f'Missing or invalid image: {name}')
        result.add(name)
    return result

def plan(root,date):
    datetime.strptime(date,'%Y-%m-%d')
    if git(root,'diff','--cached','--name-only'):raise ValueError('Index already contains staged changes; review them before news publishing')
    files=sorted((root/'news/articles').glob(date+'-*.html'))
    if not files:raise ValueError('No canonical article for this date under news/articles/')
    tracked=set(git(root,'ls-files','-z').split('\0')); images=set()
    for path in files:
        meta=Metadata(path.read_text())
        expected=SITE+'/'+path.relative_to(root).as_posix()
        if meta.canonical!=expected or meta.noindex or meta.redirect:raise ValueError('Article must be indexable and self-canonical')
        images.update(images_in(root,path))
    images.update(images_in(root,root/'daily.html'))
    modified=set(git(root,'diff','--name-only').splitlines())
    if images & modified:raise ValueError('Existing referenced images were modified; review separately to avoid changing old articles')
    new=images-tracked
    reject_new_duplicates(root,new)
    return sorted({p.relative_to(root).as_posix() for p in files}|{'daily.html','sitemap.xml','news-sitemap.xml'}|new)


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('date');parser.add_argument('--root',type=Path,default=ROOT);parser.add_argument('--dry-run',action='store_true')
    args=parser.parse_args();root=args.root.resolve()
    paths=plan(root,args.date);validate(root)
    print(json.dumps({'files':paths,'dry_run':args.dry_run},ensure_ascii=False,indent=2))
    if args.dry_run:return
    generate(root)
    subprocess.run(['python3',str(root/'scripts/check_seo.py')],cwd=root,check=True)
    subprocess.run(['git','add','--',*paths],cwd=root,check=True)
    if not git(root,'diff','--cached','--name-only'):
        print('No news changes to commit');return
    # No forced push; remote divergence is left for explicit review.
    subprocess.run(['git','commit','-m',f'content: publish news for {args.date}'],cwd=root,check=True)
    subprocess.run(['git','push','origin','HEAD'],cwd=root,check=True)

if __name__=='__main__':main()
