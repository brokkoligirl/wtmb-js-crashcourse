<script>
// @ is an alias to /src
import RestaurantCard from '@/components/restaurant-card.vue'
import SubmissionForm from '@/components/submission-form.vue'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'restaurants',
  components: {
    RestaurantCard, SubmissionForm
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
    submission-form

    h1 All restaurants
    h4 Where y'all are eating:
    restaurant-card(v-for="restaurant in restaurants", :restaurant='restaurant')

</template>