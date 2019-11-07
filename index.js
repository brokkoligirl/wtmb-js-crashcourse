const FoodSnob = require('./models/foodsnob')
const Restaurant = require('./models/restaurant')
const FoodSnobService = require('./services/foodsnob-service')
const RestaurantService = require('./services/restaurant-service')

console.log("whaddup")

async function main() {

    const allans = new Restaurant("Allan's Breakfast Club")
    const bricole = new Restaurant("Bricole")
    const gazzo = new Restaurant("Gazzo Pizza")

    const karolin = new FoodSnob("Karolin")
    const ronnie = new FoodSnob("Ronnie")
    const david = new FoodSnob("David")

    karolin.makeReservation(allans, "2019-10-22", "10:00", 2) 
    karolin.makeReservation(gazzo, "2019-10-22", "20:00", 5)

    allans.approveReservation("looking forward to see u")
    gazzo.denyReservation("sorry y'all, we're already fully booked 2nite.")

    karolin.visitRestaurant(allans, 8)
    ronnie.visitRestaurant(allans, 5)
    karolin.visitRestaurant(allans, 9)
    ronnie.visitRestaurant(gazzo, 4)
    karolin.visitRestaurant(gazzo, 7)

    // generating an ics file of the reservation at certain restaurant
    david.makeReservation(gazzo, "2020-01-03", "20:00", 3)
    gazzo.approveReservation("a table will be ready for you")
    david.exportReservationCalFile(gazzo.restaurantName)

    await FoodSnobService.add(karolin)
    await FoodSnobService.add(david)
    await FoodSnobService.add(ronnie)

    await RestaurantService.add(gazzo)
    await RestaurantService.add(allans)

    const people = await FoodSnobService.findAll()

    console.log(people)

    await FoodSnobService.del(1)

    const newPeople = await FoodSnobService.findAll()
    
    console.log(newPeople[0].snobName)
}


main()

