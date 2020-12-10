<template>
<div>
    <v-subheader v-if="data.header">{{ data.header }}</v-subheader>
    <v-list-item v-if="!data.header">
        <v-list-item-action @click="toggleButton">
            <v-checkbox v-model="data.bought" color="primary"></v-checkbox>
        </v-list-item-action>
        
        <v-list-item-content @click="openInfoModal" :class="{'primary--text': data.bought}">
            <v-list-item-title>{{ data.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ data.place }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action @click="openInfoModal">
            <v-btn icon>
                <v-icon color="grey lighten-1">mdi-information</v-icon>
            </v-btn>
        </v-list-item-action>
    </v-list-item>

</div>
</template>

<script>
import db from '../common/circleManagement'

export default {
    props: {
        data: {
            type: Object,
            default: function() {
                return {
                    header: false,
                    uid: 0,
                    bought: false
                }
            }
        }
    },

    data() {
        return {
            // 
        }
    },

    methods: {
        openInfoModal() {
            this.$emit('openInfoModal', this.data.uid)
        },

        toggleButton() {
            db.update('circles', this.data.uid, {bought: this.data.bought})
        }
    }
}
</script>

<style scoped>
.v-subheader {
    height: auto;
    margin-top: 20px;
    margin-bottom: 0px;
}
</style>