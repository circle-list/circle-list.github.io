if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(registration => {
        console.log('Service worker registered!')
        registration.onupdatefound = function() {
            console.log('アップデートがあります！')
            registration.update()
        }
    })
}