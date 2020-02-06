// IEからのアクセスは弾く
var userAgent = window.navigator.userAgent.toLowerCase()

if(userAgent.indexOf('msie') !== -1 || userAgent.indexOf('trident') !== -1) {
    location.href = 'ie.html'
}