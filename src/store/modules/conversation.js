// import http from 'http'
// import Server from 'socket.io'

export default {
  namespaced: true,

  state: {
    conversations: [],
    listener: null,
    title: 'Nouvelle conversation'
  },

  getters: {
    lastId: (state) => {
      let bigger = 0

      state.conversations.map(conv => {
        if (conv.id > bigger) {
          bigger = conv.id
        }
      })

      return bigger
    },
    getConversation: (state) => (id) => {
      return state.conversations.find(conv => conv.id == id)
    }
  },

  mutations: {
    setListener: (state, payload) => {
      state.listener = payload
    },
    setTitle: (state, payload) => {
      state.title = payload
    },
    addConversation: (state, { id, listener }) => {
      state.conversations.push({
        id,
        listener,
        pseudo: '',
        messages: []
      })
    },
    setPseudo: (state, { conversation, pseudo }) => {
      state.conversations.find(conv => conv.id === conversation)
        .pseudo = pseudo
    },
    addMessage: (state, { conversation, from, content }) => {
      state.conversations.find(conv => conv.id === conversation)
        .messages.push({ from, content })
    },
    stopListener: (state) => {
      state.listener.close(true)
      state.listener = null
    }
  },

  actions: {
    startListener: ({ getters, commit, rootState }) => {
      return new Promise((resolve) => {
        const io = require('socket.io')(rootState.port, { serveClient: false })

        io.on('connection', function (socket) {
          const id = getters.lastId + 1

          socket.on('identity', data => {
            commit('setPseudo', {
              conversation: id,
              pseudo: data.pseudo
            })

            socket.emit('identity', { pseudo: rootState.pseudo })
          })

          socket.on('message', data => {
            const pseudo = getters.getConversation(id).pseudo
            commit('addMessage', {
              conversation: id,
              from: pseudo,
              content: data.content
            })
          })
          socket.on('disconnect', function () { })

          commit('addConversation', {
            id,
            listener: socket
          })
        })

        commit('setListener', io)
        resolve()
      })
    },

    startConversation: ({ getters, commit, rootState }, { address, port }) => {
      const id = getters.lastId + 1
      const socket = require('socket.io-client')(`http://${address}:${port}`)

      socket.on('identity', data => {
        commit('setPseudo', {
          conversation: id,
          pseudo: data.pseudo
        })
      })

      socket.on('connect', () => {
        socket.emit('identity', { pseudo: rootState.pseudo })

        commit('addConversation', {
          id,
          listener: socket
        })

      })

      socket.on('message', data => {
        const pseudo = getters.getConversation(id).pseudo
        commit('addMessage', {
          conversation: id,
          from: pseudo,
          content: data.content
        })
      })
    },

    sendMessage: ({ getters, commit }, { id, content }) => {
      getters.getConversation(id).listener.emit('message', { content })
      commit('addMessage', {
        conversation: id,
        from: 'me',
        content
      })
    }
  }
}
