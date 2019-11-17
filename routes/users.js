const express = require('express');
const router = express.Router();

const FoodSnobService = require('../services/foodsnob-service')
const RestaurantService = require('../services/restaurant-service')
const RatingService = require('../services/rating-service')
const ReservationService = require('../services/reservation-service')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const people = await FoodSnobService.findAll()
  res.render('foodsnobs', { people: people })
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const person = await FoodSnobService.find(id)
  res.render('foodsnobs', { person: person })
})

router.post('/new', async (req, res) => {
  const user = await FoodSnobService.add(req.body)
  res.send(user)
})

// submit new rating
router.post('/:id/ratings', async (req, res) => {
  const rating = parseInt(req.body.rating)
  const restaurant = await RestaurantService.find(req.body.restaurantID)
  const foodSnob = await FoodSnobService.find(req.params.id)
  
  RatingService.rateRestaurant(foodSnob, restaurant, rating)
  res.send(foodSnob)
})

// save new rezzie
router.post('/:id/reservations', async (req, res) => {
  const patron = await FoodSnobService.find(req.params.id)
  const restaurant = await RestaurantService.find(req.body.restaurantID)
  const date = ReservationService.convertDate(req.body.date, req.body.time)
  
  const newRezzie = {
    "restaurant": restaurant,
    "patron": patron,
    "date": date,
    "partySize": parseInt(req.body.partySize)
  }

  await ReservationService.saveReservation(patron, newRezzie)

  res.send("rezzie saved")
})

router.delete('/:id', async (req, res) => {
  await FoodSnobService.del(req.params.id)
  res.send('ok')
})

module.exports = router;
