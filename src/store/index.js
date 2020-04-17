import Vue from 'vue'
import Vuex from 'vuex'
import { ipcRenderer, remote } from 'electron'

import conversation from './modules/conversation'

Vue.use(Vuex)

const ICON_FAMILY = 'app.iconFamily'
const PSEUDO = 'app.pseudo'
const PORT = 'app.port'

export default new Vuex.Store({
  state: {
    family: localStorage.getItem(ICON_FAMILY) || 'fad',
    pseudo: localStorage.getItem(PSEUDO) || '',
    port: localStorage.getItem(PORT) || 3000,
    hasFocus: true
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

    setFocus: (state, payload) => {
      state.hasFocus = payload
    }
  },
  actions: {
    init: ({ commit }) => {
      ipcRenderer.send('init')

      ipcRenderer.on('focus', () => {
        commit('setFocus', true)
      })

      ipcRenderer.on('blur', () => {
        commit('setFocus', false)
      })

      commit('setFocus', remote.getCurrentWindow().isFocused())
    }
  },
  modules: {
    conversation
  }
})
