const BaseService = require('./base-service')
const RestaurantModel = require('../models/restaurant')

class RestaurantService extends BaseService {
    constructor() {
        super(RestaurantModel, `${__dirname}/../exports/restaurants.json`)
    }
}

module.exports = new RestaurantService()
