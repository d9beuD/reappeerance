<template>
  <div class="stretch-scroll d-flex flex-column h-100">
    <div class="p-2 text-center bg-white border-bottom">
      {{ conversation.identity.pseudo }}
    </div>
    <div ref="scroll" class="stretch-scroll p-2">
      <div ref="container">
        <div
          v-for="(message, index) in conversation.messages"
          :key="index"
          >
          <div
            class="d-flex"
            :class="{'justify-content-end': message.from ==identifier, 'mt-2': (index > 0 ? conversation.messages[index - 1].from != message.from ? true:false:false)}"
            >
            <div v-if="message.from != identifier">
              <b-avatar class="mr-1" :text="conversation.identity.pseudo.charAt(0)" size="2rem" />
            </div>
            <div
              class="px-2 py-1 border border-light"
              :class="['bg-' + (message.from == identifier ? 'primary':'300'), 'text-' + (message.from == identifier ? 'white':'dark')]"
              :style="{borderRadius: '15px', maxWidth: '75%'}"
              >
              {{ message.content }}
            </div>
          </div>
          <div
            v-if="(index + 1) == conversation.messages.length"
            class="w-100 text-right pr-1"
            :style="{lineHeight: '.9rem'}"
            >
            <small v-if="message.from == identifier && message.read" class="text-muted">
              Lu
            </small>
          </div>
        </div>
      </div>
    </div>
    <div class="border-top p-2">
      <b-form @submit.prevent="onSubmit">
        <div class="row no-gutters">
          <div class="col">
            <b-form-input v-model="message" size="sm" class="rounded-pill" />
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

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      message: ''
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
    ...mapActions('conversation', ['sendMessage', 'markAsRead']),
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
        this.$refs.scroll.scrollTop = this.$refs.container.clientHeight
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
    }
  }
}
</script>
