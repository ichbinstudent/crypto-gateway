<template>
  <v-container>
    <h2 class="text-2xl mb-2">Fiat</h2>
    <template v-if="fiat.length > 0">
      <template v-for="(item, index) in fiat">
        <AssetCard
          v-if="item && item.coin"
          :item="item"
          :key="item.coin.id"
          :class="index + 1 === fiat.length ? '' : 'mb-2'"
        />
        <v-skeleton-loader
          v-else
          type="list-item-avatar"
          :key="'fiat_not_loaded' + index.toString()"
          :class="index + 1 === fiat.length ? '' : 'mb-2'"
        />
      </template>
    </template>
    <template v-else>
      <v-skeleton-loader
        v-for="i in 4"
        :key="'fiat' + i.toString()"
        type="list-item-avatar"
        :class="i === 3 ? '' : 'mb-2'"
      />
    </template>
    <h2 class="text-2xl my-2">Crypto</h2>
    <template v-if="crypto.length > 0">
      <template v-for="(item, index) in crypto">
        <AssetCard
          v-if="item && item.coin"
          :item="item"
          :key="item.coin.id"
          :class="index + 1 === crypto.length ? '' : 'mb-2'"
        />
        <v-skeleton-loader
          v-else
          type="list-item-avatar"
          :key="'crypto_not_loaded' + index.toString()"
          :class="index + 1 === crypto.length ? '' : 'mb-2'"
        />
      </template>
    </template>
    <template v-else>
      <v-skeleton-loader
        v-for="i in 4"
        :key="'crypto' + i.toString()"
        type="list-item-avatar"
        :class="i === 3 ? '' : 'mb-2'"
      />
    </template>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import AssetCard from "~/components/wallet/AssetCard.vue";
import { Wallet, WalletEntry } from "~/types/interfaces";


export default Vue.extend({
  components: { AssetCard },
  head() {
    return {
      title: "Wallet"
    };
  },
  computed: {
    crypto(): WalletEntry[] {
      return this.$store.getters["coins/availableForTrading"]
          .filter((key: string) => !["eur", "xaf"].includes(key))
          .map((key: string) => this.$store.getters["wallet/wallet"][key]);
    },
    fiat(): WalletEntry[] {
      return this.$store.getters["coins/availableForTrading"]
          .filter((key: string) => ["eur", "xaf"].includes(key))
          .map((key: string) => this.$store.getters["wallet/wallet"][key]);
    },
    fetching() {
      return this.$store.getters["fetching"];
    }
  }
});
</script>
