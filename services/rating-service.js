const BaseService = require('./base-service')
const RatingModel = require('../models/rating')

class RatingService extends BaseService {
    model = RatingModel

    async rateRestaurant(user, restaurant, value) {
        
        let found = false;
        for (let item of user.ratings) {
            if (item.restaurant._id.toString() === restaurant._id.toString()) {
                found = true;
                const oldRating = await this.find(item._id)
                oldRating.visits += 1;
                oldRating.rating = value;
                oldRating.save()
            }
        }
        if (!found) {
            const newRating = {
                "restaurant": restaurant,
                "patron": user,
                "rating": value,
                "visits": 1,
            }
            const rate = await this.add(newRating)
            user.ratings.push(rate)
            restaurant.ratings.push(rate)
            
        }
        await user.save()
        await restaurant.save()
        console.log('saved rating.')
    }
}        

module.exports = new RatingService()