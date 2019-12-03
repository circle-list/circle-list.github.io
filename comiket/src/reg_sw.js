if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(function(registraion) {
        console.log('[Service Worker] Registed.')
        registraion.update();
        serviceWorkerUpdatefoundRefreshDialog.register(registraion, {
          message: '更新があります。ページを再読み込みしてください。<br>ここをクリックするとページを再読み込みします。',
          //onClick: location.reload()
      })
    })
}