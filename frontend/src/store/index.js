import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0,
    restaurants: [],
    restaurant: {},
    users: [],
  },
  mutations: {
    SET_COUNTER(state, newCount) {
      state.counter = newCount
    },
    SET_RESTAURANTS(state, data) {
      state.restaurants = data
    },
    SET_USERS(state, data) {
      state.users = data
    },
    SET_RESTAURANT(state, data) {
      state.restaurant = data
    }
    
  },
  actions: {
    incrementCounter({ commit, state }) {
      const newCount = state.counter + 1
      commit('SET_COUNTER', newCount)
    },
    async fetchRestaurants({ commit }) {
      const result = await axios.get('http://localhost:3000/restaurants/json')
      commit('SET_RESTAURANTS', result.data)
    },
    async fetchRestaurant({ commit }, id) {
      const result = await axios.get(`http://localhost:3000/restaurants/${id}/json`)
      console.log(result.data)
      commit('SET_RESTAURANT', result.data)
    },
    async fetchUsers({ commit }) {
      const result = await axios.get('http://localhost:3000/users/json')
      commit('SET_USERS', result.data)
    }
  },
  modules: {
  }
})
