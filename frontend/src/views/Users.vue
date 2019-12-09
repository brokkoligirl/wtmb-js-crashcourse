<script>
// @ is an alias to /src
import UserCard from '@/components/user-card.vue'
import UserForm from '@/components/user-form.vue'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'users',
  components: {
    UserCard, UserForm
  },
  computed: {
    ...mapState(['users'])
  },
  methods: {
    ...mapActions(['fetchUsers'])
  },
  created() {
    this.fetchUsers()
  }
}
</script>

<template lang="pug">
  main
    user-form

    h1 All users
    user-card(v-for="user in users", :user='user')

</template>