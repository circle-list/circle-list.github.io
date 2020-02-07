var console_message_1 = 'CircleList %cVer.2'
var console_message_2 = 'つくった人: ゆきねこ (https://twitter.com/hideki_0403)\nバグなどはサイトに設置されている不具合フォームよりお願いします～'
var console_message_3 = '\n\n%c自分が何をしているのかわからなければこのウィンドウを閉じることを推奨します。\n%cわかるのであれば制作のお手伝いをしてください！！！\n\nあとソースコードは以下のリポジトリに公開しているのでそっちの方が見やすいですよ\nhttps://github.com/circle-list/circle-list.github.io'

console.log('%c ' + console_message_1 + '\n\n%c' + console_message_2 + console_message_3 + '\n', 'color: #c99987; font-size: 50px; text-shadow:3px 3px 0 #FFF, -3px -3px 0 #FFF, -3px 3px 0 #FFF, 3px -3px 0 #FFF, 0px 3px 0 #FFF,  0-3px 0 #FFF, -3px 0 0 #FFF, 3px 0 0 #FFF;', 'font-size: 15px; color: #41b0ff;', '', 'color: #ff5151;', '')

var debug_ms = new Date()

/* 設定項目一覧 */

// マスターアップ時に必ず変更すること！！
const comiketName = '2019_winter'

const comiketList = {
    '2019_summer': '2019年 夏コミ (C96)',
    '2019_winter': '2019年 冬コミ (C97)',
    '2020_summer': '2020年 夏コミ (C98)',
    '2020_winter': '2020年 冬コミ (C99)',
    '2021_summer': '2021年 夏コミ (C100)',
    '2021_winter': '2021年 冬コミ (C101)'
}

// コピーライト
const COPYRIGHTS = 'Copyright © 2019 CircleList All Rights Reserved. (https://circlelist.ga/)'

// console.log @ デバッグ用
function c(t) {
    console.log(t)
}

function getConfig(d) {
    var c = JSON.parse(localStorage.getItem('config'))
    if(c !== null) {
        return (c)[d]
    } else {
        return undefined
    }
}

function setConfig(d, f) {
    var c = JSON.parse(localStorage.getItem('config'))
    c[d] = f
    localStorage.setItem('config', JSON.stringify(c))
}

/*  ErrorHandler  */
window.onerror = function(msg, url, line, col) {
    M.toast({html: '<b class="red-text text-accent-1" style="font-weight: bold;">エラーが発生しました</b>'})
    if(getConfig('errorReport') !== false) {

        var cache_version = []
        caches.keys()
        .then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                cache_version.push(key.replace('-', ': '))
            })
        )})

        var errorReport = {
            report: {
                time: new Date(),
                info: {
                    vendor: window.navigator.vendor,
                    userAgent: window.navigator.userAgent,
                    language: window.navigator.language
                },
                connection: {
                    type: window.navigator.connection.type,
                    effectiveType: window.navigator.connection.effectiveType,
                    downlink: window.navigator.connection.downlink
                },
                registData: bug_send_coord
            },
            error: {
                errorMessage: msg,
                line: line,
                col: col,
                url: url
            }
        }

        if(window.navigator.onLine) {
            $.ajax({
                url:'https://sp-wtr-api.gq/api/v1/circlelist/error',
                type:'POST',
                data: errorReport
            })
            .done(data => {
                console.log(data)
            })
            .fail(data => {
                console.log(data)
                console.log(errorReport)
                M.toast({html: '<b class="red-text text-accent-1" style="font-weight: bold;">エラー情報の送信に失敗しました</b>'})
            })

            // バグが発生するキャッシュが原因で起動しなくなる可能性もあるのでキャッシュを削除する
            caches.keys()
            .then(function(keyList) {
                return Promise.all(keyList.map(function(key) {
                    return caches.delete(key)
                }));
            }).then(function() {
                // ServiceWorkerをいったん解除
                navigator.serviceWorker.getRegistrations()
                .then(registrations => {
                    for (let registration of registrations) {
                    registration.unregister()
                    }
                })
            })

        } else {
            // オフラインだった場合はlocalStorageに保存して次回起動時に投げる
            localStorage.setItem('errorStack', JSON.stringify(errorReport))
        }
    }

}

// Initialize NewsCache
news_cache = ''

/*  MaterializeJS Loader */

$(document).ready(function(){
    $('.tabs').tabs()
    $('.sidenav').sidenav()
    disableMaterializeSelect()
    $('select').formSelect()
    $('.modal').modal({dismissible: false})
    $('.collapsible').collapsible()
    var elem = document.querySelector('.collapsible.expandable')
    M.Collapsible.init(elem, {
        accordion: false
    })
    ConfigCheck()
    updateList()
    init()
    cacheVers()
    old_data_list()
    leon_init()
    checkQuery()

    $.getJSON('https://circlelist.ga/data/news.json')
    .done(function(data) {
        news_cache = data.news
        updateNews()
    })

    setTimeout(function() {
        $('#loading-div').addClass('load-end')
        setTimeout(function() {
            $('#loading-div').remove()
        }, 2000)
    }, 2500)

    setTimeout(function() {
        find_old_data()
    }, 3500)

    if(!navigator.onLine) {
        M.toast({html: '現在オフラインのため、一部機能が利用できません。', displayLength: 10000})
    }

    isExistManifest()

    console.log(new Date - debug_ms + 'ms')
})

// disableMaterializeSelect
function disableMaterializeSelect() {
    if(getConfig('browser-select')) {
        $('select').addClass('browser-default')
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

// PWA
var installPromptEvent

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault()
  installPromptEvent = event
  $("#install_button").attr('disabled', false)
})

$('#install_button').on('click', () => {
    $("#install_button").attr('disabled', true)
  
    installPromptEvent.prompt()
  
    installPromptEvent.userChoice.then((choice) => {
      if (choice.outcome === 'accepted') {
        M.toast({html: 'CircleListがインストールされました。ホーム画面から起動できます。'})
      } else {
        M.toast({html: 'インストールをキャンセルしました'})
      }

      installPromptEvent = null
    })
})

// CacheStorageのkey表示
function cacheVers() {
    fetchNowVer().then(item => {
        $('#version').text(item)
    })
}

// キャッシュクリア
$('#cache-clear').on('click', function() {
    // キャッシュ削除
    caches.keys()
    .then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
            return caches.delete(key);
        }));
    }).then(function() {
        // ServiceWorkerをいったん解除
        navigator.serviceWorker.getRegistrations()
        .then(registrations => {
            for (let registration of registrations) {
            registration.unregister();
            }
        })
        .then(function() {
        // 再読み込み
        location.reload()
        })
    })
})

