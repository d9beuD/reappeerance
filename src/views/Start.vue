<template>
  <div class="start-container d-flex justify-content-center align-items-center">
    <b-card title="CoronaChat">
      <b-form @submit.prevent="startListener">
        <b-form-group label="Pseudo">
          <b-form-input class="rounded-pill" v-model.trim="pseudo" debounce="500" />
        </b-form-group>
        <b-form-group label="Port d'écoute">
          <b-form-input class="rounded-pill" type="number" v-model.trim="port" debounce="500" />
        </b-form-group>
        <div class="text-right">
          <b-button type="submit" variant="primary" pill>
            Prêt !
          </b-button>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    pseudo: {
      get () {
        return this.$store.state.pseudo
      },
      set (value) {
        this.setPseudo(value)
      }
    },
    port: {
      get () {
        return this.$store.state.port
      },
      set (value) {
        this.setPort(value)
      }
    }
  },
  methods: {
    ...mapMutations(['setPseudo', 'setPort']),
    ...mapActions('conversation', ['startListener'])
  }
}
</script>
