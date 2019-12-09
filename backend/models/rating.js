
const mongoose = require('mongoose')

const RatingSchema = new mongoose.Schema({
    restaurant: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Restaurant',
        autopopulate: {
            maxDepth: 2
        }
    },
    patron: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'FoodSnob',
        autopopulate: {
            maxDepth: 2
        }
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
    },
    visits: {
        type: Number,
    }
})          

RatingSchema.plugin(require('mongoose-autopopulate'))

const RatingModel = new mongoose.model('Rating', RatingSchema)

module.exports = RatingModel
