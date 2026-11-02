import { chromium } from 'playwright';
import fs from 'node:fs/promises';
const origin = "https://ryotamatsuki.github.io";
const payload = '<img src=x onerror="window.__originXssProbe=1">';
const browser = await chromium.launch({headless:true,args:['--disable-dev-shm-usage']});
const context = await browser.newContext();
const cases = [];
async function check(path, evaluate) {
 const page=await context.newPage(), exceptions=[];
 page.on('pageerror', e => exceptions.push(String(e.message)));
 try{
   const response=await page.goto(origin+path,{waitUntil:'domcontentloaded',timeout:20000});
   if(!response?.ok()) throw Error('HTTP '+response?.status());
   await page.waitForTimeout(350);
   const result=await page.evaluate(evaluate, payload);
   await page.waitForTimeout(400);
   const flag=await page.evaluate(()=>window.__originXssProbe||0);
   const ok=Boolean(result?.ok) && flag===0;
   cases.push({path,ok,result,scriptExceptionCount:exceptions.length});
 }catch(e){cases.push({path,ok:false,error:String(e),exceptions:exceptions.slice(0,5)})}
 finally{await page.close();}
}
await check('/webgis/',(attack)=>{
 window.__originXssProbe=0;
 const key=attack;
 const host=document.createElement('div');
 host.appendChild(createFeaturePopup({[key]:attack}));
 document.body.appendChild(host);
 const res={ok:host.textContent.includes(attack) && !host.querySelector('img,script,iframe,svg'),html:host.innerHTML.slice(0,320)};
 host.remove();
 return res;
});
await check('/qgisgaikokujin2/',(attack)=>{
 window.__originXssProbe=0;
 const text=renderSafePropertyValue(attack+' https://example.com/ok');
 const host=document.createElement('div');
 host.innerHTML=text;
 document.body.appendChild(host);
 const link=host.querySelector('a');
 const res={ok:host.textContent.includes(attack) && !host.querySelector('img,script,iframe,svg') && link?.href==='https://example.com/ok',html:host.innerHTML.slice(0,320)};
 host.remove();
 return res;
});
await check('/codextest_a/',async (attack)=>{
 window.__originXssProbe=0;
 const script=await (await fetch('/codextest_a/main.js')).text();
 const start=script.indexOf('const escapeHTML = ');
 const end=script.indexOf('const apiKeyInput', start);
 if(start<0||end<=start) throw Error('Expected security helpers not found in served module');
 const {escapeHTML,safeVideoId}=new Function(script.slice(start,end)+'return {escapeHTML,safeVideoId};')();
 const host=document.createElement('div');
 host.innerHTML=escapeHTML(attack);
 document.body.appendChild(host);
 const res={ok:host.textContent===attack && !host.querySelector('img,script,iframe,svg') && safeVideoId('"><img src=x>')==='',html:host.innerHTML.slice(0,320)};
 host.remove();
 return res;
});
await check('/ehime_quiz/',(attack)=>{
 window.__originXssProbe=0;
 const malicious='javascript:alert(1)';
 const good='https://example.com/path';
 return {ok:safeHttpURL(malicious)===''&&safeHttpURL('data:text/html,'+encodeURIComponent(attack))===''&&safeHttpURL(good)===good};
});
await browser.close();
await fs.mkdir("security-reports",{recursive:true});
await fs.writeFile("security-reports/active-xss-probes.json",JSON.stringify({timestamp:new Date().toISOString(),cases},null,2)+'\n');
console.log(JSON.stringify(cases,null,2));
if(cases.some(x=>!x.ok))process.exitCode=1;
