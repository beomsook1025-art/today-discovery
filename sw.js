const CACHE = "today-discovery-v27";
const CORE = ["./", "./index.html", "./manifest.webmanifest"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE.filter(Boolean))).then(()=>self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch", event => {
  const req=event.request;
  if(req.method!=="GET") return;
  event.respondWith(fetch(req).then(res=>{
    const copy=res.clone();
    if(new URL(req.url).origin===self.location.origin) caches.open(CACHE).then(c=>c.put(req,copy)).catch(()=>{});
    return res;
  }).catch(()=>caches.match(req).then(r=>r || caches.match("./index.html"))));
});
