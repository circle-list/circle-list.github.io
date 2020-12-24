<template>
    <BottomSheets :dialog="dialog">
        <v-card-title color="red">本当に削除しますか？</v-card-title>
        <v-card-text>この操作を取り消すことはできません。<br>この{{ type === 'circles' ? 'サークル' : 'アイテム' }}のデータを削除しますか？</v-card-text>
        <v-card-actions>
            <v-btn depressed rounded large color="primary" @click="dialog = false">やめる</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="error" depressed rounded large @click="deleteCircle">削除する</v-btn>
        </v-card-actions>
    </BottomSheets>
</template>

<script>
import db from '../common/circleManagement'
import BottomSheets from '../components/BottomSheets'

export default {
    components: {
        BottomSheets
    },

    data() {
        return {
            data: {},
            dialog: false,
            touch: false,
            distance: 0,
            type: 'circles'
        }
    },

    methods: {
        deleteCircle() {
            this.dialog = false
            
            db.delete(this.type, this.data.uid)
            this.$parent.updateList()
        }
    }
}
</script>