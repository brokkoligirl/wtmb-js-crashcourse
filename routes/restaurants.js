const express = require('express');
const router = express.Router();
const RestaurantService = require('../services/restaurant-service')

// restaurant endpoints
router.get('/', async (req, res) => {
    const restaurants = await RestaurantService.findAll()
    res.render('restaurants', { restaurants: restaurants }) 
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const restaurant = await RestaurantService.find(id)
    const avgRating = await restaurant.getAvgRating()

    res.render('restaurants', { 
      restaurant: restaurant, 
      avgRating: avgRating, 
    })
})

// add new restaurant
router.post('/submit', async (req, res) => {
    await RestaurantService.getRestaurantCoords(req.body)
    await RestaurantService.add(req.body)
    res.send(req.body)
  })

router.post('/:id/tag', async (req, res) => {
    const restaurant = await RestaurantService.find(req.params.id)
    await RestaurantService.tagRestaurant(restaurant, req.body.tags)
    res.send(req.body)
  })
  
router.delete('/:id', async (req, res) => {
    await RestaurantService.del(req.params.id)
    res.send('ok')
  })


module.exports = router;