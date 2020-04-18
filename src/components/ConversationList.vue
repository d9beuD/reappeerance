<template>
  <b-list-group flush>
    <conversation-list-item
      v-for="conv in conversations"
      :key="conv.id"
      :conv="conv"
      />
  </b-list-group>
</template>

<script>
import { mapState } from 'vuex'
import ConversationListItem from './ConversationListItem'

export default {
  computed: {
    ...mapState('conversation', ['conversations'])
  },
  components: {
    ConversationListItem
  }
}
</script>
