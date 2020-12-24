<template>
<div>
    <v-subheader v-if="data.header">{{ data.header }}</v-subheader>

    <!-- Parent -->
    <v-list-item v-if="!data.header" @click.right.prevent="toggleClick">
        <v-list-item-action @click="toggleClick">
            <v-btn icon :class="{'primary--text': data.bought}">
                <v-icon v-text="data.bought ? 'mdi-check-circle' : 'mdi-checkbox-blank-circle-outline'"></v-icon>
            </v-btn>
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
        <!-- メモ -->
        <v-list-item v-if="data.memo">
            <v-list-item-icon>
                <v-icon>mdi-pen</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>メモ</v-list-item-title>
                <v-list-item-subtitle>{{ data.memo }}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider class="mx-4" v-if="!!data.memo && !!data.buylist.length"></v-divider>

        <!-- アイテム一覧 -->
        <v-list-item v-for="(buyitem, index) in data.buylist" :key="index">
            <!-- Checkbox -->
            <v-list-item-action @click="toggleItem(index, buyitem.uid)">
                <v-btn icon :class="{'primary--text': data.buylist[index].bought}">
                    <v-icon v-text="data.buylist[index].bought ? 'mdi-check-circle' : 'mdi-checkbox-blank-circle-outline'"></v-icon>
                </v-btn>
            </v-list-item-action>

            <!-- 名称と価格 -->
            <v-list-item-content @click.right.prevent="toggleItem(index, buyitem.uid)">
                <v-list-item-title>{{ buyitem.name }}</v-list-item-title>
                <v-list-item-subtitle v-if="buyitem.price">{{ buyitem.price }}円</v-list-item-subtitle>
            </v-list-item-content>

            <!-- サブメニュー -->
            <v-list-item-action>
                <v-menu bottom left>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item>
                            <v-list-item-title @click="openEditModalItem(buyitem.uid)" class="primary--text">編集</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title @click="openDeleteModalItem(buyitem.uid)" class="red--text">削除</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-list-item-action>
        </v-list-item>

        <v-divider class="mx-4" v-if="!!data.memo || !!data.buylist.length"></v-divider>

        <!-- メニュー -->
        <v-list-item>
            <v-list-item-content class="buttons">
                <v-row>
                    <v-col>
                        <v-btn color="red" text @click="openDeleteModal">削除</v-btn>
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
                    bought: false,
                    buylist: []
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
        openDeleteModal() {
            this.$emit('openDeleteModal', this.data.uid, 'circles')
        },

        openEditModal() {
            this.childGroup = false
            this.$emit('openEditModal', this.data.uid)
        },

        toggleClick() {
            this.data.bought = !this.data.bought
            db.update('circles', this.data.uid, {bought: this.data.bought})
        },

        toggleItem(index, uid) {
            this.data.buylist[index].bought = !this.data.buylist[index].bought
            db.update('buylist', uid, {bought: this.data.buylist[index].bought})
        },

        openEditModalItem(uid) {
            this.$emit('openEditItemModal', uid)
        },

        openDeleteModalItem(uid) {
            this.$emit('openDeleteModal', uid, 'buylist')
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

.v-list-group__items > .v-list-item {
    padding-left: 16px !important;
}

.v-list-item__subtitle {
    white-space: pre-line;
    word-break: break-all;
}

.v-list-group__items {
    width: 0;
}
</style>