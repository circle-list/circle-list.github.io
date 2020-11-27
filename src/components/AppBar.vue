<template>
    <v-app-bar app>
        <v-app-bar-nav-icon />
        <v-toolbar-title>CircleList</v-toolbar-title>
        <v-spacer />
        <v-btn icon>
            <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<style>
.v-sheet.v-app-bar.v-toolbar:not(.v-sheet--outlined) {
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
}
</style>