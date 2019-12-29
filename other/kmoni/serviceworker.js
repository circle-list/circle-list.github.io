self.addEventListener('fetch', function () {})

self.addEventListener('push', function (event) {
    console.log('Received a push message', event)
    var title = "プッシュ通知です！"
    var body = "プッシュ通知はこのようにして送られるのです"

    event.waitUntil(
        self.registration.showNotification(title, {
            body: body,
            icon: 'http://free-images.gatag.net/images/201108090000.jpg',
            tag: 'push-notification-tag'
        })
    );
});
self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    clients.openWindow("/");
}, false);