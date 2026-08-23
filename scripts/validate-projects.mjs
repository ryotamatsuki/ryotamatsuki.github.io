import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const source = await fs.readFile(path.join(repoRoot, "projects.js"), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox);
const projects = sandbox.window.RYOTA_PROJECTS;
const errors = [];
const statuses = new Set(["live", "poc", "archive"]);
const ids = new Set();
const repoUrls = new Set();
const appUrls = new Set();
const appHosts = new Set(["GitHub Pages", "Streamlit", "Web App", "Web Game"]);

if (!Array.isArray(projects) || projects.length === 0) errors.push("projects.js must export a non-empty array");

for (const project of projects || []) {
  if (!project.id) errors.push("project id is required");
  if (ids.has(project.id)) errors.push(`duplicate project id: ${project.id}`);
  ids.add(project.id);
  if (!project.title || !project.description) errors.push(`${project.id}: title and description are required`);
  if (!Array.isArray(project.categories) || project.categories.length === 0) errors.push(`${project.id}: categories are required`);
  if (!statuses.has(project.status)) errors.push(`${project.id}: invalid status ${project.status}`);
  if (!project.repoUrl || !/^https:\/\/github\.com\//.test(project.repoUrl)) errors.push(`${project.id}: repoUrl must be a GitHub HTTPS URL`);
  if (project.repoUrl && repoUrls.has(project.repoUrl)) errors.push(`${project.id}: duplicate repoUrl ${project.repoUrl}`);
  if (project.repoUrl) repoUrls.add(project.repoUrl);
  if (project.appUrl && !/^https:\/\//.test(project.appUrl)) errors.push(`${project.id}: appUrl must be HTTPS`);
  if (project.appUrl && appUrls.has(project.appUrl)) errors.push(`${project.id}: duplicate appUrl ${project.appUrl}`);
  if (project.appUrl) appUrls.add(project.appUrl);
  if (appHosts.has(project.host) && !project.appUrl) errors.push(`${project.id}: ${project.host} projects require appUrl and must not fall back to repoUrl`);
  if (project.host === "Streamlit" && project.appUrl && !/^https:\/\/[a-z0-9-]+\.streamlit\.app\/?(?:[?#].*)?$/i.test(project.appUrl)) {
    errors.push(`${project.id}: Streamlit appUrl must use a streamlit.app URL`);
  }
  if (project.image) {
    const imagePath = path.join(repoRoot, project.image);
    try {
      const stat = await fs.stat(imagePath);
      if (!stat.isFile()) errors.push(`${project.id}: image is not a file: ${project.image}`);
      if (stat.size > 250_000) errors.push(`${project.id}: image exceeds 250KB: ${project.image}`);
    } catch {
      errors.push(`${project.id}: image file missing: ${project.image}`);
    }
    if (!/\.webp$/i.test(project.image)) errors.push(`${project.id}: project images must be WebP`);
  }
  if (project.imageAttribution && !project.image) errors.push(`${project.id}: imageAttribution requires image`);
  if (project.imagePosition && !/^\d{1,3}%\s+\d{1,3}%$/.test(project.imagePosition)) errors.push(`${project.id}: invalid imagePosition`);
}

const featured = (projects || []).filter(project => project.featured && project.status !== "archive");
if (featured.length > 3) errors.push(`featured projects exceed 3: ${featured.length}`);
const featuredValues = featured.map(project => Number(project.featured)).sort((a, b) => a - b);
if (featuredValues.some((value, index) => value !== index + 1)) errors.push(`featured values must be a contiguous 1..N sequence: ${featuredValues.join(",")}`);

if (errors.length) {
  console.error(errors.map(error => `ERROR ${error}`).join("\n"));
  process.exit(1);
}

console.log(`projects: ${projects.length} valid; featured: ${featured.length}; images: ${(projects || []).filter(project => project.image).length}`);
