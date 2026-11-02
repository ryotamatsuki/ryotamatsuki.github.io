import { chromium } from 'playwright';
import fs from 'node:fs/promises';
const sites=[
 '/', '/webgis/', '/qgisgaikokujin2/', '/matsuyamastationaroundmap/',
 '/yokaizukan/', '/codextest_a/', '/ehime_quiz/', '/test/', '/cancertest/',
 '/openstreet/', '/ryota.openstreet/', '/lpsample/', '/orange/',
 '/ehime-aed-rescue-map/', '/ehime-mobility-resilience-lab/',
 '/kids_typing/', '/360panorama/', '/solar_system/', '/economic-theory-research-dashboard/',
 '/ehime-civil-works-monitor/', '/furusatonozei/', '/plateau_matsuyama/',
 '/house-/', '/ehime-evacuation-risk-map/', '/star-wing/',
 '/sakefolio/security-test-20261019/', '/security-origin-audit/'
];
const origin='https://ryotamatsuki.github.io';
const browser=await chromium.launch({headless:true,args:['--disable-dev-shm-usage']});
const context=await browser.newContext({viewport:{width:1280,height:800}});
const reports=[];
for(const pathname of sites){
 const page=await context.newPage();
 const errors=[],failedScripts=[],sw=[];
 page.on('pageerror',error=>errors.push(String(error.message).slice(0,400)));
 page.on('requestfailed',req=>{
  if(req.resourceType()==='script') failedScripts.push({url:req.url(),failure:req.failure()?.errorText||'unknown'});
 });
 page.on('response',resp=>{
  if(resp.request().resourceType()==='script' && resp.status()>=400) failedScripts.push({url:resp.url(),status:resp.status()});
 });
 try{
  await page.goto(origin+pathname,{waitUntil:'domcontentloaded',timeout:22000});
  await page.waitForTimeout(1100);
  const registrations=await page.evaluate(async()=> {
    if(!('serviceWorker' in navigator)) return [];
    return (await navigator.serviceWorker.getRegistrations()).map(r=>({scope:r.scope,script:r.active?.scriptURL||null}));
  });
  sw.push(...registrations);
  reports.push({pathname,ok:true,title:await page.title(),jsErrors:errors,failedScripts,sw});
 }catch(e){reports.push({pathname,ok:false,reason:String(e),jsErrors:errors,failedScripts,sw})}
 finally{await page.close();}
}
await browser.close();
await fs.mkdir('security-reports',{recursive:true});
await fs.writeFile('security-reports/shared-origin-browser-smoke.json',JSON.stringify({at:new Date().toISOString(),reports},null,2)+'\n');
const summary=reports.map(x=>({path:x.pathname,ok:x.ok,jsErrors:x.jsErrors.length,failedScripts:x.failedScripts.length,sw:x.sw.length}));
console.log(JSON.stringify(summary,null,2));
const bad=reports.filter(x=>!x.ok||x.jsErrors.length||x.failedScripts.length||x.sw.some(r=>r.scope==='https://ryotamatsuki.github.io/'));
if(bad.length){
 console.error('Browser smoke findings require review: '+bad.map(x=>x.pathname).join(', '));
 process.exitCode=1;
}
