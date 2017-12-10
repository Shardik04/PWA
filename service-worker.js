var cacheName = 'staticPWA-v1';

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.add([
        '/',
        '/index.html',
        '/assets/css/main.css',
        '/images/thumbs/01.jpg',
        '/images/thumbs/02.jpg',
        '/images/thumbs/03.jpg',
        '/images/thumbs/04.jpg',
        '/images/thumbs/05.jpg',
        '/images/thumbs/06.jpg',
        '/images/thumbs/07.jpg',
        '/images/thumbs/08.jpg'
      ]);
      console.log("DONE");
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
