import unittest
from datetime import datetime, timezone
from pathlib import Path
from tempfile import TemporaryDirectory
from generate_sitemaps import recent, collect, lastmod, generate

class SitemapTests(unittest.TestCase):
    now = datetime(2026,11,16,6,50,tzinfo=timezone.utc)
    def test_48_hour_boundaries(self):
        for value, expected in [('2026-11-14T06:50:00Z',True),('2026-11-14T06:49:59Z',False),('2026-11-16T06:50:01Z',False),('2026-11-16',False),('invalid',False),('2026-11-16T06:50:00',False),('2026-11-14T14:50:00+08:00',True)]:
            with self.subTest(value=value): self.assertEqual(recent({'datePublished':value},self.now),expected)
    def test_canonical_source_and_exclusions(self):
        with TemporaryDirectory() as directory:
            root=Path(directory); (root/'news/articles').mkdir(parents=True)
            url='https://senlantrading.org/news/articles/a.html'
            (root/'a.html').write_text(f'<link rel="canonical" href="{url}">')
            (root/'news/articles/a.html').write_text(f'<link rel="canonical" href="{url}"><script type="application/ld+json">{{"@type":"NewsArticle","headline":"A & B","datePublished":"2026-11-16T06:00:00Z"}}</script>')
            (root/'hidden.html').write_text('<link rel="canonical" href="https://senlantrading.org/hidden.html"><meta name="robots" content="noindex,follow">')
            (root/'wrong.html').write_text('<link rel="canonical" href="https://senlantrading.org.evil/wrong.html">')
            pages=collect(root); self.assertEqual(list(pages),[url]); self.assertEqual(pages[url]['headline'],'A & B')
            self.assertEqual(generate(root,self.now),(1,1))
            self.assertIn('A &amp; B',(root/'news-sitemap.xml').read_text())
            self.assertEqual(generate(root,datetime(2026,11,19,tzinfo=timezone.utc)),(1,0))
    def test_lastmod_not_filesystem_time(self):
        self.assertIsNone(lastmod({},self.now))
        self.assertIsNone(lastmod({'dateModified':'2027-01-01'},self.now))
        self.assertEqual(lastmod({'dateModified':'2026-11-05'},self.now),'2026-11-05')

if __name__=='__main__': unittest.main()
