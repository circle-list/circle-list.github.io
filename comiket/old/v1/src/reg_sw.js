if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(function(registraion) {
        console.log('[Service Worker] Registed.')
        registraion.update();
      });
}