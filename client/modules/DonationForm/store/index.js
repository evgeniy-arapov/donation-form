import Vuex from 'vuex'
import Vue from 'vue'
import * as api from '@/services/api'

Vue.use(Vuex)

const defaultState = () => ({
  currencies: []
})

export default new Vuex.Store({
  state: defaultState(),

  getters: {},

  actions: {
    async getCurrencies({ commit }) {
      const { data } = await api.getCurrencies()
      commit('setCurrencies', data)
    },

    async donate(context, { amount, currency }) {
      await api.donate({amount, currency})
    }
  },

  mutations: {
    setCurrencies(state, payload) {
      state.currencies = payload
    }
  }
})
