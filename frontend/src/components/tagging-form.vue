<script>
export default {
  name: 'TaggingForm',
  props: ['restaurant'],
  computed: {
    submissionURL() {
      return `http://localhost:3000/restaurants/${this.restaurant._id}/tag`
    }
  }
}
</script>

<template lang="pug">
    div
        h5 Tag {{ restaurant.name }}:
        form(id="app" :action="submissionURL", method="post")
            input(id="restaurant_field" type="text" name="tags" placeholder="type in tag")
            input(type="submit", value="tag restaurant")

</template>

<style scoped>

</style>