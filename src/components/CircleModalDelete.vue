<template>
    <v-bottom-sheet v-model="dialog">
        <v-card :style="{transform: `translateY(${distance}px)`}" @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd" :class="{ease: !touch}">
            <v-card-title color="red">本当に削除しますか？</v-card-title>
            <v-card-text>この操作を取り消すことはできません。<br>このサークルのデータを削除しますか？</v-card-text>
            <v-card-actions>
                <v-btn depressed rounded large color="primary" @click="dialog = false">やめる</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="error" depressed rounded large @click="deleteCircle">削除する</v-btn>
            </v-card-actions>
        </v-card>
    </v-bottom-sheet>
</template>

<script>
import db from '../common/circleManagement'
import swipe from '../common/bottomSheetSwiper'

export default {
    data() {
        return {
            data: {},
            dialog: false,
            touch: false,
            distance: 0
        }
    },

    methods: {
        deleteCircle() {
            this.dialog = false
            
            db.delete('circles', this.data.uid)
            this.$emit('update')            
        },

        touchStart(e) {
            this.touch = true
            swipe.start(e)
        },

        touchMove(e) {
            this.distance =  swipe.move(e)
        },

        touchEnd() {
            var status = !swipe.end()
            this.dialog = status
            this.touch = false

            setTimeout(() => {
                this.distance = 0
            }, status ? 1 : 500)
        }
    }
}
</script>