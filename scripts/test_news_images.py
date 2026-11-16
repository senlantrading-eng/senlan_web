import json
from pathlib import Path
import subprocess
from tempfile import TemporaryDirectory
import unittest
from news_images import reuse, duplicate_map, normalize_news, reject_new_duplicates
from publish_news import plan

class ImageReuseTests(unittest.TestCase):
    def setUp(self):
        self.temp=TemporaryDirectory();self.root=Path(self.temp.name);(self.root/'img').mkdir();(self.root/'news/articles').mkdir(parents=True)
        subprocess.run(['git','init','-q',self.root],check=True)
        (self.root/'img/original.png').write_bytes(b'existing-image')
        self.run_git('add','img/original.png');self.run_git('-c','user.name=Test','-c','user.email=test@localhost','commit','-qm','fixture')
    def tearDown(self):self.temp.cleanup()
    def run_git(self,*args):subprocess.run(['git','-C',str(self.root),*args],check=True,stdout=subprocess.DEVNULL)
    def test_renamed_duplicate_reuses_tracked_url(self):
        source=self.root/'renamed.png';source.write_bytes(b'existing-image')
        self.assertEqual(reuse(source,self.root),('img/original.png',False));self.assertFalse((self.root/'img/renamed.png').exists())
    def test_new_image_and_filename_collision(self):
        source=self.root/'original.png';source.write_bytes(b'different-image')
        name,created=reuse(source,self.root);self.assertTrue(created);self.assertNotEqual(name,'img/original.png');self.assertEqual((self.root/'img/original.png').read_bytes(),b'existing-image');self.assertEqual(reuse(source,self.root),(name,False))
    def test_duplicate_news_references_rewritten_without_deletion(self):
        alias=self.root/'img/2026-11-16-copy.png';alias.write_bytes(b'existing-image');self.run_git('add',str(alias));self.run_git('-c','user.name=Test','-c','user.email=test@localhost','commit','-qm','alias')
        p=self.root/'news/articles/2026-11-16-test.html';p.write_text('<img src="../../img/2026-11-16-copy.png"><meta property="og:image" content="https://senlantrading.org/img/2026-11-16-copy.png"><img src="https://other.example/img/2026-11-16-copy.png">')
        normalize_news(self.root,True);s=p.read_text();self.assertIn('../../img/original.png',s);self.assertIn('https://senlantrading.org/img/original.png',s);self.assertIn('https://other.example/img/2026-11-16-copy.png',s);self.assertTrue(alias.exists())
    def test_publish_excludes_unrelated_images_and_rejects_duplicates(self):
        article=self.root/'news/articles/2026-11-16-test.html';article.write_text('<link rel="canonical" href="https://senlantrading.org/news/articles/2026-11-16-test.html"><img src="../../img/original.png">');(self.root/'daily.html').write_text('<html></html>');(self.root/'img/unrelated.png').write_bytes(b'unrelated')
        self.assertNotIn('img/unrelated.png',plan(self.root,'2026-11-16'))
        (self.root/'img/new-copy.png').write_bytes(b'existing-image');article.write_text(article.read_text().replace('img/original.png','img/new-copy.png'))
        with self.assertRaisesRegex(ValueError,'duplicates'):plan(self.root,'2026-11-16')
    def test_pre_staged_changes_block_publish(self):
        (self.root/'other.txt').write_text('unrelated');self.run_git('add','other.txt')
        with self.assertRaisesRegex(ValueError,'staged'):plan(self.root,'2026-11-16')

if __name__=='__main__':unittest.main()
