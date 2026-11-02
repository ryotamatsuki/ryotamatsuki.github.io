#!/usr/bin/env node
// Fail closed if the repository has unresolved HIGH/CRITICAL CodeQL findings.
// A green result applies to the root portfolio repository only.
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
console.log(JSON.stringify({repository,allOpenAlerts:alerts.length,unresolvedHighCritical:high.length,numbers:high.map(x=>x.number)}));
if(high.length) process.exitCode = 1;
