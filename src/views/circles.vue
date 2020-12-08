<template>
    <v-container>
        <h1>Circles</h1>
        <v-subheader>サークル一覧</v-subheader>
        <v-row>
            <v-col class="text-right">
                <v-btn depressed rounded @click="openSortModal"><v-icon>mdi-sort</v-icon>並び替え</v-btn>
                <v-btn depressed rounded color="primary" class="ml-3" @click="openAddModal"><v-icon>mdi-plus</v-icon>追加</v-btn>
            </v-col>
        </v-row>
        
        <v-list subheader>
            <ListItem v-for="(circleItem, index) in circleList" :key="index" :data="circleItem" @openInfoModal="openInfoModal"></ListItem>
        </v-list>

        <CircleModal ref="circleModal" @submitData="submitData"></CircleModal>
        <InfoModal ref="infoModal" @openEditModal="openEditModal"></InfoModal>
        <SortModal ref="sortModal"></SortModal>
    </v-container>
</template>

<script>
import ListItem from '../components/CircleListItem'
import CircleModal from '../components/CircleModalEditor'
import db from '../common/circleManagement'
import constants from '../common/constants'
import config from '../common/systemConfig'
import InfoModal from '../components/CircleModalInfo'
import SortModal from '../components/CircleModalSort'

// TODO: サークル追加・削除・編集機能の追加

function objectSort(a, b) {
    var _config = config.get('sort')
    var sort_key = _config['key']
    var sort_asc = _config['asc']

    var sortlist = [sort_key, 'block', 'number', 'table']

    for(var i = 0; sortlist.length > i; i++) {
        var key = sortlist[i]
        
        if(a[key] !== b[key]) {
            if(a[key] < b[key]) return sort_asc ? -1 : 1
            if(a[key] > b[key]) return sort_asc ? 1 : -1
        }
    }

    return 0
}

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
    components: {
        ListItem,
        CircleModal,
        InfoModal,
        SortModal
    },

    data() {
        return {
            circleList: []
        }
    },

    mounted () {
        this.updateList()
    },

    methods: {
        openAddModal() {
            this.$refs.circleModal.modeChange(false)
            this.$refs.circleModal.dialog = true
        },

        openEditModal(uid) {
            db.get('circles', uid).then(data => {
                this.$refs.circleModal.modeChange(true, data[0])
                this.$refs.circleModal.dialog = true
            })
        },

        openInfoModal(uid) {
            db.get('circles', uid).then(data => {
                this.$refs.infoModal.data = data[0]
                this.$refs.infoModal.dialog = true
            })
        },
        
        openSortModal() {
            this.$refs.sortModal.dialog = true
        },

        submitData(data) {
            data.hall = getHall(data.block, data.number)

            if(!data.uid) {
                db.add('circles', data)
            } else {
                db.update('circles', data.uid, data)
            }

            this.updateList()
        },

        updateList() {
            db.list('circles').then(circledata => {
                // TODO: 日付別非表示機能を実装する
                circledata.sort(objectSort)
                var hidden = config.get('hiddenDate')
                var sortKey = config.get('sort')['key']

                // 非表示にしている日を取り除く
                var inject = circledata.filter(item => {
                    return !hidden.includes(item.date.substr(0, 1))
                })

                var headers = []

                for(var i = 0; inject.length > i; i++) {
                    var obj = inject[i]

                    // サークル配置番号定義 ＆ ソート基準になっているキーは削除して整形
                    inject[i]['place'] = `${obj['date']} ${obj['hall']} ${obj['block']} - ${obj['number']}${obj['table']}`.replace(inject[i][sortKey], '').replace(/ {2}/, '')

                    // ヘッダ追加予定リストに追加（無限ループになるので）
                    if(inject[i - 1] === undefined || inject[i][sortKey] !== inject[i - 1][sortKey]) {
                        headers.push({num: i, header: inject[i][sortKey]})
                    }
                }

                // ヘッダ追加
                for(var o = 0; headers.length > o; o++) {
                    inject.splice(headers[o].num + o, 0, {header: headers[o].header})
                }

                this.circleList = inject
            })
        }
    }
}
</script>

<style scoped>
.row .v-icon {
    margin-right: 10px;
    font-size: 20px;
    display: block;
}
</style>