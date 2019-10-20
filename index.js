/* 
A platform for FoodSnobs to make Reservations, visit & rate Restaurants 
(on a scale of 1-10), attend FoodEvents (or cancel attendance), and tag 
restaurants they've been to.
Restaurants can approve or deny reservation requests, host FoodEvents 
and invite their most loyal patrons to those events.

The Rating, Reservation, and FoodEvent classes don't have methods as 
they are "relationship objects". FoodSnobs and Restaurants create
instances of them in their interactions with each other to store and update 
information that describe their relationship.
*/ 

Rating = class {
    constructor(restaurant, patron, rating) {
        this.restaurant = restaurant
        this.patron = patron
        this.rating = rating
        this.visits = 1
    }
}

Reservation = class {
  constructor(restaurant, patron, date, time, numberOfPeople) {
      this.restaurant = restaurant
      this.patron = patron
      this.date = date
      this.time = time
      this.numberOfPeople = numberOfPeople
      this.approved = false
      this.message = ""
  }
}

FoodEvent = class {
  constructor(name, host, date, maxAttendees) {
      this.name = name
      this.host = host
      this.date = date
      this.maxAttendees = maxAttendees 
      this.attendees = []
  }
}

// helper function to remove specific value from an array
function arrayRemove(arr, value) {
    return arr.filter(function(arrElement){
        return arrElement != value;
    })
}

FoodSnob = class {
    constructor(name) {
      this.name = name
      this.ratings = []
      this.eventsAttended = []
      this.reservations = []
    }

    // submit reservation request to restaurant
    makeReservation(restaurant, date, time, numberOfPeople) {
      var newReservation = new Reservation(restaurant, this, date, time, numberOfPeople)
      restaurant.reservationRequests.push(newReservation)
      this.reservations.push(newReservation)
      console.log(`your reservation request for ${restaurant.name} has been submitted.\n`)
    }

    // upon each visit, a restaurant is rated (rating must be 1-10)
    visitRestaurant(restaurant, rating) {
        // check rating value
        if (typeof rating != "number" || rating < 1 || rating > 10) {
            return console.log(`Try again ${this.name}. Your rating for ${restaurant.name}`, 
                               "needs to be a number between 1 and 10.\n");
        } else {
        // check if restaurant is already rated & update rating
            var found = false
            for (let i = 0; i<this.ratings.length; i++){
                if (this.ratings[i].restaurant == restaurant){
                    this.ratings[i].rating = rating
                    this.ratings[i].visits += 1
                    found = true
                }
            }
            // create new rating for new restaurant
            if (found == false) {
                var newRating = new Rating(restaurant, this, rating)
                restaurant.ratings.push(newRating)
                this.ratings.push(newRating)
            }
        }
    }
    // add tags to restaurant (i.e. "brunch", "pizza", "vegan")
    tagRestaurant(restaurant, newTags) {
        // only allow tagging by people who've been to the restaurant
        var attended = false
        for (let i=0; i<restaurant.ratings.length; i++){
            if (restaurant.ratings[i].patron == this) {
                attended = true
                for (let i=0; i<newTags.length; i++) {
                    restaurant.tags.push(newTags[i])
                }
            }
        } if (attended == false) {
            console.log("permission denied, you fool.",
                        `Only people who have been to ${restaurant.name}`,
                        "are allowed to add tags.\n")
        }
    }

    attend(event) {
        if (event.attendees.length < event.maxAttendees) {
            this.eventsAttended.push(event)
            event.attendees.push(this)
            console.log(`Thank you, ${this.name}, for signing up for ${event.name}.\n`)
        } else {
            console.log(`You're too late ${this.name}, ${event.name}`,
                        "is already full. Are you even a real foodie?\n")
        }
    }

    cancelAttendance(event) {
        if (event.attendees.includes(this)) {
            event.attendees = arrayRemove(event.attendees, this)
            this.eventsAttended = arrayRemove(this.eventsAttended, event)
            console.log(`Sad to learn you can't attend ${event.name}, ${this.name}\n`)

        } else {
            console.log(`${this.name}, you can't cancel on ${event.name}`,
                        "because you're not signed up, duh.\n")
        }
    }
} 

Restaurant = class {
    constructor(name) {
      this.name = name
      this.tags = []
      this.ratings = []
      this.eventsHosted = []
      this.reservationRequests = []
      this.approvedReservations = []
    }

    // display average (mean) rating for this restaurant
    getAvgRating() {
        var ratingSum = 0
        for (let i=0; i<this.ratings.length; i++)  {
            ratingSum += this.ratings[i].rating
        } return ratingSum / this.ratings.length
    }

    // approve first item in request list, move to approved list, and delete
    approveReservation(message) {
        var requested = this.reservationRequests[0]
        requested.approved = true
        requested.message = message
        this.approvedReservations.push(requested)
        this.reservationRequests.shift()
        console.log(`rezzie at ${this.name} for ${requested.patron.name} has been approved.\n`)
    }
    
    // delete first item in request list
    denyReservation(message) {
        var requested = this.reservationRequests[0]
        requested.message = message
        this.reservationRequests.shift()
        console.log(`rezzie at ${this.name} for ${requested.patron.name}`,
                    `has been denied: "${message}".\n`)
    }

    hostEvent(name, date, maxAttendees){
        var newEvent = new FoodEvent(name, this, date, maxAttendees)
        this.eventsHosted.push(newEvent)
        return newEvent
    }

    // automatically add people who rated the restaurant 8 or higher to an event
    inviteTopFans(event) {    
        for (let i=0; i<this.ratings.length; i++) {
            if (this.ratings[i].rating > 8) {
                event.attendees.push(this.ratings[i].patron)
            }
        }
    }
} 
  
