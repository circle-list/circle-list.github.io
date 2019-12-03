const fs = require('fs')

var data = JSON.parse(fs.readFileSync('./city.list.json'))
var array = {}

for(i = 0; data.length > i; i++) {
    if(data[i].country === 'JP') {
        array[data[i].name] = data[i].id
    }
}

fs.writeFileSync('./city_list.json', JSON.stringify(array, null, '  '))