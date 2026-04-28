self.addEventListener("install",event=>{
  self.skipWaiting();
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys().then(keys=>{
      return Promise.all(keys.map(k=>caches.delete(k)));
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch",event=>{
  event.respondWith(
    fetch(event.request,{cache:"reload"}).catch(()=>{
      return caches.match(event.request);
    })
  );
});
