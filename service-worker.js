const CACHE_NAME = 'student-finder-v40-local';
const STATIC_ASSETS = ['./', './manifest.json', './tailwind.css', './lib-react.js', './lib-react-dom.js', './lib-babel.js'];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

function saveCopy(request, response) {
  if (response && response.ok) {
    const copy = response.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
  }
  return response;
}

function pageFirstFromNetwork(request, isAppPage) {
  return new Promise((resolve, reject) => {
    let settled = false;
    const fromCache = () => caches.match(request).then((hit) => hit || (isAppPage ? caches.match('./') : undefined));
    const timer = setTimeout(() => {
      fromCache().then((hit) => { if (hit && !settled) { settled = true; resolve(hit); } });
    }, 4000);
    fetch(request).then((response) => {
      clearTimeout(timer);
      saveCopy(request, response);
      if (!settled) { settled = true; resolve(response); }
    }).catch(() => {
      clearTimeout(timer);
      fromCache().then((hit) => {
        if (settled) return;
        settled = true;
        if (hit) resolve(hit); else reject(new Error('offline'));
      });
    });
  });
}

function cacheFirst(request, refresh) {
  return caches.match(request).then((hit) => {
    if (hit && !refresh) return hit;
    const fromNetwork = fetch(request).then((response) => saveCopy(request, response));
    if (hit) { fromNetwork.catch(() => {}); return hit; }
    return fromNetwork;
  });
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  const isAppPage = url.pathname.endsWith('/') || url.pathname.endsWith('/index.html');
  if (request.mode === 'navigate' || isAppPage) {
    event.respondWith(pageFirstFromNetwork(request, isAppPage));
    return;
  }
  const isLibrary = /\/lib-[^/]+\.js$/.test(url.pathname);
  event.respondWith(cacheFirst(request, !isLibrary));
});
