// もっとにゃーんしようぜ？？をコンセプトにつくったサイトです。

// にゃんにゃん（Array）
const nyaan = ['にゃーん', 'こゃーん', 'みゃーん', 'にゃ', 'にゃにゃ', '(ฅ^･ω･^ ฅ)', '(=｀ェ´=)', 'ぶぼぶぼ🦉']

$(document).ready(function() {
    console.log('よみこみかんりょう')
    addNyans()
    $('#buttons').text('現在のボタンの数: ' + nyaan.length + '個')
})

function addNyans() {
    for(i = 0; nyaan.length > i; i++) {
        $('#nyan-box').append(' <div> <div class="uk-card uk-card-default uk-card-small uk-card-body uk-card-hover"> <h3 class="uk-card-title">' + nyaan[i] + '</h3> <button class="uk-button uk-button-default" onclick="tweet(\'' + nyaan[i] + '\');">Twitterでつぶやく</button> </div></div>')
    }
}

function tweet(text) {
    window.open('https://twitter.com/intent/tweet?hashtags=TLを癒すボタン&related=hideki_0403&text=' + text, '_blank', 'menubar=0,width=500,height=350')
}