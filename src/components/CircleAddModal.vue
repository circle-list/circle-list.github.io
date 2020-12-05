<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar flat color="white">
                <v-btn icon @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>

                <v-toolbar-title>サークル追加</v-toolbar-title>
                <v-spacer></v-spacer>
                
                <v-toolbar-items>
                    <v-btn text color="primary" @click="dialog = false">追加</v-btn>
                </v-toolbar-items>
            </v-toolbar>

            <v-container>
                <v-row>
                    <v-col cols="12" sm="12">
                        <v-select :items="comiketDate" label="日付選択" filled dense rounded></v-select>
                    </v-col>
                    <v-col cols="12" sm="12">
                        <v-text-field label="サークル名" filled dense rounded></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
import constants from '../common/constants'

var comiketDate = []
constants.comiketData.date.forEach(day => {
    comiketDate.push(`${day}日目 (${constants.comiketData.date_jp[day - 1]})`)
})

export default {
    data() {
        return {
            dialog: false,
            comiketDate: comiketDate
        }
    }
}
</script>

<style lang="scss" scoped>
.v-input >>> {
    .v-label--active {
        transform: translateY(-40px) scale(.8);
    }

    .v-select__selections {
        padding-top: 0 !important;
    }

    input {
        margin-top: 8px;
    }
}

.container {
    margin-top: 20px;
}
</style>