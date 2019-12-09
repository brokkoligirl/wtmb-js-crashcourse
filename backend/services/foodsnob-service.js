const BaseService = require('./base-service')
const FoodSnobModel = require('../models/foodsnob')

class FoodSnobService extends BaseService {
    model = FoodSnobModel


// const { writeFileSync } = require('fs')
// const ics = require('ics')
// const moment = require('moment')

//     // submit reservation request to restaurant
//     makeReservation(restaurant, resDate, resTime, numberOfPeople) {
//         // check if date input is valid
//         if ((moment(resDate, "YYYY-MM-DD", true).isValid()) && (moment(resTime, "HH:mm", true).isValid())) {
//             let newReservation = new Reservation(restaurant, this, resDate, resTime, numberOfPeople);
//             restaurant.reservationRequests.push(newReservation);
//             this.reservations.push(newReservation);
//             console.log(`Thank you ${this.snobName}, your reservation request for ${restaurant.restaurantName} has been submitted.\n`);
//         }
//         else {
//             console.log("invalid input:\nresDate format must be 'YYYY-MM-DD', \nresTime format must be 'HH:mm'")
//         }
//     }    
//     // generates .ics file for approved reservations at restaurantName
//     exportReservationCalFile(restaurantName, desc="", duration=120) {
//         let reservationFound = false;
//         for (let i=0; i < this.reservations.length; i++) {
//             if ((this.reservations[i].restaurant.restaurantName == restaurantName) && (this.reservations[i].approved === true)) {
//                 reservationFound = true;
//                 let rezzie = this.reservations[i];
//                 let t = new moment(`${rezzie.resDate} ${rezzie.resTime}`, "YYYY-MM-DD HH:mm");

//                 ics.createEvent({
//                     title: `Reservation at ${rezzie.restaurant.restaurantName}`,
//                     description: desc,
//                     start: [t.year(), t.month()+1, t.date(), t.hour(), t.minute()],
//                     location: rezzie.restaurant.restaurantName,
//                     status: 'CONFIRMED',
//                     busyStatus: 'BUSY',
//                     duration: { minutes: duration },
//                     productId: 'FoodSnob App'
//                   }, (error, value) => {
//                     if (error) {
//                       console.log(error)
//                     }
//                     writeFileSync(`${rezzie.restaurant.restaurantName}_${t.month()+1}_${t.date()}.ics`, value);
//                     console.log(`File: "${rezzie.restaurant.restaurantName}_${t.month()+1}_${t.date()}.ics" created.`)
//                   });
//                 }
//             }
//             if (reservationFound === false) {
//                 console.log(`no confirmed reservation for ${restaurantName} found.`)
//             }           
//         }

}        

module.exports = new FoodSnobService()
