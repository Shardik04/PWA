var cacheName = 'staticPWA';
// var filesToCache = [
//   '/',
//   '/index.html',
//   '/assets/css',
//   '/assets/fonts',
//   '/assets/sass',
//   '/assets/images'
// ];

function cacheAssets() {
  return caches.open(cacheName)
    .then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/assets/css/main.css',
        '/assets/fonts',
        '/assets/images'
      ]);
    });
}

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    cacheAssets()
  );
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
