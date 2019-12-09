
const mongoose = require('mongoose')

const ReservationSchema = new mongoose.Schema({
    restaurant : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Restaurant',
        autopopulate: {
            maxDepth: 2
        }
    },
    patron : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'FoodSnob',
        autopopulate: {
            maxDepth: 2
        }
    },
    date: {
        type: Date,       
    },
    partySize: {
        type: Number,
        min: 1,
        max: 10,
    }
})

ReservationSchema.plugin(require('mongoose-autopopulate'))

const ReservationModel = new mongoose.model('Reservation', ReservationSchema)

module.exports = ReservationModel
