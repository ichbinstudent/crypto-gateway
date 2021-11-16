<template>
  <v-container>
    <v-card class="rounded-lg" id="swap-card">
      <v-card-text>
        <v-row dense>
          <v-col>
            <v-select :items="coin1coins" v-model="pair.coin1.coin" class="rounded-lg p-0" outlined hide-details>
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
            <v-text-field v-model="pair.coin1.amount" outlined hide-details class="rounded-lg" type="number" />
          </v-col>
        </v-row>
        <div class="text-center mx-auto p-0 -my-3">
          <v-btn
            @click="swapCurrencies"
            icon
            x-large
            class="mx-auto p-1 my-auto border-black border-2"
          >
            <v-icon>
              mdi-swap-vertical
            </v-icon>
          </v-btn>
        </div>
        <v-row dense>
          <v-col>
            <v-select :items="coin2coins" v-model="pair.coin2.coin" class="rounded-lg" outlined hide-details>
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
            <v-text-field v-model="pair.coin2.amount" outlined hide-details class="rounded-lg" type="number" />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-btn class="rounded-lg" color="surface" block depressed large @click="swap" :disabled="loading">
              <span class="font-light">Swap</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-row class="mt-4">
      <v-col>
        <v-select :items="coins" v-model="selectedCoin" class="rounded-lg" outlined hide-details dense>
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
              <v-list-item-content>
                {{ item.name }}
              </v-list-item-content>
            </v-list-item>
          </template>
          <template v-slot:selection="{ active, item, attrs, on }">
            <v-list-item v-on="on" v-bind="attrs" #default="{ active }" dense>
              <v-list-item-icon>
                <v-img
                  v-if="item.image.small.includes('coingecko')"
                  height="24"
                  width="24"
                  alt="cryptocurrency icon"
                  :src="item.image.small"
                />
                <nuxt-img
                  provider="cloudinary"
                  v-else
                  height="24"
                  width="24"
                  alt="cryptocurrency icon"
                  :src="item.image.large"
                />
              </v-list-item-icon>
              <v-list-item-title>
                {{ item.symbol }}
              </v-list-item-title>
            </v-list-item>
          </template>
        </v-select>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-btn
          class="rounded-lg"
          block
          depressed
          :to="pathToCoin"
          :disabled="!selectedCoin"
        >
          <span class="font-light">{{ $t("wallet._currency.withdraw") }}</span>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          class="rounded-lg"
          block
          depressed
          :to="pathToCoin"
          :disabled="!selectedCoin"
        >
          <span class="font-light">{{ $t("wallet._currency.deposit") }}</span>
        </v-btn>
      </v-col>
    </v-row>
    <SwapConfirmationDialog v-if="transaction" :show="showConfirmation" :transaction="transaction" />
  </v-container>
</template>

<script lang="ts">
import { Coin } from "@/types/coingecko";
import Vue from "vue";
import { TransactionTypes } from "~/types/ctypes";
import { Snack, Swap } from "~/types/interfaces";
import SwapConfirmationDialog from "~/components/wallet/SwapConfirmationDialog.vue";
import { Decimal } from "decimal.js";
import { Location } from 'vue-router'
const CoinGecko = require("coingecko-api");
const CoinGeckoClient = new CoinGecko();


export default Vue.extend({
  components: { SwapConfirmationDialog },
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
      return this.localeLocation({name: `wallet-currency`, params: {currency: this.selectedCoin?.id ?? 'bitcoin' }})
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
        this.$router.push(({ name: "wallet" }));
      }).catch((e) => {
        this.$store.commit("snackbar/setSnack",
          {
            message: e,
            color: "error"
          } as Snack);
      });
    });
  },
  methods: {
    // TODO: Fix fiat - crypto exchange rates
    async coin1Changed() {
      try {
        const price = await CoinGeckoClient.simple.price({
          ids: [this.pair.coin1.coin?.id, this.pair.coin2.coin?.id],
          vs_currencies: ["usd"]
        });
        this.pair.coin2.amount =
          new Decimal(this.pair.coin1.amount)
            .mul(price.data[this.pair.coin1.coin?.id ?? ""]["usd"])
            .div(price.data[this.pair.coin2.coin?.id ?? ""]["usd"])
            .toPrecision(20);
      } catch {
      }
    },
    // TODO: Fix fiat - crypto exchange rates
    async coin2Changed() {
      try {
        const price = await CoinGeckoClient.simple.price({
          ids: [this.pair.coin1.coin?.id, this.pair.coin2.coin?.id],
          vs_currencies: ["usd"]
        });
        this.pair.coin1.amount =
          new Decimal(this.pair.coin2.amount)
            .mul(price.data[this.pair.coin2.coin?.id ?? ""]["usd"])
            .div(price.data[this.pair.coin1.coin?.id ?? ""]["usd"])
            .toPrecision(20);
      } catch {
      }
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
          amount_in: this.pair.coin1.amount,
          amount_out: this.pair.coin2.amount,
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
