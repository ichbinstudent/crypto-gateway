<template>
  <v-container id="main-container">
    <h2 class="text-2xl mb-2">{{ $t('wallet.fiat') }}</h2>
    <template v-if="fiat.length > 0">
      <AssetCard
        v-for="(item, index) in fiat"
        :item="item"
        :key="'fiat' + index.toString()"
        :class="index + 1 === fiat.length ? '' : 'mb-2'"
      />
    </template>
    <template v-else>
      <v-skeleton-loader
        v-for="i in 4"
        :key="'fiat_loading' + i.toString()"
        type="list-item-avatar"
        :class="i === 3 ? '' : 'mb-2'"
      />
    </template>
    <h2 class="text-2xl my-2">{{ $t('wallet.crypto') }}</h2>
    <template v-if="crypto.length > 0">
      <AssetCard
        v-for="(item, index) in crypto"
        :item="item"
        :key="'crypto' + index.toString()"
        :class="index + 1 === crypto.length ? '' : 'mb-2'"
      />
    </template>
    <template v-else>
      <v-skeleton-loader
        v-for="i in 4"
        :key="'crypto_loading' + i.toString()"
        type="list-item-avatar"
        :class="i === 3 ? '' : 'mb-2'"
      />
    </template>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import AssetCard from "~/components/wallet/AssetCard.vue";
import { WalletEntry } from "~/types/interfaces";
const PullToRefresh = require('pulltorefreshjs');


export default Vue.extend({
  components: { AssetCard },
  data() {
    return {
      iconName: ""
    };
  },
  head() {
    return {
      title: this.$t('wallet.wallet').toString()
    };
  },
  computed: {
    crypto(): WalletEntry[] {
      return this.$store.getters["coins/availableForTrading"]
        .filter((key: string) => !["eur", "xaf"].includes(key))
        .map((key: string) => this.$store.getters["wallet/wallet"][key])
        .sort((a: WalletEntry, b: WalletEntry) =>
          this.$util.ConvertCurrency(b.amount, b.coin.id).sub(this.$util.ConvertCurrency(a.amount, a.coin.id)).toNumber());
    },
    fiat(): WalletEntry[] {
      return this.$store.getters["coins/availableForTrading"]
        .filter((key: string) => ["eur", "xaf"].includes(key))
        .map((key: string) => this.$store.getters["wallet/wallet"][key])
        .sort((a: WalletEntry, b: WalletEntry) => b.amount.sub(a.amount).toNumber());
    }
  },
  mounted() {
    PullToRefresh.init({
      mainElement: "#main-container",
      onRefresh: async () => {
        await this.$store.dispatch("coins/fetchCoins");
        await this.$store.dispatch("wallet/updateWallet");
      }
    });
  },
  beforeRouteLeave(_1, _2, next) {
    PullToRefresh.destroyAll();
    next();
  }
});
</script>
