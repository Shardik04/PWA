var cacheName = 'staticPWA';
var filesToCache = [
  '/',
  '/index.html',
  '/assets/css',
  '/assets/fonts',
  '/assets/sass',
  '/assets/images'
];

function cacheAssets() {
  return caches.open(cacheName)
    .then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/assets/css',
        '/assets/fonts',
        '/assets/sass',
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

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
