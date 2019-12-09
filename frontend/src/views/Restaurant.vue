<script>
// @ is an alias to /src
import TaggingForm from '@/components/tagging-form.vue'
import RestaurantMap from '@/components/restaurant-map.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'restaurant',
  components: {
    TaggingForm,
    RestaurantMap
  },
  computed: {
    ...mapState(['resto'])
  },
  methods: {
    ...mapActions(['fetchRestaurant'])
  },
  created() {
    this.fetchRestaurant(this.$route.params.id)
    console.log(this)
  }
}
</script>

<template lang="pug">
  main
    h1 Details for {{resto.restaurant.name}}  
    p.rest-id id: {{resto.restaurant._id}}   
    h5 Average Rating: {{resto.avgRating}}
     
    h5(v-if="resto.restaurant.ratings.length != 0") Ratings:
    ul
        li(v-for="rating in resto.restaurant.ratings") {{rating.rating}}/10 from {{rating.patron.name}}   
    
    h5(v-if="resto.restaurant.tags != 0") Tags: 
    ul
        li(v-for="tag in resto.restaurant.tags") {{tag}}   
    hr

    tagging-form(v-bind:restaurant="resto.restaurant")
    hr
    restaurant-map(v-bind:restaurant="resto.restaurant.location")
    hr
    

</template>

<style scoped>

p.rest-id {
    font-size: 12px;
    font-style: italic
};
</style>