<template>
  <div class="stretch-scroll d-flex flex-column h-100">
    <div class="p-2 text-center bg-white border-bottom">
      {{ conversation.identity.pseudo }}
    </div>
    <div ref="scroll" class="stretch-scroll p-2">
      <message-list
        ref="container"
        :messages="conversation.messages"
        :identity="conversation.identity"
        :typing="conversation.typing" />
    </div>
    <div class="border-top p-2">
      <b-form @submit.prevent="onSubmit">
        <div class="row no-gutters">
          <div class="col">
            <b-form-input
              v-model="message"
              size="sm"
              class="rounded-pill"
              max="470"
              @keydown="typing"
              @keyup="typing" />
          </div>
          <div class="col-auto">
            <b-button type="submit" variant="link" size="sm">
              <font-awesome-icon :icon="[$store.state.family, 'paper-plane']" />
            </b-button>
          </div>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { debounce } from 'lodash'
import MessageList from '@/components/MessageList.vue'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      message: '',
      isTyping: false
    }
  },
  computed: {
    ...mapState('conversation', ['identifier', 'conversations']),
    ...mapState(['hasFocus']),
    conversation () {
      return this.conversations.find(conv => conv.id == this.id)
    },
  },
  methods: {
    ...mapActions('conversation', ['sendMessage', 'markAsRead', 'sendTyping']),
    onSubmit () {
      this.sendMessage({ id: this.id, content: this.message })
      this.message = ''
    },
    checkMessages () {
      this.conversation.messages.forEach(msg => {
        if (msg.from != this.identifier) {
          if (!msg.read) {
            this.markAsRead({
              conversation: this.conversation.id,
              message: msg.id
            })
          }
        }
      })
    }
  },
  watch: {
    'conversation.messages' () {
      this.$nextTick(() => {
        this.$refs.scroll.scrollTop = this.$refs.container.clientHeight + 20
      })

      if (this.hasFocus) {
        this.checkMessages()
      }
    },
    hasFocus (value) {
      if (value) {
        this.checkMessages()
      }
    },
    id () {
      this.checkMessages()
    }
  },
  created () {
    if (this.conversation == undefined) {
      this.$router.push({ name: 'Conversations' })
    } else {
      this.checkMessages()
    }

    this.typing = debounce(() => {
      this.isTyping = !this.isTyping
      this.sendTyping({conversation: this.id, isTyping: this.isTyping})
    }, 1000, {
      leading: true,
      trailing: true
    })
  },
  components: {
    MessageList
  }
}
</script>
