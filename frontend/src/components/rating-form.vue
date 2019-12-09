<script>
export default {
  name: 'RatingForm',
  props: ['user'],
  computed: {
    ratingURL() {
        console.log("state 2")
        console.log(this)
        return `http://localhost:3000/users/${this.user._id}/ratings`
      }
  }
  }

</script>

<template lang="pug">
    div
        h5 create a new rating:
        form(id="app" :action="ratingURL", method="post")
            input(id="restaurant_to_rate" type="string" placeholder="restaurant id" name="restaurantID" required)
            input(id="rating_field" type="number" placeholder="rating 1-10" name="rating" required)
            input(type="submit", value="submit rating")

</template>

<style scoped>

</style>