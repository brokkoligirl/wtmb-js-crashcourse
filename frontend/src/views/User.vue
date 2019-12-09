<script>
// @ is an alias to /src
import RatingForm from '@/components/rating-form.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'user',
  components: {
      RatingForm
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    ...mapActions(['fetchUser'])
  },
  created() {
    this.fetchUser(this.$route.params.id)
    console.log(this)

  }
}
</script>

<template lang="pug">
  main
    h1 Details for {{ currentUser.name }}
    h5 Ratings:
    ul
        li(v-for="rating in currentUser.ratings") {{rating.rating}}/10 for {{rating.restaurant.name}} (visits: {{rating.visits}}) 
    
    rating-form(v-bind:user="currentUser")

    
    

</template>