var currentSec = getSecondsToday()

var seconds = (currentSec / 60) % 1
var minutes = (currentSec / 3600) % 1
var hours = (currentSec / 43200) % 1

setTime(60 * seconds, "second")
setTime(3600 * minutes, "minute")
setTime(43200 * hours, "hour")

function setTime(left, hand) {
  $(".clock__" + hand).css("animation-delay", "" + left * -1 + "s")
}

function getSecondsToday() {
  let now = new Date()

  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  let diff = now - today 
  return Math.round(diff / 1000)
}

function align(t) {
    return ('0' + t).slice(-2)
}

function init() {
    var now = new Date()
    $('#date_clock').text(now.getFullYear() + '/' + align(now.getMonth() + 1) + '/' + now.getDate())
    $('#week_clock').text(week[now.getDay()])

    $('#week_clock').removeClass('red')
    $('#week_clock').removeClass('blue')

    if(now.getDay() === 0) {
        $('#week_clock').addClass('red')
    } else {
        if(now.getDay() === 6) {
            $('#week_clock').addClass('blue')
        }
    }
}

var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

setInterval(function() {
    var now = new Date()
    var main_clk = now.getHours() + ':' + align(now.getMinutes())
    var sub_clk = ':' + align(now.getSeconds())
    $('#main_clock').text(main_clk)
    $('#sub_clock').text(sub_clk)

    $('#set-second').css('transform', 'rotateZ(' + (now.getSeconds() * 6)  + 'deg)')

    if(main_clk + sub_clk === '0:00:00') {
        init()
    }
}, 1000)

init()

// ニュースフィード
$.ajax({
    url: 'https://api.rss2json.com/v1/api.json',
    method: 'GET',
    dataType: 'json',
    data: {
        rss_url: 'https://news.google.com/rss?topic=ir&hl=ja&gl=JP&ceid=JP:ja'
    }
}).done(function (response) {
    if(response.status != 'ok'){ throw response.message; }
    for(var i = 0; 6 > i; i++) {
        $('#newsfeed').append('<li><a href="' + response.items[i].link +  '" target="_blank">' + response.items[i].title + '</a></li>')
    }
})

// お天気

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((data, error) => {
        if(error) {
            console.log('error: ' + error)
        } else {
            const positionData = data.coords
            const lat = positionData.latitude
            const lon = positionData.longitude

            $.ajax({
                url: 'http://friends-server.ga:2555/api/v1/weather',
                dataType: 'json',
                data: 'lat=' + lat + '&lon=' + lon,
            }).done(function (response) {
                var res = JSON.parse(response)
                appendWeather(res)
            })
        }
    })
}

const weatherList = {
    '01n': {weather: '快晴', icon: 'http://openweathermap.org/img/wn/01d@2x.png'},
    '02n': {weather: '晴れ', icon: 'http://openweathermap.org/img/wn/02d@2x.png'},
    '03n': {weather: 'くもり', icon: 'http://openweathermap.org/img/wn/03d@2x.png'},
    '04n': {weather: 'くもり', icon: 'http://openweathermap.org/img/wn/04d@2x.png'},
    '09n': {weather: '小雨', icon: 'http://openweathermap.org/img/wn/09d@2x.png'},
    '10n': {weather: '雨', icon: 'http://openweathermap.org/img/wn/10d@2x.png'},
    '11n': {weather: '雷雨', icon: 'http://openweathermap.org/img/wn/11d@2x.png'},
    '13n': {weather: '雪', icon: 'http://openweathermap.org/img/wn/13d@2x.png'},
    '50n': {weather: '霧', icon: 'http://openweathermap.org/img/wn/50d@2x.png'},
    '01d': {weather: '快晴', icon: 'http://openweathermap.org/img/wn/01n@2x.png'},
    '02d': {weather: '晴れ', icon: 'http://openweathermap.org/img/wn/02n@2x.png'},
    '03d': {weather: 'くもり', icon: 'http://openweathermap.org/img/wn/03n@2x.png'},
    '04d': {weather: 'くもり', icon: 'http://openweathermap.org/img/wn/04n@2x.png'},
    '09d': {weather: '小雨', icon: 'http://openweathermap.org/img/wn/09n@2x.png'},
    '10d': {weather: '雨', icon: 'http://openweathermap.org/img/wn/10n@2x.png'},
    '11d': {weather: '雷雨', icon: 'http://openweathermap.org/img/wn/11n@2x.png'},
    '13d': {weather: '雪', icon: 'http://openweathermap.org/img/wn/13n@2x.png'},
    '50d': {weather: '霧', icon: 'http://openweathermap.org/img/wn/50n@2x.png'}
}

function appendWeather(res) {
    var now = new Date()
    var n = 0
    for(var i = 0; res.list.length > i; i++) {
        if(5 <= n) {
            break
        }
        var data = res.list[i]
        var w_date = new Date(data.dt_txt)
        if(now < w_date) {
            var w_time = w_date.getHours() + ':' + align(w_date.getMinutes()) + '~'
            var tmp = weatherList[data.weather[0].icon]
            console.log(data.weather[0].icon)
            var w_weather = tmp.weather
            var w_icon = tmp.icon
            $('#weather-container').append('<div class="weather-box"><img src="' + w_icon + '"><p>' + w_weather + '</p><p>' + w_time + '</p></div>')
            n++
        }
    }
}

/*

なぜか昼と夜の画像が入れ替わるバグ

const weatherList = {
    '01d': {weather: '快晴', icon: 'http://openweathermap.org/img/wn/01d@2x.png'},
    '02d': {weather: '晴れ', icon: 'http://openweathermap.org/img/wn/02d@2x.png'},
    '03d': {weather: 'くもり', icon: 'http://openweathermap.org/img/wn/03d@2x.png'},
    '04d': {weather: 'くもり', icon: 'http://openweathermap.org/img/wn/04d@2x.png'},
    '09d': {weather: '小雨', icon: 'http://openweathermap.org/img/wn/09d@2x.png'},
    '10d': {weather: '雨', icon: 'http://openweathermap.org/img/wn/10d@2x.png'},
    '11d': {weather: '雷雨', icon: 'http://openweathermap.org/img/wn/11d@2x.png'},
    '13d': {weather: '雪', icon: 'http://openweathermap.org/img/wn/13d@2x.png'},
    '50d': {weather: '霧', icon: 'http://openweathermap.org/img/wn/50d@2x.png'},
    '01n': {weather: '快晴', icon: 'http://openweathermap.org/img/wn/01n@2x.png'},
    '02n': {weather: '晴れ', icon: 'http://openweathermap.org/img/wn/02n@2x.png'},
    '03n': {weather: 'くもり', icon: 'http://openweathermap.org/img/wn/03n@2x.png'},
    '04n': {weather: 'くもり', icon: 'http://openweathermap.org/img/wn/04n@2x.png'},
    '09n': {weather: '小雨', icon: 'http://openweathermap.org/img/wn/09n@2x.png'},
    '10n': {weather: '雨', icon: 'http://openweathermap.org/img/wn/10n@2x.png'},
    '11n': {weather: '雷雨', icon: 'http://openweathermap.org/img/wn/11n@2x.png'},
    '13n': {weather: '雪', icon: 'http://openweathermap.org/img/wn/13n@2x.png'},
    '50n': {weather: '霧', icon: 'http://openweathermap.org/img/wn/50n@2x.png'}
}
*/