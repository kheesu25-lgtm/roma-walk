"""app/index.html + app/i18n.js -> 단독 실행 파일(index.html, roma_walk_map.html) 생성.
사용: py build.py"""
import re

h = open('app/index.html', encoding='utf-8').read()
js = open('app/i18n.js', encoding='utf-8').read()
tag = '<script src="i18n.js"></script>'
assert h.count(tag) == 1
h = h.replace(tag, '<script>\n' + js + '\n</script>')
for pat in (r'<link rel="manifest"[^>]*>\n?', r'<link rel="icon"[^>]*>\n?', r'<link rel="apple-touch-icon"[^>]*>\n?'):
    h = re.sub(pat, '', h)
h = re.sub(r"if\('serviceWorker' in navigator.*?\n", '', h, count=1)
for name in ('index.html', 'roma_walk_map.html'):
    open(name, 'w', encoding='utf-8', newline='\n').write(h)
print('built index.html, roma_walk_map.html', len(h))
