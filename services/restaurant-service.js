const BaseService = require('./base-service')
const RestaurantModel = require('../models/restaurant')

class RestaurantService extends BaseService {
    model = RestaurantModel

    getAvgRating(restaurant) {
        var ratingSum = 0;
        restaurant.ratings.forEach(mySum);
        function mySum(item) {
            ratingSum += item.rating;
        }
        return ratingSum / restaurant.ratings.length;
    }

    async tagRestaurant(restaurant, newTags) {
        let nnewTags = newTags.toString().split(',')
        let currentTags = restaurant.tags
        for (let tag of nnewTags) {
            if (!currentTags.includes(tag)) {
                restaurant.tags.push(tag);
            }
        }
        await restaurant.save()
    }
}

module.exports = new RestaurantService()
