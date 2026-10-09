
const CACHE_NAME = "private-community-shell-v1";

const APP_FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-512.webp"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_FILES))
  );

  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key =>
            key.startsWith("private-community-shell-") &&
            key !== CACHE_NAME
          )
          .map(key => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  event.respondWith((async () => {
    try {
      const response = await fetch(request);

      if (response.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, response.clone()).catch(() => {});
      }

      return response;
    } catch (error) {
      const cached = await caches.match(request);

      if (cached) return cached;

      if (request.mode === "navigate") {
        return (await caches.match("./index.html")) ||
          new Response("You are offline. Please reconnect and try again.", {
            status: 503,
            headers: { "Content-Type": "text/plain; charset=utf-8" }
          });
      }

      return new Response("", { status: 503 });
    }
  })());
});
