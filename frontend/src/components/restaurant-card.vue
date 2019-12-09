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
  img(:src="`https://picsum.photos/200/140?random=${restaurant._id}`", alt="")
  h4.card-title 
    router-link(:to="restaurantUrl") {{ restaurant.name }} 
  p.subtitle(v-if="restaurant.location") {{ restaurant.location.state }}
</template>

<style scoped>
.card {
  display: inline-block;
  text-align: left;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 3px;
  margin: 8px;
  min-width: 50px;
}
.card-title a {
  color: rgba(151, 42, 98, 0.9);
}

.subtitle p {
  font-size: 12px;
}
</style>