// create restaurants
allans = new Restaurant(name="Allan's Breakfast Club")
bricole = new Restaurant(name="Bricole")
gazzo = new Restaurant(name="Gazzo Pizza")

// create foodsnobs
karolin = new FoodSnob("Karolin")
ronnie = new FoodSnob("Ronnie")
david = new FoodSnob("David")

// let the food snobs do food things ...
// One of them makes brunch & dinner rezzies:
karolin.makeReservation(allans, "Oct 20th, 2019", "10:00 AM", 2) 
karolin.makeReservation(gazzo, "Oct 20th, 2019", "8:00 PM", 5)

// brunch, the most important meal of the day, thankfully, is promptly approved:
allans.approveReservation("looking forward to see u")

// put pizza was not in the stars:
gazzo.denyReservation("sorry y'all, we're already fully booked 2nite.")

// checking this FoodSnob's rezzie list to see if everything was saved properly:
for (let i=0; i<karolin.reservations.length; i++) {
    if (karolin.reservations[i].approved == true) {
        console.log("approved reservation: ", karolin.reservations[i], "\n")
    } else {
        console.log("denied reservation: ", karolin.reservations[i], "\n")
    }
}

/* 
Let's eat.
Every time a food snob goes to a restaurant, 
they MUST rate the restaurant on a scale of 1-10. 
(it's what they do.)
let's see how they like brunch at Allan's:
*/
karolin.visitRestaurant(allans, 8)
ronnie.visitRestaurant(allans, 5)

// Allan's ratings: 
console.log("Allan's Ratings: ", allans.ratings, "\n")
console.log("Allan's avg rating: ", allans.getAvgRating(), "\n")

// Let's try rating a restaurant more than 10:
karolin.visitRestaurant(gazzo, 12)
// doesn't work:
console.log("Karolin's ratings after illegal rating: ", karolin.ratings, "\n")

// One of the snobs returns to Allan's and upgrades their rating
karolin.visitRestaurant(allans, 9)
console.log("Karolin's updated rating, 2nd visit to Allan's: ", karolin.ratings, "\n")
console.log("Allan's new avg rating: ", allans.getAvgRating(), "\n")

// she adds some tags because she loves Allan's 
karolin.tagRestaurant(allans, ['brunch', 'french toast', 'mimosas'])
console.log("Allan's tags: ", allans.tags, "\n")

// tagging is fun, let's keep doing it:
karolin.tagRestaurant(bricole, ['casual fine dining', 'great wine list'])
console.log("Bricole's tags: ", bricole.tags, "\n")
// oh no, tagging denied because we haven't visited Bricole yet.

// Look, Allan's is hosting a food event:
var lobsterParty = allans.hostEvent("Lobster Roll Party", "Oct 21st, 2019", 20)
console.log("Events hosted by Allan's: ", allans.eventsHosted, "\n")

// the snobs need to go, obvi:
ronnie.attend(lobsterParty)
david.attend(lobsterParty)
console.log("Lobster party-goers after first sign up: ", lobsterParty.attendees, "\n")

// turns out, Ronnie can't make it to Lobster Roll night after all:
ronnie.cancelAttendance(lobsterParty)
console.log("David's events: ", david.eventsAttended, "\n")
console.log("Ronnie's events: ", ronnie.eventsAttended, "\n")
console.log("Lobster party-goers after cancellation: ", lobsterParty.attendees, "\n")

// this one's cancelling even though she never signed up:
karolin.cancelAttendance(lobsterParty)
// doesn't work.

/* Allan's really loves the people who give them good ratings:
if you've rated them 8 or better, they want to automatically 
add you to their lobster party attendee list to save you a spot: */
allans.inviteTopFans(lobsterParty)
console.log("Lobster Party goers (final): ", lobsterParty.attendees, "\n")

// trying to attend an event that is full:
var wineTasting = bricole.hostEvent("Natural Wine Tasting", "November 2nd, 2019", 2)
karolin.attend(wineTasting)
david.attend(wineTasting)
console.log("Attendees for wine tasting:", wineTasting.attendees, 
            "\nMax Attendees:", wineTasting.maxAttendees, "\n")
ronnie.attend(wineTasting)
