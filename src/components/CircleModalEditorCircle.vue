<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar flat color="white">
                <v-toolbar-title>{{ modalTitle }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="exit">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-container>
                <v-row class="nopadding">
                    <v-col cols="6">
                        <v-checkbox v-if="!editmode" v-model="if_continue" label="続けて追加する"></v-checkbox>
                    </v-col>
                    <v-col class="text-right" cols="6">
                        <v-btn rounded depressed color="primary" @click="submit">{{ modalBtn }}</v-btn>
                    </v-col>
                </v-row>

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

        <v-snackbar v-model="snackbar">サークル「{{ addCircleName }}」を追加しました</v-snackbar>
    </v-dialog>
</template>

<script>
import constants from '../common/constants'
import db from '../common/circleManagement'

var comiketDate = [], comiketBlocks = []

constants.comiketData.date.forEach(day => {
    comiketDate.push(`${day}日目 (${constants.comiketData.date_jp[day - 1]})`)
})

Object.values(constants.comiketData.blocks).forEach(block => {
    comiketBlocks = comiketBlocks.concat(block)
})

function getHall(e, n) {
    if(e === 'あ') {
        return '西2壁'
    }
    if(e === 'れ') {
        return '西1壁'
    }
    if(e === 'A') {
        if(n >= 43) {
            return '西3壁'
        } else {
            return '西4壁'
        }
    }
    if(e === 'ア') {
        if(n >= 34) {
            return '南1壁'
        } else {
            return '南2壁'
        }
    }
    if(constants.comiketData.blocks['1'].indexOf(e) !== -1) {
        if('BCDEF'.indexOf(e) !== -1) {
            return '西4'
        } else {
            if('GHIJKL'.indexOf(e) !== -1) {
                return '西3・4'
            } else {
                return '西3'
            }
        }
    }
    if(constants.comiketData.blocks['2'].indexOf(e) !== -1) {
        if('いうえおかきくけこさしすせそたちつてと'.indexOf(e) !== -1) {
            return '西2'
        } else {
            return '西1'
        }
    }
    if(constants.comiketData.blocks['3'].indexOf(e) !== -1) {
        if('アイウエオカキクケコ'.indexOf(e) !== -1) {
            return '南2'
        } else {
            return '南1'
        }
    }
    if(constants.comiketData.blocks['4'].indexOf(e) !== -1 ) {
        if('ナニヌネノハヒフヘホ'.indexOf(e) !== -1) {
            return '南4'
        } else {
            return '南3'
        }
    }
}

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
            circleUid: '',
            if_continue: false,
            snackbar: false,
            addCircleName: '',
            formValidation: {
                select: v => !!v || '選択してください',
                text: v => !!v || '入力してください'
            }
        }
    },

    methods: {
        submit() {
            if (this.$refs.circleData.validate()) {
                var data = {
                    name: this.circleName,
                    date: this.circleDate,
                    block: this.circleBlock,
                    number: this.circleNumber,
                    table: this.circleTable,
                    memo: this.circleMemo ? this.circleMemo : '',
                    uid: this.circleUid,
                    hall: getHall(this.circleBlock, this.circleNumber)
                }

                if(!this.circleUid) {
                    db.add('circles', data)
                } else {
                    db.update('circles', this.circleUid, data)
                }

                if(this.if_continue && !this.editmode) {
                    this.addCircleName = this.circleName
                    this.snackbar = true

                    this.$parent.updateList()
                } else {
                    setTimeout(() => {
                        this.dialog = false
                    }, 50)

                    this.$parent.updateList()
                }

                this.$refs.circleData.reset()
            }
        },

        exit() {
            this.$refs.circleData.reset()

            setTimeout(() => {
                this.dialog = false
            }, 50)
        },

        modeChange(editmode, data) {

            this.editmode = editmode

            if(!editmode) {
                // 追加モード
                this.modalTitle = 'サークル追加'
                this.modalBtn = '追加'
                this.circleUid = ''
            } else {
                // 編集モード
                this.modalTitle = 'サークル編集'
                this.modalBtn = '編集'

                Object.keys(data).forEach(key => {
                    this['circle' + key.charAt(0).toUpperCase() + key.slice(1)] = data[key]
                })
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

.nopadding > .col {
    padding: 0 12px 12px;
}

.v-input--checkbox {
    margin: 0;
}
</style>