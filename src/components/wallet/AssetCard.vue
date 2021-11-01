<template>
  <v-card
    :to="{ name: 'wallet-currency', params: { currency: item.id } }"
    class="rounded-lg pr-1"
    rounded
  >
    <div class="flex flex-row align-middle">
      <v-avatar class="my-auto ml-0" rounded height="32" width="32">
        <v-img
          max-height="32"
          max-width="32"
          alt="cryptocurrency icon"
          :src="'/crypto-icons/128/color/' + item.symbol + '.png'"
        />
      </v-avatar>
      <v-card-title class="w-full text-no-wrap text-left pl-0 text-xs">
        <span class="text-sm -mt-1 tracking-tight">{{ item.name }}</span>
      </v-card-title>
      <div class="flex flex-col my-auto text-right">
        <span v-if="coinsLoaded" class="text-sm">{{
          item.amount | convertCurrency(item.symbol)
        }}</span>
        <v-skeleton-loader v-else type="text"></v-skeleton-loader>
        <span class="text-xs">{{
          item.amount | formatCurrency(item.symbol)
        }}</span>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Coin } from '~/types/coingecko'

export default Vue.extend({
  props: {
    item: {
      required: true,
      type: Object as () => { value: number } & Coin,
    },
  },
  computed: {
    coinsLoaded(): boolean {
      return this.$store.getters['coins/coins'].length !== 0
    },
  },
})
</script>
