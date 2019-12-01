<script>
// @ is an alias to /src
import UserCard from '@/components/user-card.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'users',
  components: {
    UserCard
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
    h1 All users
    user-card(v-for="user in users", :user='user')

</template>