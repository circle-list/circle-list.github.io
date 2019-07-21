/*  MaterializeJS Loader */

$(document).ready(function(){
    $('.tabs').tabs()
    $('.sidenav').sidenav()
    $('select').formSelect()
})

/*==========================
やること
・買うグッズ一覧を追加できるように
・同人グッズの価格計算
==========================*/

const island = {
    '1': ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ', 'ま', 'み', 'む', 'め', 'ゆ', 'よ', 'ら', 'り', 'れ'],
    '2': ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'],
    '3': ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト'],
    '4': ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ', 'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ']
}

// 地区変更時の島番号入れ替え
$('#cc-list-add-ck').change(function () {
    n = $('option:selected').val()
    $('#cc-list-add-il').empty()
    $('#cc-list-add-il').append('<option value="" disabled selected>選択</option>')

    for(var i = 0; island[n].length > i; i++) {
        console.log('a')
        $('#cc-list-add-il').append('<option value="' + (i + 1) + '">' + island[n][i] + '</option>')
    }
    $('#cc-list-add-il').formSelect()
})




/* いらないソースコード

function dateCounter() {
 
    var timer = setInterval(function() {
    var nowDate = new Date()
    var anyDate = new Date('2019/08/09 00:00:00')
    var daysBetween = Math.ceil((anyDate - nowDate)/(1000*60*60*24))
    var ms = (anyDate - nowDate)
    if (ms >= 0) {
        //時間を取得
        var h = Math.floor(ms / 3600000);
        var _h = h % 24;
        //分を取得
        var m = Math.floor((ms - h * 3600000) / 60000);
        //秒を取得
        var s = Math.round((ms - h * 3600000 - m * 60000) / 1000);
 
        //HTML上に出力
        document.getElementById('countOutput').innerHTML = 'C96開催まで 残り' + daysBetween + '日' +_h + '時間' + m + '分' +s + '秒';
 
        if ((h == 0) && (m == 0) && (s == 0)) {
        clearInterval(timer);
        document.getElementById('countOutput').innerHTML = '経過しました'
        }
    }else{
        document.getElementById('countOutput').innerHTML = '経過しました'
    }
    }, 1000)
}

dateCounter()
*/