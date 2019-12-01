<script>
// @ is an alias to /src
import RestaurantCard from '@/components/restaurant-card.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'restaurants',
  components: {
    RestaurantCard
  },
  computed: {
    ...mapState(['restaurants'])
  },
  methods: {
    ...mapActions(['fetchRestaurants'])
  },
  created() {
    this.fetchRestaurants()
  }
}
</script>

<template lang="pug">
  main
    h1 All restaurants
    h4 Where y'all are eating:
    restaurant-card(v-for="restaurant in restaurants", :restaurant='restaurant')

</template>