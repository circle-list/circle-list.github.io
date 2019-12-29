$('#run').on('click', function() {
    var text = $('#text-input').val()
    var out = text.replace(/し/g, 'ぴっぴ')
    var out = out.replace(/シ/g, 'ピッピ')
    var out = out.replace(/ｼ/g, 'ﾋﾟｯﾋﾟ')
    $('#text-input').val(out)
})
