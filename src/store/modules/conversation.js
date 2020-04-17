import { PUBLIC_KEY, PRIVATE_KEY, encrypt, decrypt, identifier, getUniqueId } from '@/crypto'
import { notify } from '@/notifier'

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
    getConversation: (state) => (id) => {
      return state.conversations.find(conv => conv.id == id)
    },

    getMessage: (state) => ({ conversation, message }) => {
      return state.conversations.find(conv => conv.id === conversation)
        .messages.find(msg => msg.id === message)
    },

    unread: (state) => {
      let count = 0

      state.conversations.map(conv => {
        conv.messages.map(msg => {
          if (!msg.read) {
            count += 1
          }
        })
      })

      return count
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
      const conv = state.conversations.find(c => c.identity.identifier === identifier)
      if (conv !== undefined) {
        conv.identity = {
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

    addMessage: (state, { conversation, from, content, id }) => {
      state.conversations.find(conv => conv.id === conversation)
        .messages.push({ from, content, id, read: false, timestamp: new Date().getTime() })

      state.conversations.sort((a, b) => {
        if (a.messages.length > 0) {
          if (b.messages.length > 0) {
            return b.messages[b.messages.length - 1].timestamp
              - a.messages[a.messages.length - 1].timestamp
          }

          return -1
        }

        return 1
      })
    },

    stopListener: (state) => {
      state.listener.close(true)
      state.listener = null
    },

    markAsRead: (state, { conversation, message }) => {
      state.conversations.find(conv => conv.id === conversation)
        .messages.find(msg => msg.id === message).read = true
    }
  },

  actions: {
    startListener: ({ commit, dispatch, rootState }) => {
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
            }).then(() => {
              dispatch('setEvents', { socket, convId: id })
            })

            dispatch('sendIdentity', socket)
          })

          socket.on('disconnect', function () { })
        })

        commit('setListener', io)
        resolve()
      })
    },

    startConversation: ({ dispatch }, { address, port }) => {
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
        }).then(() => {
          dispatch('setEvents', { socket, convId: id })
        })
      })
    },

    setEvents: ({ getters, dispatch }, { socket, convId }) => {
      const user = getters.getConversation(convId).identity

      socket.on('message', ({ content, id }) => {
        content = decrypt(content, localStorage.getItem(PRIVATE_KEY))

        dispatch('addMessage', {
          conversation: convId,
          id,
          user: user.identifier,
          content
        })

        notify(user.pseudo, {
          body: content
        })
      })

      socket.on('read', ({ message }) => {
        dispatch('markAsRead', { conversation: convId, message })
      })
    },

    sendMessage: ({ getters, dispatch }, { id, content }) => {
      const msgId = getUniqueId()
      dispatch('addMessage', {
        conversation: id,
        user: identifier,
        content,
        id: msgId
      })

      content = encrypt(content, getters.getConversation(id).identity.publicKey)
      getters.getConversation(id).listener.emit('message', { content, id: msgId })
    },

    sendIdentity: ({ rootState }, socket) => {
      socket.emit('identity', {
        pseudo: rootState.pseudo,
        publicKey: localStorage.getItem(PUBLIC_KEY),
        identifier
      })
    },

    addConversation: ({ commit }, data) => {
      return new Promise((resolve) => {
        commit('addConversation', {
          id: data.id,
          pseudo: data.pseudo,
          identifier: data.identifier,
          publicKey: data.publicKey,
          listener: data.listener
        })
        resolve()
      })
    },

    addMessage: ({ commit }, { conversation, id, user, content }) => {
      commit('addMessage', {
        conversation,
        id,
        from: user,
        content
      })
    },

    markAsRead: ({ getters, commit }, { conversation, message }) => {
      const msg = getters.getMessage({ conversation, message })
      const conv = getters.getConversation(conversation)

      if (msg.from !== identifier) {
        conv.listener.emit('read', {
          message
        })
      }

      commit('markAsRead', {
        conversation,
        message
      })
    }
  }
}
