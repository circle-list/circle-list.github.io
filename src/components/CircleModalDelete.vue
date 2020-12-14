<template>
    <v-dialog v-model="dialog" max-width="400">
        <v-card>
            <v-card-title color="red">本当に削除しますか？</v-card-title>
            <v-card-text>この操作を取り消すことはできません。このサークルのデータを削除しますか？</v-card-text>
            <v-card-actions>
                <v-btn text color="primary" @click="dialog = false">やめる</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="deleteCircle">削除する</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import db from '../common/circleManagement'

export default {
    data() {
        return {
            data: {},
            dialog: false
        }
    },

    methods: {
        deleteCircle() {
            this.dialog = false
            
            db.delete('circles', this.data.uid)
            this.$emit('update')            
        }
    }
}
</script>