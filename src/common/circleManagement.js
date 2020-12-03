import Dexie from 'dexie'

var db = new Dexie('AppDatabase')
db.version(1).stores({
    circles: '&uid, name, memo, date, island, number, ab, bought',
    buylist: 'parent, &uid, name, price, bought'
})

export default {
    add: () => {
        
    },

    delete: () => {

    },

    update: () => {

    },

    list: () => {

    }
}