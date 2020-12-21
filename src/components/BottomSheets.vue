<template>
    <v-bottom-sheet v-model="dialog" scrollable @click:outside="close">
        <v-card style="max-height: 75%" :style="{transform: `translateY(${distance}px)`}" @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd" :class="{ease: !touch}">
            <slot></slot>
        </v-card>
    </v-bottom-sheet>
</template>

<script>

var swipe = {
    start: 0,
    distance: 0,
    window: window.innerHeight * 0.15,
    scrollFlag: false
}

export default {
    props: {
        dialog: {
            type: Boolean,
            default: false
        },

        isScroll: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            distance: 0,
            touch: false
        }
    },

    methods: {
        touchStart(e) {
            this.touch = true
            swipe.start = e.touches[0].pageY
            swipe.distance = 0
        },

        touchMove(e) {
            swipe.scrollFlag = this.isScroll ? true : swipe.scrollFlag

            var distance = !swipe.scrollFlag ? e.touches[0].pageY - swipe.start : 0
            swipe.distance =  distance

            this.distance =  distance >= 0 ? distance : 0
        },

        touchEnd() {
            var status = !(swipe.distance >= swipe.window)
            this.dialog = status
            this.$parent.dialog = status
            this.touch = false
            swipe.scrollFlag = false

            setTimeout(() => {
                this.distance = 0
            }, status ? 1 : 500)
        },

        close() {
            this.$parent.dialog = false
        }
    }
}
</script>