<template>
    <v-container>
        <h1>Circles</h1>
        <v-list>
            <ListItem v-for="(circleItem, index) in circleList" :key="index" :data="circleItem"></ListItem>
        </v-list>
    </v-container>
</template>

<script>
import ListItem from '../components/CircleListItem'
// import db from '../common/circleManagement'

/*  @やりたいこと
ソート機能を実装する
非表示機能の実装
*/

export default {
    components: {
        ListItem
    },

    data() {
        return {
            circleList: [
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
            ] //ここに値を挿入
        }
    }
}
</script>