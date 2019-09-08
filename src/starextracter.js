$('#star').remove()

$('body').append('<div class="modal fade" data-backdrop="static" id="star" tabindex="-1" role="dialog" aria-labelledby="modal" aria-hidden="true"> <div class="modal-dialog modal-lg" role="document"> <div class="modal-content"> <div class="modal-header"> <h3 class="modal-title">Star URL Extracter</h3> <h5>Version 1.0.13</h5> </div><div class="modal-body"> <textarea id="star-log" class="form-control" disabled type="text" style="height: 180px; resize: none;" placeholder="NowLoading..."></textarea> <div class="progress"> <div id="star-progress" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%;"></div></div><form> <div class="form-group"> <label for="star-title">Title</label> <input type="text" class="form-control" id="star-title"> </div></form> <a href="#" id="star-download" class="btn btn-info disabled" download="">Download</a> </div><div class="modal-footer"> <button type="button" id="star-close" class="star-button btn btn-danger" data-dismiss="modal">Close</button> <button type="button" class="star-button btn btn-primary" onclick="run()">Start</button> </div></div></div></div>')

$('#star').modal()

const swiper = $('.swiper-container')[0].swiper
const images = []

$('#star-title').val($('title').text())
$('#star-download').attr('download', 'imglist-' + $('title').text() + '.json')

function console_log(text) {
    $('#star-log').prepend(text + '\n')
}

console_log('Ready...')

window.onerror = function(msg, url, line, col) {  
    console_log(msg + ' at line' + line + ', col' + col)
}

function run() {

    const location = window.location.pathname.replace('spviewer', 'image') + '/'

    $('.star-button').prop('disabled', true)

    swiper.slideTo(0)

    genImg()
    
}

function percent(a, b) {
    val = Math.round((a / b) * 100)
    $('#star-progress').css('width', val + '%')
    $('#star-progress').text(val + '%')
}

function genImg() {
    setTimeout(function() {
        var src = $('.swiper-slide-active').children('img').attr('src')
        if(src !== undefined) {
            if(swiper.isEnd === true) {
                console_log('Generating image list Finished')
                percent(swiper.activeIndex + 1, swiper.slides.length)
                success()
            } else {
                images.push(src)
                console_log('Generating image list (' + swiper.activeIndex + ' / ' + swiper.slides.length + ')\n-> ' + src)
                swiper.slideNext()
                percent(swiper.activeIndex, swiper.slides.length)
                genImg()
            }
        } else {
            genImg()
        }
    }, 200)
}

function success() {
    blob = new Blob([JSON.stringify(images)], {type: 'application/json'})
    url = URL.createObjectURL(blob)
    $('#star-download').attr('href', url)
    $('#star-download').removeClass('disabled')
    $('#star-close').prop('disabled', false)
    console_log('Please download file and run nodejs script')
}

$('#star-title').keyup(function() {
    $('#star-download').attr('download', 'imglist-' + $(this).val() + '.json')
})
