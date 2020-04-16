<template>
  <b-list-group flush>
    <b-list-group-item
      class="px-1"
      v-for="conv in conversations"
      :key="conv.id"
      :to="{ name: 'Conversation', params: { id: conv.id }}"
      >
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
              <small>Message</small>
          </div>
        </div>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('conversation', ['conversations'])
  }
}
</script>
