// 학생찾기 PWA Service Worker
const CACHE_NAME = 'student-finder-v1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// 설치 시 정적 리소스 캐싱
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// 활성화 시 이전 캐시 정리
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// fetch 처리: GAS API와 사진 URL은 네트워크 우선, 정적 파일은 캐시 우선
self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  
  // GAS API와 구글 드라이브 사진은 항상 네트워크 (캐싱 안 함)
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
  
  // 정적 파일은 캐시 우선
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).catch(() => caches.match('./index.html'));
    })
  );
});
