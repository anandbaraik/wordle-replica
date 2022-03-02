const cacheWordleAsset = "wordle-replica-v3";
const assets = [
  "/",
  "/index.html",
  "/img/icons/Icon-72.png",
  "/img/icons/Icon-96.png",
  "/img/icons/Icon-128.png",
  "/img/icons/Icon-144.png",
  "/img/icons/Icon-152.png",
  "/img/icons/Icon-192.png",
  "/img/icons/Icon-384.png",
  "/img/icons/Icon-512.png",
  "/img/icons/favicon.png",
  "/script/app.js",
  "/script/modal.js",
  "/script/pwa.js",
  "/script/serviceWorker.js",
  "/script/util.js",
  "/style/app.css"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(cacheWordleAsset).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});