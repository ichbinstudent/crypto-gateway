<template>
  <v-app id="crypto-gateway">
    <v-app-bar app fixed color="primary" dark>
      <v-app-bar-title>
        <!-- {{ route }} -->
        CamerSwap
      </v-app-bar-title>
      <v-spacer />
      <v-app-bar-nav-icon light @click="$router.back()">
        <v-icon color="surface">mdi-arrow-left</v-icon>
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
        x-large
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

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      drawer: false,
      value: "wallet"
    };
  },
  async created() {
    const t = 1000;

    function rejectDelay(reason: any) {
      return new Promise(function(resolve, reject) {
        setTimeout(reject.bind(null, reason), t);
      });
    }

    const max = 5;
    let p = Promise.reject<unknown>();

    for (let i = 0; i < max; i++) {
      p = p.catch(() => {
        this.$store.dispatch("coins/fetchCoins")
          .then(() => {
            if (this.$auth.loggedIn)
              this.$store.dispatch("wallet/updateWallet");
          });
      })
        .catch(rejectDelay);
    }
    // p = p.then(processResult).catch(errorHandler)

    const element = document.getElementsByClassName("_78cfbf41 _38544cae")[0] as any;
    if (element) {
      element.style.display = "none";
    }
  }
});
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
