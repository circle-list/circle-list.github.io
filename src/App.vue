<template>
    <v-app dark>
        <AppBar/>
        <v-main>
            <transition name="router-transition">
                <router-view/>
            </transition>
        </v-main>
        <NavigationBar/>
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

<style lang="scss">
main {
    overflow: hidden;
}

h1, .v-subheader {
    padding-left: 4vw;
}

.container > .v-subheader {
    height: 24px;
}

.v-application {
    font-family: "Noto Sans JP";
}



// ios用に慣性スクロールを有効にする
.v-menu__content {
    -webkit-overflow-scrolling: touch
}

// スクロールバー変更
::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

::-webkit-scrollbar-thumb {
    background: #c7cbdc;
    border-radius: 10px;
    border: 3px solid transparent;
    background-clip: content-box;
}

// ページトランジション
.router-transition-enter-active {
    animation: fadeIn 0.2s;
    animation-delay: 0.15s;
    opacity: 0;
}

.router-transition-leave-active {
    animation: fadeOut 0.15s;
}

@keyframes fadeIn {
    from {
        transform: scale(0.95);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes fadeOut {
    from {
        transform: scale(1);
    }
    to {
        transform: scale(1.05);
        opacity: 0;
    }
}

</style>