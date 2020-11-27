<template>
    <v-app>
        <AppBar />
        <v-main>
            <router-view />
        </v-main>
        <NavigationBar />
    </v-app>
</template>

<script>
import NavigationBar from './components/NavigationBar'
import AppBar from './components/AppBar'

export default {
    name: 'App',

    components: {
        NavigationBar,
        AppBar
    },

    data: () => ({
        //
    }),
}

</script>
