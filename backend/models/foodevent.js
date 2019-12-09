const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    host : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Restaurant',
    },
    patrons : [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'FoodSnob',
        max: maxAttendees,
        autopopulate: {
            maxDepth: 1
        }
    }],
    date: {
        type: Date,
        min: Date.now        
    },
    maxAttendees: {
        type: Number,
        min: 1,
    }
})

EventSchema.plugin(require('mongoose-autopopulate'))

const EventModel = new mongoose.model('Event', EventSchema)

module.exports = EventModel
