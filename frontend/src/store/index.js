import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0,
    restaurants: [],
    resto: {},
    users: [],
    currentUser: {},
  },
  mutations: {
    SET_COUNTER(state, newCount) {
      state.counter = newCount
    },
    SET_RESTAURANTS(state, restaurants) {
      state.restaurants = restaurants
    },
    SET_USERS(state, users) {
      state.users = users
    },
    SET_USER(state, user) {
      state.currentUser = user
    },
    SET_RESTAURANT(state, restaurant) {
      state.resto = restaurant
    },
    
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
      commit('SET_RESTAURANT', result.data)
    },
    async fetchUsers({ commit }) {
      const result = await axios.get('http://localhost:3000/users/json')
      commit('SET_USERS', result.data)
    },
    async fetchUser({ commit }, id) {
      const result = await axios.get(`http://localhost:3000/users/${id}/json`)
      commit('SET_USER', result.data)
    },
  },
  modules: {
  }
})
