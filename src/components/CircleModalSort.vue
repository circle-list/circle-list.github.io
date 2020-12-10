<template>
    <v-dialog v-model="dialog" max-width="400">
        <v-card>
            <v-card-title>ソート/絞り込み</v-card-title>
            <v-card-text>
                <p>サークルの並び順を変えることができます</p>
                <v-radio-group v-model="sort" column>
                    <v-radio v-for="(key, index) in sortKeys" :label="key.label" :value="key.value" :key="index"></v-radio>
                </v-radio-group>
                <p>非表示にする日付を選択してください</p>
                <v-checkbox v-model="hiddenDate" v-for="(key, index) in hidden" :label="`${key}日目 (${hidden_jp[index]})`" :value="key" :key="index"></v-checkbox>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">キャンセル</v-btn>
            <v-btn color="primary" text @click="save">OK</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import constants from '../common/constants'
import config from '../common/systemConfig'

// TODO: 日付別非表示機能を実装する

export default {
    data() {
        return {
            dialog: false,
            sort: config.get('sort')['key'],
            sortKeys: constants.sortKey,
            hidden: constants.comiketData.date,
            hidden_jp: constants.comiketData.date_jp,
            hiddenDate: config.get('hiddenDate')
        }
    },

    methods: {
        save() {
            var base = config.get('sort')
            base.key = this.sort

            config.set('sort', base)
            config.set('hiddenDate', this.hiddenDate)

            this.$emit('update')
            this.dialog = false
        }
    }
}
</script>

<style scoped>
.v-input--selection-controls {
    margin-top: 0;
}
</style>