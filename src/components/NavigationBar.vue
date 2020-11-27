<template>
  <v-bottom-navigation color="teal" grow app>
    <v-btn to="/">
      <span>ホーム</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn to="/circles">
      <span>サークル</span>
      <v-icon>mdi-notebook-check</v-icon>
    </v-btn>

    <v-btn to="/map">
      <span>マップ</span>
      <v-icon>mdi-map</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
  export default {
    data: () => {

    },
  }
</script>

<style>
    .v-item-group.v-bottom-navigation .v-btn.v-size--default {
        height: inherit;
    }
</style>