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

                <v-form ref="itemData">
                    <v-row>
                        <v-col cols="12">
                            <v-select v-model="itemParent" :items="circleList" label="サークル選択" item-text="circleName" item-value="uid" filled dense rounded :rules="[formValidation.select]"></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="itemName" label="アイテム名" filled dense rounded :rules="[formValidation.text]"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model.number="itemPrice" label="価格（オプション）" suffix="円" filled dense rounded :rules="[formValidation.price]"></v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
        </v-card>

        <v-snackbar v-model="snackbar">アイテム「{{ addItemName }}」を追加しました</v-snackbar>
    </v-dialog>
</template>

<script>
import db from '../common/circleManagement'

export default {
    data() {
        return {
            dialog: false,
            editmode: false,
            modalTitle: '',
            modalBtn: '',
            if_continue: false,
            snackbar: false,
            itemUid: '',
            addItemName: '',
            circleList: [],
            formValidation: {
                select: v => !!v || '選択してください',
                text: v => !!v || '入力してください',
                price: v => {
                    if(!v) {
                        return true
                    } else if(isNaN(v * 1)) {
                        return '数値を入力してください'
                    } else if(v >= 0) {
                        return true
                    } else {
                        return '数値は0以上で入力してください'
                    }
                }
            }
        }
    },

    methods: {
        submit() {
            if (this.$refs.itemData.validate()) {
                var data = {
                    parent: this.itemParent,
                    name: this.itemName,
                    price: this.itemPrice
                }

                if(!this.itemUid) {
                    db.add('buylist', data)
                } else {
                    db.update('buylist', this.itemUid, data)
                }

                if(this.if_continue && !this.editmode) {
                    this.addItemName = this.itemName
                    this.snackbar = true

                    this.$parent.updateList()
                } else {
                    setTimeout(() => {
                        this.dialog = false
                    }, 50)

                    this.$parent.updateList()
                }

                this.$refs.itemData.reset()
            }
        },

        exit() {
            this.$refs.itemData.reset()

            setTimeout(() => {
                this.dialog = false
            }, 50)
        },

        modeChange(editmode, data) {
            this.editmode = editmode
            this.updateCircleList()

            if(!editmode) {
                // 追加モード
                this.modalTitle = 'アイテム追加'
                this.modalBtn = '追加'
                this.itemUid = ''
            } else {
                // 編集モード
                this.modalTitle = 'アイテム編集'
                this.modalBtn = '編集'

                Object.keys(data).forEach(key => {
                    this['item' + key.charAt(0).toUpperCase() + key.slice(1)] = data[key]
                })
            }
        },

        updateCircleList() {
            this.circleList = []
            db.list('circles').then(data => {
                data.forEach(item => {
                    this.circleList.push({
                        circleName: item.name,
                        uid: item.uid
                    })
                })
            })
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

    .v-text-field__suffix {
        margin-top: 0px;
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