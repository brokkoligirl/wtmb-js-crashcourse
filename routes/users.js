const express = require('express');
const router = express.Router();
const FoodSnobService = require('../services/foodsnob-service')
const RestaurantService = require('../services/restaurant-service')

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

router.post('/submit-user', async (req, res) => {
    await FoodSnobService.add(req.body)
    res.send('ok')
  })

router.post('/submit-visit', async (req, res) => {
    console.log(req.body)
    const restaurantID = req.body.restaurantID
    const rating = parseInt(req.body.rating)
    const foodSnobID = req.body.snobID

    const restaurant = await RestaurantService.find(restaurantID)
    const foodSnob = await FoodSnobService.find(foodSnobID)
    foodSnob.visitRestaurant(restaurant, rating)
  
    RestaurantService.update(restaurant, restaurantID);
    FoodSnobService.update(foodSnob, foodSnobID);
    
    res.send('done')
  })

router.delete('/del/:id', async (req, res) => {
    await FoodSnobService.del(req.params.id)
    res.send('ok')
  })

module.exports = router;
