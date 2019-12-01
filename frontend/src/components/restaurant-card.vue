<script>
export default {
  name: 'RestaurantCard',
  props: ['restaurant'],
  computed: {
    restaurantUrl() {
      return `/restaurants/${this.restaurant._id}`
    }
  }
}
</script>

<template lang="pug">
article.card
  img(:src="`https://picsum.photos/300/200?random=${restaurant._id}`", alt="")
  h3.card-title 
    router-link(:to="restaurantUrl") {{ restaurant.name }} 
  p {{ restaurant.location.state }}
</template>

<style scoped>
.card {
  display: inline-block;
  text-align: left;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 3px;
  margin: 20px;
  min-width: 200px;
}
.card-title a {
  color: rgba(151, 42, 98, 0.9);
}
</style>