// バックアップデータ生成
$('#cc-info-export').on('click', function() {
    StorageCheck()
    var data = {
        circles: localStorage.getItem('circles'),
        config: localStorage.getItem('config'),
        old_version: localStorage.getItem('old_version'),
        memo: localStorage.getItem('memo')
    }
    var blob = new Blob([JSON.stringify(data)], { type : 'application/json' })

    if (window.navigator.msSaveBlob) { 
        window.navigator.msSaveBlob(blob, 'circlelist.db')
    } else {
        $('#cc-info-export').attr('href', window.URL.createObjectURL(blob))
    }
})

// バックアップデータ読み込みダイアログ
backupdata = ''

$('#import-file').on('change', function(event) {
    var result = event.target.files[0]
    var reader = new FileReader()
    reader.readAsText(result)
    reader.addEventListener( 'load', function() {
        try {
            backupdata = JSON.parse(reader.result)
            $('#import-create-date').text('作成日時: ' + result.lastModifiedDate)
          } catch (e) {
            M.toast({html: 'エラー: ファイルが壊れているか、正しいファイルを選択していない可能性があります。'})
          }
        
    })
 
})

// 取り込み処理
$('#import-submit').on('click', function() {
    if(backupdata !== '') {
        if(backupdata.config === undefined) {
            localStorage.setItem('circles', JSON.stringify(backupdata))
            M.toast({html: '旧バックアップデータをインポートしました。'})
            updateList()
        } else {
            localStorage.setItem('circles', backupdata.circles)
            localStorage.setItem('config', backupdata.config)
            localStorage.setItem('memo', backupdata.memo)
            localStorage.setItem('old_version', backupdata.old_version)
            M.toast({html: 'バックアップデータをインポートしました。'})
            updateList()
        }
    } else {
        M.toast({html: 'ファイルを選択してください'})
    }
})

// 統計だすやつ
function stats() {
    var circles = JSON.parse(localStorage.getItem('circles'))
    var prices = 0
    var goods = 0
    $('#cc-stat-circles').text(Object.keys(circles).length)
    for(var i = 0; Object.keys(circles).length > i; i++) {
        var circle = circles[Object.keys(circles)[i]]
        for(var ii = 0; circle.buy.length > ii; ii++) {
            goods++
            prices += (circle.buy[ii].price * 1)
        }
    }
    $('#cc-stat-goods').text(goods)
    $('#cc-stat-prices').text(prices + '円')
}

// 過去のコミケ
function old_data_list() {
    var vers = JSON.parse(localStorage.getItem('old_version'))
    for(var i = 0; Object.keys(vers).length > i; i++) {
        var v_name = comiketList[Object.keys(vers)[i]]
        var v_length = Object.keys(vers[Object.keys(vers)[i]]).length
        $('#cc-top-stat-old').append('<tr onclick="old_comiket(\'' + Object.keys(vers)[i] + '\')"><th>' + v_name + '</th><th>' + v_length + '</th></tr>')
    }
}

const island = {
    '2': ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ', 'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 'る', 'れ'],
    '1': ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'],
    '3': ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ' , 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト'],
    '4': ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ', 'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ']
}

