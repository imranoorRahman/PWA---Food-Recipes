// check if browser support SW
if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => console.log("Service Worker Registered!", reg))
    .catch((err) => console.log("Service Worker NOT REGISTERED!!", err));
} else {
  console.warn("Service workers are not enabled.");
}
