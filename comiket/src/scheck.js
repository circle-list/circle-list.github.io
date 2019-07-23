/*  MaterializeJS Loader */

$(document).ready(function(){
    $('.tabs').tabs()
    $('.sidenav').sidenav()
    $('select').formSelect()
    $('.modal').modal()
    $('.collapsible').collapsible()
    var elem = document.querySelector('.collapsible.expandable')
    M.Collapsible.init(elem, {
        accordion: false
    })
    updateList()
    init()
    ConfigCheck()
})

const island = {
    '2': ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ', 'ま', 'み', 'む', 'め', 'ゆ', 'よ', 'ら', 'り', 'れ'],
    '1': ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'],
    '3': ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト'],
    '4': ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ', 'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ']
}

// 初期化処理
function init() {
    $('#cc-list-add-day').empty()
    $('#cc-list-add-il').empty()
    $('#cc-list-add-sb').empty()
    $('#cc-list-add-ab').empty()

    $('#cc-list-add-day').append('<option value="" disabled selected>日付選択</option>')
    $('#cc-list-add-il').append('<option value="" disabled selected>選択</option>')
    $('#cc-list-add-sb').append('<option value="" disabled selected>選択</option>')
    $('#cc-list-add-ab').append('<option value="" disabled selected>選択</option>')

    const num = ['01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
    const day = ['1日目 (金曜日)', '2日目 (土曜日)', '3日目 (日曜日)', '4日目 (月曜日)']
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

    $('#cc-list-add-circle_name').val('')
    $('#cc-list-add-memo').val('')
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

    var config = JSON.parse(localStorage.getItem('config'))
    if(config.checkbox === undefined) {
        config.checkbox = {
            'day1': true,
            'day2': true,
            'day3': true,
            'day4': true
        }
        localStorage.setItem('config', JSON.stringify(config))
    }
}

// 保存
$('#cc-list-add-submit').click(function() {
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
            buy: {},
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
            buy: {},
            paid: false,
            id: id
        }
        M.toast({html: '追加しました！'})
    }
   
    localStorage.setItem('circles', JSON.stringify(data))

    init()
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
    if(d.paid === false) {
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
function updateList() {
    StorageCheck()
    $('#cc-list-circle-wrapper').empty()
    $('#cc-list-buy-circle').empty()
    var data = JSON.parse(localStorage.getItem('circles'))
    var config = JSON.parse(localStorage.getItem('config'))
    if(Object.keys(data).length === 0) {
        $('#cc-list-circle-wrapper').append('<p class="center-align not-registed">お気に入りを追加してみてください！</p>')
        return
    } else {
        data = objectSort(data)
    }

    for(var i = 0; Object.keys(data).length > i; i++) {
        tmp = data[Object.keys(data)[i]]
        if(isChecked(config, tmp.place.date)) {
            hall = findHall(tmp.place.island, tmp.place.number)
            isBuy = isBuyF(tmp)
            buyList = []
            if(tmp.memo === '') {
                memo = '(メモはありません)'
            } else {
                memo = tmp.memo
            }
            place = tmp.place.island + tmp.place.number + tmp.place.ab
            if(tmp.paid === false) {
                color = 'light-blue-text text-darken-2'
            } else {
                color = 'grey-text text-lighten-1'
            }
            $('#cc-list-circle-wrapper').append('<li><div class="collapsible-header ' + color + '"><i class="material-icons" id="check-box" data-id="' + tmp.id + '">' + isBuy + '</i><span class="cc-day">' + tmp.place.date + '日目</span><span class="cc-place">' + place + '</span><span class="cc-hall">' + hall + '</span><span class="cc-name">' + tmp.name + '</span></div><div class="collapsible-body grey lighten-4"><p>【メモ】</p><p class="memo">' + memo + '</p>【購入リスト】<p>(未登録です)' + buyList + '</p><a id="remove-button" class="waves-effect waves-red btn-flat red-text remove-button" data-id="' + tmp.id + '">削除</a><a id="edit-button" class="waves-effect waves-blue btn-flat blue-text edit-button">編集</a></div></li>')
        }

        $('#cc-list-buy-circle').append('<option value="' + tmp.id + '">' + tmp.name + ' (' + place + ' / ' + tmp.place.date + '日目)</option>')
        $('#cc-list-buy-circle').formSelect()
    }

    //$('#cc-list-circle-wrapper').append('<li><div class="collapsible-header"><i class="material-icons" id="check-box" data-id=""></i><span>日目</span><span></span><span></span><span></span></div><div class="collapsible-body grey lighten-4"><p class="memo"></p><p></p></div></li>')
}

//CheckBox
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
    M.toast({html: '実装予定です！しばしお待ちください！'})
})

// 削除 -> no
function delete_modal_no(id) {
    $('#remove-modal').empty()
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
    config.checkbox = {
        'day1': $('#cc-changedate-1').prop('checked'),
        'day2': $('#cc-changedate-2').prop('checked'),
        'day3': $('#cc-changedate-3').prop('checked'),
        'day4': $('#cc-changedate-4').prop('checked')
    }
    localStorage.setItem('config', JSON.stringify(config))
    updateList()
})