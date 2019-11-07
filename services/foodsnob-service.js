const BaseService = require('./base-service')
const FoodSnobModel = require('../models/foodsnob')

class FoodSnobService extends BaseService {
    constructor() {
        super(FoodSnobModel, `${__dirname}/../exports/foodsnobs.json`)
    }
}

module.exports = new FoodSnobService()
