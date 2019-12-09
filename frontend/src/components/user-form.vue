<script>
export default {
  name: 'UserForm',
  }

</script>

<template lang="pug">
    div
        h5 Create new user:
        form(id="app" action='http://localhost:3000/users/new', method="post")
            input(id="user_field" type="text" name="name")
            input(type="submit", value="create user")

</template>

<style scoped>

</style>