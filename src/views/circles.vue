<template>
    <v-container>
        <h1>Circles</h1>
        <v-subheader>サークル一覧</v-subheader>
        
        <v-list subheader>
            <ListItem v-for="(circleItem, index) in circleList" :key="index" :data="circleItem" @openDeleteModal="openDeleteModal" @openEditModal="openEditCircleModal" @openEditItemModal="openEditItemModal"></ListItem>
        </v-list>

        <v-overlay :value="fab"></v-overlay>
        <v-fab-transition>
            <v-speed-dial v-model="fab" transition="slide-y-reverse-transition" elevation="20">
                <template v-slot:activator>
                    <v-btn v-model="fab" fab color="primary">
                        <v-icon :style="{transform: `rotate(${fab ? 135:0}deg)`}">mdi-plus</v-icon>
                    </v-btn>
                </template>
                    <v-btn rounded color="success" @click="openSortModal" :disabled="isEnableButton"><v-icon>mdi-sort</v-icon>並び替え</v-btn>
                    <v-btn rounded color="primary" @click="openItemModal" :disabled="isEnableButton"><v-icon>mdi-plus</v-icon>アイテム追加</v-btn>
                    <v-btn rounded color="primary" @click="openCircleModal"><v-icon>mdi-plus</v-icon>サークル追加</v-btn>
            </v-speed-dial>
        </v-fab-transition>

        <CircleModal ref="circleModal"></CircleModal>
        <DeleteModal ref="deleteModal"></DeleteModal>
        <SortModal ref="sortModal"></SortModal>
        <ItemModal ref="itemModal"></ItemModal>
    </v-container>
</template>

<script>
import ListItem from '../components/CircleListItem'
import CircleModal from '../components/CircleModalEditorCircle'
import ItemModal from '../components/CircleModalEditorItem'
import db from '../common/circleManagement'
import config from '../common/systemConfig'
import DeleteModal from '../components/CircleModalDelete'
import SortModal from '../components/CircleModalSort'

// TODO: 色選択機能の追加

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

export default {
    components: {
        ListItem,
        CircleModal,
        DeleteModal,
        SortModal,
        ItemModal
    },

    data() {
        return {
            circleList: [],
            fab: false,
            isEnableButton: false
        }
    },

    mounted() {
        this.updateList()
    },

    methods: {
        openCircleModal() {
            this.$refs.circleModal.modeChange(false)
            this.$refs.circleModal.dialog = true
        },

        openItemModal() {
            this.$refs.itemModal.modeChange(false)
            this.$refs.itemModal.dialog = true
        },

        openEditCircleModal(uid) {
            db.get('circles', uid).then(data => {
                this.$refs.circleModal.modeChange(true, data[0])
                this.$refs.circleModal.dialog = true
            })
        },

        openEditItemModal(uid) {
            db.get('buylist', uid).then(data => {
                this.$refs.itemModal.modeChange(true, data[0])
                this.$refs.itemModal.dialog = true
            })
        },

        openDeleteModal(uid, type) {
            db.get(type, uid).then(data => {
                this.$refs.deleteModal.data = data[0]
                this.$refs.deleteModal.dialog = true
                this.$refs.deleteModal.type = type
            })
        },
        
        openSortModal() {
            this.$refs.sortModal.dialog = true
        },

        async updateList() {
            var circledata = await db.list('circles')

            this.isEnableButton = !circledata.length

            circledata.sort(objectSort)
            var hidden = config.get('hiddenDate')
            var sortKey = config.get('sort')['key']

            // 非表示にしている日を取り除く
            var inject = circledata.filter(item => {
                return !hidden.includes(item.date.substr(0, 1) * 1)
            })

            var headers = []

            for(var i = 0; inject.length > i; i++) {
                var obj = inject[i]

                // サークル配置番号定義 ＆ ソート基準になっているキーは削除して整形
                inject[i]['place'] = `${obj['date']} ${obj['hall']} ${obj['block']} - ${obj['number']}${obj['table']}`.replace(obj[sortKey], '').replace(/ {2}/, ' ')

                // データベースからグッズを取得して定義
                inject[i]['buylist'] = await db.list('buylist', {'parent': obj['uid']})

                // ヘッダ追加予定リストに追加（無限ループになるので）
                if(inject[i - 1] === undefined || inject[i][sortKey] !== inject[i - 1][sortKey]) {
                    headers.push({num: i, header: inject[i][sortKey]})
                }
            }

            // ヘッダ追加
            for(var o = 0; headers.length > o; o++) {
                inject.splice(headers[o].num + o, 0, {header: headers[o].header})
            }

            // 表示できるサークルがなかった場合にメッセージを表示
            if(inject.length === 0) {
                inject.push({header: '表示できるサークルがありません。\n右下のボタンからサークルを追加するか、"並び替え"から表示条件を変更してみてください。'})
            }

            this.circleList = inject
        }
    }
}
</script>

<style scoped lang="scss">

.v-speed-dial >>> .v-speed-dial__list {
    display: block;
    min-width: 100%;
    right: 0;
    width: unset;
    left: unset;
    text-align: right;
}

.v-speed-dial button:not(.v-btn--fab) {
    width: 100%;
    margin: 6px 0;

    .v-icon {
        margin-right: 10px;
        font-size: 20px;
        display: block;
    }
}

.v-speed-dial {
    position: fixed;
    bottom: calc(3.5vh + 56px);
    right: calc(2.5vw + 15px);
    z-index: 5;
}
</style>