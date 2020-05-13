const staticCacheName = "site-static-v2";
const dynamicCacheName = "site-dynamic-v2";
const setCacheSize = 15;
const assets = [
  "/",
  "/index.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/styles.css",
  "/css/materialize.min.css",
  "/img/dish.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v50/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
  "/pages/fallback.html",
];

// Cache size limit
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size)
        cache.delete(keys[0]).then(limitCacheSize(name, size));
    });
  });
};
// Listen for install service worker event
self.addEventListener("install", (evt) => {
  // console.log("Service Worker has been installed:", evt);
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("Caching shell assets");
      cache.addAll(assets);
    })
  );
});

// Listen for activate service worker event
self.addEventListener("activate", (evt) => {
  // console.log("Service Worker has been activated:", evt);
  evt.waitUntil(
    caches.keys().then((keys) => {
      // console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// Listen for Fetch event
self.addEventListener("fetch", (evt) => {
  // // console.log("Fetch event:", evt);
  if (evt.request.url.indexOf("firestore.googleapis.com" === -1)) {
    evt.respondWith(
      caches
        .match(evt.request)
        .then((cacheRes) => {
          return (
            cacheRes ||
            fetch(evt.request).then((fetchRes) => {
              return caches.open(dynamicCacheName).then((cache) => {
                cache.put(evt.request.url, fetchRes.clone());
                limitCacheSize(dynamicCacheName, setCacheSize);
                return fetchRes;
              });
            })
          );
        })
        .catch(() => {
          if (evt.request.url.indexOf(".html") > -1)
            return caches.match("/pages/fallback.html");
        })
    );
  }
});
