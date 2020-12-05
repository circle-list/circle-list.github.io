<template>
<div>
    <v-divider inset v-if="data.header"></v-divider>
    <v-subheader inset v-if="data.header">{{ data.header }}</v-subheader>
    <v-dialog  v-if="!data.header" v-model="dialog" max-width="400">
        <template v-slot:activator="{ on }">
            <v-list-item>
                <v-list-item-action>
                    <v-checkbox color="primary"></v-checkbox>
                </v-list-item-action>
                
                <v-list-item-content v-on="on">
                    <v-list-item-title>{{ data.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ data.place }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action v-on="on">
                    <v-btn icon>
                        <v-icon color="grey lighten-1">mdi-information</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
        </template>
        <v-card>
            <v-card-title>{{ data.name }}</v-card-title>
            <v-card-text>テキスト</v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">OK</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>

export default {
    props: {
        data: {
            type: Object,
            default: function() {
                return {
                    header: false
                }
            }
        }
    },

    data() {
        return {
            dialog: false
        }
    }
}
</script>