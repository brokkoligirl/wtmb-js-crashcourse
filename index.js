const FoodSnob = require('./models/foodsnob')
const Restaurant = require('./models/restaurant')
const database = require('./database')

// create restaurants
allans = new Restaurant(name="Allan's Breakfast Club")
bricole = new Restaurant(name="Bricole")
gazzo = new Restaurant(name="Gazzo Pizza")

// create foodsnobs
karolin = new FoodSnob("Karolin")
ronnie = new FoodSnob("Ronnie")
david = new FoodSnob("David")

// let the food snobs do food things ...
karolin.makeReservation(allans, "2019-10-22", "10:00", 2) 
karolin.makeReservation(gazzo, "2019-10-22", "20:00", 5)

allans.approveReservation("looking forward to see u")
gazzo.denyReservation("sorry y'all, we're already fully booked 2nite.")

/* 
Every time a food snob goes to a restaurant, 
they MUST rate the restaurant on a scale of 1-10. 
*/
karolin.visitRestaurant(allans, 8)
ronnie.visitRestaurant(allans, 5)
karolin.visitRestaurant(allans, 9)
ronnie.visitRestaurant(gazzo, 4)
karolin.visitRestaurant(gazzo, 7)

// add tags to restaurant after eating there
karolin.tagRestaurant(allans, ['brunch', 'french toast', 'mimosas'])
console.log("Allan's tags: ", allans.tags, "\n")

// tagging is denied for restaurant not yet visited:
karolin.tagRestaurant(bricole, ['casual fine dining', 'great wine list'])
console.log("Bricole's tags: ", bricole.tags, "\n")

// restaurants can host a food event:
const lobsterParty = allans.hostEvent("Lobster Roll Party", "Oct 21st, 2019", 20)

// the snobs need to go, obvi:
ronnie.attend(lobsterParty)
david.attend(lobsterParty)

// turns out, Ronnie can't make it to Lobster Roll night after all:
ronnie.cancelAttendance(lobsterParty)
console.log("Lobster party-goers after cancellation: ", lobsterParty.eventAttendees, "\n")

// this one's cancelling even though she never signed up:
karolin.cancelAttendance(lobsterParty)
// doesn't work.

/* Allan's really loves the people who give them good ratings:
if you've rated them better than an 8, they want to automatically 
add you to their lobster party attendee list to save you a spot: */
allans.inviteTopFans(lobsterParty)
console.log("Lobster Party goers: ", lobsterParty.eventAttendees, "\n")

// trying to attend an event that is full:
const wineTasting = bricole.hostEvent("Natural Wine Tasting", "November 2nd, 2019", 2)
karolin.attend(wineTasting)
david.attend(wineTasting)
ronnie.attend(wineTasting)

// saving 
database.save('./exports/foodsnobs.json', [karolin, ronnie, david])
database.save('./exports/restaurants.json', [allans, bricole, gazzo])

// loading
console.log("Loaded data:\n", database.load('./exports/foodsnobs.json'))
const restaurants = database.load('./exports/restaurants.json')
console.log("Loaded data II:\n", restaurants[0])
console.log("Iterating over loaded data:\n")
restaurants.forEach(myfunc);
function myfunc(item) {
    console.log(item.restaurantName, "\n");
}

// generating an ics file of the reservation at certain restaurant
david.makeReservation(gazzo, "2020-01-03", "20:00", 3)
gazzo.approveReservation("a table will be ready for you")
david.exportReservationCalFile(gazzo.restaurantName)

ronnie.makeReservation(bricole, "19-02-2020", "20:00", 2)