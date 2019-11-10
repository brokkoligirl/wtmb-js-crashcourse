
const express = require('express')
const bodyParser = require('body-parser')
const FoodSnobService = require('./services/foodsnob-service')
const RestaurantService = require('./services/restaurant-service')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(express.static('public'));
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index')
})

// foodsnob functionality
app.get('/foodsnobs', async (req, res) => {
  const people = await FoodSnobService.findAll()
  res.render('foodsnobs', { people: people })
})

app.get('/foodsnobs/:id', async (req, res) => {
  const id = req.params.id
  const person = await FoodSnobService.find(id)
  res.render('foodsnobs', { person: person })
})

app.post('/foodsnob', async (req, res) => {
  const person = await FoodSnobService.add(req.body)
  res.send(person)
})

app.delete('/foodsnobs/:id', async (req, res) => {
  const person = await FoodSnobService.del(req.params.id)
  res.send('ok')
})

// visit & rate restaurant, update database
app.post('/visit/:restaurant/:rating/:foodsnob', async (req, res) => {
    console.log(req.body)
    const restaurantID = req.params.restaurant
    const rating = parseInt(req.params.rating)
    const foodSnobID = req.params.foodsnob

    const restaurant = await RestaurantService.find(restaurantID)
    const foodSnob = await FoodSnobService.find(foodSnobID)
    foodSnob.visitRestaurant(restaurant, rating)

    RestaurantService.update(restaurant, restaurantID);
    FoodSnobService.update(foodSnob, foodSnobID);

    res.send('ok')
})


// restaurant functionality
app.get('/restaurants', async (req, res) => {
    const restaurants = await RestaurantService.findAll()
    res.render('restaurants', { restaurants: restaurants }) 

})

app.get('/restaurants/:id', async (req, res) => {
    const id = req.params.id
    const restaurant = await RestaurantService.find(id)
    res.render('restaurants', { restaurant: restaurant })
})

app.post('/restaurant', async (req, res) => {
    const restaurant = await RestaurantService.add(req.body)
    res.send(restaurant)
  })
  
  app.delete('/restaurants/:id', async (req, res) => {
    const restaurant = await RestaurantService.del(req.params.id)
    res.send('ok')
  })


app.listen(port, () => {
  console.log('server listening')
})