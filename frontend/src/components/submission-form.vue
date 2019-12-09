<script>
export default {
  name: 'SubmissionForm',
  }

</script>

<template lang="pug">
    div
        h5 Create new restaurant:
        form(id="app" action='http://localhost:3000/restaurants/submit', method="post")
            input(id="restaurant_field" type="text" name="name" placeholder="restaurant name")
            input(type="submit", value="submit restaurant")

</template>

<style scoped>

</style>