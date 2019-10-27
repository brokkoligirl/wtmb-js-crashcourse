const arrayRemove = require("../array_remove");
const Reservation = require('./reservation')
const Rating = require('./rating')
const { writeFileSync } = require('fs')
const ics = require('ics')
const moment = require('moment')


module.exports = class FoodSnob {
    constructor(snobName) {
        this.snobName = snobName;
        this.ratings = [];
        this.eventsAttended = [];
        this.reservations = [];
    }

    // submit reservation request to restaurant
    makeReservation(restaurant, resDate, resTime, numberOfPeople) {
        let newReservation = new Reservation(restaurant, this, resDate, resTime, numberOfPeople);
        restaurant.reservationRequests.push(newReservation);
        this.reservations.push(newReservation);
        console.log(`your reservation request for ${restaurant.restaurantName} has been submitted.\n`);
    }

    // upon each visit, a restaurant is rated (rating must be 1-10)
    visitRestaurant(restaurant, rating) {
        // check rating value
        if (typeof rating != "number" || rating < 1 || rating > 10) {
            return console.log(`Try again ${this.snobName}. Your rating for ${restaurant.restaurantName}`, "needs to be a number between 1 and 10.\n");
        }
        // check if restaurant is already rated & update rating
        var found = false;
        for (let i = 0; i < this.ratings.length; i++) {
            if (this.ratings[i].restaurant == restaurant) {
                this.ratings[i].rating = rating;
                this.ratings[i].visits += 1;
                found = true;
            }
        }
        // create new rating for new restaurant
        if (found == false) {
            var newRating = new Rating(restaurant, this, rating);
            restaurant.ratings.push(newRating);
            this.ratings.push(newRating);
        }
    }

    // add tags to restaurant (i.e. "brunch", "pizza", "vegan")
    tagRestaurant(restaurant, newTags) {
        // only allow tagging by people who've been to the restaurant
        var attended = false;
        for (let i = 0; i < restaurant.ratings.length; i++) {
            if (restaurant.ratings[i].patron == this) {
                attended = true;
                for (let j = 0; j < newTags.length; j++) {
                    restaurant.tags.push(newTags[j]);
                }
            }
        }
        if (attended == false) {
            console.log("permission denied, you fool.", `Only people who have been to ${restaurant.restaurantName}`, "are allowed to add tags.\n");
        }
    }

    attend(event) {
        if (event.eventAttendees.length < event.maxAttendees) {
            this.eventsAttended.push(event);
            event.eventAttendees.push(this);
            console.log(`Thank you, ${this.snobName}, for signing up for ${event.eventName}.\n`);
        }
        else {
            console.log(`You're too late ${this.snobName}, ${event.eventName}`, "is already full. Are you even a real foodie?\n");
        }
    }
    
    cancelAttendance(event) {
        if (event.eventAttendees.includes(this)) {
            event.eventAttendees = arrayRemove(event.eventAttendees, this);
            this.eventsAttended = arrayRemove(this.eventsAttended, event);
            console.log(`Sad to learn you can't attend ${event.eventName}, ${this.snobName}\n`);
        }
        else {
            console.log(`${this.snobName}, you can't cancel on ${event.eventName}`, "because you're not signed up, duh.\n");
        }
    }

    exportReservationCalFile(restaurantName, desc="", duration=120) {
        let reservationFound = false;
        for (let i=0; i < this.reservations.length; i++) {
            if ((this.reservations[i].restaurant.restaurantName == restaurantName) && (this.reservations[i].approved === true)) {
                reservationFound = true;
                const rezzie = this.reservations[i];
                let t = new moment(`${rezzie.resDate} ${rezzie.resTime}`, "YYYY-MM-DD HH:mm");

                ics.createEvent({
                    title: `Reservation at ${rezzie.restaurant.restaurantName}`,
                    description: desc,
                    start: [t.year(), t.month()+1, t.date(), t.hour(), t.minute()],
                    location: rezzie.restaurant.restaurantName,
                    status: 'CONFIRMED',
                    busyStatus: 'BUSY',
                    duration: { minutes: duration },
                    productId: 'FoodSnob App'
                  }, (error, value) => {
                    if (error) {
                      console.log(error)
                    }
                    writeFileSync(`${rezzie.restaurant.restaurantName}_${t.month()+1}_${t.date()}.ics`, value);
                    console.log(`File: "${rezzie.restaurant.restaurantName}_${t.month()+1}_${t.date()}.ics" created.`)
                  });
                }
            }
            if (reservationFound === false) {
                console.log(`no confirmed reservation for ${restaurantName} found.`)
            }           
        }
}