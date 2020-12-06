<template>
    <v-container>
        <h3>デバッグメニュー</h3>
        <v-btn depressed large rounded color="red" @click="deleteIndexedDB" class="white--text">indexedDB全削除</v-btn>
    </v-container>
</template>

<script>
import db from '../common/circleManagement'

export default {
    methods: {
        deleteIndexedDB() {
            db.__db.delete()
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