<template>
  <v-app id="crypto-gateway">
    <v-app-bar app fixed>
      <v-app-bar-title class="overflow-visible">
<!--        {{ route }}-->
        CamerSwap
      </v-app-bar-title>
      <v-spacer />
      <v-app-bar-nav-icon @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-app-bar-nav-icon>
    </v-app-bar>

    <v-main>
      <Snackbar />
      <Nuxt />
    </v-main>

    <v-container>
      <v-bottom-navigation
        color="primary"
        fixed
        grow
        active-class="nuxt-link-active"
        v-model="value"
        id="bottom-bar"
      >
        <v-btn
          :to="localeLocation({ name: 'wallet' })"
          value="wallet"
          icon
          class="nav-btn-custom"
          :ripple="false"
          prefetch
        >
          <span>Wallet</span>
          <v-icon>mdi-wallet</v-icon>
        </v-btn>

        <v-btn
          :to="localeLocation({ name: 'settings' })"
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
        :to="localeLocation({ name: 'swap' })"
        color="primary"
        id="floating-center-button"
        fab
        fixed
        :ripple="false"
        class="bottom-1"
        prefetch
      >
        <v-icon color="background">mdi-swap-horizontal</v-icon>
      </v-btn>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      value: "wallet"
    };
  },
  computed: {
    route() {
      return (
        this.$route.fullPath
          .slice(1)
          .split("?")[0]
          .split("/")
          .map((value) => this.$options.filters.capitalize(value))
          .join(" > ") ?? "home"
      );
    }
  },
  async created() {
    const t = 1000;

    function rejectDelay(reason) {
      return new Promise(function(resolve, reject) {
        setTimeout(reject.bind(null, reason), t);
      });
    }

    const max = 5;
    let p = Promise.reject();

    for (let i = 0; i < max; i++) {
      p = p
        .catch(() => {
          this.$store.dispatch("coins/fetchCoins")
            .then(() => this.$store.dispatch("wallet/updateWallet"));
        })
        .catch(rejectDelay);
    }
    // p = p.then(processResult).catch(errorHandler)
  }
};
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

#bottom-bar {
  display: flex;
  justify-content: space-around;
}
</style>
