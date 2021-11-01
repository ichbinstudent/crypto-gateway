<template>
  <v-container>
    <h2 class="text-2xl mb-2">Fiat</h2>
    <template v-if="wallets.fiat !== null">
      <AssetCard
        :item="item"
        v-for="(item, index) in wallets.fiat"
        :key="item.currency"
        :class="index + 1 === wallets.fiat.length ? '' : 'mb-2'"
      />
    </template>
    <template v-else>
      <v-skeleton-loader
        v-for="i in 3"
        :key="i.toString()"
        type="list-item-avatar-two-line"
        :class="i === 3 ? '' : 'mb-2'"
      />
    </template>
    <h2 class="text-2xl my-2">Crypto</h2>
    <template v-if="wallets.crypto !== null">
      <AssetCard
        :item="item"
        v-for="(item, index) in wallets.crypto"
        :key="item.currency"
        :class="index + 1 === wallets.crypto.length ? '' : 'mb-2'"
      />
    </template>
    <template v-else>
      <v-skeleton-loader
        v-for="i in 3"
        :key="i.toString()"
        type="list-item-avatar-two-line"
        :class="i === 3 ? '' : 'mb-2'"
      />
    </template>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import AssetCard from '~/components/wallet/AssetCard.vue'

export default Vue.extend({
  components: { AssetCard },
  data: () => ({
    wallets: {
      crypto: [
        {
          id: 'bitcoin',
          symbol: 'btc',
          name: 'Bitcoin',
          amount: 0.003123,
        },
        {
          id: 'ethereum',
          symbol: 'eth',
          name: 'Ethereum',
          amount: 0.6432,
        },
        {
          id: 'cardano',
          symbol: 'ada',
          name: 'Cardano',
          amount: 144.424,
        },
      ],
      fiat: [
        {
          symbol: 'eur',
          name: 'Euro',
          amount: 113.31,
        },
        {
          symbol: 'xaf',
          name: 'Franc CFA',
          amount: 5902.31,
        },
      ],
    },
  }),
})
</script>
