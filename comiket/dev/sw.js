// メインはこっちを変える
// サービスに直接的に関わる変更など
var CACHE_STATIC_VERSION = 'dev-v1.0'

// こっちはassets系統のアプデ時のみ使用
// フォント変更やmaterialize,jQueryなどの外部ライブラリ更新時のみ変更
var CACHE_DYNAMIC_VERSION = CACHE_STATIC_VERSION

function notice_update() {
  /*
  try {
    setTimeout(function() {
      M.toast({html: '更新が完了しました。再読み込みをしてください。<button class="btn-flat toast-action" onclick="location.reload();">再読み込み</button>', displayLength: 'stay'})
      console.log('[Service Worker Notice] Successfull.')
    }, 10000)
  } catch(error) {
    console.log('[Service Worker Notice] Error: ' + error)
  }
  */
}

// 以下メイン処理
self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker...')
  event.waitUntil(
    caches.open(CACHE_STATIC_VERSION)
      .then(function(cache) {
        console.log('[Service Worker] Precaching App...')
        cache.addAll([
          '/comiket/dev/',
          '/comiket/dev/manifest.json',
          '/comiket/dev/src/style.css',
          '/comiket/dev/src/scheck.js',
          '/comiket/dev/src/map.css',
          '/comiket/dev/src/reg_sw.js'
        ])
      }).then(function() {
        skipWaiting()
        notice_update()
      }))
  
})

self.addEventListener('fetch', function(event) {
  console.log('[Service Worker] Fetching something ...')
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response
        } else {
          return fetch(event.request)
            .then(function(res) {
              return caches.open(CACHE_DYNAMIC_VERSION)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone())
                  return res
                })
            })
            .catch(function() {
            })
        }
      })
  )
})

self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker...')
    event.waitUntil(
      caches.keys()
        .then(function(keyList) {
          return Promise.all(keyList.map(function(key) {
            if (key !== CACHE_STATIC_VERSION && key !== CACHE_DYNAMIC_VERSION) {
              console.log('[Service Worker] Removing old cache...')
              return caches.delete(key)
            }
          }))
        })
    )
    return self.clients.claim()
  })