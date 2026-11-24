import { chromium } from "playwright";
import assert from "node:assert/strict";
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const types = {".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".webp":"image/webp",".png":"image/png"};
const server = http.createServer(async (req,res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    const target = path.resolve(root, "." + (pathname === "/" ? "/index.html" : pathname));
    if (!target.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    const data = await fs.readFile(target);
    res.writeHead(200, {"Content-Type":types[path.extname(target)] || "application/octet-stream"}).end(data);
  } catch {res.writeHead(404).end();}
});
await new Promise(resolve => server.listen(0,"127.0.0.1",resolve));
const browser = await chromium.launch();
try {
  for (const width of [390,768,1440]) {
    const page=await browser.newPage({viewport:{width,height:900},reducedMotion:"reduce"});
    // Test the portfolio independently of external demos and third-party network availability.
    await page.route("**/*", route => route.request().url().startsWith("http://127.0.0.1:") ? route.continue() : route.abort());
    const errors=[];
    page.on("pageerror", e=>errors.push(e.message));
    await page.goto("http://127.0.0.1:"+server.address().port);
    assert.equal(await page.locator(".featured-card").count(),3);
    assert.equal(await page.locator(".featured-card").first().locator("h3").innerText(),"松山城 3D WALK");
    assert.equal(await page.locator(".featured-card .demo-link").count(),3);
    assert.ok(await page.locator("#research-grid .project-card").count()>0);
    assert.equal(await page.locator("#project-grid [data-project-id='economic-theory-research-dashboard']").count(),0);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth+1),"horizontal overflow at "+width);
    const trigger=page.locator(".featured-card").first().locator(".detail-link");
    await trigger.click();
    assert.ok(await page.locator("#project-dialog").evaluate(el=>el.open));
    assert.equal(await page.locator("#project-dialog-title").innerText(),"松山城 3D WALK");
    assert.ok(await page.locator("#project-dialog .detail-cta-primary").getAttribute("href"));
    await page.keyboard.press("Escape");
    assert.equal(await page.locator("#project-dialog").evaluate(el=>el.open),false);
    await page.locator('[data-filter="finance"]').click();
    assert.ok(await page.locator("#project-grid [data-project-id='prefecture-fund-analysis']").count());
    await page.locator("#project-search").fill("存在しない作品zzzz");
    assert.ok(await page.locator("#empty-state").isVisible());
    await page.locator("#project-search").fill("");
    await page.locator('[data-filter="all"]').click();
    await page.locator("#archive-toggle").click();
    assert.ok(await page.locator("#archive-grid").isVisible());
    await page.locator("#archive-toggle").click();
    assert.equal(errors.length,0,errors.join("\n"));
    await fs.mkdir(path.join(root,"artifacts","portfolio"),{recursive:true});
    await page.screenshot({path:path.join(root,"artifacts","portfolio","portfolio-"+width+".png"),fullPage:true});
    console.log("PASS editorial browser smoke "+width+"px");
    await page.close();
  }
} finally { await browser.close(); await new Promise(resolve=>server.close(resolve)); }
