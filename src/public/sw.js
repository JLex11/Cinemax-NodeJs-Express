const CACHE_NAME = 'serviceWorkerCache';
const urlToCache = [
  './',
  './*',
  './fotos/*',
  './manifest.webmanifest',
  './view/cinemaxAdmin.html?utm_source=web_app_manifest',
  './view/cinemaxAdmin.html',
  './ccs/*',
  './css/Admin/estilos.css',
  './images/Home.webp',
  './images/folder.webp',
  './images/logout.webp',
  './images/setting-favicon.webp',
  './images/user.webp',
  './pwa/icon-192x192.webp',
  './apple-touch-icon.webp',
  'https://fonts.googleapis.com/icon?family=Material+Icons+Round',
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500&display=swap',
  './js/Chart.js',
  './js/HeaderCards.js',
];
/* './js/Datatable.js', */

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlToCache);
      })
      .then(() => {
        self.skipWaiting();
      })
      .catch(err => console.log('Fallo el registro de cache', err))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      if (res) return res;

      return fetch(e.request);
    })
  );
});

//cuando no halla internet busca los recursos para cargalos offline
self.addEventListener('activate', e => {
  const cacheWhiteList = [CACHE_NAME];

  e.waitUntil(
    caches
      .keys()
      .then(caches => {
        caches.map(cacheName => {
          if (cacheWhiteList.indexOf(cacheName) == -1) {
            return caches.delete(cacheName);
          }
        });
      })
      .then(() => self.clients.claim())
  );
});
