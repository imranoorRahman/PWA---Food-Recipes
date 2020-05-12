const staticCacheName = "site-static";
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
];

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
});

// Listen for Fetch event
self.addEventListener("fetch", (evt) => {
  // console.log("Fetch event:", evt);
});
