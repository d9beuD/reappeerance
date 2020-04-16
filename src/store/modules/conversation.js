import { PUBLIC_KEY, PRIVATE_KEY, encrypt, decrypt, identifier, getUniqueId } from '@/crypto'

const CONVERSATIONS = 'app.conversations'

export default {
  namespaced: true,

  state: {
    conversations: localStorage.getItem(CONVERSATIONS) || [],
    listener: null,
    title: 'Nouvelle conversation',
    identifier
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

    addConversation: (state, { id, pseudo, identifier, publicKey, listener }) => {
      console.log(listener)
      const conv = state.conversations.find(c => c.identity.identifier === identifier)
      if (conv !== undefined) {
        conv.identify = {
          pseudo,
          identifier,
          publicKey
        }
      } else {
        state.conversations.push({
          id,
          identity: {
            pseudo,
            identifier,
            publicKey
          },
          listener,
          messages: []
        })
      }
    },

    addMessage: (state, { conversation, from, content }) => {
      state.conversations.find(conv => conv.id === conversation)
        .messages.push({ from, content })
    },

    stopListener: (state) => {
      state.listener.close(true)
      state.listener = null
    },
  },

  actions: {
    startListener: ({ getters, commit, dispatch, rootState }) => {
      return new Promise((resolve) => {
        const io = require('socket.io')(rootState.port, { serveClient: false })

        io.on('connection', function (socket) {
          const id = getUniqueId()

          socket.on('identity', data => {
            dispatch('addConversation', {
              id,
              pseudo: data.pseudo,
              identifier: data.identifier,
              publicKey: data.publicKey,
              listener: socket
            })

            dispatch('sendIdentity', socket)
          })

          socket.on('message', data => {
            const pseudo = getters.getConversation(id).identity.identifier
            dispatch('addMessage', {
              conversation: id,
              user: pseudo,
              content: decrypt(data.content, localStorage.getItem(PRIVATE_KEY)),
              id: data.id
            })
          })
          socket.on('disconnect', function () { })
        })

        commit('setListener', io)
        resolve()
      })
    },

    startConversation: ({ getters, dispatch }, { address, port }) => {
      const id = getUniqueId()
      const socket = require('socket.io-client')(`http://${address}:${port}`)

      socket.on('connect', () => {
        dispatch('sendIdentity', socket)

      })

      socket.on('identity', data => {
        dispatch('addConversation', {
          id,
          pseudo: data.pseudo,
          identifier: data.identifier,
          publicKey: data.publicKey,
          listener: socket
        })
      })

      socket.on('message', data => {
        const user = getters.getConversation(id).identity.identifier
        dispatch('addMessage', {
          conversation: id,
          id: data.id,
          user,
          content: decrypt(data.content, localStorage.getItem(PRIVATE_KEY))
        })
      })
    },

    sendMessage: ({ getters, dispatch }, { id, content }) => {
      dispatch('addMessage', {
        conversation: id,
        user: identifier,
        content,
        id: getUniqueId()
      })

      content = encrypt(content, getters.getConversation(id).identity.publicKey)
      getters.getConversation(id).listener.emit('message', { content })
    },

    sendIdentity: ({ rootState }, socket) => {
      socket.emit('identity', {
        pseudo: rootState.pseudo,
        publicKey: localStorage.getItem(PUBLIC_KEY),
        identifier
      })
    },

    addConversation: ({ commit }, data) => {
      console.log(data)
      commit('addConversation', {
        id: data.id,
        pseudo: data.pseudo,
        identifier: data.identifier,
        publicKey: data.publicKey,
        listener: data.listener
      })
    },

    addMessage: ({ commit }, { conversation, id, user, content }) => {
      commit('addMessage', {
        conversation,
        id,
        from: user,
        content
      })
    }
  }
}
