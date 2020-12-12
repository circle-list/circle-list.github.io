<template>
    <v-container>
        <h1>Memo</h1>
        <v-subheader>最終更新: {{ header }}</v-subheader>

        <v-textarea v-model="memo" filled dense rounded :label="memo_label" auto-grow @change="save"></v-textarea>
    </v-container>
</template>

<script>
import config from '../common/systemConfig'
import dayjs from 'dayjs'

export default {
    data() {
        return {
            memo: config.get('memo')['text'],
            memo_label: 'メモ',
            header: config.get('memo')['lastupdate']
        }
    },

    methods: {
        save() {
            config.set('memo', {
                text: this.memo,
                lastupdate: dayjs().format('MM月DD日 HH:mm:ss')
            })

            this.memo_label = '保存しました'
            this.header = config.get('memo')['lastupdate']

            setTimeout(() => {
                this.memo_label = 'メモ'
            }, 5000)
        }
    }
}
</script>

<style scoped>
.v-textarea {
    margin-top: 30px;
}
</style>