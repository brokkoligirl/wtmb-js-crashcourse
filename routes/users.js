const express = require('express');
const router = express.Router();
const FoodSnobService = require('../services/foodsnob-service')
const RestaurantService = require('../services/restaurant-service')
const RatingService = require('../services/rating-service')

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

router.post('/submit', async (req, res) => {
    const user = await FoodSnobService.add(req.body)
    res.send(user)
  })

router.post('/:id/submit-visit', async (req, res) => {
    console.log(req.body)
    const restaurantID = req.body.restaurantID
    const rating = parseInt(req.body.rating)
    const foodSnobID = req.params.id

    const restaurant = await RestaurantService.find(restaurantID)
    const foodSnob = await FoodSnobService.find(foodSnobID)

    RatingService.rateRestaurant(foodSnob, restaurant, rating)
    
    res.send(foodSnob)
  })

router.delete('/:id', async (req, res) => {
    await FoodSnobService.del(req.params.id)
    res.send('ok')
  })

module.exports = router;
