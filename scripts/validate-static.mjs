import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const html = await fs.readFile(path.join(repoRoot, "index.html"), "utf8");
const css = await fs.readFile(path.join(repoRoot, "styles.css"), "utf8");
const screenshotConfig = JSON.parse(await fs.readFile(path.join(scriptDir, "screenshot-config.json"), "utf8"));
const errors = [];

if (!/^<!doctype html>/i.test(html.trim())) errors.push("index.html must start with a doctype");
if (!/<html[^>]+lang="ja"/i.test(html)) errors.push("index.html must declare lang=ja");
if (!/<meta[^>]+name="viewport"/i.test(html)) errors.push("viewport meta is missing");
if (!/<link[^>]+href="styles\.css"/i.test(html)) errors.push("styles.css is not linked");
if (!/<script[^>]+src="projects\.js"/.test(html) || !/<script[^>]+src="app\.js"/.test(html)) errors.push("project scripts are not linked");
if (!/https:\/\/www\.openstreetmap\.org\/copyright/.test(html)) errors.push("OpenStreetMap copyright/license link is missing");
if (/\.card-[a-z0-9](?:\s|\{|,)/.test(css)) errors.push("project-specific card CSS is not allowed");

if (!screenshotConfig.viewport || !Number.isFinite(screenshotConfig.viewport.width) || !Number.isFinite(screenshotConfig.viewport.height)) {
  errors.push("screenshot viewport must define numeric width and height");
}
if (screenshotConfig.viewport && Object.hasOwn(screenshotConfig.viewport, "deviceScaleFactor")) {
  errors.push("deviceScaleFactor must be a browser-context option, not nested inside viewport");
}
if (!Number.isFinite(screenshotConfig.deviceScaleFactor) || screenshotConfig.deviceScaleFactor <= 0) {
  errors.push("screenshot deviceScaleFactor must be a positive number");
}

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
if (duplicateIds.length) errors.push(`duplicate HTML ids: ${[...new Set(duplicateIds)].join(", ")}`);

for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  const value = match[1];
  if (!value || value.startsWith("#") || /^[a-z][a-z0-9+.-]*:/i.test(value) || value.startsWith("//")) continue;
  try {
    await fs.access(path.join(repoRoot, value));
  } catch {
    errors.push(`local asset is missing: ${value}`);
  }
}

if (errors.length) {
  console.error(errors.map(error => `ERROR ${error}`).join("\n"));
  process.exit(1);
}

console.log(`static HTML/CSS checks passed; ids: ${new Set(ids).size}`);
