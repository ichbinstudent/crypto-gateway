<template>
  <v-container>
    <h2 class="text-2xl mb-1">Currency</h2>

    <v-row dense>
      <v-col>
        <v-select
          outlined
          dense
          v-model="selectedCurrency"
          @change="changeCurrency"
          :items="currencies"
        />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <span>Phone: {{ phone }}</span>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-switch v-model="darkMode" label="Dark Mode" @change="toggleDarkMode" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-btn plain text block color="error" class="text-center" @click="$auth.logout()">Sign out</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      darkMode: this.$store.state.settings.theme === "dark",
      currencies: ["eur", "xaf"],
      selectedCurrency: this.$store.state.settings.currency
    };
  },

  methods: {
    toggleDarkMode() {
      ;(this.$nuxt as any).$vuetify.theme.isDark = this.darkMode;
      this.$store.commit(
        "settings/setColorTheme",
        this.darkMode ? "dark" : "light"
      );
    },
    changeCurrency() {
      this.$store.commit("settings/setCurrency", this.selectedCurrency);
    }
  },

  head() {
    return {
      title: "Settings"
    };
  },

  computed: {
    phone() {
      return this.$auth.user?.username
    }
  }
});
</script>
