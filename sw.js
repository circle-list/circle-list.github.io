// ServiceWorker

VERSION = '2.2.2'

/* =========================

@STATIC
  /*

@DYNAMIC
  /assets/*
  /src/lib/*

@FONT
  *.ttf, *.woff, *.woff2

========================= */

var CACHE_STATIC_VERSION = 'static-v' + VERSION
var CACHE_DYNAMIC_VERSION = 'dynamic-v2.0.0'
var CACHE_FONT_VERSION = 'fonts-v1.0.0'

importScripts('https://circlelist.ga/src/lib/sw-update-dialog.js')

self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker...')
  event.waitUntil(skipWaiting())
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response
        } else {
          return fetch(event.request)
            .then(function(res) {
              if(event.request.url.match(/\.ttf|\.woff|\.woff2/)) {
                return caches.open(CACHE_FONT_VERSION)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone())
                  return res
                })
              } else if(event.request.url.match(/\/src\/lib\/|\/assets\//)) {
                return caches.open(CACHE_DYNAMIC_VERSION)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone())
                  return res
                })
              } else if(!event.request.url.match(/google-analytics/)) {
                return caches.open(CACHE_STATIC_VERSION)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone())
                  return res
                })
              }
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
            if (key !== CACHE_STATIC_VERSION && key !== CACHE_DYNAMIC_VERSION && key !== CACHE_FONT_VERSION) {
              console.log('[Service Worker] Removing old cache...')
              return caches.delete(key)
            }
          }))
        })
    )
    return self.clients.claim()
  })
