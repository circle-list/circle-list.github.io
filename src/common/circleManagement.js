import Dexie from 'dexie'

var db = new Dexie('AppDatabase')
db.version(1).stores({
    circles: '&uid, name, memo, date, island, number, ab, bought',
    buylist: 'parent, &uid, name, price, bought'
})

export default {
    add: (type, data) => {
        db[type].add(data)
    },

    delete: (type, uid) => {
        db[type].delete(uid)
    },

    update: (type, uid, data) => {
        db[type].update(uid, data)
    },

    list: async (type) => {
        return await db[type].toArray()
    }
}