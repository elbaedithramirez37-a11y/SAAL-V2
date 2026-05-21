const CACHE_NAME = "saal-v2";
const urlsToCache = [
  "index.html",
  "grado1.html",
  "grado2.html",
  "grado3.html",
  "css/estilo.css",
  "js/datos.js",
  "js/evaluacion.js",
  "assets/cemej.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});