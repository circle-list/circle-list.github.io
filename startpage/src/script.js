function getStr(d) {
    if(localStorage.getItem(d) === null) {
        localStorage.setItem(d, '{}')
        return '{}'
    } else {
        return JSON.parse(localStorage.getItem(d))
    }
}

function setStr(d, c) {
    localStorage.setItem(d, JSON.stringify(c))
}

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

// ミリ秒を取得してタイミングを合わせる
setTimeout(function() {
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
}, (1000 - (new Date()).getMilliseconds()))

init()

// ニュースフィード
$.ajax({
    url: 'https://sp-wtr-api.gq/api/v1/news?type=pickup',
    dataType: 'json'
}).done(function (response) {
    console.log(response)
    var r = response

    for(var i = 0; r.length > i; i++) {
        $('#newsfeed').append('<li id="ns-' + i + '"><a href="' + r[i].link +  '" target="_blank">' + r[i].title + '</a></li>')

        var n_time = new Date(r[i].pubDate)
        var pubTime = n_time.getFullYear() + '年' + align(n_time.getMonth() + 1) + '月' + n_time.getDate() + '日　' + n_time.getHours() + '時' + align(n_time.getMinutes()) + '分'

        tippy('#ns-' + i, {
            followCursor: 'horizontal',
            theme: 'light',
            content: pubTime,
            placement: 'left'
        })
    }
})

// お天気

const weatherList = {
    '01d': {weather: '快晴', icon: 'https://openweathermap.org/img/wn/01d@2x.png'},
    '02d': {weather: '晴れ', icon: 'https://openweathermap.org/img/wn/02d@2x.png'},
    '03d': {weather: 'くもり', icon: 'https://openweathermap.org/img/wn/03d@2x.png'},
    '04d': {weather: 'くもり', icon: 'https://openweathermap.org/img/wn/04d@2x.png'},
    '09d': {weather: '小雨', icon: 'https://openweathermap.org/img/wn/09d@2x.png'},
    '10d': {weather: '雨', icon: 'https://openweathermap.org/img/wn/10d@2x.png'},
    '11d': {weather: '雷雨', icon: 'https://openweathermap.org/img/wn/11d@2x.png'},
    '13d': {weather: '雪', icon: 'https://openweathermap.org/img/wn/13d@2x.png'},
    '50d': {weather: '霧', icon: 'https://openweathermap.org/img/wn/50d@2x.png'},
    '01n': {weather: '快晴', icon: 'https://openweathermap.org/img/wn/01n@2x.png'},
    '02n': {weather: '晴れ', icon: 'https://openweathermap.org/img/wn/02n@2x.png'},
    '03n': {weather: 'くもり', icon: 'https://openweathermap.org/img/wn/03n@2x.png'},
    '04n': {weather: 'くもり', icon: 'https://openweathermap.org/img/wn/04n@2x.png'},
    '09n': {weather: '小雨', icon: 'https://openweathermap.org/img/wn/09n@2x.png'},
    '10n': {weather: '雨', icon: 'https://openweathermap.org/img/wn/10n@2x.png'},
    '11n': {weather: '雷雨', icon: 'https://openweathermap.org/img/wn/11n@2x.png'},
    '13n': {weather: '雪', icon: 'https://openweathermap.org/img/wn/13n@2x.png'},
    '50n': {weather: '霧', icon: 'https://openweathermap.org/img/wn/50n@2x.png'}
}

function appendWeather(res) {
    for(var i = 0; 5 > i; i++) {
        var data = res.list[i]
        var w_date = new Date(data.dt_txt)
        w_date.setHours(w_date.getHours() + 9)
        var w_time = w_date.getHours() + ':' + align(w_date.getMinutes())
        var tmp = weatherList[data.weather[0].icon]
        var w_temp = Math.round(data.main.temp) + '℃'
        var w_icon = tmp.icon
        $('#weather-container').append('<div class="weather-box" id="wb-' + i + '"><p>' + w_time + '</p><img src="' + w_icon + '"><p>' + w_temp + '</p></div>')
        tippy('#wb-' + i, {
            theme: 'light',
            content: '最高気温: ' + data.main.temp_max + '℃<br>最低気温: ' + data.main.temp_min + '℃<br>湿度: ' + data.main.humidity +'%'
        })

        // ゆき降らせる
        if(data.weather[0].icon.match(/13/)) {
            $(document).snowfall()
        }
    }
}

