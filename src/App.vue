<template>
  <div class="d-flex flex-column" id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['pseudo', 'port']),
    ...mapState('conversation', ['listener']),
    ...mapGetters('conversation', ['unread'])
  },
  methods: {
    ...mapActions('conversation', ['startListener']),
    ...mapActions(['init'])
  },
  created () {
    if (this.pseudo.length > 0 && this.port > 0) {
      if (this.listener === null) {
        this.startListener()
          .finally(() => {
            this.$router.push({ name: 'Conversations' })
          })
      }
    } else {
      this.$router.push({ name: 'Start' })
    }
  },
  watch: {
    unread (value) {
      const { app } = require('electron').remote
      app.setBadgeCount(value)
    }
  },
  mounted () {
    this.init()
  }
}
</script>
