<template>
  <b-list-group flush>
    <b-list-group-item
      v-for="conv in conversations"
      :key="conv.id"
      :to="{ name: 'Conversation', params: { id: conv.id }}"
      >
        <div class="row no-gutters align-items-center">
          <div class="col-auto">
            <b-avatar class="mr-1">
              {{ conv.pseudo.charAt(0) }}
            </b-avatar>
          </div>
          <div class="col" :style="{lineHeight: '1rem'}">
            <div>
              {{ conv.pseudo }}
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
