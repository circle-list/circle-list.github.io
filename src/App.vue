<template>
    <v-app dark>
        <AppBar />
        <v-main>
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

.v-application {
    font-family: "Noto Sans JP";
}

::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}

::-webkit-scrollbar-thumb {
    background: #C7CBDC;
    border-radius: 5px;
}
</style>