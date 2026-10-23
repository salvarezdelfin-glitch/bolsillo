const CACHE = "bolsillo-v3";
const SHELL = ["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./apple-touch-icon.png","./favicon.png",
  "/sebas-fit/css/fonts.css",
  "/sebas-fit/css/lock.css",
  "/sebas-fit/css/sculpt.css",
  "/sebas-fit/css/modulos.css",
  "/sebas-fit/css/finanzas.css",
  "/sebas-fit/js/fflate.js",
  "/sebas-fit/js/core.js",
  "/sebas-fit/js/sculpt.js",
  "/sebas-fit/js/estacion.js",
  "/sebas-fit/js/armar.js",
  "/sebas-fit/js/aprender.js",
  "/sebas-fit/js/clase.js",
  "/sebas-fit/js/guion.js",
  "/sebas-fit/js/apoyo.js",
  "/sebas-fit/js/musica.js",
  "/sebas-fit/js/clases.js",
  "/sebas-fit/js/ptlib.js",
  "/sebas-fit/js/pt.js",
  "/sebas-fit/js/pt2.js",
  "/sebas-fit/js/proyeccion.js",
  "/sebas-fit/js/pdf.js",
  "/sebas-fit/js/pt3.js",
  "/sebas-fit/js/yo.js",
  "/sebas-fit/js/yo-ui.js",
  "/sebas-fit/js/cot.js",
  "/sebas-fit/js/finanzas.js",
  "/sebas-fit/js/main.js",
  "/sebas-fit/fonts/BarlowCondensed-500-latin-ext.woff2",
  "/sebas-fit/fonts/BarlowCondensed-500-latin.woff2",
  "/sebas-fit/fonts/BarlowCondensed-600-latin-ext.woff2",
  "/sebas-fit/fonts/BarlowCondensed-600-latin.woff2",
  "/sebas-fit/fonts/BarlowCondensed-700-latin-ext.woff2",
  "/sebas-fit/fonts/BarlowCondensed-700-latin.woff2",
  "/sebas-fit/fonts/HankenGrotesk-400-latin-ext.woff2",
  "/sebas-fit/fonts/HankenGrotesk-400-latin.woff2",
  "/sebas-fit/fonts/IBMPlexMono-400-latin-ext.woff2",
  "/sebas-fit/fonts/IBMPlexMono-400-latin.woff2",
  "/sebas-fit/fonts/IBMPlexMono-500-latin-ext.woff2",
  "/sebas-fit/fonts/IBMPlexMono-500-latin.woff2",
  "/sebas-fit/fonts/IBMPlexMono-600-latin-ext.woff2",
  "/sebas-fit/fonts/IBMPlexMono-600-latin.woff2"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => {})))));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
const withTimeout = (p, ms) => new Promise((res, rej) => { const t = setTimeout(() => rej(new Error("timeout")), ms); p.then(v => { clearTimeout(t); res(v); }, e => { clearTimeout(t); rej(e); }); });
self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin) return;
  if (/\.(woff2|png|svg)$/.test(url.pathname)) {
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)).catch(() => {}); return res; })));
    return;
  }
  // código y páginas: la red si responde pronto (versión nueva); con señal débil o sin señal, lo guardado
  e.respondWith(
    withTimeout(fetch(req,{cache:"no-cache"}).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)).catch(() => {}); return res; }), 3500)
      .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || (req.mode === "navigate" ? caches.match("./index.html") : Response.error())))
  );
});
