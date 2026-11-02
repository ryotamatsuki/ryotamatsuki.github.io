#!/usr/bin/env node
// Fail closed if the repository has unresolved HIGH/CRITICAL CodeQL findings.
// A green result applies to the root portfolio repository only.
import fs from 'node:fs/promises';
import path from 'node:path';

// A PR must be evaluated against its own SARIF rather than unrelated alerts
// remaining on the current default branch.
if (process.env.GITHUB_EVENT_NAME === 'pull_request') {
 const filename=path.resolve(process.cwd(), '../results/javascript.sarif');
 const sarif=JSON.parse(await fs.readFile(filename, 'utf8'));
 if (!Array.isArray(sarif.runs) || !sarif.runs.length) throw Error('CodeQL SARIF has no runs');
 const findings=[];
 let total=0;
 for (const run of sarif.runs) {
  const rules=run.tool?.driver?.rules || [];
  for (const result of run.results || []) {
   total++;
   const rule=rules[result.ruleIndex] || rules.find(r=>r.id === result.ruleId);
   if (!rule) throw Error('CodeQL rule metadata unavailable: '+result.ruleId);
   const score=Number(rule.properties?.['security-severity'] ?? rule.properties?.securitySeverity ?? 0);
   if (!Number.isFinite(score)) throw Error('Unparseable security severity '+result.ruleId);
   if (score >= 7) {
    const loc=result.locations?.[0]?.physicalLocation?.region;
    const file=result.locations?.[0]?.physicalLocation?.artifactLocation?.uri;
    findings.push({rule:result.ruleId,score,file,line:loc?.startLine});
   }
  }
 }
 console.log(JSON.stringify({mode:'pull_request_sarif',allFindings:total,highCritical:findings.length,findings},null,2));
 if (findings.length) process.exit(1);
 process.exit(0);
}

const token = process.env.GITHUB_TOKEN;
const repository = process.env.GITHUB_REPOSITORY;
if (!token || !repository) throw Error("GitHub token and repository name are required");
const endpoint = 'https://api.github.com/repos/' + repository + '/code-scanning/alerts?state=open&per_page=100';
const alerts = [];
for (let page = 1; page <= 20; page++) {
 const response = await fetch(endpoint+'&page='+page,{headers:{
  'Authorization':'Bearer '+token, 'Accept':'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'
 }});
 if (!response.ok) throw Error('Unable to verify CodeQL alert status: HTTP '+response.status);
 const items = await response.json();
 if (!Array.isArray(items)) throw Error('Unexpected CodeQL API response');
 alerts.push(...items);
 if (items.length < 100) break;
 if (page === 20) throw Error('CodeQL alert results exceed bounded pagination');
}
const high = alerts.filter(x=>{
 if (x.tool?.name !== 'CodeQL') return false;
 const sev=String(x.rule?.security_severity_level || '').toLowerCase();
 return sev==='high'||sev==='critical';
});
console.log(JSON.stringify({
 repository,allOpenAlerts:alerts.length,unresolvedHighCritical:high.length,
 findings:high.map(x=>({
  number:x.number,
  rule:x.rule?.id,
  severity:x.rule?.security_severity_level,
  path:x.most_recent_instance?.location?.path,
  start_line:x.most_recent_instance?.location?.start_line,
  message:String(x.most_recent_instance?.message?.text||x.rule?.description||'').slice(0,300)
 }))
},null,2));
if(high.length) process.exitCode = 1;
