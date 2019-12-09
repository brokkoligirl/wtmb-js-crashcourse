const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://localhost/foodsnob', { 
        useUnifiedTopology: true, 
        useNewUrlParser: true  
    })
    console.log('connected to database')
}

main()