// 初期化処理
function init() {
    var config = JSON.parse(localStorage.getItem('config'))

    $('#cc-list-add-day').empty()
    $('#cc-list-add-il').empty()
    $('#cc-list-add-sb').empty()
    $('#cc-list-add-ab').empty()

    $('#cc-list-add-day').append('<option value="" disabled selected>日付選択</option>')
    $('#cc-list-add-il').append('<option value="" disabled selected>選択 (A)</option>')
    $('#cc-list-add-sb').append('<option value="" disabled selected>選択 (01)</option>')
    $('#cc-list-add-ab').append('<option value="" disabled selected>選択 (a)</option>')

    const num = ['01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
    const day = ['1日目 (土曜日)', '2日目 (日曜日)', '3日目 (月曜日)', '4日目 (火曜日)']
    const table = ['a', 'b', 'ab']

    for(var ii = 0; Object.keys(island).length > ii; ii++) {
        for(var i = 0; island[ii + 1].length > i; i++) {
            $('#cc-list-add-il').append('<option value="' + island[ii + 1][i] + '">' + island[ii + 1][i] + '</option>')
        }
    }

    for(var i = 0; num.length > i; i++) {
        $('#cc-list-add-sb').append('<option value="' + num[i] + '">' + num[i] + '</option>')
    }

    for(var i = 0; day.length > i; i++) {
        $('#cc-list-add-day').append('<option value="' + (i + 1) + '">' + day[i] + '</option>')
    }

    for(var i = 0; table.length > i; i++) {
        $('#cc-list-add-ab').append('<option value="' + table[i] + '">' + table[i] + '</option>')
    }

    $('#cc-list-add-sb').formSelect()
    $('#cc-list-add-il').formSelect()
    $('#cc-list-add-day').formSelect()
    $('#cc-list-add-ab').formSelect()

    $('#cc-setting-disableReset').prop('checked', config['disableReset'])
    $('#cc-setting-errorReport').prop('checked', config['errorReport'])
    $('#cc-setting-enableBrowserSelect').prop('checked', config['browser-select'])
    $('input[value="' + config['darktheme'] + '"]').prop('checked', true)
}

// StorageCheck
function StorageCheck() {
    if(localStorage.getItem('circles') === null) {
        localStorage.setItem('circles', '{}')
    }
}

// ConfigCheck
function ConfigCheck() {
    if(localStorage.getItem('config') === null) {
        localStorage.setItem('config', '{}')
    }

    if(localStorage.getItem('memo') === null) {
        localStorage.setItem('memo', '')
    }

    if(localStorage.getItem('old_version') === null) {
        localStorage.setItem('old_version', '[]')
    }

    if(localStorage.getItem('read_news') === null) {
        localStorage.setItem('read_news', '[]')
    }

    if(localStorage.getItem('errorStack') !== null) {
        $.ajax({
            url:'https://sp-wtr-api.gq/api/v1/circlelist/error',
            type:'POST',
            data: JSON.parse(localStorage.getItem('errorStack'))
        })
        .done(data => {
            console.log(data)
            localStorage.removeItem('errorStack')
        })
        .fail(data => {
            console.log(data)
            console.log(errorReport)
        })
    }

    // メモエリア初期化
    $('#cc-memo-area').val(localStorage.getItem('memo'))
    M.textareaAutoResize($('#cc-memo-area'))

    var config = JSON.parse(localStorage.getItem('config'))
    if(config['checkbox'] === undefined) {
        config['checkbox'] = {
            'day1': true,
            'day2': true,
            'day3': true,
            'day4': true
        }
        
    }
    if(config['disableReset'] === undefined) {
        config['disableReset'] = false
    }
    if(config['version'] === undefined) {
        config['version'] = comiketName
    }
    if(config['errorReport'] === undefined) {
        config['errorReport'] = true
    }
    if(config['darktheme'] === undefined) {
        config['darktheme'] = 'auto'
    }
    if(config['browser-select'] === undefined) {
        config['browser-select'] = false
    }
    localStorage.setItem('config', JSON.stringify(config))
}

// 前バージョンデータ検出処理

comiket_v = ''

function find_old_data() {
    var config = JSON.parse(localStorage.getItem('config'))
    var old = JSON.parse(localStorage.getItem('old_version'))
    if(localStorage.getItem('circles') !== '{}') {
        // C96用処理
        if(old.length === 0 && config['version'] === '2019_winter' && config['newUser'] === undefined) {
            comiket_v = '2019年 夏コミ (C96)'
        }
        // C97~用処理
        if(config['version'] !== comiketName) {
            comiket_v = comiketList[config['version']]
        }

        // modal追加処理
        if(comiket_v !== '') {
            $('body').append('<div id="move-confirm" class="modal"><div class="modal-content"><p>以前のコミケ( ' + comiket_v + ' )のデータが残っているようです。「過去のコミケ」へデータを移動させますか？</p><p>いいえを選択した場合は現在のデータが保持されますが、次回アクセス時にこの確認画面が再度表示されます。</p><br><p>※「過去のコミケ」にデータを移動させることで、以前のデータを残しつつも初めから新しくサークルを登録することができるようになります。</p><p>過去のデータは「トップ」→「情報」よりいつでも閲覧可能です。</p></div><div class="modal-footer"><a href="#!" class="modal-close waves-effect waves-light info-color btn">いいえ</a><a href="#!" class="modal-close waves-effect waves-light warning-color btn" onclick="old_data();" style="margin-left: 15px;">はい</a></div></div>')
            $('.modal').modal()
            M.Modal.getInstance($('#move-confirm')).open()
        }

    } else {
        if(config['newUser'] === undefined) {
            config['newUser'] = true
            localStorage.setItem('config', JSON.stringify(config))
        } else {
            config['version'] = comiketName
            console.log(comiketName)
            localStorage.setItem('config', JSON.stringify(config))
        }
    }
}

// 前バージョン引き継ぎ処理
function old_data() {
    var config = JSON.parse(localStorage.getItem('config'))
    var old = JSON.parse(localStorage.getItem('old_version'))
    if(localStorage.getItem('circles') !== '{}') {
        // C96用処理
        if(old.length === 0 && config['version'] === '2019_winter' && config['newUser'] === undefined) {
            localStorage.setItem('old_version', '{"2019_summer": ' + localStorage.getItem('circles') + '}')
            localStorage.setItem('circles', '{}')
            M.toast({html: '2019年 夏コミ (C96)のデータを「過去のコミケ」に引き継ぎました！「トップ」→「情報」から閲覧可能です。', displayLength: 15000})
            config['version'] = comiketName
            localStorage.setItem('config', JSON.stringify(config))
            old_data_list()
            return
        }
        // C97~用処理
        if(config['version'] !== comiketName) {
            c('ok')
            old[config['version']] =  JSON.parse(localStorage.getItem('circles'))
            localStorage.setItem('old_version', JSON.stringify(old))
            localStorage.setItem('circles', '{}')
            M.toast({html: comiketList[config['version']] + 'のデータを「過去のコミケ」に引き継ぎました！最新の情報を反映するために5秒後に再読み込みします。', displayLength: 15000})
            config['version'] = comiketName
            localStorage.setItem('config', JSON.stringify(config))
            old_data_list()
            setTimeout(function() {
                location.reload()
            }, 5000)
            return
        }
    } 
}

// 保存
$('#cc-list-add-submit').click(function() {
    var config = JSON.parse(localStorage.getItem('config'))
    StorageCheck()

    if($('#cc-list-add-day').val() === null || $('#cc-list-add-il').val() === null || $('#cc-list-add-sb').val() === null || $('#cc-list-add-ab').val() === null) {
        M.toast({html: '入力内容に不備があります'})
        return
    }

    if($('#cc-list-add-circle_name').val() === '') {
        M.toast({html: 'サークル名が入力されていません'})
        return
    }

    var id = $('#cc-list-add-day').val() + $('#cc-list-add-il').val() + $('#cc-list-add-sb').val() + $('#cc-list-add-ab').val()
    var data = JSON.parse(localStorage.getItem('circles'))

    if(data[id] !== undefined) {
        data[id] = {
            place: {
                date: $('#cc-list-add-day').val(),
                island: $('#cc-list-add-il').val(),
                number: $('#cc-list-add-sb').val(),
                ab: $('#cc-list-add-ab').val()
            },
            name: $('#cc-list-add-circle_name').val(),
            memo: $('#cc-list-add-memo').val(),
            buy: data[id].buy,
            paid: data[id].paid,
            id: id
        }
        M.toast({html: '更新しました！'})
    } else {
        data[id] = {
            place: {
                date: $('#cc-list-add-day').val(),
                island: $('#cc-list-add-il').val(),
                number: $('#cc-list-add-sb').val(),
                ab: $('#cc-list-add-ab').val()
            },
            name: $('#cc-list-add-circle_name').val(),
            memo: $('#cc-list-add-memo').val(),
            buy: [],
            paid: false,
            id: id
        }
        M.toast({html: '追加しました！'})
    }
   
    localStorage.setItem('circles', JSON.stringify(data))

    if(config['disableReset']) {
        init()
    }

    $('#cc-list-add-circle_name').val('')
    $('#cc-list-add-memo').val('')

    updateList()
})

// ホール検索
function findHall(e, n) {
    if(e === 'あ') {
        return '西2壁'
    }
    if(e === 'れ') {
        return '西1壁'
    }
    if(e === 'A') {
        if(n >= 43) {
            return '西3壁'
        } else {
            return '西4壁'
        }
    }
    if(e === 'ア') {
        if(n >= 34) {
            return '南1壁'
        } else {
            return '南2壁'
        }
    }
    if(island['1'].indexOf(e) !== -1) {
        if('BCDEF'.indexOf(e) !== -1) {
            return '西4'
        } else {
            if('GHIJKL'.indexOf(e) !== -1) {
                return '西3・4'
            } else {
                return '西3'
            }
        }
    }
    if(island['2'].indexOf(e) !== -1) {
        if('いうえおかきくけこさしすせそたちつてと'.indexOf(e) !== -1) {
            return '西2'
        } else {
            return '西1'
        }
    }
    if(island['3'].indexOf(e) !== -1) {
        if('アイウエオカキクケコ'.indexOf(e) !== -1) {
            return '南2'
        } else {
            return '南1'
        }
    }
    if(island['4'].indexOf(e) !== -1 ) {
        if('ナニヌネノハヒフヘホ'.indexOf(e) !== -1) {
            return '南4'
        } else {
            return '南3'
        }
    }
}

//購入済みか否か
function isBuyF(d) {
    if(d === false) {
        return 'check_box_outline_blank'
    } else {
        return 'check_box'
    }
}

// ソート
function objectSort(object) {
    var sorted = {}
    var array = []
    for (key in object) {
        if (object.hasOwnProperty(key)) {
            array.push(key)
        }
    }
    array.sort()
    for (var i = 0; i < array.length; i++) {
        sorted[array[i]] = object[array[i]]
    }
    return sorted
}

// 日付チェック
function isChecked(config, day) {
    switch(day) {
        case '1':
            return config.checkbox.day1
        case '2':
            return config.checkbox.day2
        case '3':
            return config.checkbox.day3
        case '4':
            return config.checkbox.day4
    }
}

//サークルリスト更新
color_change_box = []
function updateList(dc) {
    if(dc === undefined) {
        disableClear = false
    } else {
        disableClear = true
    }
    StorageCheck()
    stats()
    $('#cc-list-circle-wrapper').empty()
    $('#cc-list-buy-circle').empty()
    if(!disableClear) {
        $('#cc-buylist-wrapper').empty()
    }
    var data = JSON.parse(localStorage.getItem('circles'))
    var config = JSON.parse(localStorage.getItem('config'))
    if(Object.keys(data).length === 0) {
        $('#cc-list-circle-wrapper').append('<p class="center-align not-registed">お気に入りを追加してください！</p>')
        $('#cc-buylist-wrapper').append('<p class="center-align not-registed">サークルが選択されていません。<br>まずはお気に入りのサークルを追加してください。</p>')
        return
    } else {
        data = objectSort(data)
    }

    for(var i = 0; Object.keys(data).length > i; i++) {
        tmp = data[Object.keys(data)[i]]
        place = tmp.place.island + tmp.place.number + tmp.place.ab
        color_change_box.push(tmp)
        if(isChecked(config, tmp.place.date)) {
            hall = findHall(tmp.place.island, tmp.place.number)
            isBuy = isBuyF(tmp.paid)
            buyList = []
            if(tmp.buy.length === 0) {
                buyList.push('(未登録です)')
            } else {
                for(var e = 0; tmp.buy.length > e; e++) {
                    if(tmp.buy[e].buy) {
                        buy_flag = '購入済み'
                    } else {
                        buy_flag = '未購入'
                    }
                    buyList.push(tmp.buy[e].name + ' (' + tmp.buy[e].price + '円 / ' + buy_flag + ')')
                }
            }
            
            if(tmp.memo === '') {
                memo = '(メモはありません)'
            } else {
                memo = tmp.memo
            }
            if(tmp.paid === false) {
                color = 'light-blue-text text-darken-2'
            } else {
                color = 'grey-text text-lighten-1'
            }
            $('#cc-list-circle-wrapper').append('<li><div class="collapsible-header ' + color + '"><i class="material-icons" id="check-box" data-id="' + tmp.id + '">' + isBuy + '</i><span class="cc-day">' + tmp.place.date + '日目</span><span class="cc-place">' + place + '</span><span class="cc-hall">' + hall + '</span><span class="cc-name">' + tmp.name + '</span></div><div class="collapsible-body"><p>【メモ】</p><p class="memo">' + memo + '</p>【購入リスト】<p>' + buyList.join('<br>') + '</p><a id="remove-button" class="waves-effect waves-red btn-flat red-text remove-button" data-id="' + tmp.id + '">削除</a><a id="edit-button" class="waves-effect waves-blue btn-flat blue-text edit-button" data-id="' + tmp.id + '">編集</a></div></li>')

            // ここから下購入リスト
            if(tmp.buy.length !== 0 && disableClear === false) {
                var tmp_box = []
                
                for(var f = 0; tmp.buy.length > f; f++) {
                    var _tmp = tmp.buy[f]
                    tmp_box.push('<tr><td><i class="material-icons" id="check-box" data-id="' + tmp.id + '" data-item-id="' + _tmp.id + '">' + isBuyF(_tmp.buy) + '</i></td><td>' + _tmp.name + '</td><td>' + _tmp.price + '円</td><td class="del-button-wrapper"><a class="waves-effect waves-red btn-flat red-text buylist-delete" id="buy-delete-button" data-id="' + tmp.id + '" data-item-id="' + _tmp.id + '">削除</a></td></tr>')
                }

                $('#cc-buylist-wrapper').append('<li><div class="collapsible-header"><span>' + tmp.name + ' (' + place + ' / ' + tmp.place.date + '日目)</span></div><div class="collapsible-body"><table class="highlight"><tbody>' + tmp_box.join('') + '</tbody></table></div></li>')
            }
        }

        $('#cc-list-buy-circle').append('<option value="' + tmp.id + '">' + tmp.name + ' (' + place + ' / ' + tmp.place.date + '日目)</option>')
    }

    if($('#cc-list-circle-wrapper li').length === 0) {
        $('#cc-list-circle-wrapper').append('<p class="center-align not-registed" style="margin-top: 45px !important;">表示できるサークルがないようです...<br>表示する日付を変更するか、サークルを追加してみてください</p>')
    }

    if($('#cc-buylist-wrapper li').length === 0) {
        $('#cc-buylist-wrapper').append('<p class="center-align not-registed">表示できるリストがないようです...<br>表示する日付を変更するか、購入するものを追加してみてください</p>')
        //$('#cc-buylist-wrapper').append('<p class="center-align not-registed">現在、ブラウザがフリースするバグが発生しているためこの機能は無効化されています。ご迷惑をおかけしますが、修正をお待ちください。</p>')
    }

    $('#cc-list-buy-circle').formSelect()

    //$('#cc-list-circle-wrapper').append('<li><div class="collapsible-header"><i class="material-icons" id="check-box" data-id=""></i><span>日目</span><span></span><span></span><span></span></div><div class="collapsible-body grey lighten-4"><p class="memo"></p><p></p></div></li>')
}

// CheckBox (サークルの方)
$('#cc-list-circle-wrapper').on('click', '#check-box', function() {
    var id =  $(this).data('id')
    var data = JSON.parse(localStorage.getItem('circles'))
    if($(this).text() === 'check_box_outline_blank') {
        $(this).text('check_box')
        data[id].paid = true
        M.toast({html: 'サークル「' + data[id].name + '」を購入済みに設定しました'})
    } else {
        $(this).text('check_box_outline_blank') 
        data[id].paid = false
        M.toast({html: 'サークル「' + data[id].name + '」を未購入に設定しました'})
    }
    localStorage.setItem('circles', JSON.stringify(data))
    updateList()
})

// CheckBox (グッズの方)
$('#cc-buylist-wrapper').on('click', '#check-box', function() {
    var id =  $(this).data('id')
    var item_id = $(this).data('item-id')
    var data = JSON.parse(localStorage.getItem('circles'))
    if($(this).text() === 'check_box_outline_blank') {
        $(this).text('check_box')
        for(var i = 0; data[id].buy.length > i; i++) {
            if(data[id].buy[i].id === item_id) {
                data[id].buy[i].buy = true
                M.toast({html: 'サークル「' + data[id].name + '」の「' + data[id].buy[i].name + '」を購入済みに設定しました'})
            }
        }
    } else {
        $(this).text('check_box_outline_blank') 
        for(var i = 0; data[id].buy.length > i; i++) {
            if(data[id].buy[i].id === item_id) {
                data[id].buy[i].buy = false
                M.toast({html: 'サークル「' + data[id].name + '」の「' + data[id].buy[i].name + '」を未購入に設定しました'})
            }
        }
    }
    localStorage.setItem('circles', JSON.stringify(data))
    updateList('dummy')
})

// サークル削除
$('#cc-list-circle-wrapper').on('click', '#remove-button', function() {
    var id =  $(this).data('id')
    var data = JSON.parse(localStorage.getItem('circles'))
    $('#remove-modal').append('<div class="modal"><div class="modal-content"><p class="red-text warning-text">本当に削除しますか？</p><p>サークル「' + data[id].name + '」を削除しようとしています。<br>この操作は取り消せません。</p></div><div class="modal-footer"><a onclick="delete_modal_yes(\'' + id + '\')" class="modal-close waves-effect waves-red red-text btn-flat">消す</a><a onclick="delete_modal_no(\'' + id + '\')" class="modal-close waves-effect blue-text btn-flat">やめる</a></div></div>')
    $('#remove-modal div').modal()
    M.Modal.getInstance($('#remove-modal div')).open()
})

// 編集ボタン
$('#cc-list-circle-wrapper').on('click', '#edit-button', function() {
    var id =  $(this).data('id')
    var data = JSON.parse(localStorage.getItem('circles'))[id]
    $('#cc-list-add-sb').val(data.place.number)
    $('#cc-list-add-il').val(data.place.island)
    $('#cc-list-add-day').val(data.place.date)
    $('#cc-list-add-ab').val(data.place.ab)

    $('#cc-list-add-circle_name').val(data.name)
    $('#cc-list-add-memo').val(data.memo)

    $('#cc-list-add-sb').formSelect()
    $('#cc-list-add-il').formSelect()
    $('#cc-list-add-day').formSelect()
    $('#cc-list-add-ab').formSelect()

    $('#open-add-circle')[0].click()
    $('#cc-list-add-circle_name')[0].focus()
    $('#cc-list-add-memo')[0].focus()
})

// 削除 -> no
function delete_modal_no(id) {
    $('#remove-modal').empty()
    $('#remove-item-modal')
}
// 削除 -> yes
function delete_modal_yes(id) {
    var data = JSON.parse(localStorage.getItem('circles'))
    M.toast({html: 'サークル「' + data[id].name + '」を削除しました'})
    delete data[id]
    localStorage.setItem('circles', JSON.stringify(data))
    updateList()
    $('#remove-modal').empty()
}

// 表示日付変更
$('#date-change-submit').on('click', function() {
    var config = JSON.parse(localStorage.getItem('config'))
    config['checkbox'] = {
        'day1': $('#cc-changedate-1').prop('checked'),
        'day2': $('#cc-changedate-2').prop('checked'),
        'day3': $('#cc-changedate-3').prop('checked'),
        'day4': $('#cc-changedate-4').prop('checked')
    }
    localStorage.setItem('config', JSON.stringify(config))
    updateList()
})

// グッズ追加
$('#cc-buy-add-button').on('click', function() {
    $('#messageWrapper').empty()
    if($('#cc-list-buy-circle').val() !== null) {
        if($('#cc-buy-add-goods').val() !== '' ) {
            if($('#cc-buy-add-price').val() !== '') {
                if($('#cc-buy-add-price').val() >= 0) {
                    var data = JSON.parse(localStorage.getItem('circles'))
                    var tmp = {
                        'name': $('#cc-buy-add-goods').val(),
                        'price': $('#cc-buy-add-price').val(),
                        'buy': false,
                        'id': data[$('#cc-list-buy-circle').val()].id + data[$('#cc-list-buy-circle').val()].buy.length
                    }
                    data[$('#cc-list-buy-circle').val()].buy.push(tmp)
                    localStorage.setItem('circles', JSON.stringify(data))

                    $('#cc-buy-add-goods').val('')
                    $('#cc-buy-add-price').val('')

                    M.toast({html: '追加しました<br>続けて追加することも可能です'})

                    updateList()
                } else {
                    M.toast({html: '金額は0円以上で入力してください'})
                }
            } else {
                M.toast({html: '金額が入力されていません'})
            }
        } else {
            M.toast({html: 'グッズ名が入力されていません'})
        }
    } else {
        M.toast({html: 'サークルが選択されていません。<br>まずはお気に入りのサークルを追加してください。'})
    }
})

// グッズ削除 -> yes
function delete_item_modal_yes(id, item_id, name) {
    var data = JSON.parse(localStorage.getItem('circles'))
    var newData = data[id].buy.filter(function(item, index){
        if (item.id !== item_id) return true
    })

    M.toast({html: 'サークル「' + data[id].name + '」の「' + name + '」を削除しました'})
    data[id].buy = newData
    localStorage.setItem('circles', JSON.stringify(data))
    updateList()
    $('#remove-item-modal').empty()
}

// グッズ削除
$('#cc-buylist-wrapper').on('click', '#buy-delete-button', function() {
    var id =  $(this).data('id')
    var item_id = $(this).data('item-id')
    var data = JSON.parse(localStorage.getItem('circles'))

    var item_object = data[id].buy.filter(function(item, index){
        if (item.id === item_id) return true
    })

    $('#remove-item-modal').append('<div class="modal"><div class="modal-content"><p class="red-text warning-text">本当に削除しますか？</p><p>サークル「' + data[id].name + '」の「' + item_object[0].name + '」を削除しようとしています。<br>この操作は取り消せません。</p></div><div class="modal-footer"><a onclick="delete_item_modal_yes(\'' + id + '\', \'' + item_id + '\', \'' + item_object[0].name + '\')" class="modal-close waves-effect waves-red red-text btn-flat">消す</a><a onclick="delete_modal_no(\'' + id + '\')" class="modal-close waves-effect blue-text btn-flat">やめる</a></div></div>')
    $('#remove-item-modal div').modal()
    M.Modal.getInstance($('#remove-item-modal div')).open()
})

// フォーム初期化ON/OFF
$('#cc-setting-disableReset').on('click', function() {
    var config = JSON.parse(localStorage.getItem('config'))
    config['disableReset'] = $(this).prop('checked')
    localStorage.setItem('config', JSON.stringify(config))
})

// 自動バグレポート機能ON/OFF
$('#cc-setting-errorReport').on('click', function() {
    var config = JSON.parse(localStorage.getItem('config'))
    config['errorReport'] = $(this).prop('checked')
    localStorage.setItem('config', JSON.stringify(config))
})

// materializeSelect無効化ON/OFF
$('#cc-setting-enableBrowserSelect').on('click', function() {
    var config = JSON.parse(localStorage.getItem('config'))
    config['browser-select'] = $(this).prop('checked')
    localStorage.setItem('config', JSON.stringify(config))
    M.toast({html: 'この機能は再読み込み後から有効になります。'})
})

// メモエリア
$('#cc-memo-area').on('change', function() {
    localStorage.setItem('memo', $(this).val())
    DD = new Date();
    Hours = DD.getHours();
    Minutes = DD.getMinutes();
    Seconds = DD.getSeconds();
    $('#cc-memo-savetime').text('保存しました (保存日時: ' + Hours + "時" + Minutes + "分" + Seconds + "秒" + ')')
})

// ロード時のロゴアニメーション

let leon, canvas, ctx
const sw = $('.logo_animation_container').width()
const sh = $('.logo_animation_container').height()
const pixelRatio = 2

function leon_init() {
    canvas = $('#logo_animation')[0]
    ctx = canvas.getContext("2d")

    canvas.width = sw * pixelRatio
    canvas.height = sh * pixelRatio
    canvas.style.width = sw + 'px'
    canvas.style.height = sh + 'px'
    ctx.scale(pixelRatio, pixelRatio)

    leon = new LeonSans({
        text: 'CircleList',
        color: ['#FFFFFF'],
        size: 80 + ((sw - 340) * 0.1),
        weight: 150,
        align: "center"
    });

    requestAnimationFrame(animate)
    let i, total = leon.drawing.length
    for (i = 0; i < total; i++) {
        TweenMax.fromTo(leon.drawing[i], 1.6, {
            value: 0
        }, {
            delay: i * 0.1,
            value: 1,
            ease: Power4.easeOut
        })
    }
}

function animate() {
    requestAnimationFrame(animate)

    ctx.clearRect(0, 0, sw, sh)

    const x = (sw - leon.rect.w) / 2
    const y = (sh - leon.rect.h) / 2
    leon.position(x, y)

    leon.draw(ctx)
}

// シェアボタン
$('[id=social-share]').on('click', function() {
    if(navigator.share) {
        navigator.share({
          title: 'CircleList',
          text: 'コミケで行きたいサークルをリスト化できるサービス CircleList',
          url: 'https://circlelist.ga/',
        })
        .then(() => {
          console.log('Successful share')
        })
    } else {
        alert('お使いのブラウザは非対応です。')
    }
})

// テーマ切り替え
$('input[name="radio-darkmode"]').on('change', function() {
    var value_change = $(this).val()
    if(value_change !== 'auto') {
        if(value_change === 'true') {
            var value_change = true
        } else {
            var value_change = false
        }
    }
    setConfig('darktheme', value_change)
    changeTheme()
})

function changeTheme() {

    if(getConfig('darktheme') === 'auto') {
        var automode = isDarkmode()
    } else {
        var automode = false
    }

    if(getConfig('darktheme') === true || automode) {
        var link = 'src/theme/dark.css'
        var header = '#323639'
    } else {
        var link = 'src/theme/light.css'
        var header = '#c99987'
    }

    $('#site-theme').attr('href', link)
    $('#header-theme-color').attr('content', header)
}

changeTheme()

// データのサーバーバックアップ
function serverBackup(u, d) {
    $.ajax({
        url:'https://sp-wtr-api.gq/api/v1/circlelist/backup-create',
        type:'POST',
        data: {
            uuid: u,
            data: d
        }
    })
    .done(data => {
        if(data.type === 'update') {
            M.toast({html: 'バックアップデータの更新に成功しました！'})
        } else {
            setConfig('uuid', data.uuid)
            M.toast({html: '<span>バックアップに成功しました。<br>復元用ID:<span style="color: #41b0ff; font-weight:bold;"> ' + data.id + ' </span><br>パスワード:<span style="color: #41b0ff; font-weight:bold;"> ' + data.pass + ' </span></span>', displayLength: 'stay'})
        }
    })
    .fail(data => {
        console.log(data)
        M.toast({html: '<b class="red-text text-accent-1" style="font-weight: bold;">データのバックアップに失敗しました。</b>'})
    })
}

$('#cc-cloud_backup').on('click', function() {
    var u = getConfig('uuid')
    if(u === undefined) {var u = 'none'}
    serverBackup(u, localStorage.getItem('circles'))
})

circle_restore = undefined

$('#cc-cloud_check').on('click', function() {
    $.ajax({
        url:'https://sp-wtr-api.gq/api/v1/circlelist/backup-check',
        type:'POST',
        data: {
            uuid: getConfig('uuid')
        }
    })
    .done(data => {
        if(data.status === 'notfound') {
            $('#cl-bu-status').text('バックアップデータがありません')
            $('#cl-bu-status').addClass('red-text')
        } else {
            $('#cl-bu-status').text('バックアップできています')
            $('#cl-bu-status').addClass('blue-text')
            $('#cl-bu-date').text(data.date)
            $('#cl-bu-id').text(data.id)
            $('#cl-bu-pass').text(data.pass)
            $('#takeover_qr').empty()
            $('#takeover_qr').qrcode({width: 128, height: 128, text: 'https://circlelist.ga/?takeover=' + Base64.encode(JSON.stringify({id: data.id, pass: data.pass}))})
            $('#takeover_qr').append('<p>(上記のQRコードをスマホなどで読み取ると簡単に復元ができます。)</p>')
        }
    })
    .fail(data => {
        console.log(data)
        M.toast({html: '<b class="red-text text-accent-1" style="font-weight: bold;">情報の取得に失敗しました</b>'})
    })
})

function ajax_login(dt) {
    $.ajax({
        url:'https://sp-wtr-api.gq/api/v1/circlelist/backup-restore',
        type:'POST',
        data: dt
    })
    .done(data => {
        console.log(data)
        if(data.status === 'failed') {
            $('#cl-restore-login-message').text(data.message)
            $('#cl-restore-login-message').addClass('red-text')
        } else {
            var circle = JSON.parse(data.data)
            $('#cl-restore-loginform').addClass('login_success')
            $('#cl-restore-confirm').removeClass('login_success')
            $('#cl-restore-confirm-date').text(data.date)
            $('#cl-restore-confirm-circle').text(Object.keys(circle).length)
            // 確定ボタンとかの処理をつくる
            circle_restore = circle
        }
    })
    .fail(data => {
        console.log(data)
        M.toast({html: '<b class="red-text text-accent-1" style="font-weight: bold;">情報の取得に失敗しました</b>'})
    })
}

$('#cl-restore-login').on('click', function() {
    ajax_login({
        id: $('#cl-restore-id').val(),
        pass: $('#cl-restore-pass').val()
    })
})

$('#cl-restore-confirm-button').on('click', function() {
    if(circle_restore === undefined) {
        M.toast({html: '<b class="red-text text-accent-1" style="font-weight: bold;">データの取得に失敗しています。再度お試しください。</b>'})
    } else {
        localStorage.setItem('circles', JSON.stringify(circle_restore))
        M.toast({html: 'バックアップデータの復元に成功しました！データ反映のため5秒後に再読み込みをします。', displayLength: 'stay'})
        setTimeout(function() {
            location.href = 'index.html'
        }, 5000)
    }
})
function copy(string){
    var temp = document.createElement('textarea')
  
    temp.value = string
    temp.selectionStart = 0
    temp.selectionEnd = temp.value.length

    var s = temp.style
    s.position = 'fixed'
    s.left = '-100%'
  
    document.body.appendChild(temp)
    temp.focus()
    var result = document.execCommand('copy')
    temp.blur()
    document.body.removeChild(temp)
    if(result) {
        M.toast({html: 'コピーしました'})
    }
}

// 新ダウンロードするやつ（適当）
function canvas2png(hall) {
    var canvas = $('#map-hall-' + hall)[0]
    var ctx = canvas.getContext('2d')
    ctx.font = '10pt Noto Sans JP'
    ctx.fillStyle = '#90caf9'
    ctx.fillText(COPYRIGHTS, 15, (canvas.style.height.replace('px', '') * 1) - 15)
    var dataurl = canvas.toDataURL('image/png')
    var bin = atob(dataurl.split(',')[1])
    var buffer = new Uint8Array(bin.length)
    for (var i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i)
    }

    var blob = new Blob([buffer.buffer], {type: 'image/png'})

    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, 'map-' + hall + '.png')
    } else {
        $('#dl-map_dummy').attr('href', window.URL.createObjectURL(blob))
        $('#dl-map_dummy').attr('download', 'map-' + hall + '.png')
        $('#dl-map_dummy')[0].click()
    }
}

