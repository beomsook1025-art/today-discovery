const CACHE_NAME = "today-discovery-v30";
const APP_SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", event => {
  if(event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if(url.origin !== self.location.origin) return;
  event.respondWith((async () => {
    try {
      const network = await fetch(event.request);
      if(event.request.mode === "navigate" || url.pathname.endsWith(".html") || url.pathname.endsWith(".js") || url.pathname.endsWith(".css")) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(event.request, network.clone());
      }
      return network;
    } catch(e) {
      const cached = await caches.match(event.request);
      return cached || caches.match("./index.html");
    }
  })());
});

self.addEventListener("push", event => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch(e) {}
  const title = data.title || "오늘의 나 발견";
  const options = { body: data.body || "오늘의 질문 하나에 답해볼까요?", icon: "./icons/icon-192.png", badge: "./icons/icon-192.png", tag: data.tag || "today-discovery", data: { url: data.url || "./index.html" } };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  const url = event.notification.data?.url || "./index.html";
  event.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(list=>{
    for(const client of list){ if("focus" in client){ client.navigate(url); return client.focus(); } }
    if(clients.openWindow) return clients.openWindow(url);
  }));
});
