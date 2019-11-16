const mongoose = require('mongoose')
const RatingModel = require('./rating')

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
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

RestaurantSchema.methods.getAvgRating = function() {

    let ratingSum = 0;
    const ratings = RatingModel.find({ 
        restaurant: '5dd06590c2733885c7dea048' 
    });
    function mySum(item) {
        ratingSum += item.rating;
    }
    let counter = 0
    let sum = 0
    for (let r of ratings) {
        sum += r.rating
        counter += 1
    }
    return sum / counter
}


RestaurantSchema.plugin(require('mongoose-autopopulate'))

const RestaurantModel = new mongoose.model('Restaurant', RestaurantSchema)

module.exports = RestaurantModel