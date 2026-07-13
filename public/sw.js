const CACHE_NAME = 'portfolio-cache-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/Assets/favicon/site.webmanifest?v=20260625',
        '/Assets/favicon/favicon.ico?v=20260625',
        '/Assets/favicon/apple-touch-icon.png?v=20260625',
        '/Assets/hero.jpg',
        '/Assets/Logo1.png',
        '/Assets/Logo2.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        if (event.request.mode === 'navigate') {
          return caches.match('/');
        }
        return new Response('', { status: 404, statusText: 'Not Found' });
      });
    })
  );
});
