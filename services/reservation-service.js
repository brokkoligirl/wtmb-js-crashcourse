const BaseService = require('./base-service')
const ReservationModel = require('../models/reservation')

const moment = require('moment')

class ReservationService extends BaseService {
    model = ReservationModel

    async saveReservation(user, reservationObj) {
        const reservation = await this.add(reservationObj)
        user.reservations.push(reservation)
        await user.save()
    }

    convertDate(date, time) {
        let dateInput = date + ' ' + time
        let dateTime = new moment(dateInput, "YYYY-MM-DD HH:mm", true)

        if (dateTime.isValid()) {
            return dateTime
        } else {
            return dateInput
        }
    }     
}

module.exports = new ReservationService()