// クエリチェック
var query = getUrlVars()
function getUrlVars() {
    var vars = [], max = 0, hash = '', array = ''
    var url = window.location.search

    hash  = url.slice(1).split('&')
    max = hash.length
    for (var i = 0; i < max; i++) {
        array = hash[i].split('=')
        vars.push(array[0])
        vars[array[0]] = array[1]
    }

    return vars
}

function checkQuery() {
    switch(query[0]) {
        case 'circlems':
            try{
                var importData = JSON.parse(decodeURIComponent(query['circlems']))
            
                switch(importData['配置スペース'].substr(0, 3)) {
                    case '土曜日':
                        im_date = '1'
                        break
                    case '日曜日':
                        im_date = '2'
                        break
                    case '月曜日':
                        im_date = '3'
                        break
                    case '火曜日':
                        im_date = '4'
        
                }
        
                im_island = importData['配置スペース'].substr(5, 1)
                im_number = importData['配置スペース'].substr(6, 2)
                im_ab = importData['配置スペース'].substr(8)
        
                var data = JSON.parse(localStorage.getItem('circles'))
    
                var id = im_date + im_island + im_number + im_ab
        
                if(data[id] !== undefined) {
                    data[id] = {
                        place: {
                            date: im_date,
                            island: im_island,
                            number: im_number,
                            ab: im_ab
                        },
                        name: importData['サークル名'],
                        memo: data[id].memo,
                        buy: data[id].buy,
                        paid: data[id].paid,
                        id: id
                    }
                    M.toast({html: '更新しました！'})
                } else {
                    data[id] = {
                        place: {
                            date: im_date,
                            island: im_island,
                            number: im_number,
                            ab: im_ab
                        },
                        name: importData['サークル名'],
                        memo: '執筆者名: ' + importData['執筆者名'],
                        buy: [],
                        paid: false,
                        id: id
                    }
                    M.toast({html: '追加しました！'})
                }
            
                localStorage.setItem('circles', JSON.stringify(data))

                setTimeout(function() {
                    location.href = 'index.html'
                }, 500)
            } catch(err) {
                M.toast({html: '追加に失敗しました'})
                console.log(err)
            }
            break
        
        case 'takeover':
            var user_data = JSON.parse(Base64.decode(query['takeover'] + '=='))
            ajax_login({
                id: user_data.id,
                pass: user_data.pass
            })
            M.Modal.getInstance($('#backup-restore')).open()
            break

        case 'enableDevTools':
            if(query['enableDevTools'] === 'true') {
                var enableDevTools = true
            } else {
                var enableDevTools = false
            }
            setConfig('enable-devtools', enableDevTools)
            M.toast({html: 'Updated: ' + enableDevTools})
            break

        case 'movedata':
            $.ajax({
                url:'https://sp-wtr-api.gq/api/v1/circlelist/move-data-get',
                type:'POST',
                data: {
                    id: query['movedata']
                }
            })
            .done(data => {
                if(data.message !== 'err') {
                    for(var i = 0; Object.keys(data).length > i; i++) {
                        localStorage.setItem(Object.keys(data)[i], data[Object.keys(data)[i]])
                    }

                    M.toast({html: 'データの引き継ぎに成功しました。5秒後に再読み込みします。'})
                    setTimeout(function() {
                        location.href = 'https://circlelist.ga/'
                    }, 5000)
                }
            })
            .fail(data => {
                console.log(data)
                M.toast({html: '<b class="red-text text-accent-1" style="font-weight: bold;">データの取得に失敗しました。時間を置いて再度お試しください。</b>'})
            })
            break
    }
}

