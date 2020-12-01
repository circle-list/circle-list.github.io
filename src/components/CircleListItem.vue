<template>
    <v-dialog v-model="dialog" max-width="400">
        <template v-slot:activator="{ on }">
            <v-list-item>
                <v-list-item-action>
                    <v-checkbox color="primary"></v-checkbox>
                </v-list-item-action>
                
                <v-list-item-content v-on="on">
                    <v-list-item-title>サークル1</v-list-item-title>
                    <v-list-item-subtitle>西4 C01a</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action v-on="on">
                    <v-btn icon>
                        <v-icon color="grey lighten-1">mdi-information</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
        </template>
        <v-card>
            <v-card-title>サークル1</v-card-title>
            <v-card-text>テキスト</v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">OK</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

// 絶賛つくりかけ どこにどの値を挿入したりするか検討中

export default {
    data() {
        return {
            dialog: false
        }
    }
}
</script>