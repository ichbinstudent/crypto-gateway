<template>
  <v-container>
    <h1 class="text-3xl mb-1">{{ $t("help.tutorials") }}</h1>
    <div class="flex flex-col">
      <nuxt-link :to="localePath('help-howToDepositFcfa')">
        {{ $t("help.howToDepositFcfa") }}
      </nuxt-link>
      <nuxt-link :to="localePath('help-howToDepositCrypto')">
        {{ $t("help.howToDepositCrypto") }}
      </nuxt-link>
      <nuxt-link :to="localePath('help-howToSwap')">
        {{ $t("help.howToSwap") }}
      </nuxt-link>
      <nuxt-link :to="localePath('help-howToWithdrawFcfa')">
        {{ $t("help.howToWithdrawFcfa") }}
      </nuxt-link>
      <nuxt-link :to="localePath('help-howToWithdrawCrypto')">
        {{ $t("help.howToWithdrawCrypto") }}
      </nuxt-link>
    </div>
    <h1 class="text-3xl mt-2 mb-1">{{ $t("help.contactUs") }}</h1>
    <div>
      Orange: <a :href="`tel:${$t('help.phoneOrange')}`">{{ $t("help.phoneOrange") }}</a><br />
      MTN: <a :href="`tel:${$t('help.phoneMtn')}`">{{ $t("help.phoneMtn") }}</a><br /><br />
      {{ $t('help.useOurChat') }}
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { MetaInfo } from "vue-meta/types";

export default Vue.extend({
  head(): MetaInfo {
    return {
      title: this.$t("help.title").toString()
    };
  }
});
</script>