// 過去のコミケ＠詳細
function old_comiket(comiket) {
    var data = JSON.parse(localStorage.getItem('old_version'))[comiket]
    var keys = Object.keys(data)
    $('#cc-stat-modal-name').text(comiketList[comiket])
    $('#cc-stat-modal-box').html('')
    for(var i = 0; Object.keys(data).length > i; i++) {
        var temped = data[keys[i]]
        $('#cc-stat-modal-box').append('・' + temped.name + ' (' + temped.place.date + '日目/' + temped.place.island + temped.place.number + temped.place.ab + ')<br>')
    }
    M.Modal.getInstance($('#cc-stat-modal')).open()
}

// おしらせ
function openNotification(id, flag) {
    var detail_title = news_cache[id]
    $('#notification-modal-message').html(detail_title.text.replace(/\/n/g, '<br>'))
    $('#notification-modal-date').text(detail_title.date)

    $('#notification-modal-list').addClass('fadeout')
    $('#notification-modal-detail').removeClass('displayNone')
    $('#notification-modal-title').addClass('fadeout')
    setTimeout(function() {
        $('#notification-modal-title').html(detail_title.title)
        $('#notification-modal-list').addClass('displayNone')
        $('#notification-modal-detail').removeClass('fadeout')
        $('#notification-modal-title').removeClass('fadeout')
    }, 550)

    if(!flag) {
        var read_news = JSON.parse(localStorage.getItem('read_news'))
        read_news.push(id)
        localStorage.setItem('read_news', JSON.stringify(read_news))
        updateNews()
    }
}

