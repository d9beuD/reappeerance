<template>
  <div>
    <message-list-item
    v-for="(message, index) in messages"
    :key="message.id"
    :message="message"
    :index="index"
    :prev="messages[index - 1] || {from: null}"
    :identity="identity"
    :length="messages.length" />
    <transition
      appear
      :duration="{enter: 500, leave: 500}"
      >
      <message-list-item
        v-show="typing"
        :message="{ from: null }"
        :prev="{ from: null }"
        :index="0"
        :identity="identity"
        :length="0"
        :show="typing"
        >
          <div class="d-flex align-items-end" :style="{height: '1rem'}">
            <b-spinner type="grow" label="Loading..." :style="{height: spinnerSize, width: spinnerSize}" />
            <b-spinner type="grow" label="Loading..." :style="{height: spinnerSize, width: spinnerSize}" />
            <b-spinner type="grow" label="Loading..." :style="{height: spinnerSize, width: spinnerSize}" />
          </div>
      </message-list-item>
    </transition>
  </div>
</template>

<script>
import MessageListItem from './MessageListItem'

export default {
  props: {
    messages: {
      type: Array,
      required: true
    },
    identity: {
      type: Object,
      require: true
    },
    typing: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      spinnerSize: '.5rem'
    }
  },
  components: {
    MessageListItem
  }
}
</script>
