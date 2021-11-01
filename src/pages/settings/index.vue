<template>
  <v-container>
    <h2 class="text-2xl mb-1">Currency</h2>
    <v-select
      outlined
      dense
      v-model="selectedCurrency"
      @change="changeCurrency"
      :items="currencies"
    ></v-select>
    <v-switch v-model="darkMode" label="Dark Mode" @change="toggleDarkMode" />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      darkMode: this.$store.state.settings.theme === 'dark',
      currencies: ['eur', 'usd', 'xaf'],
      selectedCurrency: this.$store.state.settings.currency,
    }
  },

  methods: {
    toggleDarkMode() {
      ;(this.$nuxt as any).$vuetify.theme.isDark = this.darkMode
      this.$store.commit(
        'settings/setColorTheme',
        this.darkMode ? 'dark' : 'light'
      )
    },
    changeCurrency() {
      this.$store.commit('settings/setCurrency', this.selectedCurrency)
    },
  },

  head() {
    return {
      title: 'Settings',
    }
  },
})
</script>
