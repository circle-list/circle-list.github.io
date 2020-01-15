// (function(d,j,s){s=d.createElement('script');s.src=j;d.body.appendChild(s);})(document,'//hideki0403.github.io/src/circlems.min.js')

(function(){
var items = $('.item table tr')
var data = {}

for(var i = 0; items.length > i; i++) {
    var child = $($('.item table tr')[i]).children('th')
    for(var j = 0; child.length > j; j++) {
        data[child[j].innerText] = $($('.item table tr')[i]).children('td')[j].innerText
    }
}

const Base64 = {
    encode: function(str) {
        return btoa(unescape(encodeURIComponent(str)))
    },
    decode: function(str) {
        return decodeURIComponent(escape(atob(str)))
    }
}

location.href = 'https://hideki0403.github.io/comiket/?circlems=' + Base64.encode(JSON.stringify(data))
})()