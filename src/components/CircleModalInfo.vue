<template>
    <v-dialog v-model="dialog" max-width="400">
        <v-card>
            <v-card-title>{{ data.name }}</v-card-title>
            <v-card-text>{{ data.date }}</v-card-text>
            <v-card-actions>
                <v-btn color="red" text @click="reveal = true">削除</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="openEditModal">編集</v-btn>
                <v-btn color="primary" text @click="dialog = false">マップ</v-btn>
            </v-card-actions>

            <v-expand-transition>
            <v-card v-if="reveal" class="v-card--reveal" style="height: 100%;">
                <v-card-title color="red">本当に削除しますか？</v-card-title>
                <v-card-text>この操作を取り消すことはできません。このサークルのデータを削除しますか？</v-card-text>
                <v-card-actions>
                    <v-btn text color="primary" @click="reveal = false">やめる</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="red" text @click="deleteCircle">削除する</v-btn>
                </v-card-actions>
            </v-card>
            </v-expand-transition>
        </v-card>
        <span class="text-center">枠の外をタップで閉じる</span>
    </v-dialog>
</template>

<script>
import db from '../common/circleManagement'

export default {
    data() {
        return {
            data: {},
            dialog: false,
            reveal: false
        }
    },

    methods: {
        openEditModal() {
            this.dialog = false
            this.$emit('openEditModal', this.data.uid)
        },

        deleteCircle() {
            this.dialog = false
            this.reveal = false
            
            db.delete('circles', this.data.uid)
            this.$emit('update')            
        }
    }
}
</script>

<style scoped>
.v-dialog__content >>> .v-dialog {
    overflow-y: hidden;
}

span {
    position: absolute;
    left: 25%;
    margin-top: 40px;
    width: 50%;
    font-size: .75rem;
    color: #c1c1c1;
    opacity: 0;
    animation: infoFadeIn 0.5s;
    animation-delay: 1.5s;
    animation-fill-mode: forwards;
}

@keyframes infoFadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}

.v-card__actions {
    bottom: 0px;
    position: absolute;
    width: 100%;
}

.v-dialog > .v-card {
    min-height: 175px;
    padding-bottom: 50px;
} 
</style>