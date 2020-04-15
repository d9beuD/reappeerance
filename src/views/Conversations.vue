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
      </div>
    </div>
    <div class="col d-flex flex-column">
      <div class="p-2 text-center bg-white border-bottom">
        {{ title }}
      </div>
      <div class="stretch-scroll">
        <router-view />
      </div>
      <div class="border-top p-2">
        <b-form-input size="sm" class="rounded-pill" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('conversation', ['title'])
  }
}
</script>
