const BaseService = require('./base-service')
const ReservationModel = require('../models/reservation')

class ReservationService extends BaseService {
    model = ReservationModel
}        

module.exports = new ReservationService()