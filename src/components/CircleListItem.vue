<template>
<div>
    <v-subheader v-if="data.header">{{ data.header }}</v-subheader>

    <!-- Parent -->
    <v-list-item v-if="!data.header">
        <v-list-item-action @click="toggleButton">
            <v-checkbox v-model="data.bought" color="primary"></v-checkbox>
        </v-list-item-action>
        
        <v-list-item-content @click="childGroup = !childGroup" :class="{'primary--text': data.bought}">
            <v-list-item-title>{{ data.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ data.place }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action @click="childGroup = !childGroup">
            <v-btn icon :class="{'icon-open': childGroup}">
                <v-icon color="primary">mdi-chevron-down</v-icon>
            </v-btn>
        </v-list-item-action>
    </v-list-item>

    <!-- Children -->
    <v-list-group v-if="!data.header" :value="childGroup" sub-group eager>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title>テスト</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item>
            <v-list-item-content class="buttons">
                <v-row>
                    <v-col>
                        <v-btn color="red" text @click="reveal = true">削除</v-btn>
                    </v-col>
                    <v-col class="text-right">
                        <v-btn color="primary" text @click="openEditModal">編集</v-btn>
                        <v-btn color="primary" text @click="dialog = false">マップ</v-btn>
                    </v-col>
                </v-row>
            </v-list-item-content>
        </v-list-item>
    </v-list-group>

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
            childGroup: false
        }
    },

    methods: {
        openInfoModal() {
            this.$emit('openInfoModal', this.data.uid)
        },

        openEditModal() {
            this.childGroup = false
            this.$emit('openEditModal', this.data.uid)
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

.v-list-group >>> .v-list-group__header {
    display: none;
}

.v-list-group {
    box-shadow: 0 5px 15px rgba(0,0,0,.15);
    border-radius: 20px;
}

.icon-open {
    transform: rotate(180deg);
}

.buttons {
    display: block;
    padding: 10px 0;
}

.col {
    padding: 0 12px;
}
</style>