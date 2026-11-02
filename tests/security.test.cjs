const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const begin = source.indexOf('const safeURL = ');
const end = source.indexOf('const imagePosition =', begin);
assert.ok(begin >= 0 && end > begin);
const fn = new Function('window',source.slice(begin,end)+'return safeURL;')({
  location: {href:'https://ryotamatsuki.github.io/'}
});
test('unsafe URL protocols are refused rather than merely HTML-escaped', () => {
  for(const input of ['javascript:alert(1)', 'data:text/html,<script>alert(1)</script>', 'vbscript:msgbox(1)'])
    assert.equal(fn(input),'');
  assert.equal(fn('https://github.com/ryotamatsuki'), 'https://github.com/ryotamatsuki');
  assert.equal(fn('assets/photo.png'), 'https://ryotamatsuki.github.io/assets/photo.png');
});
test('project URLs and image sources are validated', () => {
  assert.match(source,/const appUrl = safeURL\(project\.appUrl\)/);
  assert.match(source,/const repoUrl = safeURL\(project\.repoUrl\)/);
  assert.match(source,/src="\$\{escapeHTML\(safeURL\(project\.image\)\)\}"/);
  assert.doesNotMatch(source,/href="\$\{escapeHTML\(project\.(appUrl|repoUrl)\)\}"/);
});
test('portfolio script is valid JavaScript',()=>assert.doesNotThrow(()=>new Function(source)));
