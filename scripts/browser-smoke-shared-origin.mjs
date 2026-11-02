import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
const sites=[
 '/', '/webgis/', '/qgisgaikokujin2/', '/matsuyamastationaroundmap/',
 '/yokaizukan/', '/codextest_a/', '/ehime_quiz/', '/test/', '/cancertest/',
 '/openstreet/', '/ryota.openstreet/', '/lpsample/', '/orange/',
 '/ehime-aed-rescue-map/', '/ehime-mobility-resilience-lab/',
 '/kids_typing/', '/360panorama/', '/solar_system/', '/economic-theory-research-dashboard/',
 '/ehime-civil-works-monitor/', '/furusatonozei/', '/plateau_matsuyama/',
 '/house-/', '/ehime-evacuation-risk-map/', '/star-wing/',
 '/-astra-wetland-lake/',
 '/3d_tsunami/',
 '/airportgolf/',
 '/airportgolf1/',
 '/childcarematsuyama/',
 '/hime-star-journey/',
 '/imabarityme/',
 '/kamijimatest/',
 '/kamijimatoshi_v2/',
 '/kumamotoshienmap/',
 '/map-of-salesman-in-matsuyama-and-toon/',
 '/matsuyamacastle-/',
 '/qgisgaikokujin/',
 '/racegame/',
 '/racegameastra/',
 '/retro-sky-raid/',
 '/sakefolio/',
 '/sakefolio/security-test-20261019/', '/security-origin-audit/'
];
const origin='https://ryotamatsuki.github.io';
const browser=await chromium.launch({headless:true,args:['--disable-dev-shm-usage']});
const context=await browser.newContext({viewport:{width:1280,height:800}});
const reports=[];
for(const pathname of sites){
 const page=await context.newPage();
 const errors=[],failedScripts=[],sw=[],loadedScripts=[],scriptObservations=[];
 page.on('pageerror',error=>errors.push(String(error.message).slice(0,400)));
 page.on('requestfailed',req=>{
  if(req.resourceType()==='script') failedScripts.push({url:req.url(),failure:req.failure()?.errorText||'unknown'});
 });
 page.on('response',resp=>{
  if(resp.request().resourceType()!=='script') return;
  if(resp.status()>=400) failedScripts.push({url:resp.url(),status:resp.status()});
  scriptObservations.push((async()=>{
    try{
      const bytes=await resp.body();
      loadedScripts.push({url:resp.url(),status:resp.status(),bytes:bytes.length,
        sha256:crypto.createHash('sha256').update(bytes).digest('hex')});
    }catch(error){loadedScripts.push({url:resp.url(),status:resp.status(),hashError:String(error).slice(0,160)})}
  })());
 });
 try{
  await page.goto(origin+pathname,{waitUntil:'domcontentloaded',timeout:22000});
  await page.waitForTimeout(1100);
  await Promise.allSettled(scriptObservations);
  const registrations=await page.evaluate(async()=> {
    if(!('serviceWorker' in navigator)) return [];
    return (await navigator.serviceWorker.getRegistrations()).map(r=>({scope:r.scope,script:r.active?.scriptURL||null}));
  });
  sw.push(...registrations);
  reports.push({pathname,ok:true,title:await page.title(),jsErrors:errors,failedScripts,loadedScripts,sw});
 }catch(e){reports.push({pathname,ok:false,reason:String(e),jsErrors:errors,failedScripts,loadedScripts,sw})}
 finally{await page.close();}
}
await browser.close();
await fs.mkdir('security-reports',{recursive:true});
await fs.writeFile('security-reports/shared-origin-browser-smoke.json',JSON.stringify({at:new Date().toISOString(),reports},null,2)+'\n');
const summary=reports.map(x=>({path:x.pathname,ok:x.ok,jsErrors:x.jsErrors.length,failedScripts:x.failedScripts.length,loadedScripts:x.loadedScripts.length,sw:x.sw.length}));
console.log(JSON.stringify(summary,null,2));
const bad=reports.filter(x=>!x.ok||x.jsErrors.length||x.failedScripts.length||x.sw.some(r=>r.scope==='https://ryotamatsuki.github.io/'));
if(bad.length){
 console.error('Browser smoke findings require review: '+bad.map(x=>x.pathname).join(', '));
 process.exitCode=1;
}
