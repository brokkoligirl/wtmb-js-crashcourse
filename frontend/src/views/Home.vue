<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'home',
  computed: {
    ...mapState(['counter'])
  },
  methods: {
    ...mapActions(['incrementCounter'])
  },
  created() {
    this.incrementCounter()
  }
}
</script>

<template lang="pug">
  main
    h1 Bless up and brunch, y'all
    button(@click="incrementCounter") Brunch
    div {{ counter }}
    img(width='480', height='270', src='/images/mimosas.gif')
    p [prayer emoji] 
    a(href="http://www.github.com/brokkoligirl" target="_blank") 🥂🥂🥂
         

</template>

