<template>
  <v-snackbar
    v-model="show"
    :top="top"
    :color="color"
    :timeout="timeout"
  >
    {{ message }}
    <template #action="{ attrs }">
      <v-btn
        text
        v-bind="attrs"
        @click.native="show = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Snackbar',
  data () {
    return {
      show: false,
      top: true,
      message: '',
      color: '',
      timeout: 5000
    }
  },
  created () {
    this.$store.watch(
      (state) => state.snackbar.snack,
      (value) => {
        const { message } = value

        if (message) {
          this.show = true
          this.message = message
          this.timeout = value.timeout

          this.color = value.color
          this.$store.commit('snackbar/setSnack')
        }
      }
    )
  }
})
</script>
