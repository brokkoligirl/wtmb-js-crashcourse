<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex'

export default {
  name: 'restaurant',
  computed: {
    ...mapState(['restaurant'])
  },
  methods: {
    ...mapActions(['fetchRestaurant'])
  },
  created() {
    this.fetchRestaurant(this.$route.params.id)
  }
}
</script>

<template lang="pug">
  main
    h1 Details for {{restaurant.restaurant.name}}    
    h5 Average Rating: {{restaurant.avgRating}}
    p {{restaurant.restaurant._id}}  
    h4 Ratings:
    ul
        li(v-for="rating in restaurant.restaurant.ratings") {{rating.rating}}/10 from {{rating.patron.name}}   
    hr
    h4 Tags: 
    ul
        li(v-for="tag in restaurant.restaurant.tags") {{tag}}   
    hr
    //- #mapid
    //-     script(src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js" integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og==" crossorigin="")                
    //-     script(type='text/javascript')   
    //-         | const restaurant = !{JSON.stringify(restaurant.restaurant.location)}
    //-     script(src="./public/javascripts/restaurant-map.js")
    //- hr
    //- h5 tag restaurant 
    //-     form(action=`/restaurants/${restaurant.restaurant._id}/tag`, method="post")
    //-         label tags
    //-         div: input(id="restaurant_field" type="text" name="tags")

    //-         input(type="submit", value="tag restaurant")

</template>