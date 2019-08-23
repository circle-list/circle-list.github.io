if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(function(registraion) {
        console.log('[Service Worker] Registed.')
        registraion.update();
      });
}

_you = "6M44G+44Gn6Kqt44KT44Gn44KC44KJ44GE44Gf44GE44CC44KC44GX5Luu44Gr44CB6ZaL55m66ICF44Gu56eB44GM44ON44OD44OI5LiK44GL44KJ5aSx6Liq44GX44Gf44KJ4"