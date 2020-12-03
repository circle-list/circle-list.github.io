<template>
  <header>
    <v-app-bar app elevate-on-scroll color="white">
      <transition name="slide-y-reverse-transition">
        <v-toolbar-title v-if="isShow">{{ PageTitle }}</v-toolbar-title>
      </transition>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" fixed temporary right>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              CircleList
            </v-list-item-title>
            <v-list-item-subtitle>
              Pre-Alpha v1.2.0
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list nav dense rounded>
          <v-list-item v-for="(menuItem, index) in menuItems" :key="index" v-bind:to="menuItem.url" color="primary">
            <v-list-item-icon>
              <v-icon>{{ menuItem.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ menuItem.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  </header>
</template>

<script>
  import constants from '../common/constants'

  export default {
    data: () => ({
      drawer: false,
      group: null,
      menuItems: constants.menu,
      PageTitle: '',
      isShow: false
    }),

    created() {
      this.PageTitle = this.$route.name
    },

    mounted() {
      window.addEventListener('scroll', this.onScroll)
    },

    watch: {
      group() {
        this.drawer = false
      },

      $route(to) {
        this.PageTitle = to.name
      }
    },

    methods: {
      onScroll() {
        this.isShow = window.scrollY > 80
      },
    }
  }
</script>

<style>
.v-sheet.v-app-bar.v-toolbar:not(.v-sheet--outlined) {
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
}

nav {
  min-width: 300px;
  width: 20vw;
}
</style>