const fs = require('fs')
const Flatted = require('flatted')

const save = function(filepath, data) {
    
    fs.writeFileSync(filepath, (Flatted.stringify(data)))
    //console.log(data)
}

const load = function(filepath) {
    return Flatted.parse(fs.readFileSync(filepath, 'utf8'))
}

module.exports = { save, load }
