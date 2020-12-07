<template>
    <v-dialog v-model="dialog" max-width="400">
        <v-card>
            <v-card-title>{{ data.name }}</v-card-title>
            <v-card-text>{{ data.date }}</v-card-text>
            <v-card-actions>
            <v-btn color="red" text @click="dialog = false">削除</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">編集</v-btn>
            <v-btn color="primary" text @click="dialog = false">マップ</v-btn>
            </v-card-actions>
        </v-card>
        <span class="text-center">枠の外をタップで閉じる</span>
    </v-dialog>
</template>

<script>
export default {
    data() {
        return {
            data: {},
            dialog: false
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
</style>