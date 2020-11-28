<template>
    <v-app>
        <AppBar />
        <v-main color="#F2F4F7">
            <router-view />
        </v-main>
        <NavigationBar />
    </v-app>
</template>

<script>
import NavigationBar from './components/NavigationBarBottom'
import AppBar from './components/NavigationBarTop'

export default {
    name: 'App',

    components: {
        NavigationBar,
        AppBar
    },

    data: () => ({
        //
    })
}

</script>

<style>
h1, .v-subheader {
    padding-left: 4vw;
}
</style>