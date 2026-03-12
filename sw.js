// ═══════════════════════════════════════════════
//  SuperMarché CM — Service Worker (PWA)
//  ⚡ À CHAQUE MISE À JOUR : changer la date ci-dessous
//     Ex: 'supermarche-cm-2026-03-06' → 'supermarche-cm-2026-03-07'
// ═══════════════════════════════════════════════

var CACHE_NAME = 'supermarche-cm-2026-03-09';

var URLS_A_CACHER = [
  './',
  './boutique.html',
  './index.html',
  './boutique.js',
  './boutique.css',
  './script.js',
  './style.css',
  './config.js',
  './villes.js',
  './db.js',
  './paiement.js',
  './multi-users.js',
  './promotions.js',
  './fidelite.js',
  './livraisons.js',
  './livreurs.js',
  './retours.js',
  './stats-clients.js',
  './manifest.json'
];

// ── Installation ──
self.addEventListener('install', function(event) {
  console.log('[SW] Installation version:', CACHE_NAME);
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(URLS_A_CACHER);
    }).catch(function(err) {
      console.warn('[SW] Erreur cache:', err);
    })
  );
  self.skipWaiting();
});

// ── Activation : supprimer TOUS les anciens caches ──
self.addEventListener('activate', function(event) {
  console.log('[SW] Activation — nettoyage anciens caches');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function(n) { return n !== CACHE_NAME; })
          .map(function(n) {
            console.log('[SW] Suppression ancien cache:', n);
            return caches.delete(n);
          })
      );
    })
  );
  self.clients.claim();
});

// ── Stratégie : Network First ──
self.addEventListener('fetch', function(event) {
  if (!event.request.url.startsWith(self.location.origin)) return;
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(function(response) {
        if (response.status === 200) {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, clone);
          });
        }
        return response;
      })
      .catch(function() {
        return caches.match(event.request).then(function(cached) {
          if (cached) return cached;
          if (event.request.mode === 'navigate') {
            return caches.match('./boutique.html');
          }
        });
      })
  );
});

// ── Notifications push ──
self.addEventListener('push', function(event) {
  var data = event.data ? event.data.json() : {};
  var options = {
    body: data.body || 'Nouvelle notification SuperMarché CM',
    icon: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=192&h=192&fit=crop',
    badge: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=72&h=72&fit=crop',
    vibrate: [100, 50, 100],
    data: { url: data.url || './boutique.html' }
  };
  event.waitUntil(
    self.registration.showNotification(data.title || 'SuperMarché CM', options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || './boutique.html')
  );
});
