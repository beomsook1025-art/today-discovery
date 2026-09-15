

self.addEventListener("push", event => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch(e) {}
  const title = data.title || "오늘의 나 발견";
  const options = {
    body: data.body || "오늘의 질문 하나에 답해볼까요?",
    icon: "./icons/icon-192.png",
    badge: "./icons/icon-192.png",
    tag: data.tag || "today-discovery",
    data: { url: data.url || "./index.html" }
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  const url = event.notification.data?.url || "./index.html";
  event.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(list=>{
    for(const client of list){
      if("focus" in client) { client.navigate(url); return client.focus(); }
    }
    if(clients.openWindow) return clients.openWindow(url);
  }));
});
