// Proje Kontrol kabuğu · mwprlg3e
const AD = 'pk-kabuk-mwprlg3e';
self.addEventListener('install', (e) => { e.waitUntil(caches.open(AD).then((c) => c.addAll(['./', 'index.html', 'manifest.webmanifest', 'ikon-192.png']))); self.skipWaiting(); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((l) => Promise.all(l.filter((k) => k !== AD).map((k) => caches.delete(k))))); self.clients.claim(); });
// Sayfa sorar: bu servis çalışanının kabuk sürümü (sayfa eskiyse güvenli olunca kendiliğinden yenilenir)
self.addEventListener('message', (e) => { if (e.data === 'kabuk-surumu' && e.ports && e.ports[0]) e.ports[0].postMessage({ kabuk: 'mwprlg3e' }); });
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (u.origin !== location.origin || e.request.method !== 'GET') return; // GitHub API ve yazı tipleri önbelleğe alınmaz
  e.respondWith(fetch(e.request).then((r) => { const k = r.clone(); caches.open(AD).then((c) => c.put(e.request, k)); return r; }).catch(() => caches.match(e.request).then((m) => m || caches.match('index.html'))));
});
