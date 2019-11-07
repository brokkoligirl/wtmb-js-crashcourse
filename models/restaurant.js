const FoodEvent = require('./foodevent')

module.exports = class Restaurant {
    constructor(restaurantName, tags = [], ratings = [], eventsHosted = [], 
                reservationRequests = [], approvedReservations = [], id) {
        this.restaurantName = restaurantName;
        this.tags = tags;
        this.ratings = ratings;
        this.eventsHosted = eventsHosted;
        this.reservationRequests = reservationRequests;
        this.approvedReservations = approvedReservations;
        this.id = id;
    }
    // display average (mean) rating for this restaurant
    getAvgRating() {
        var ratingSum = 0;
        this.ratings.forEach(mySum);
        function mySum(item) {
            ratingSum += item.rating;
        }
        return ratingSum / this.ratings.length;
    }
    // approve first item in request list, move to approved list, and delete
    approveReservation(message) {
        var requested = this.reservationRequests[0];
        requested.approved = true;
        requested.message = message;
        this.approvedReservations.push(requested);
        this.reservationRequests.shift();
        console.log(`rezzie at ${this.restaurantName} for ${requested.patron.snobName} has been approved.\n`);
    }
    // delete first item in request list
    denyReservation(message) {
        var requested = this.reservationRequests[0];
        requested.message = message;
        this.reservationRequests.shift();
        console.log(`rezzie at ${this.restaurantName} for ${requested.patron.snobName}`, `has been denied: "${message}".\n`);
    }
    hostEvent(eventName, eventDate, maxAttendees) {
        var newEvent = new FoodEvent(eventName, this, eventDate, maxAttendees);
        this.eventsHosted.push(newEvent);
        return newEvent;
    }
    // automatically add people who rated the restaurant higher than 8 to an event
    inviteTopFans(event) {
        for (let i = 0; i < this.ratings.length; i++) {
            if (this.ratings[i].rating > 8) {
                event.eventAttendees.push(this.ratings[i].patron);
            }
        }
    }

    static create({ restaurantName, tags, ratings, eventsHosted, 
        reservationRequests, approvedReservations, id }) {
        return new Restaurant(restaurantName, tags, ratings, eventsHosted, 
            reservationRequests, approvedReservations, id);
    }
}
