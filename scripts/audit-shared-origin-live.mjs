#!/usr/bin/env node
// Inventory deployed scripts on the GitHub Pages shared origin.
// This is a security visibility tool, NOT a certification that any script is safe.
import fs from "node:fs/promises";
import crypto from "node:crypto";
import { parse } from "parse5";

const origin = "https://ryotamatsuki.github.io";
const paths = [
 "/", "/test/", "/map-of-salesman-in-matsuyama-and-toon/", "/cancertest/",
 "/imabarityme/", "/airportgolf/", "/airportgolf1/", "/childcarematsuyama/",
 "/3d_tsunami/", "/openstreet/", "/lpsample/", "/orange/", "/ryota.openstreet/",
 "/kamijimatest/", "/kamijimatoshi_v2/", "/qgisgaikokujin/",
 "/qgisgaikokujin2/", "/matsuyamastationaroundmap/", "/codextest_a/",
 "/webgis/", "/360panorama/", "/kids_typing/", "/retro-sky-raid/",
 "/solar_system/", "/hime-star-journey/", "/ehime_quiz/", "/yokaizukan/",
 "/star-wing/", "/kumamotoshienmap/", "/ehime-evacuation-risk-map/",
 "/ehime-mobility-resilience-lab/", "/ehime-aed-rescue-map/",
 "/ehime-civil-works-monitor/", "/economic-theory-research-dashboard/",
 "/plateau_matsuyama/", "/racegame/", "/racegameastra/", "/house-/",
 "/furusatonozei/", "/-astra-wetland-lake/", "/yokaschlool/",
 "/matsuyamacastle-/", "/sakefolio/", "/sakefolio/security-test-20261019/"
];
const maxBytes = 8_000_000; // Large generated map/analytics pages exceed 4 MB.
const all = [];
const errors = [];
const sha = data => crypto.createHash("sha256").update(data).digest("hex");
async function read(url) {
 const controller = new AbortController();
 const timeout = setTimeout(() => controller.abort(), 12000);
 try {
  const response = await fetch(url, {redirect:"follow",signal:controller.signal,headers:{"User-Agent":"Sakefolio-Origin-Audit/1.0"}});
  if (!response.ok) throw Error("HTTP " + response.status);
  const size = Number(response.headers.get("content-length") || 0);
  if (size > maxBytes) throw Error("response too large");
  const buf = Buffer.from(await response.arrayBuffer());
  if (buf.length > maxBytes) throw Error("response too large");
  return {body:buf.toString("utf8"),size:buf.length,sha256:sha(buf),type:response.headers.get("content-type") || ""};
 } finally { clearTimeout(timeout); }
}
const scripts = new Set();
for (const pathname of paths) {
 const url = new URL(pathname,origin).href;
 try {
  const doc = await read(url);
  if (!/html/i.test(doc.type) && !/<html[\s>]/i.test(doc.body)) {
   errors.push({url,problem:"not HTML"});continue;
  }
  // WHATWG HTML parsing rather than a fragile script-tag matching regex.
  const parsed = parse(doc.body, { sourceCodeLocationInfo: true });
  const tags = [];
  const visit = node => {
    if (node.tagName === 'script') tags.push(node);
    for (const child of node.childNodes || []) visit(child);
    if (node.content) visit(node.content);
  };
  visit(parsed);
  const refs = [];
  for(const tag of tags) {
   const attributes = new Map((tag.attrs || []).map(a => [a.name, a.value]));
   const src = attributes.get('src');
   if(src) {
    try {
     const target = new URL(src,url);
     refs.push({src:target.href,crossOrigin:target.origin !== origin,
       integrity:typeof attributes.get('integrity') === 'string' && attributes.get('integrity').length>0});
     if(target.origin === origin) scripts.add(target.href);
    } catch(e){ errors.push({url,problem:"invalid script src"}); }
   } else {
    const loc = tag.sourceCodeLocation;
    const content = loc?.startTag && loc?.endTag
      ? doc.body.slice(loc.startTag.endOffset, loc.endTag.startOffset)
      : (tag.childNodes||[]).map(n=>n.value||'').join('');
    refs.push({inline:true,size:content.length,sha256:sha(content)});
   }
  }
  all.push({url,size:doc.size,sha256:doc.sha256,scriptRefs:refs,
   potentialSinks:(doc.body.match(/(?:innerHTML\s*(?:=|\+=)|outerHTML\s*=|insertAdjacentHTML\s*\(|setHTML\s*\(|document\.write\s*\(|\beval\s*\(|new Function\s*\()/g)||[]).length,
   serviceWorkerMentions:(doc.body.match(/serviceWorker|Service-Worker-Allowed/gi)||[]).length});
 }catch(e){errors.push({url,problem:String(e)});}
}
const js=[];
for(const url of scripts) {
 try {
  const file=await read(url);
  js.push({url,sha256:file.sha256,size:file.size,
   dynamicImports:(file.body.match(/\bimport\s*\(/g)||[]).length,
   serviceWorkerMentions:(file.body.match(/serviceWorker|Service-Worker-Allowed/gi)||[]).length,
   possibleHtmlSinks:(file.body.match(/(?:innerHTML\s*(?:=|\+=)|outerHTML\s*=|insertAdjacentHTML\s*\(|document\.write\s*\(|\beval\s*\()/g)||[]).length});
 }catch(e){errors.push({url,problem:String(e)});}
}
const output={timestamp:new Date().toISOString(),origin,scope:"explicit URL manifest (not complete origin enumeration)",pages:all,sameOriginScripts:js,errors};
await fs.mkdir("security-reports",{recursive:true});
await fs.writeFile("security-reports/shared-origin-live-inventory.json",JSON.stringify(output,null,2)+"\n");
const thirdParty=all.flatMap(p=>p.scriptRefs.filter(x=>x.crossOrigin).map(x=>({...x,page:p.url})));
const noSRI=thirdParty.filter(x=>!x.integrity);
const summary=[
 "# Live shared-origin JavaScript inventory",
 "",
 "This does not establish JavaScript trust or prove the absence of XSS.",
 "",
 "| Metric | Count |","|---|---:|",
 `| HTML pages inspected | ${all.length} |`,
 `| Same-origin JS URLs fetched | ${js.length} |`,
 `| Third-party script references | ${thirdParty.length} |`,
 `| Third-party scripts without SRI | ${noSRI.length} |`,
 `| Missing, denied or invalid URLs | ${errors.length} |`,
 "",
 "Full JSON report: security-reports/shared-origin-live-inventory.json",
 "",
 "A real-browser Service Worker registration and runtime dynamic-import check is still required."
].join("\n");
console.log(summary);
if(process.env.GITHUB_STEP_SUMMARY) await fs.appendFile(process.env.GITHUB_STEP_SUMMARY,summary+"\n");
// Fail closed until external-script trust and missing pages are individually reviewed.
if(noSRI.length || errors.length) process.exitCode=1;
