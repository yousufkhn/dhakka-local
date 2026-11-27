// Dhakka Local service worker: the game page is network-first (so updates show up right away),
// libraries and icons are cache-first so the game still opens on a bad connection.
const C = 'dl-v1';
const LIBS = /cdn\.jsdelivr\.net|fonts\.(googleapis|gstatic)\.com/;
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(C).then(c => c.addAll(['./', 'index.html', 'icon-192.png', 'icon-512.png']).catch(() => {}))); });
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (/metered\.live|peerjs\.com/.test(u.host)) return; // never cache online-play signalling
  if (LIBS.test(u.host) || /\.(png|jpg|webmanifest)$/.test(u.pathname)) {
    e.respondWith(caches.match(r).then(hit => hit || fetch(r).then(res => { if (res.ok || res.type === 'opaque') { const cp = res.clone(); caches.open(C).then(c => c.put(r, cp)); } return res; })));
  } else if (u.origin === location.origin) {
    e.respondWith(fetch(r).then(res => { const cp = res.clone(); caches.open(C).then(c => c.put(r, cp)); return res; }).catch(() => caches.match(r).then(h => h || caches.match('index.html'))));
  }
});
