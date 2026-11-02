#!/usr/bin/env node
import fs from "node:fs/promises";
import crypto from "node:crypto";
const sources = [
"https://api.tiles.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.js",
"https://api.mapbox.com/mapbox-assembly/v1.3.0/assembly.js",
"https://cdn.jsdelivr.net/npm/leaflet@1.9.3/dist/leaflet.js",
"https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js",
"https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.js",
"https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
"https://code.jquery.com/jquery-3.7.1.min.js",
"https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.1.0/leaflet.markercluster.js",
"https://code.jquery.com/jquery-1.12.4.min.js",
"https://unpkg.com/leaflet@1.3.0/dist/leaflet.js",
"https://cdnjs.cloudflare.com/ajax/libs/shpjs/3.6.3/shp.min.js",
"https://cesium.com/downloads/cesiumjs/releases/1.130/Build/Cesium/Cesium.js"
];
const excludedDynamic = [
 {url:"https://accounts.google.com/gsi/client",reason:"Google-managed dynamically delivered identity client; SRI hash not stable"},
 {url:"https://cdn.tailwindcss.com/?plugins=forms,container-queries",reason:"runtime Tailwind generated/dynamic; replace with built CSS and eliminate runtime JS"}
];
const results=[];
for(const url of sources) {
 const ctrl=new AbortController();
 const timeout=setTimeout(()=>ctrl.abort(),25000);
 try{
  const resp=await fetch(url,{signal:ctrl.signal,redirect:"follow"});
  if(!resp.ok)throw Error("HTTP "+resp.status);
  const len=Number(resp.headers.get("content-length")||0);
  if(len>16000000)throw Error("large response: "+len);
  const b=Buffer.from(await resp.arrayBuffer());
  if(b.byteLength>16000000)throw Error("large response");
  const sri="sha384-"+crypto.createHash("sha384").update(b).digest("base64");
  results.push({url,status:"fetched",bytes:b.length,sri,
    cors:resp.headers.get("access-control-allow-origin")||null,
    contentType:resp.headers.get("content-type")||null,
    cacheControl:resp.headers.get("cache-control")||null});
 }catch(e){results.push({url,status:"error",error:String(e)})}
 finally{clearTimeout(timeout);}
}
await fs.mkdir("security-reports",{recursive:true});
await fs.writeFile("security-reports/external-script-sri.json",JSON.stringify({timestamp:new Date().toISOString(),sources:results,excludedDynamic},null,2)+"\n");
const usable=results.filter(x=>x.status==="fetched" && (x.cors==="*"||x.cors==="https://ryotamatsuki.github.io"));
console.log(JSON.stringify({total:results.length,fetched:results.filter(x=>x.status==="fetched").length,corsUsable:usable.length,errors:results.filter(x=>x.status==="error"),excludedDynamic},null,2));
