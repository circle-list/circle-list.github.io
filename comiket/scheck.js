/*  MaterializeJS Loader */

$(document).ready(function(){
    $('.tabs').tabs()
    $('.sidenav').sidenav()
})

/*==========================
やること
・買うグッズ一覧を追加できるように
・同人グッズの価格計算
==========================*/

/*
function dateCounter() {
 
    var timer = setInterval(function() {
    var nowDate = new Date()
    var anyDate = new Date("2019/08/09 00:00:00")
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
        document.getElementById("countOutput").innerHTML = "C96開催まで 残り" + daysBetween + "日" +_h + "時間" + m + "分" +s + "秒";
 
        if ((h == 0) && (m == 0) && (s == 0)) {
        clearInterval(timer);
        document.getElementById("countOutput").innerHTML = "経過しました"
        }
    }else{
        document.getElementById("countOutput").innerHTML = "経過しました"
    }
    }, 1000)
}

dateCounter()
*/