<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar flat color="white">
                <v-btn icon @click="exit">
                    <v-icon>mdi-close</v-icon>
                </v-btn>

                <v-spacer></v-spacer>
                <v-toolbar-title>{{ modalTitle }}</v-toolbar-title>
                <v-spacer></v-spacer>
                
                <v-toolbar-items>
                    <v-btn text color="primary" @click="submit">{{ modalBtn }}</v-btn>
                </v-toolbar-items>
            </v-toolbar>

            <v-container>
                <v-form ref="circleData">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="circleName" label="サークル名" filled dense rounded :rules="[formValidation.text]"></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="12">
                            <v-select v-model="circleDate" :items="comiketDate" label="日付選択" filled dense rounded :rules="[formValidation.select]"></v-select>
                        </v-col>
                        <v-col cols="6" sm="4">
                            <v-select v-model="circleBlock" :items="comiketBlocks" label="ブロック名" filled dense rounded :rules="[formValidation.select]"></v-select>
                        </v-col>
                        <v-col cols="6" sm="4">
                            <v-select v-model="circleNumber" :items="comiketNumbers" label="机番号" filled dense rounded :rules="[formValidation.select]"></v-select>
                        </v-col>
                        <v-col cols="6" sm="4">
                            <v-select v-model="circleTable" :items="comiketTables" label="a/b/ab" filled dense rounded :rules="[formValidation.select]"></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea v-model="circleMemo"  filled dense rounded label="メモ" auto-grow></v-textarea>
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
import constants from '../common/constants'

var comiketDate = [], comiketBlocks = []

constants.comiketData.date.forEach(day => {
    comiketDate.push(`${day}日目 (${constants.comiketData.date_jp[day - 1]})`)
})

Object.values(constants.comiketData.blocks).forEach(block => {
    comiketBlocks = comiketBlocks.concat(block)
})

export default {
    data() {
        return {
            dialog: false,
            editmode: false,
            modalTitle: '',
            modalBtn: '',
            comiketDate: comiketDate,
            comiketBlocks: comiketBlocks,
            comiketNumbers: constants.comiketData.numbers,
            comiketTables: constants.comiketData.tables,
            formValidation: {
                select: v => !!v || '選択してください',
                text: v => !!v || '入力してください'
            }
        }
    },

    methods: {
        submit() {
            if (this.$refs.circleData.validate()) {
                this.$emit('submitData', {
                    name: this.circleName,
                    date: this.circleDate,
                    block: this.circleBlock,
                    number: this.circleNumber,
                    table: this.circleTable,
                    memo: this.circleMemo ? this.circleMemo : ''
                })

                this.dialog = false
                this.$refs.circleData.reset()
            }
        },

        exit() {
            this.dialog = false
            this.$refs.circleData.reset()
        },

        modeChange(editmode, data) {
            if(!editmode) {
                // 追加モード
                this.modalTitle = 'サークル追加'
                this.modalBtn = '追加'
            } else {
                // 編集モード
                this.modalTitle = 'サークル編集'
                this.modalBtn = '編集'

                this.circleName = data.name
                this.circleDate = data.date
                this.circleBlock = data.block
                this.circleNumber = data.bumber
                this.circleTable = data.table
                this.circleMemo = data.memo
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.v-input >>> {
    .v-label--active {
        transform: translateY(-40px) scale(.8);
    }

    .v-select__selections {
        padding-top: 0 !important;
    }

    input {
        margin-top: 8px;
    }

    textarea {
        margin: 10px 0;
    }
}

.container {
    margin-top: 20px;
}
</style>