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

body {
    -webkit-user-select:none;
}

body:not(.v-list-group) {
    -webkit-touch-callout:none;
}

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

.v-card__text, .v-subheader {
    white-space: pre-wrap;
}

.v-dialog:not(.v-dialog--fullscreen) {
    border-radius: 15px;
}

.v-bottom-sheet > .v-card {
    border-radius: 26px 26px 0 0;
}

.v-bottom-sheet > .v-card > .v-card__actions {
    padding: 6px 24px 24px;
}

.ease {
    transition: all 0.1s ease;
}

.v-bottom-sheet {
    box-shadow: none;
}

.v-bottom-sheet > .v-card {
    box-shadow: 0 11px 15px -7px rgba(0,0,0,.2), 0 24px 38px 3px rgba(0,0,0,.14), 0 9px 46px 8px rgba(0,0,0,.12);
    padding-top: 18px;
}

.v-bottom-sheet > .v-card:before {
    content: "";
    display: block;
    position: absolute;
    top: 12px;
    left: 50%;
    width: 36px;
    height: 6px;
    background: #aaa;
    border-radius: 6px;
    transform: translateX(-50%);
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

    .v-speed-dial {
        display: none;
    }
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