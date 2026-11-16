#!/usr/bin/env python3
"""Reuse byte-identical images without deleting originals or guessing visual similarity."""
from __future__ import annotations
import argparse
import hashlib
import json
import re
import shutil
import subprocess
from collections import defaultdict
from pathlib import Path
from urllib.parse import quote, unquote

ROOT = Path(__file__).resolve().parents[1]
EXTENSIONS = {'.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.avif'}

def digest(path):
    with path.open('rb') as stream:
        return hashlib.file_digest(stream, 'sha256').hexdigest()

def tracked_images(root):
    names = subprocess.check_output(['git','ls-files','-z','--','img/'], cwd=root).decode().split('\0')
    return [root/name for name in names if name and (root/name).is_file() and (root/name).suffix.lower() in EXTENSIONS]

def image_index(root):
    groups = defaultdict(list)
    for path in tracked_images(root):
        if not path.resolve().is_relative_to(root.resolve()): raise ValueError('Image symlink leaves repository')
        groups[digest(path)].append(path.relative_to(root).as_posix())
    return {key: sorted(paths, key=lambda x: (bool(re.search(r'20\d\d-\d\d-\d\d',x)), len(x), x)) for key,paths in groups.items()}

def reuse(source, root=ROOT):
    source = Path(source).resolve()
    if not source.is_file() or source.suffix.lower() not in EXTENSIONS: raise ValueError('Source must be an existing image')
    sha = digest(source); index = image_index(root)
    if sha in index: return index[sha][0], False
    # Also recognize a previous import not committed yet; never duplicate it.
    for path in sorted((root/'img').rglob('*')):
        if path.is_file() and path.suffix.lower() in EXTENSIONS and path.resolve().is_relative_to(root.resolve()) and digest(path)==sha:
            return path.relative_to(root).as_posix(), False
    target = root/'img'/source.name
    if target.exists(): target = target.with_name(f'{target.stem}-{sha[:12]}{target.suffix}')
    if target.exists(): raise ValueError('Destination exists; refusing to overwrite')
    target.parent.mkdir(parents=True, exist_ok=True)
    # Exclusive creation prevents a concurrent import from overwriting a file.
    with source.open('rb') as src, target.open('xb') as dest: shutil.copyfileobj(src,dest)
    return target.relative_to(root).as_posix(), True

def duplicate_map(root=ROOT):
    return {alias:paths[0] for paths in image_index(root).values() for alias in paths[1:]}

def normalize_news(root=ROOT, apply=False):
    aliases=duplicate_map(root); changes=[]
    files=list(root.glob('20??-??-??-*.html'))+list((root/'news/articles').glob('*.html'))+[root/'daily.html']
    # Only rewrite exact local path tokens; leave captions/alt text and external URLs alone.
    pattern=re.compile(r'(?<![\w:/])(?P<prefix>https://senlantrading\.org/|(?:\.\./)+|/|)(?P<path>img/[^\s"\'<>?#)]+)')
    for path in files:
        if not path.exists(): continue
        source=path.read_text()
        def replace(match):
            old=unquote(match['path']); new=aliases.get(old)
            if not new:return match.group(0)
            return match['prefix']+(quote(new,safe='/') if '%' in match['path'] else new)
        result=pattern.sub(replace,source)
        if result!=source:
            changes.append(path.relative_to(root).as_posix())
            if apply:path.write_text(result)
    return {'aliases':aliases,'changed_pages':changes,'original_files_deleted':0}

def reject_new_duplicates(root, new_images):
    index=image_index(root); seen={key:paths[0] for key,paths in index.items()}
    for name in sorted(new_images):
        path=root/name; sha=digest(path)
        if sha in seen and seen[sha]!=name:raise ValueError(f'{name} duplicates {seen[sha]}; reuse the existing URL')
        seen[sha]=name

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root',type=Path,default=ROOT)
    sub=parser.add_subparsers(dest='command',required=True)
    imp=sub.add_parser('import');imp.add_argument('source',type=Path)
    norm=sub.add_parser('normalize');norm.add_argument('--apply',action='store_true')
    args=parser.parse_args()
    if args.command=='import':
        name,created=reuse(args.source,args.root);print(json.dumps({'path':name,'created':created},ensure_ascii=False))
    else: print(json.dumps(normalize_news(args.root,args.apply),ensure_ascii=False,indent=2))
