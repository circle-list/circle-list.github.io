<template>
    <v-container>
        <h1>Home</h1>
        <v-subheader>{{ today }}</v-subheader>
        <p>aaaaaaa</p>
        <p>aaaaaaa</p>
        <p>aaaaaaa</p>
        <p>aaaaaaa</p>
        <p>aaaaaaa</p>
        <p>aaaaaaa</p>
        <p>aaaaaaa</p>
        <p>aaaaaaa</p>
                <p>aaaaaaa</p>
        <p>aaaaaaa</p>
        <p>aaaaaaa</p>
        <p>aaaaaaa</p>
        <p>aaaaaaa</p>
        <p>aaaaaaa</p>
        <p>aaaaaaa</p>
        <p>aaaaaaa</p>
                <p>aaaaaaa</p>
        <p>aaaaaaa</p>
        <p>aaaaaaa</p>
        <p>aaaaaaa</p>
        <p>aaaaaaa</p>
        <p>aaaaaaa</p>
        <p>aaaaaaa</p>
        <p>aaaaaaa</p>
                <p>aaaaaaa</p>
        <p>aaaaaaa</p>
        <p>aaaaaaa</p>
        <p>aaaaaaa</p>
        <p>aaaaaaa</p>
        <p>aaaaaaa</p>
        <p>aaaaaaa</p>
        <p>aaaaaaa</p>
    </v-container>
</template>

<script>
import moment from "moment"
moment.locale('ja')

export default {
    data() {
        return {
            today: moment().format('MM月DD日 dddd')
        }
    }
}
</script>

<style scoped>

.v-subheader {
    height: 24px;
}

</style>