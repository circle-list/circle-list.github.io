<template>
<div>

    <v-subheader v-if="data.header">{{ data.header }}</v-subheader>
    <v-list-item v-if="!data.header">
        <v-list-item-action>
            <v-checkbox color="primary"></v-checkbox>
        </v-list-item-action>
        
        <v-list-item-content @click="openInfoModal">
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
            //
        }
    },

    methods: {
        openInfoModal() {
            this.$emit('openInfoModal', this.data.uid)
        }
    }
}
</script>