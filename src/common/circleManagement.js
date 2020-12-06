import Dexie from 'dexie'
import { v4 as uuidv4 } from 'uuid'

var db = new Dexie('AppDatabase')
db.version(1).stores({
    circles: '&uid, name, memo, date, hall, block, number, table, bought',
    buylist: 'parent, &uid, name, price, bought'
})

export default {
    add: (type, data) => {
        data['uid'] = uuidv4()
        data['bought'] = false
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
    },

    get: async (type, uid) => {
        return await db[type].where('uid').equals(uid).toArray()
    },

    __db: db
}