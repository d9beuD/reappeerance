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
    addMessage: (state, { conversation, from, content }) => {
      state.conversations.find(conv => conv.id === conversation)
        .messages.push({ from, content })
    }
  },

  actions: {
    startListener: ({ commit, rootState }) => {
      // const app = http.createServer(() => {})
      // app.listen(rootState.port)
      // const io = new Server(app, { serveClient: false })

      // io.on('connection', socket => {
      //   socket.emit('hello')
      //   socket.on('hello', data => {
      //     alert(data)
      //   })
      // })

      const io = require('socket.io')(rootState.port, { serveClient: false })

      io.on('connection', function (socket) {
        alert(socket)
        socket.on('message', function () { })
        socket.on('disconnect', function () { })
      })

      commit('setListener', io)
    },

    startConversation: ({ getters, commit }, { address, port }) => {
      console.log(address)

      const newId = getters.lastId + 1
      const socket = require('socket.io-client')(`http://${address}:${port}`)

      socket.on('connect', () => {
        commit('addConversation', {
          id: newId,
          listener: socket
        })

        alert(socket)
      })
    }
  }
}
