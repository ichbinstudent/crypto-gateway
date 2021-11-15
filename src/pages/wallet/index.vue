<template>
  <v-container>
    <client-only>
      <h2 class="text-2xl mb-2">Fiat</h2>
      <template v-if="!fetching">
        <AssetCard
          :item="item"
          v-for="(item, index) in fiat"
          :key="item.coin.id"
          :class="index + 1 === fiat.length ? '' : 'mb-2'"
        />
      </template>
      <template v-else>
        <v-skeleton-loader
          v-for="i in 3"
          :key="'fiat' + i.toString()"
          type="list-item-avatar"
          :class="i === 3 ? '' : 'mb-2'"
        />
      </template>
      <h2 class="text-2xl my-2">Crypto</h2>
      <template v-if="!fetching">
        <AssetCard
          :item="item"
          v-for="(item, index) in crypto"
          :key="item.coin.id"
          :class="index + 1 === crypto.length ? '' : 'mb-2'"
        />
      </template>
      <template v-else>
        <v-skeleton-loader
          v-for="i in 3"
          :key="'crypto' + i.toString()"
          type="list-item-avatar"
          :class="i === 3 ? '' : 'mb-2'"
        />
      </template>
    </client-only>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import AssetCard from "~/components/wallet/AssetCard.vue";
import { Wallet } from "~/types/interfaces";


export default Vue.extend({
  components: { AssetCard },
  head() {
    return {
      title: "Wallet"
    };
  },
  computed: {
    crypto() {
      return Object.keys(this.$store.getters["wallet/wallet"])
        .filter((key: string) => !["eur", "xaf"].includes(key))
        .map((key: string) => this.$store.getters["wallet/wallet"][key]);
    },
    fiat() {
      return Object.keys(this.$store.getters["wallet/wallet"])
        .filter((key: string) => ["eur", "xaf"].includes(key))
        .map((key: string) => this.$store.getters["wallet/wallet"][key]);
    },
    fetching() {
      return this.$store.getters["fetching"];
    }
  }
});
</script>
