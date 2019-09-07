$('#star').remove()

$('body').append('<div class="modal fade" data-backdrop="static" id="star" tabindex="-1" role="dialog" aria-labelledby="modal" aria-hidden="true"> <div class="modal-dialog modal-lg" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title">Star URL Extracter</h5> <h6>Version 1.0.0</h6> </div><div class="modal-body"> <textarea id="star-log" class="form-control" disabled type="text" style="height: 180px;" placeholder="NowLoading..."></textarea> <div class="progress"> <div id="star-progress" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%;"></div></div><br><a href="#" id="star-download" class="btn disabled" download="imglist.json">Download</a> </div><div class="modal-footer"> <button type="button" id="star-close" class="star-button btn btn-outline-danger" data-dismiss="modal">Close</button> <button type="button" class="star-button btn btn-outline-primary" onclick="run()">Start</button> </div></div></div></div>')

$('#star').modal()

function console_log(text) {
    $('#star-log').prepend(text + '\n')
}

window.addEventListener('error', function (e) {
    var error = e.error
    console_log(error)
})

function run() {

    const images = []
    const location = window.location.pathname.replace('spviewer', 'image') + '/'
    const swiper = $('.swiper-container')[0].swiper

    $('.star-button').prop('disabled', true)

    swiper.slideTo(0)

    console_log('Ready...')

    genImg()
    
}

function percent(a, b) {
    val = Math.round((a / b) * 100)
    $('#star-progress').css('width', val + '%')
    $('#star-progress').text(val + '% (' + a + ' / ' + b + ')')
}

function genImg() {
    setTimeout(function() {
        var src = $('.swiper-slide-active').children('img').attr('src')
        if(src !== undefined) {
            if(swiper.isEnd === true) {
                console_log('Generating image list Finished')
                success()
            } else {
                images.push(src)
                console_log('Generating image list (' + swiper.activeIndex + ' / ' + swiper.slides.length + ')')
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
    $('#star-download').attr('download', 'imglist-' + $('title').text() + '.json')
    $('#star-download').removeClass('disabled')
    $('#star-close').prop('disabled', false)
    console_log('Please download file and run nodejs script')
}