<template>
  <v-card
    :to="localeLocation({
      name: 'wallet' + (item.coin.id ? '-currency' : ''),
      params: { currency: item.coin.id },
    })"
    class="rounded-lg pr-1"
    rounded
  >
    <div class="flex flex-row align-middle">
      <v-avatar class="my-auto ml-0" rounded height="32" width="32">
        <v-img
          v-if="item.coin.image.large.includes('coingecko')"
          max-height="32"
          max-width="32"
          alt="cryptocurrency icon"
          :src="item.coin.image.large"
        />
        <nuxt-img
          v-else
          height="32"
          width="32"
          alt="cryptocurrency icon"
          :src="item.coin.image.large"
        />
      </v-avatar>
      <v-card-title class="text-no-wrap text-left px-0 text-xs">
        <span class="text-sm -mt-1 tracking-tight">{{ item.coin.name }}</span>
      </v-card-title>
      <div class="w-auto flex flex-col whitespace-nowrap my-auto text-right">
        <span class="text-sm">
          {{ item.amount | convertCurrency(item.coin.symbol) }}
        </span>
        <span class="text-xs">
          {{ item.amount | formatCurrency(item.coin.symbol) }}
        </span>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { WalletEntry } from "~/types/interfaces";

export default Vue.extend({
  props: {
    item: {
      required: true,
      type: Object as () => WalletEntry
    }
  },
  computed: {}
});
</script>

<style>
.v-skeleton-loader__avatar {
  height: 32px !important;
  width: 32px !important;
}
</style>
