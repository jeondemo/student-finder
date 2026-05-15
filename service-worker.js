// 학생찾기 PWA Service Worker
const CACHE_NAME = 'student-finder-v3-address';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  // 새 SW를 즉시 활성화
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  
  // GAS API와 구글 드라이브 사진은 항상 네트워크
  if (url.includes('script.google.com') || url.includes('drive.google.com')) {
    event.respondWith(
      fetch(event.request).catch(() => 
        new Response(JSON.stringify({ success: false, error: '오프라인' }), {
          headers: { 'Content-Type': 'application/json' }
        })
      )
    );
    return;
  }
  
  // index.html은 네트워크 우선 (캐시 문제 방지)
  if (url.endsWith('/') || url.endsWith('/index.html')) {
    event.respondWith(
      fetch(event.request).then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        return response;
      }).catch(() => caches.match(event.request).then((cached) => cached || caches.match('./index.html')))
    );
    return;
  }
  
  // 나머지 정적 파일은 캐시 우선
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request);
    })
  );
});
