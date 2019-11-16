
const mongoose = require('mongoose')

const ReservationSchema = new mongoose.Schema({
    restaurant : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Restaurant',
    },
    patron : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'FoodSnob',
    },
    date: {
        type: Date,
        min: Date.now        
    },
    partySize: {
        type: Number,
        min: 1,
        max: 10,
    }
})

const ReservationModel = new mongoose.model('Reservation', ReservationSchema)

module.exports = ReservationModel
