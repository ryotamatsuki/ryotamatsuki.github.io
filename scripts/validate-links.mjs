import fs from "node:fs/promises";
import vm from "node:vm";

const source = await fs.readFile(new URL("../projects.js", import.meta.url), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox);
const projects = sandbox.window.RYOTA_PROJECTS || [];
const hostById = new Map(projects.map(project => [project.id, project.host]));
const results = [];

for (const project of projects.filter(item => item.appUrl)) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), project.host === "Streamlit" ? 30000 : 15000);
  try {
    const response = await fetch(project.appUrl, { redirect: "follow", signal: controller.signal });
    results.push({ id: project.id, status: response.status, finalUrl: response.url });
  } catch (error) {
    results.push({ id: project.id, error: String(error.message || error) });
  } finally {
    clearTimeout(timeout);
  }
}

const hardFailures = results.filter(result => result.error && hostById.get(result.id) !== "Streamlit");
const badStatuses = results.filter(result => result.status && result.status >= 400);
for (const result of results) console.log(JSON.stringify(result));
if (hardFailures.length || badStatuses.length) process.exit(1);
