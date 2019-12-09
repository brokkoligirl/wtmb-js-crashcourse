<script>
export default {
  name: 'UserCard',
  props: ['user'],
  computed: {
    userUrl() {
      return `/users/${this.user._id}`
    }
  }
}
</script>

<template lang="pug">
article.card
  img(:src="`https://picsum.photos/200/140?random=${user._id}`", alt="")
  h1.card-title 
    router-link(:to="userUrl") {{ user.name }} 
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
</style>