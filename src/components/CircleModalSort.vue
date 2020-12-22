<template>
    <BottomSheets :dialog="dialog" :isScroll="isScroll">
        <v-card-title>ソート/絞り込み</v-card-title>
        <v-card-text @scroll="isScroll = true" @click="save">
            <p>サークルの並び順を変えることができます</p>
            <v-radio-group v-model="sort" column>
                <v-radio v-for="(key, index) in sortKeys" :label="key.label" :value="key.value" :key="index"></v-radio>
            </v-radio-group>
            <v-switch v-model="asc" inset :label="asc ? '昇順' : '降順'"></v-switch>
            <p>非表示にする日付を選択してください</p>
            <v-checkbox v-model="hiddenDate" v-for="(key, index) in hidden" :label="`${key}日目 (${hidden_jp[index]})`" :value="key" :key="index"></v-checkbox>
        </v-card-text>
        <v-card-actions>
            <v-btn depressed rounded large block color="primary" @click="dialog = false">OK</v-btn>
        </v-card-actions>
    </BottomSheets>
</template>

<script>
import constants from '../common/constants'
import config from '../common/systemConfig'
import BottomSheets from '../components/BottomSheets'

export default {
    components: {
        BottomSheets
    },

    data() {
        return {
            dialog: false,
            sort: config.get('sort')['key'],
            asc: config.get('sort')['asc'],
            sortKeys: constants.sortKey,
            hidden: constants.comiketData.date,
            hidden_jp: constants.comiketData.date_jp,
            hiddenDate: config.get('hiddenDate'),
            isScroll: false
        }
    },

    methods: {
        save() {
            var base = config.get('sort')
            base.key = this.sort
            base.asc = this.asc

            config.set('sort', base)
            config.set('hiddenDate', this.hiddenDate)

            this.$parent.updateList()
        }
    }
}
</script>

<style scoped>
.v-input--selection-controls {
    margin-top: 0;
}

.v-bottom-sheet > .v-card > .v-card__text {
    padding: 0 24px;
}
</style>