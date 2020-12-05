<template>
    <v-container>
        <h1>Home</h1>
        <v-subheader>{{ today }}</v-subheader>

        <v-row>
            <v-col cols="12" md="6" lg="4" v-for="(item, index) in cardItems" :key="index">
                <v-card>
                    <v-card-title>{{ item.title }}</v-card-title>
                    <v-card-text>{{ item.text }}</v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import moment from "moment"
moment.locale('ja')

export default {
    data() {
        return {
            today: moment().format('MM月DD日 dddd'),
            cardItems: [
                {
                    title: 'コミックマーケット99',
                    text: '2021年5月2日~5日（予定）'
                }, {
                    title: '情報',
                    text: '登録してあるサークルの数: 0\n購入予定のグッズ数: 0'
                }, {
                    title: '使い方',
                    text: '① 画面下の「サークル」を選択します\n② 購入しに行く予定のサークルを登録します\n③ etc...'
                }, {
                    title: 'CircleListとは',
                    text: 'CircleListはコミックマーケット用のサークル情報などをまとめられる非公式ツールです。\n公式のカタログと合わせて使用することをおすすめします。（カタログが無くても使用することは可能です）'
                }
            ]
        }
    }
}
</script>

<style scoped lang="scss">

.v-sheet.v-card {
    border-radius: 12px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
}

.v-card {

    margin: 12px 3vw;

    @media (min-width: 960px) {
        margin: 12px 2vw;
    }

    @media (min-width: 1264px) {
        margin: 12px 1vw;
    }
}

.v-card__text {
    white-space: pre-wrap;
}
</style>