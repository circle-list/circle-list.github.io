<template>
    <v-container>
        <h3>デバッグメニュー</h3>
        <v-list subheader>
            <v-subheader>データ削除</v-subheader>
            <v-list-item>
                <v-btn depressed large rounded color="red" @click="deleteIndexedDB" class="white--text">IndexedDB全削除</v-btn>
            </v-list-item>
            <v-list-item>
                <v-btn depressed large rounded color="red" @click="deleteConfig" class="white--text">config初期化</v-btn>
            </v-list-item>
        </v-list>
    </v-container>
</template>

<script>
import db from '../common/circleManagement'
import store from '../common/systemConfig'

export default {
    methods: {
        deleteIndexedDB() {
            db.__db.delete()
            location.reload()
        },

        deleteConfig() {
            store.__store.remove(store.__configname)
            location.reload()
        }
    }
}
</script>

<style scoped>
h3 {
    margin-bottom: 30px;
}

button {
    margin-bottom: 10px;
    text-transform: none
}

.container {
    padding: 30px;
}
</style>