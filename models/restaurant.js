const mongoose = require('mongoose')

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
    },
    location: {
        type: Object,
    },
    tags: [{
        type: String,
    }],
    ratings : [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Rating',
        autopopulate: {
            maxDepth: 2
        }
    }],
    eventsHosted: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Event',
    }],
    reservations: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Reservation', 
    }]
})

RestaurantSchema.methods.getAvgRating = function(cb) {
    let sum = 0
    for (let r of this.ratings) {
        sum += r.rating
    }
    return sum / this.ratings.length
}


RestaurantSchema.plugin(require('mongoose-autopopulate'))

const RestaurantModel = new mongoose.model('Restaurant', RestaurantSchema)

module.exports = RestaurantModel