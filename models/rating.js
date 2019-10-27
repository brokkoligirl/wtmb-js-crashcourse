module.exports = class Rating {
    constructor(restaurant, patron, rating) {
        this.restaurant = restaurant
        this.patron = patron
        this.rating = rating
        this.visits = 1
    }
}
