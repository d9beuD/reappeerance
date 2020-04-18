<template>
  <b-list-group-item :to="{ name: 'Conversation', params: { id: conv.id }}" active-class="bg-200" class="px-1">
  <div class="row no-gutters align-items-center">
    <div class="col-auto">
      <b-avatar class="mr-1">
        {{ conv.identity.pseudo.charAt(0) }}
      </b-avatar>
    </div>
    <div class="col text-truncate" :style="{lineHeight: '1rem', minWidth: 0}">
      <div>
        {{ conv.identity.pseudo }}
      </div>
        <small class="text-muted">{{ lastMessage.content }}</small>
    </div>
    <div class="col-auto d-flex mr-1" v-if="(lastMessage.from != me) && (!lastMessage.read) && (this.conv.messages.length > 0)">
      <div class="rounded-pill bg-primary" :style="{height: '.5rem', width:'.5rem'}"></div>
    </div>
  </div>
</b-list-group-item>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    conv: {
      type: Object
    }
  },
  computed: {
    ...mapState('conversation', {
      me: 'identifier'
    }),
    lastMessage () {
      return (this.conv.messages.length > 0)
        ? this.conv.messages[this.conv.messages.length - 1] : ''
    }
  }
}
</script>
