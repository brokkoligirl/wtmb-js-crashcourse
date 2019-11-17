
const mongoose = require('mongoose')

const FoodSnobSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
    },
    ratings : [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Rating',
        autopopulate: {
            maxDepth: 2
        }
    }],
    eventsAttended: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Event',
    }],
    reservations: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Reservation',
        autopopulate: {
            maxDepth: 2
        }
    }]
})

FoodSnobSchema.plugin(require('mongoose-autopopulate'))

const FoodSnobModel = new mongoose.model('FoodSnob', FoodSnobSchema)

module.exports = FoodSnobModel