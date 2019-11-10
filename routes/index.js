
const express = require('express')
const router = express.Router();
const RestaurantService = require('../services/restaurant-service')

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('index', { title: 'Foodsnob Homepage' });
});

// restaurant functionality
router.get('/restaurants', async (req, res) => {
    const restaurants = await RestaurantService.findAll()
    res.render('restaurants', { restaurants: restaurants }) 
})

router.get('/restaurants/:id', async (req, res) => {
    const id = req.params.id
    const restaurant = await RestaurantService.find(id)
    res.render('restaurants', { restaurant: restaurant })
})

router.post('/submit-restaurant', async (req, res) => {
    await RestaurantService.add(req.body)
    res.send('ok')
  })
  
router.delete('/restaurants/:id', async (req, res) => {
    const restaurant = await RestaurantService.del(req.params.id)
    res.send('ok')
  })

module.exports = router;