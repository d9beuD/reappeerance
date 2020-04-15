<template>
  <div class="stretch-scroll d-flex flex-column h-100">
    <div class="p-2 text-center bg-white border-bottom">
      {{ conversation.pseudo }}
    </div>
    <div class="stretch-scroll p-2">
      <div v-for="(message, index) in conversation.messages" :key="index">
        {{ message.content }}
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
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {
    ...mapGetters('conversation', ['getConversation']),
    conversation () {
      return this.getConversation(this.id)
    }
  },
  methods: {
    ...mapActions('conversation', ['sendMessage']),
    onSubmit () {
      this.sendMessage({ id: this.id, content: this.message })
      this.message = ''
    }
  }
}
</script>
