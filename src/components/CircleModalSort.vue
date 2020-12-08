<template>
    <v-dialog v-model="dialog" max-width="400">
        <v-card>
            <v-card-title>ソート</v-card-title>
            <v-card-text>サークルの並び順を変えることができます</v-card-text>
            <v-card-actions>
            
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">キャンセル</v-btn>
            <v-btn color="primary" text @click="dialog = false">OK</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data() {
        return {
            dialog: false
        }
    }
}
</script>