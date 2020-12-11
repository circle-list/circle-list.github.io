import store from 'store-js'

var config_version = 1
var config_name = 'circlelist-v3'

var current_config = store.get(config_name)

// initialize & update
if(!current_config) {
    // Default
    store.set(config_name, {
        config: {
            sort: {
                key: 'date',
                asc: true
            },
            hiddenDate: [],
            memo: {
                text: '',
                lastupdate: 'なし'
            }
        },
        version: config_version
    })
} else {
    // ConfigUpdate
    if(current_config.version !== config_version) {
        // update
    }
}

export default {
    get: (key) => {
        return store.get(config_name).config[key]
    },

    set: (key, value) => {
        var base = store.get(config_name).config
        base[key] = value

        store.set(config_name, {config: base})
    },

    __store: store,
    __configname: config_name
}