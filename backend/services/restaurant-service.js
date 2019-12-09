const BaseService = require('./base-service')
const RestaurantModel = require('../models/restaurant')
const NodeGeocoder = require('node-geocoder')


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

    async getRestaurantCoords(restaurant) {
        const geocoder = NodeGeocoder({ provider: 'openstreetmap', });
        try {
            let loc = await geocoder.geocode(`${restaurant.name}, Berlin`)
            console.log(loc)
            if (loc.length == 0) {
                console.log('no location found')
                return
            }
            // TODO: un-hardcode Berlin in search query
            restaurant.location = {
                latitude: loc[0].latitude,
                longitude: loc[0].longitude,
                formattedAddress: loc[0].formattedAddress,
                country: loc[0].country,
                city: loc[0].city,
                state: loc[0].state,
                zipcode: loc[0].zipcode,
                streetName: loc[0].streetName,
                streetNumber: loc[0].streetNumber,
                countryCode: loc[0].countryCode,
                neighbourhood: loc[0].neighbourhood,
            }
        } catch {
            console.log(Error);
        }
    }
}

module.exports = new RestaurantService()
