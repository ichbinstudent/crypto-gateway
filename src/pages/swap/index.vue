<template>
  <div>
    <v-card class="rounded-lg mx-1" id="swap-card">
      <v-card-title>
        {{ $t("swap.swap") }}
      </v-card-title>
      <v-card-text class="pa-1">
        <v-row dense>
          <v-col>
            <v-select :items="coin1coins" v-model="pair.coin1.coin" class="rounded-lg my-auto" solo hide-details>
              <template v-slot:item="{ active, item, attrs, on }">
                <v-list-item v-on="on" v-bind="attrs" #default="{ active }" dense class="px-1">
                  <v-list-item-icon class="ml-0 mr-1">
                    <v-img
                      v-if="item.image.small.includes('coingecko')"
                      height="24"
                      width="24"
                      alt="cryptocurrency icon"
                      :src="item.image.small"
                      class="my-auto"
                    />
                    <nuxt-img
                      provider="cloudinary"
                      v-else
                      height="24"
                      width="24"
                      alt="cryptocurrency icon"
                      :src="item.image.large"
                      class="my-auto"
                    />
                  </v-list-item-icon>
                  <v-list-item-title>
                    {{ item.name }}
                  </v-list-item-title>
                </v-list-item>
              </template>
              <template v-slot:selection="{ active, item, attrs, on }">
                <v-list-item v-on="on" v-bind="attrs" #default="{ active }" dense class="px-0">
                  <v-list-item-icon class="mx-0 mr-1">
                    <v-img
                      v-if="item.image.small.includes('coingecko')"
                      height="24"
                      width="24"
                      alt="cryptocurrency icon"
                      :src="item.image.small"
                      class="my-auto"
                    />
                    <nuxt-img
                      provider="cloudinary"
                      v-else
                      height="24"
                      width="24"
                      alt="cryptocurrency icon"
                      :src="item.image.large"
                      class="my-auto"
                    />

                  </v-list-item-icon>
                  <v-list-item-title>
                    {{ item.symbol }}
                  </v-list-item-title>
                </v-list-item>
              </template>
            </v-select>
          </v-col>
          <v-col>
            <v-text-field v-model="pair.coin1.amount" hide-details class="rounded-lg" type="number">
              <template #label>
                <span @click="pair.coin1.amount = wallet[pair.coin1.coin.id].amount" class="cursor-pointer">MAX</span>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <div class="text-center mx-auto p-0 -my-3">
          <v-btn
            @click="swapCurrencies"
            icon
            x-large
            class="mx-auto p-0 my-auto border-0"
          >
            <v-icon large>
              mdi-swap-vertical
            </v-icon>
          </v-btn>
        </div>
        <v-row dense>
          <v-col>
            <v-select :items="coin2coins" v-model="pair.coin2.coin" class="rounded-lg my-auto" solo hide-details>
              <template v-slot:item="{ active, item, attrs, on }">
                <v-list-item v-on="on" v-bind="attrs" #default="{ active }" dense class="px-1">
                  <v-list-item-icon class="ml-0 mr-1">
                    <v-img
                      v-if="item.image.small.includes('coingecko')"
                      height="24"
                      width="24"
                      alt="cryptocurrency icon"
                      :src="item.image.small"
                      class="my-auto"
                    />
                    <nuxt-img
                      provider="cloudinary"
                      v-else
                      height="24"
                      width="24"
                      alt="cryptocurrency icon"
                      :src="item.image.large"
                      class="my-auto"
                    />
                  </v-list-item-icon>
                  <v-list-item-title>
                    {{ item.name }}
                  </v-list-item-title>
                </v-list-item>
              </template>
              <template v-slot:selection="{ active, item, attrs, on }">
                <v-list-item v-on="on" v-bind="attrs" #default="{ active }" dense class="px-0">
                  <v-list-item-icon class="mx-0 mr-1">
                    <v-img
                      v-if="item.image.small.includes('coingecko')"
                      height="24"
                      width="24"
                      alt="cryptocurrency icon"
                      :src="item.image.small"
                      class="my-auto"
                    />
                    <nuxt-img
                      provider="cloudinary"
                      v-else
                      height="24"
                      width="24"
                      alt="cryptocurrency icon"
                      :src="item.image.large"
                      class="my-auto"
                    />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.symbol }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-select>
          </v-col>
          <v-col>
            <v-text-field v-model="pair.coin2.amount" hide-details class="rounded-lg" type="number">
              <template #label>
                <span @click="pair.coin2.amount = wallet[pair.coin2.coin.id].amount" class="cursor-pointer">MAX</span>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn class="rounded-lg" color="primary" block depressed large @click="swap" :disabled="loading">
              <span class="font-normal">{{ $t("swap.swap") }}</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <SwapConfirmationDialog v-if="transaction" :show="showConfirmation" :transaction="transaction" />
  </div>
</template>

<script lang="ts">
import { Coin } from "@/types/coingecko";
import Vue from "vue";
import { TransactionTypes } from "~/types/ctypes";
import { Snack, Swap, Wallet } from "~/types/interfaces";
import SwapConfirmationDialog from "~/components/wallet/SwapConfirmationDialog.vue";
import { Location } from "vue-router";
import { Decimal } from "decimal.js";