function closeNotification() {
    $('#notification-modal-detail').addClass('fadeout')
    $('#notification-modal-title').addClass('fadeout')
    setTimeout(function() {
        $('#notification-modal-list').removeClass('displayNone')
        $('#notification-modal-detail').addClass('displayNone')
        $('#notification-modal-title').html('お知らせ')
        setTimeout(function() {
            $('#notification-modal-list').removeClass('fadeout')
            $('#notification-modal-title').removeClass('fadeout')
        }, 200)
    }, 550)
}

// pulse btn-floating info-color

// 情報取得
$('#cc-notification').on('click', function() {
    if(news_cache === '') {
        $.getJSON('https://circlelist.ga/data/news.json')
        .done(function(data) {
            news_cache = data.news
            updateNews()
        })
    } else {
        updateNews()
    }
})

function updateNews() {
    var unread_counter = 0
    var news = news_cache
    var news_keys = Object.keys(news)
    var read_news = JSON.parse(localStorage.getItem('read_news'))
    $('#notification-modal-inner').html('')
    for(var i = 0; news_keys.length > i; i++) {
        if(read_news.indexOf(news_keys[i]) !== -1) {
            // 読んでいた場合
            news_readed = ''
            read_flag = true
        } else {
            // 読んでいない場合
            news_readed = 'new-notice'
            read_flag = false
            unread_counter++
        }
        $('#notification-modal-inner').append('<tr class="' + news_readed + '" onclick="openNotification(\'' + news_keys[i] + '\', ' + read_flag + ')"><td>' + news[news_keys[i]].date + '</td><td>' + news[news_keys[i]].title + '</td></tr>')
    }

    $('#cc-notification span').remove()
    if(unread_counter !== 0) {
        $('#cc-notification').append('<span>' + unread_counter + '</span>')
    }
}

