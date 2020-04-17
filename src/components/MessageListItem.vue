<template>
    <div>
      <div
        class="d-flex"
        :class="{'justify-content-end': fromMe, 'mt-2': (index > 0 && prev.from != message.from)}"
        >
        <transition name="bounce" appear>
          <div v-if="message.from != identifier" v-show="show">
            <b-avatar class="mr-1" :text="identity.pseudo.charAt(0)" size="2rem" />
          </div>
        </transition>
        <transition name="bounce" appear>
          <div
            class="px-2 py-1 border border-light"
            v-show="show"
            :class="['bg-' + (fromMe ? 'primary':'300'), 'text-' + (fromMe ? 'white':'dark')]"
            :style="{borderRadius: '15px', maxWidth: '75%'}"
            >
            <slot>
              {{ message.content }}
            </slot>
          </div>
        </transition>
      </div>
      <div
        v-if="(index + 1) == length"
        class="w-100 text-right pr-1"
        :style="{lineHeight: '.9rem'}"
        >
        <small v-if="message.from == identifier && message.read" class="text-muted">
          Lu
        </small>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    message: {
      type: Object,
      required: true
    },
    prev: {
      type: Object,
      required: true
    },
    identity: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    length: {
      type: Number,
      required: false,
      default: 0
    },
    show: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  computed: {
    ...mapState('conversation', ['identifier']),
    fromMe () {
      return this.message.from == this.identifier
    }
  }
}
</script>
