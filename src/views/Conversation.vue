<template>
  <div class="stretch-scroll d-flex flex-column h-100">
    <div class="p-2 text-center bg-white border-bottom">
      {{ conversation.pseudo }}
    </div>
    <div class="stretch-scroll p-2">

    </div>
    <div class="border-top p-2">
      <b-form>
        <div class="row no-gutters">
          <div class="col">
            <b-form-input size="sm" class="rounded-pill" />
          </div>
          <div class="col-auto">
            <b-button type="submit" variant="link" size="sm">
              <font-awesome-icon :icon="[$store.state.family, 'paper-plane']" />
            </b-button>
          </div>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters('conversation', ['getConversation']),
    conversation () {
      return this.getConversation(this.id)
    }
  }
}
</script>
