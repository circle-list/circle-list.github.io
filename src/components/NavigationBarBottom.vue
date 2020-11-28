<template>
  <v-bottom-navigation color="primary" grow app>
    <v-btn v-for="(menuItem, index) in menuItems" :key="index" v-bind:to="menuItem.url">
      <span>{{ menuItem.name }}</span>
      <v-icon>{{ menuItem.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import constants from '../common/constants'
 
export default {
  data () {
    return {
      menuItems: constants.navigation
    }
  }
}
</script>

<style>
    .v-item-group.v-bottom-navigation .v-btn.v-size--default {
        height: inherit;
    }
</style>