<template>
  <div class="conversations-container row no-gutters stretch-scroll">
    <div class="col-auto bg-white d-flex flex-column border-right" :style="{width: '13rem'}">
      <div class="p-2 border-bottom row no-gutters">
        <div class="col">
          CoronaChat
        </div>
        <div class="col-auto">
          <b-link :to="{ name: 'Connect' }">
            <font-awesome-icon :icon="[$store.state.family, 'edit']" />
          </b-link>
        </div>
      </div>
      <div class="stretch-scroll">
        <conversation-list />
      </div>
      <div class="bg-white p-2 border-top">
        <b-link class="text-muted" :to="{ name: 'Settings' }">
          <font-awesome-icon :icon="['fas', 'cog']" />
        </b-link>
        <b-link class="text-muted mx-1" :to="{ name: 'Start' }" @click="stopListener">
          <font-awesome-icon :icon="['fas', 'power-off']" />
        </b-link>
      </div>
    </div>
    <div class="col d-flex flex-column">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import ConversationList from '@/components/ConversationList'

export default {
  computed: {
    ...mapState('conversation', ['title'])
  },
  methods: {
    ...mapMutations('conversation', ['stopListener'])
  },
  components: {
    ConversationList
  }
}
</script>
