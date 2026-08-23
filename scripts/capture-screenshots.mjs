import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const config = JSON.parse(await fs.readFile(path.join(scriptDir, "screenshot-config.json"), "utf8"));
const projectsSource = await fs.readFile(path.join(repoRoot, "projects.js"), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(projectsSource, sandbox);
const projects = new Map((sandbox.window.RYOTA_PROJECTS || []).map(project => [project.id, project]));

const browser = await chromium.launch({ headless: true });
try {
  for (const entry of config.capture) {
    const project = projects.get(entry.id);
    if (!project) throw new Error(`Unknown project id: ${entry.id}`);
    if (!project.appUrl) throw new Error(`${entry.id} has no appUrl`);

    const context = await browser.newContext({ viewport: config.viewport });
    const page = await context.newPage();
    try {
      await page.goto(project.appUrl, {
        waitUntil: entry.waitUntil || config.waitUntil || "domcontentloaded",
        timeout: entry.timeoutMs || 60000
      });
      if (entry.waitFor) {
        await page.locator(entry.waitFor).first().waitFor({ state: "visible", timeout: entry.timeoutMs || 60000 });
      }
      await page.waitForTimeout(entry.initialDelayMs ?? config.delayMs ?? 0);
      for (const action of entry.actions || []) {
        if (action.type === "clickText") {
          await page.getByText(action.text, { exact: true }).first().click();
        } else if (action.type === "press") {
          await page.keyboard.press(action.key);
        } else {
          throw new Error(`Unsupported action type for ${entry.id}: ${action.type}`);
        }
        await page.waitForTimeout(action.delayMs ?? 350);
      }
      await page.waitForTimeout(entry.delayMs ?? 0);

      const outputPath = path.resolve(repoRoot, entry.output);
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      const target = entry.selector && entry.selector !== "body" ? page.locator(entry.selector).first() : page;
      await target.screenshot({ path: outputPath, type: "png" });
      console.log(JSON.stringify({
        id: entry.id,
        output: path.relative(repoRoot, outputPath),
        focalPoint: entry.focalPoint || "center",
        url: page.url()
      }));
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
}