/*

なぜか昼と夜の画像が入れ替わるバグ <- UTC時間のせいだった

const weatherList = {
    '01n': {weather: '快晴', icon: 'https://openweathermap.org/img/wn/01d@2x.png'},
    '02n': {weather: '晴れ', icon: 'https://openweathermap.org/img/wn/02d@2x.png'},
    '03n': {weather: 'くもり', icon: 'https://openweathermap.org/img/wn/03d@2x.png'},
    '04n': {weather: 'くもり', icon: 'https://openweathermap.org/img/wn/04d@2x.png'},
    '09n': {weather: '小雨', icon: 'https://openweathermap.org/img/wn/09d@2x.png'},
    '10n': {weather: '雨', icon: 'https://openweathermap.org/img/wn/10d@2x.png'},
    '11n': {weather: '雷雨', icon: 'https://openweathermap.org/img/wn/11d@2x.png'},
    '13n': {weather: '雪', icon: 'https://openweathermap.org/img/wn/13d@2x.png'},
    '50n': {weather: '霧', icon: 'https://openweathermap.org/img/wn/50d@2x.png'},
    '01d': {weather: '快晴', icon: 'https://openweathermap.org/img/wn/01n@2x.png'},
    '02d': {weather: '晴れ', icon: 'https://openweathermap.org/img/wn/02n@2x.png'},
    '03d': {weather: 'くもり', icon: 'https://openweathermap.org/img/wn/03n@2x.png'},
    '04d': {weather: 'くもり', icon: 'https://openweathermap.org/img/wn/04n@2x.png'},
    '09d': {weather: '小雨', icon: 'https://openweathermap.org/img/wn/09n@2x.png'},
    '10d': {weather: '雨', icon: 'https://openweathermap.org/img/wn/10n@2x.png'},
    '11d': {weather: '雷雨', icon: 'https://openweathermap.org/img/wn/11n@2x.png'},
    '13d': {weather: '雪', icon: 'https://openweathermap.org/img/wn/13n@2x.png'},
    '50d': {weather: '霧', icon: 'https://openweathermap.org/img/wn/50n@2x.png'}
}

*/

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": true,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "2500",
  "extendedTimeOut": "500",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

$('#wtr-update').on('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((data, error) => {
            if(error) {
                console.log('error: ' + error)
                toastr['error'](error, 'エラー')
            } else {
                setStr('location', {latitude: data.coords.latitude, longitude: data.coords.longitude})
                // toastr['info']('位置情報を更新しました')
                updateWeather()
            }
        })
    } else {
        toastr['error']('このブラウザは位置情報を取得することができません', 'エラー')
    }
})

function updateWeather() {
    toastr['info']('天気情報を取得中')
    const positionData = getStr('location')
    const lat = positionData.latitude
    const lon = positionData.longitude

    console.log(lat + lon)

    $.ajax({
        url: 'https://sp-wtr-api.gq/api/v1/weather',
        dataType: 'json',
        data: 'lat=' + lat + '&lon=' + lon,
    }).done(function (response) {
        $('#weather-container').empty()
        var res = JSON.parse(response)
        console.log(res)
        appendWeather(res)
        toastr["success"](res.city.name + ', ' + res.city.country, "最新の天気を取得しました！")
        $('#settings-location').text(res.city.name + ', ' + res.city.country)
        $('#location-name').text(res.city.name + ', ' + res.city.country)
    })
}

if(getStr('location') !== '{}') {
    updateWeather()
    setInterval(function() {
        updateWeather()
    }, 3600000)
}


// メッセージ
if(getStr('sp-username') === '{}') {
    setStr('sp-username', 'ユーザー')
}

function messages() {
    var msgs_morning = [
        'おはようございます、${USERNAME}さん！'
    ]

    var msgs_noon = [
        'こんにちは、${USERNAME}さん！'
    ]

    var msgs_night = [
        'こんばんは、${USERNAME}さん！'
    ]

    var msgs_midnight = [
        'おやすみなさい、${USERNAME}さん！'
    ]

    var now_hour = new Date().getHours()

    if ( 0 <= now_hour && now_hour <= 5 ){
        select = msgs_midnight[Math.floor(Math.random() * msgs_midnight.length)]
    } else if ( 6 <= now_hour && now_hour <= 10 ) {
        select = msgs_morning[Math.floor(Math.random() * msgs_morning.length)]
    } else if ( 11 <= now_hour && now_hour <= 17 ) {
        select = msgs_noon[Math.floor(Math.random() * msgs_noon.length)]
    } else if ( 18 <= now_hour && now_hour <= 23 ) {
        select = msgs_night[Math.floor(Math.random() * msgs_night.length)]
    }

    var ms_tmp = select.replace('${USERNAME}', getStr('sp-username'))
    $('#ct-message').text(ms_tmp)
}

messages()

// 設定ボタントグル
$('[id=toggle-setting]').on('click', function() {
    $('#settings-popup').toggleClass('popup')
})