$('#read-all-button').on('click', function() {
    var news = news_cache
    var news_keys = Object.keys(news)
    var read_news = JSON.parse(localStorage.getItem('read_news'))
    for(var i = 0; news_keys.length > i; i++) {
        if(read_news.indexOf(news_keys[i]) === -1) {
            read_news.push(news_keys[i])
        }
    }
    localStorage.setItem('read_news', JSON.stringify(read_news))
    updateNews()
    M.toast({html: '全てのお知らせを既読にしました。'})
})

function isDarkmode() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function height_resize() {
    $('#dummy-height').css('height', $('#nav-bar').css('height'))
}

var tab_clicked = []

$('[id=tab-click]').on('click', function() {
    var tab_no = $(this).data('no')
    if(tab_clicked[tab_no + ''] === undefined) {
        setTimeout(function() {
            $('li .active')[tab_no].click()
        }, 200)
        tab_clicked.push(tab_no + '')
    }

    switch(tab_no) {
        case 1:
            $('title').text('トップ | CircleList')
            break
        case 2:
            $('title').text('サークル | CircleList')
            break
        case 3:
            $('title').text('マップ | CircleList')
            break
    }
})

function fetchNowVer() {
    return new Promise(resolve => {
        caches.keys().then(function(keyList) {
            if(keyList.length !== 0) {
                return resolve(keyList[0].replace(/dynamic-|static-/g, ''))
            } else {
                return resolve('')
            }
        })
    })
}

function isExistManifest() {
    if($('[rel="manifest"]').length === 0) {
        $('#cant_install_reason').text('manifest.jsonを読み込めませんでした。AdGuardやAdblockerを一時停止してから再度お試しください。')
        $('#cant_install_reason').addClass('red-text')
    }
}