<template>
    <v-container>
        <h1>Circles</h1>
        <v-list>
            <v-subheader>土曜日 (1日目)</v-subheader>
            <ListItem v-for="(circleItem, index) in circleList" :key="index"></ListItem>
        </v-list>
    </v-container>
</template>

<script>
import ListItem from '../components/CircleListItem'

/*  @やりたいこと
subheaderをなんとかしたい
ソート機能を実装する
サークル一覧を表示する機能を実装したい
非表示機能の実装


てかデバッグできてない
*/

export default {
    components: {
        ListItem
    },

    data() {
        return {
            circleList: ['dummy1', 'dummy2'] //ここに値を挿入
        }
    }
}
</script>