import Vue from 'vue'
import Vuex from 'vuex'

import conversation from './modules/conversation'

Vue.use(Vuex)

const ICON_FAMILY = 'app.iconFamily'
const PSEUDO = 'app.pseudo'
const PORT = 'app.port'

export default new Vuex.Store({
  state: {
    family: localStorage.getItem(ICON_FAMILY) || 'fad',
    pseudo: localStorage.getItem(PSEUDO) || '',
    port: localStorage.getItem(PORT) || 3000
  },
  mutations: {
    setFamily: (state, payload) => {
      state.family = payload
      localStorage.setItem(ICON_FAMILY, payload)
    },
    setPseudo: (state, payload) => {
      state.pseudo = payload
      localStorage.setItem(PSEUDO, payload)
    },
    setPort: (state, payload) => {
      state.port = payload
      localStorage.setItem(PORT, payload)
    },
  },
  actions: {
  },
  modules: {
    conversation
  }
})
