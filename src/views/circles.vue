<template>
    <v-container>
        <h1>Circles</h1>
        <v-subheader>サークル一覧</v-subheader>
        <v-row>
            <v-col class="text-right">
                <v-btn depressed large rounded>並び替え</v-btn>
                <v-btn depressed large rounded color="primary" class="ml-3" @click="openModal">追加</v-btn>
            </v-col>
        </v-row>
        
        <v-list subheader>
            <ListItem v-for="(circleItem, index) in circleList" :key="index" :data="circleItem"></ListItem>
        </v-list>

        <AddModal ref="addModal"></AddModal>
    </v-container>
</template>

<script>
import ListItem from '../components/CircleListItem'
import AddModal from '../components/CircleAddModal'
import db from '../common/circleManagement'

/** TODO:
  * ソート機能を実装する
  * 非表示機能の実装
  * サークル追加・削除・編集機能の追加
*/

var circleListData = []

db.list('circles').then(console.log)

export default {
    components: {
        ListItem,
        AddModal
    },

    data() {
        return {
            circleList: circleListData
        }
    },

    methods: {
        openModal() {
            this.$refs.addModal.dialog = true
        }
    }
}

/*
  [
    {
        header: '土曜日 (1日目)'
    }, {
        name: 'サークルA',
        place: '西4 C02 a'
    }, {
        header: '日曜日 (2日目)'
    }, {
        name: 'サークルB',
        place: '西4 C02 b'
    }
    ]
 */
</script>