// Rocky Mountain Cafe - Service Worker
// Enables offline functionality and caches static assets

const CACHE_NAME = 'rocky-mountain-cafe-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/images/logo.jpg',
    '/images/IMG_4567.png',
    '/images/IMG_3322.png',
    '/images/IMG_3355.png'
];

// Install event - cache static assets
self.addEventListener('install', event => {
    console.log('🏔️ Service Worker installing...');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('📦 Caching static assets');
            return cache.addAll(STATIC_ASSETS).catch(err => {
                console.log('⚠️ Some assets failed to cache:', err);
                // Continue even if some assets fail
                return cache.addAll(
                    STATIC_ASSETS.filter(asset => asset !== '/images/IMG_6439.jpeg')
                );
            });
        })
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('🏔️ Service Worker activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', event => {
    const { request } = event;
    
    // Skip cross-origin requests
    if (!request.url.startsWith(self.location.origin)) {
        return;
    }

    // Use cache-first for static assets
    if (request.method === 'GET') {
        event.respondWith(
            caches.match(request).then(response => {
                if (response) {
                    console.log('✓ Serving from cache:', request.url);
                    return response;
                }

                return fetch(request)
                    .then(response => {
                        // Cache successful responses
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(request, responseToCache);
                        });

                        return response;
                    })
                    .catch(() => {
                        console.log('📡 Offline - request failed:', request.url);
                        // Return offline page or cached version
                        if (request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                    });
            })
        );
    }
});

// Message event - handle postMessage from client
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

console.log('🏔️ Service Worker loaded for Rocky Mountain Cafe');
