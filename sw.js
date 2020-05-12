// Listen for install service worker event
self.addEventListener("install", (evt) => {
  console.log("Service Worker has been installed:", evt);
});

// Listen for activate service worker event
self.addEventListener("activate", (evt) => {
  console.log("Service Worker has been activated:", evt);
});

// Listen for Fetch event
self.addEventListener("fetch", (evt) => {
  console.log("Fetch event:", evt);
});
