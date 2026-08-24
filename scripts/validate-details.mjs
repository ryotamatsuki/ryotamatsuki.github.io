import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const [projectsSource, detailsSource] = await Promise.all([
  fs.readFile(path.join(repoRoot, "projects.js"), "utf8"),
  fs.readFile(path.join(repoRoot, "project-details.js"), "utf8")
]);

const sandbox = { window: {} };
vm.runInNewContext(projectsSource, sandbox);
vm.runInNewContext(detailsSource, sandbox);

const projects = Array.isArray(sandbox.window.RYOTA_PROJECTS) ? sandbox.window.RYOTA_PROJECTS : [];
const details = sandbox.window.RYOTA_PROJECT_DETAILS && typeof sandbox.window.RYOTA_PROJECT_DETAILS === "object"
  ? sandbox.window.RYOTA_PROJECT_DETAILS
  : {};
const excludedIds = new Set(
  Array.isArray(sandbox.window.RYOTA_EXCLUDED_PROJECT_IDS) ? sandbox.window.RYOTA_EXCLUDED_PROJECT_IDS : []
);
const displayedProjects = projects.filter(project => !excludedIds.has(project.id));
const displayedIds = new Set(displayedProjects.map(project => project.id));
const detailIds = new Set(Object.keys(details));
const errors = [];

const requiredStrings = ["problem", "purpose"];
const requiredArrays = ["features", "howToUse", "dataSources", "tech"];

for (const project of displayedProjects) {
  const detail = details[project.id];
  if (!detail) {
    errors.push(`${project.id}: detail entry is missing`);
    continue;
  }

  for (const key of requiredStrings) {
    if (typeof detail[key] !== "string" || detail[key].trim().length < 20) {
      errors.push(`${project.id}: ${key} must be a meaningful string`);
    }
  }

  for (const key of requiredArrays) {
    if (!Array.isArray(detail[key]) || detail[key].length === 0) {
      errors.push(`${project.id}: ${key} must be a non-empty array`);
      continue;
    }
    if (detail[key].some(item => typeof item !== "string" || item.trim().length < 3)) {
      errors.push(`${project.id}: ${key} contains an invalid item`);
    }
  }

  if (detail.features?.length < 2) errors.push(`${project.id}: features must include at least 2 items`);
  if (detail.howToUse?.length < 2) errors.push(`${project.id}: howToUse must include at least 2 steps`);
  if (detail.notes !== undefined && (typeof detail.notes !== "string" || !detail.notes.trim())) {
    errors.push(`${project.id}: notes must be a non-empty string when present`);
  }

  const serialized = JSON.stringify(detail);
  if (/\b(?:TODO|TBD|FIXME)\b/i.test(serialized)) errors.push(`${project.id}: placeholder text remains`);
}

for (const detailId of detailIds) {
  if (!displayedIds.has(detailId)) errors.push(`${detailId}: orphan detail entry for a non-displayed project`);
}

for (const excludedId of excludedIds) {
  if (!projects.some(project => project.id === excludedId)) {
    errors.push(`${excludedId}: excluded project id does not exist in projects.js`);
  }
}

if (detailIds.size !== displayedProjects.length) {
  errors.push(`detail coverage mismatch: ${detailIds.size} details for ${displayedProjects.length} displayed projects`);
}

if (errors.length) {
  console.error(errors.map(error => `ERROR ${error}`).join("\n"));
  process.exit(1);
}

console.log(`project details: ${detailIds.size}/${displayedProjects.length} complete; excluded: ${excludedIds.size}`);
