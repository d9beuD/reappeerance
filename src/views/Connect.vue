<template>
  <div class="h-100 d-flex justify-content-center align-items-center">
    <b-card>
      <b-form @submit.prevent="onSubmit">
        <b-form-group label="Adresse">
          <b-form-input v-model.trim="address" />
        </b-form-group>
        <b-form-group label="Port">
          <b-form-input type="number" v-model.number="port" />
        </b-form-group>
        <div class="text-right">
          <b-button type="submit" variant="primary" pill>
            Se connecter
          </b-button>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      address: '',
      port: 3000
    }
  },
  methods: {
    ...mapActions('conversation', ['startConversation']),
    onSubmit () {
      this.startConversation({
        address: this.address,
        port: this.port
      })
    }
  }
}
</script>
