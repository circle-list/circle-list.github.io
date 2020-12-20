var swipe = {
    start: 0,
    distance: 0,
    window: window.innerHeight * 0.2
}

export default {
    start: (e) => {
        swipe.start = e.touches[0].pageY
    },

    move: (e) => {
        var distance = e.touches[0].pageY - swipe.start
        swipe.distance = distance
        return distance >= 0 ? distance : 0
    },

    end: () => {
        return swipe.distance >= swipe.window
    }
}