const PullToRefresh = require("pulltorefreshjs");


export default Vue.extend({
  components: { SwapConfirmationDialog },
  head: {
    title: "Swap"
  },
  computed: {
    coins(): Coin[] {
      return this.$store.getters["coins/coins"];
    },
    coin1coins(): Coin[] {
      return this.$store.getters["coins/coins"]
        .filter((coin: Coin) => coin.id !== this.pair.coin2.coin?.id);
    },
    coin2coins(): Coin[] {
      return this.$store.getters["coins/coins"]
        .filter((coin: Coin) => coin.id !== this.pair.coin1.coin?.id);
    },
    pathToCoin(): Location | undefined {
      return this.localeLocation({ name: `wallet-currency`, params: { currency: this.selectedCoin?.id ?? "bitcoin" } });
    },
    wallet(): Wallet {
      return this.$store.getters["wallet/wallet"];
    }
  },
  data() {
    return {
      pair: {
        coin1: {
          coin: null as Coin | null,
          amount: "0"
        },
        coin2: {
          coin: null as Coin | null,
          amount: "0"
        }
      },
      showConfirmation: false,
      transaction: null as Swap | null,
      already_changed: false,
      selectedCoin: null as Coin | null,
      loading: false
    };
  },
  watch: {
    coins: function(val) {
      this.selectedCoin = val[0];
      if (!this.pair.coin1.coin)
        this.pair.coin1.coin = val[0];
      if (!this.pair.coin2.coin)
        this.pair.coin2.coin = val[1];
    },
    "pair.coin1.amount"() {
      if (!this.already_changed) {
        this.already_changed = true;
        this.coin1Changed().then(() => this.already_changed = false);
      }
    },
    "pair.coin1.coin"() {
      if (!this.already_changed) {
        this.already_changed = true;
        this.coin2Changed().then(() => this.already_changed = false);
      }
    },
    "pair.coin2.amount"() {
      if (!this.already_changed) {
        this.already_changed = true;
        this.coin2Changed().then(() => this.already_changed = false);
      }
    },
    "pair.coin2.coin"() {
      if (!this.already_changed) {
        this.already_changed = true;
        this.coin1Changed().then(() => this.already_changed = false);
      }
    }
  },
  mounted() {
    this.selectedCoin = this.coins[0];
    if (!this.pair.coin1.coin)
      this.pair.coin1.coin = this.coins[0];
    if (!this.pair.coin2.coin)
      this.pair.coin2.coin = this.coins[1];

    this.$on("dialog:show", (e: boolean) => this.showConfirmation = e);
    this.$on("transactionConfirmed", (t: Swap) => {
      this.$axios.patch(`/wallet/transaction/${t.id}/`, {
        status: "COMPLETED",
        resourcetype: "Swap"
      }).then(() => {
        this.$store.dispatch("wallet/updateWallet");
        this.$router.push(this.localePath({ name: "wallet" }));
      }).catch((e) => {
        this.$store.commit("snackbar/setSnack",
          {
            message: e,
            color: "error"
          } as Snack);
      });
    });
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
  },
  methods: {
    async coin1Changed() {
      this.pair.coin2.amount = this.$util.ConvertCurrency(this.pair.coin1.amount, this.pair.coin1.coin?.id ?? "eur", this.pair.coin2.coin?.id).toString();
    },
    async coin2Changed() {
      this.pair.coin1.amount = this.$util.ConvertCurrency(this.pair.coin2.amount, this.pair.coin2.coin?.id ?? "eur", this.pair.coin1.coin?.id).toString();
    },
    swapCurrencies() {
      let coin1 = this.pair.coin1;
      this.pair.coin1 = this.pair.coin2;
      this.pair.coin2 = coin1;
    },
    swap() {
      if (!this.pair.coin1.coin || !this.pair.coin2.coin) {
        this.$store.commit("snackbar/setSnack",
          {
            message: "Please select 2 coins.",
            color: "error"
          } as Snack);
      } else {
        this.loading = true;
        this.$axios.post<Swap>("/wallet/transaction/", {
          currency_in: this.pair.coin1.coin?.id,
          currency_out: this.pair.coin2.coin?.id,
          amount_in: new Decimal(this.pair.coin1.amount).toDecimalPlaces(18),
          amount_out: new Decimal(this.pair.coin2.amount).toDecimalPlaces(18),
          polymorphic_ctype: TransactionTypes.Swap,
          resourcetype: "Swap"
        })
          .then(({ data }) => {
            this.transaction = data;
            this.showConfirmation = true;
          })
          .catch((error) => {
            const message = error.response ? error.response.data : "Please try again later";
            this.$store.commit("snackbar/setSnack",
              {
                message: message,
                color: "error"
              } as Snack);
          }).finally(() => this.loading = false);
      }
    }
  }
});
</script>

<style>
#swap-card {
  position: absolute;
  top: 50%;
  transform: translatey(-50%);
}

input[type=number] {
  -moz-appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