// Settings
$('#settings-name').val(getStr('sp-username'))

$('#settings-name').on('change', function() {
    setStr('sp-username', $('#settings-name').val())
    toastr['success']('名前を変更しました')
    messages()
})

// 検索ボタンクリック
$('#search-button').on('click', function() {
    if($('#search-input').val() !== '') {
        $('body').addClass('page-mv')
        setTimeout(function() {
            window.location.href = 'https://www.google.com/search?q=' + $('#search-input').val()
        }, 500)
    }
})

//Sortable

sortable = Sortable.create($('.contents')[0], {
    animation: 150,
    group: 'sp-sortable-contents',
    disabled: true,
	store: {
		get: function (sortable) {
			var order = localStorage.getItem(sortable.options.group.name)
			return order ? order.split('|') : []
		},
		set: function (sortable) {
			var order = sortable.toArray()
			localStorage.setItem(sortable.options.group.name, order.join('|'))
		}
	}
})

// 機能追加/削除トグル
$('[id=edit-button]').on('click', function() {
    var parent_id = $(this).parent().data('id')
    var edit_cnt_list = getStr('sp-hidden-contents')
    if(edit_cnt_list[parent_id] === undefined) {
        edit_cnt_list[parent_id] = false
    }

    edit_cnt_list[parent_id] = !edit_cnt_list[parent_id]

    if(edit_cnt_list[parent_id] === true) {
        $(this).removeClass('remove-item')
        $(this).addClass('add-item')
    } else {
        $(this).removeClass('add-item')
        $(this).addClass('remove-item')
    }

    setStr('sp-hidden-contents', edit_cnt_list)
})

// 非表示に設定されている項目を非表示に
function hiddenItem() {
    var hidden_items = getStr('sp-hidden-contents')
    var hidden_items_keys = Object.keys(hidden_items)
    for(var i = 0; hidden_items_keys.length > i; i++) {
        if(hidden_items[hidden_items_keys[i]] === true) {
            var itm = $('[data-id="' + hidden_items_keys[i] + '"]')
            itm.addClass('dn')
            itm.children('#edit-button').addClass('add-item')
            itm.children('#edit-button').removeClass('remove-item')
        }
    }
}

hiddenItem()

list_toggle = false

$('#toggle-list').on('click', function() {
    if(list_toggle === false) {
        list_toggle = true
        $('.box').removeClass('dn')
        $('[id=edit-button]').removeClass('dn')
        sortable.option('disabled', false)
        toastr['info']('項目をドラックすることで並び替えが可能です')
        setTimeout(function() {
            toastr['info']('もう一度並び替えボタンをクリックすることで編集を終了できます')
        }, 3000)
    } else {
        list_toggle = false
        hiddenItem()
        $('[id=edit-button]').addClass('dn')
        sortable.option('disabled', true)
        toastr['success']('設定を保存しました')
    }
})

/* Tippy */
tippy('#toggle-setting', {
    theme: 'light',
    content: '設定'
})

tippy('#toggle-list', {
    theme: 'light',
    content: '並び替え'
})

cld_month = 0

var month_eng = ['January','February','March','April','May','June','July','Augest','September','October','November','December']

// カレンダー
function calender() {
    $('#calender-frame').empty()
    $('#calender-frame').append(' <p class="red">Sun</p><p>Mon</p><p>Tue</p><p>Wed</p><p>Thu</p><p>Fri</p><p class="blue">Sat</p>')

    var d = new Date()
    
    d.setMonth(d.getMonth() + cld_month)

    var date = new Date(d.getFullYear() + '/' + (d.getMonth() + 1) + '/1')
    var last = new Date(d.getFullYear(), (d.getMonth() + 1), 0)
    
    for(var i = 0; date.getDay() > i; i++) {
        $('#calender-frame').append('<p></p>')
    }

    for(var i = 0; last.getDate() > i; i++) {
        var css = []

        if(i + 1 === d.getDate() && cld_month === 0) {
            css.push('today')
        }

        if((i + date.getDay()) % 7 === 0) {
            css.push('red')
        }

        if((i + date.getDay() + 1) % 7 === 0) {
            css.push('blue')
        }

        if(css.length === 0) {
            css.push('cld-normal')
        }

        $('#calender-frame').append('<p class="' + css.join(' ') + '">' + (i + 1) + '</p>')
    }

    $('#cld-month').text(month_eng[d.getMonth()] + ' ' + d.getFullYear())
}

calender()

$('#cld-next').on('click', function() {
    cld_month++
    calender()
})

$('#cld-prev').on('click', function() {
    cld_month--
    calender()
})