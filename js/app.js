// console.log("Testing this ==> Yess, app.js has been called!");
// check if browser support SW
if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => console.log("Service Worker Registered!", reg))
    .catch((err) => console.log("Service Worker NOT REGISTERED!!", err));
} else {
  console.warn("Service workers are not enabled.");
}

// if ("serviceWorker" in navigator) {
//   console.log("found sw in nav");
//   window.addEventListener("load", function () {
//     navigator.serviceWorker.register("/sw.js").then(
//       function (registration) {
//         // Registration was successful
//         console.log(
//           "ServiceWorker registration successful with scope: ",
//           registration.scope
//         );
//       },
//       function (err) {
//         // registration failed :(
//         console.log("ServiceWorker registration failed: ", err);
//       }
//     );
//   });
// }else{
//   console.log("sw not in nav");
// }
