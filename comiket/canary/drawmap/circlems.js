var items = $('.item table tr')
var data = {}

for(var i = 0; items.length > i; i++) {
    var child = $($('.item table tr')[i]).children('th')
    for(var j = 0; child.length > j; j++) {
        data[child[j].innerText] = $($('.item table tr')[i]).children('td')[j].innerText
    }
}

location.href = 'https://hideki0403.github.io/comiket/?circleData=' + JSON.stringify(data)