<template>
  <v-app id="crypto-gateway">
    <v-app-bar app fixed>
      <v-app-bar-title class="overflow-visible text-center mx-auto">
        {{ route | capitalize }}
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <Nuxt />
    </v-main>

    <v-container>
      <v-bottom-navigation
        class="d-sm-none"
        color="primary"
        fixed
        grow
        active-class="nuxt-link-active"
        v-model="value"
      >
        <v-btn
          :to="{ name: 'wallet' }"
          value="wallet"
          icon
          class="nav-btn-custom"
          :ripple="false"
          prefetch
        >
          <span>Wallet</span>
          <v-icon>mdi-wallet</v-icon>
        </v-btn>

        <v-btn disabled height="0" width="0"></v-btn>

        <v-btn
          :to="{ name: 'settings' }"
          value="settings"
          icon
          class="nav-btn-custom"
          :ripple="false"
          prefetch
        >
          <span>Settings</span>
          <v-icon>mdi-tune</v-icon>
        </v-btn>
      </v-bottom-navigation>

      <v-btn
        :to="{ name: 'gateway' }"
        color="primary"
        id="floating-center-button"
        fab
        fixed
        :ripple="false"
        class="bottom-1"
        prefetch
      >
        <v-icon color="background">mdi-swap-vertical</v-icon>
      </v-btn>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    value: 'wallet',
  }),
  computed: {
    route() {
      return this.$route.fullPath.split('/')[1] ?? 'home'
    },
  },
  created() {
    this.$store.dispatch('coins/fetchCoins')
  },
}
</script>

<style lang="scss">
div.v-app-bar-title__content {
  width: 100% !important;
}

#floating-center-button {
  left: 50%;
  transform: translateX(-50%);
  height: 3rem;
  width: 3rem;
}

.nav-btn-custom {
  width: 0 !important;
  height: 0 !important;
  margin-top: auto !important;
  margin-bottom: auto !important;
}
</style>
