<template>
  <v-container>
    <v-row dense>
      <v-col>
        <v-select
          outlined
          hide-details
          :label="$t('settings.currency')"
          v-model="selectedCurrency"
          @change="changeCurrency"
          :items="currencies"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select
          outlined
          hide-details
          :label="$t('settings.language')"
          :items="availableLocales"
          @change="$i18n.setLocale(locale)"
          v-model="locale"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <span>{{ $t("settings.phone") }} {{ phone }}</span>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-switch v-model="darkMode" :label="$t('settings.darkMode')" @change="toggleDarkMode" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-btn plain text block color="error" class="text-center" @click="$auth.logout()"
               v-text="$t('settings.signOut')" />
      </v-col>
    </v-row>
    <v-spacer />
    <div class="text-center absolute bottom-4 text-xs w-full left-0">
      {{ version }}
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { LocaleObject } from "@nuxtjs/i18n";

export default Vue.extend({
  data() {
    return {
      darkMode: this.$store.state.settings.theme === "dark",
      currencies: ["eur", "xaf"],
      selectedCurrency: this.$store.state.settings.currency,
      locale: this.$i18n.locale
    };
  },

  methods: {
    toggleDarkMode() {
      (this.$nuxt as any).$vuetify.theme.isDark = this.darkMode;
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
    phone(): string {
      return this.$auth.user?.username;
    },
    availableLocales(): string[] {
      return this.$i18n.locales.map((i: LocaleObject) => i.code);
    },
    version(): string {
      return `${process.env.NUXT_ENV_VERSION} ${process.env.NUXT_ENV_COMMIT_HASH}`;
    }
  },
  mounted() {
    const element = document.getElementsByClassName("_78cfbf41 _38544cae")[0] as any
    if (element) {
      element.style.display = "inherit";
    }
  },
  beforeRouteLeave(_1, _2, next) {
    const element = document.getElementsByClassName("_78cfbf41 _38544cae")[0] as any
    if (element) {
      element.style.display = "none";
    }
    next();
  }
});
</script>
