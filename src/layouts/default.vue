<template>
  <v-app id="crypto-gateway">
    <v-app-bar app fixed color="primary" dark class="px-0">
      <v-app-bar-nav-icon light :to="localePath('help')">
        <v-icon color="surface">mdi-help-circle</v-icon>
      </v-app-bar-nav-icon>
      <v-spacer />
      <img
        alt="Logo"
        class="h-8"
        height="32"
        width="130"
        src="~/assets/logo_text.svg"
      />
      <!--      <v-app-bar-title>CamerSwap</v-app-bar-title>-->
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
          <span>{{ $t("defaultLayout.wallet") }}</span>
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
          <span>{{ $t("defaultLayout.settings") }}</span>
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
        class="bottom-0"
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

    if (this.$auth.loggedIn) {
      (window as any).$crisp.push(["set", "user:phone", [this.$auth.user?.username]]);
      (window as any).$crisp.push(["set", "user:nickname", [`${this.$auth.user?.first_name} ${this.$auth.user?.last_name}`]]);
    }
  },
  watch: {
    "$auth.loggedIn"(val) {
      if (val) {
        (window as any).$crisp.push(["set", "user:phone", [this.$auth.user?.username]]);
        (window as any).$crisp.push(["set", "user:nickname", [`${this.$auth.user?.first_name} ${this.$auth.user?.last_name}`]]);
      }
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
  height: 3.5rem;
  width: 3.5rem;
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
