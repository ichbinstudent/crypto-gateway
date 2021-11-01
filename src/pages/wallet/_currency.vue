<template>
  <div>
    <div class="w-full fixed top-16" id="fixed-bg-item">
      <CryptoChart :symbol="coin.id" :days="1"></CryptoChart>
      <v-row dense class="mt-0 mx-0">
        <v-col>
          <v-btn class="rounded-lg" block depressed
            ><span class="font-light">Withdraw</span></v-btn
          >
        </v-col>
        <v-col>
          <v-btn class="rounded-lg" block depressed
            ><span class="font-light">Deposit</span></v-btn
          >
        </v-col>
      </v-row>
    </div>
    <v-card
      class="mx-0 mb-0 pb-0 rounded-t-xl h-screen relative"
      id="floating-card"
    >
      <v-card-title> Transactions </v-card-title>
      <div
        class="absolute top-1.5 bg-gray-200 w-24 rounded-lg"
        id="gray-bar"
      ></div>
      <TransactionList :coin="coin"></TransactionList>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CryptoChart from '~/components/wallet/CryptoChart.vue'
import TransactionList from '~/components/wallet/TransactionList.vue'
import { Coin } from '~/types/coingecko'

export default Vue.extend({
  components: { TransactionList, CryptoChart },
  async asyncData({ params, store }) {
    const coin = store.getters['coins/coins']?.filter(
      (coin: Coin) => coin.id == params.currency
    )[0]
    if (coin) {
      return { coin }
    } else {
      const coins = await store.dispatch('coins/fetchCoins')
      return {
        coin: coins.filter((coin: Coin) => coin.id == params.currency)[0],
      }
    }
  },
  data() {
    return {
      coin: {} as Coin,
    }
  },
  head() {
    return {
      title: `Wallet > ${(this as any).coin.name}`,
    }
  },
})
</script>

<style lang="scss">
#gray-bar {
  //top: 6px;
  left: 50%;
  transform: translateX(-50%);
  height: 4px;
}

#fixed-bg-item {
  height: 30vh !important;
}

#floating-card {
  margin-top: calc(25vh + 2 * 36px + 28px);
}
</style>
