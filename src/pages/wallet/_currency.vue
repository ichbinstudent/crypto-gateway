<template>
  <div id="main-container">
    <div class="w-full fixed top-16" id="fixed-bg-item">
      <div class="px-2">
        <div v-if="walletEntry && walletEntry.coin.market_data" class="flex flex-row">
          <div class="flex flex-col">
            <span :class="'font-semibold ' + (currency==='xaf'?'text-xl':'text-4xl')">
              {{ walletEntry.amount | convertCurrency(walletEntry.coin.symbol) }}
            </span>
            <span :class="' ' + (currency==='xaf'?'text-lg':'text-2xl')">
              {{ walletEntry.amount | formatCurrency(walletEntry.coin.symbol) }}
            </span>
          </div>
          <v-spacer />
          <div>
            <span
              :class="'text-2xl ' + (priceChange <= 0 ? 'text-red-500' : 'text-green-500')"
            >
              {{ priceChange.toFixed(2) }}%
            </span>
          </div>
        </div>
        <v-skeleton-loader v-else-if="!walletEntry" type="text" />
        <div v-else class="h-16" />
      </div>
      <CryptoChart v-if="!fiat" :symbol="coin.id" v-model="daysSelected"></CryptoChart>
      <v-sheet v-else height="28vh" class="mb-1" color="transparent"></v-sheet>
      <v-row dense class="mt-0 mx-0">
        <v-col>
          <v-btn class="rounded-lg" color="primary" block depressed :disabled="!availableForTrading"
                 @click="withdrawDialog = true;">
            <span class="font-light">{{ $t("wallet._currency.withdraw") }}</span>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn class="rounded-lg" color="primary" block depressed :disabled="!availableForTrading"
                 @click="depositDialog = true;">
            <span class="font-light">{{ $t("wallet._currency.deposit") }}</span>
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <v-card
      class="mx-0 mb-0 pb-0 rounded-t-xl h-screen relative"
      id="floating-card"
    >
      <v-card-title class="py-0 pt-2"><span
        class="text-lg font-semibold w-full text-center">{{ $t("wallet._currency.transactions") }}</span>
      </v-card-title>
      <div
        class="absolute top-1.5 bg-gray-200 w-24 rounded-lg"
        id="gray-bar"
      />
      <TransactionList :coin="coin" />
    </v-card>

    <v-dialog :value="depositDialog" persistent>
      <v-toolbar dark color="primary">
        <v-toolbar-title>{{ $t("wallet._currency.deposit") }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon dark @click="depositDialog = false" class="p-1">mdi-close</v-icon>
      </v-toolbar>

      <v-card class="-mt-0.5 pt-2">
        <v-card-text
          v-if="$te(`wallet._currency.depositMessages.${this.coin.id}.text`)"
          class="rounded-t-none"
        >
          <p>
            {{ $t(`wallet._currency.depositMessages.${this.coin.id}.text`) }}
          </p>
          <v-row
            dense
            v-for="(address, index) in $t(`wallet._currency.depositMessages.${this.coin.id}.depositAddresses`)"
            :key="address.text + index"
          >
            <v-col>
              <v-text-field
                hide-details
                dense
                flat
                readonly
                outlined
                :label="address.text"
                :value="address.value"
                @click="copy"
              />
            </v-col>
          </v-row>
          <v-form v-model="depositFormValid" @submit.prevent="deposit">
            <p class="mt-2">
              {{ $t("wallet._currency.depositHelpText") }}
            </p>
            <v-row>
              <v-col>
                <v-text-field
                  dense
                  outlined
                  :rules="[rules.numRequired]"
                  v-model="depositDetails.amount"
                  :label="$t('wallet._currency.amount')"
                />
              </v-col>
            </v-row>
            <v-row dense class="px-1">
              <v-col>
                <span>Fees</span>
              </v-col>
              <v-col class="text-right">
                <span v-if="fiat">3%</span>
                <span v-else>Free</span>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                <v-btn color="primary" block large class="font-light" :disabled="!depositFormValid || loading"
                       type="submit">
                  <span class="font-light">{{ $t("wallet._currency.submit") }}</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-text v-else>
          {{ $t(`wallet._currency.depositNotAvailable`) }}
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog :value="withdrawDialog" persistent>
      <v-toolbar dark color="primary">
        <v-toolbar-title>{{ $t("wallet._currency.withdraw") }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon dark @click="withdrawDialog = false" class="p-1">mdi-close</v-icon>
      </v-toolbar>

      <v-card class="-mt-0.5 pt-2">
        <template v-if="availableForTrading">
          <v-card-text>
            <p class="mb-2">{{ $t("wallet._currency.weWillProcess") }}</p>
            <v-form v-model="withdrawFormValid" @submit.prevent="withdraw">
              <v-row dense>
                <v-col class="pb-0">
                  <v-text-field
                    :rules="[rules.numRequired]"
                    type="number"
                    dense
                    outlined
                    :label="$t('wallet._currency.withdrawAmount')"
                    v-model="withdrawalDetails.amount"
                  />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col v-if="!fiat" class="pb-0">
                  <v-text-field
                    :rules="[rules.required]"
                    dense
                    outlined
                    :label="$t('wallet._currency.withdrawAddress')"
                    v-model="withdrawalDetails.address"
                  />
                </v-col>
                <v-col v-else class="py-0">
                  <span>{{ $t("wallet._currency.withdrawFiat") }}</span>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col>
                  <v-select
                    hide-details
                    :items="networks"
                    :rules="[rules.required]"
                    dense
                    outlined
                    :label="$t('wallet._currency.withdrawNetwork')"
                    v-model="withdrawalDetails.network"
                  />
                </v-col>
              </v-row>
              <v-row dense class="px-1">
                <v-col>
                  <span>Fees</span>
                </v-col>
                <v-col class="text-right">
                  <span v-if="fiat">3%</span>
                  <span v-else>{{ 15 | convertCurrency("eur") }}</span>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col>
                  <v-btn color="primary" block large class="font-light" :disabled="!withdrawFormValid || loading"
                         type="submit">
                    <span class="font-light">{{ $t("wallet._currency.submit") }}</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </template>
        <v-card-text v-else>
          {{ $t(`wallet._currency.depositNotAvailable`) }}
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CryptoChart from "~/components/wallet/CryptoChart.vue";
import TransactionList from "~/components/wallet/TransactionList.vue";
import { Coin } from "~/types/coingecko";
import { Deposit, Snack, Transaction, WalletEntry, Withdrawal } from "~/types/interfaces";
import rules from "~/pages/auth/rules";
import { TransactionTypes } from "~/types/ctypes";
import { Decimal } from "decimal.js";

const PullToRefresh = require("pulltorefreshjs");


export default Vue.extend({
  components: { TransactionList, CryptoChart },
  async asyncData({ params, store }) {
    const coin = store.getters["coins/coins"]?.find(
      (coin: Coin) => coin.id == params.currency
    );
    if (coin) {
      return { coin };
    } else {
      const coins = await store.dispatch("coins/fetchCoins");
      return {
        coin: coins.filter((coin: Coin) => coin.id == params.currency)[0]
      };
    }
  },
  data() {
    return {
      rules,
      networks: this.$store.getters["coins/networks"],
      coin: {} as Coin,
      depositDialog: false,
      depositFormValid: false,
      depositDetails: {
        amount: 0
      },
      withdrawDialog: false,
      withdrawFormValid: false,
      withdrawalDetails: {
        amount: 0,
        address: "",
        network: ""
      },
      loading: false,
      daysSelected: 1
    };
  },
  head() {
    return {
      title: `${this.$t('wallet.wallet')} - ${(this as any).coin.name}`
    };
  },
  computed: {
    walletEntry(): WalletEntry {
      return this.$store.getters["wallet/wallet"][this.coin.id];
    },
    fiat(): boolean {
      return ["eur", "xaf"].includes(this.$route.params.currency);
    },
    currency(): string {
      console.log(this.$store.getters["settings/currency"])
      return this.$store.getters["settings/currency"];
    },
    availableForTrading(): boolean {
      return this.$store.getters["coins/availableForTrading"]
        .includes(this.coin.id);
    },
    priceChange(): number {
      switch (this.daysSelected) {
        case 1:
          return this.walletEntry.coin.market_data.price_change_24h;
        case 7:
          return this.walletEntry.coin.market_data.price_change_percentage_7d;
        case 30:
          return this.walletEntry.coin.market_data.price_change_percentage_30d;
        case 365:
          return this.walletEntry.coin.market_data.price_change_percentage_1y;
        default:
          return 0;
      }
    }
  },
  methods: {
    deposit() {
      const transaction = {
        currency_in: this.coin.id,
        currency_out: this.coin.id,
        amount_in: new Decimal(0),
        amount_out: new Decimal(this.depositDetails.amount),
        polymorphic_ctype: TransactionTypes.Deposit,
        resourcetype: "Deposit"
      } as Deposit;
      this.sendTransaction(transaction);
    },
    withdraw() {
      const transaction = {
        currency_in: this.coin.id,
        currency_out: this.coin.id,
        amount_out: new Decimal(0),
        amount_in: new Decimal(this.withdrawalDetails.amount),
        destination_address: this.withdrawalDetails.address,
        network: this.withdrawalDetails.network,
        polymorphic_ctype: TransactionTypes.Withdrawal,
        resourcetype: "Withdrawal"
      } as Withdrawal;
      this.sendTransaction(transaction);
    },
    copy(event: any) {
      event.target.select();
      document.execCommand("copy");
      this.$store.commit("snackbar/setSnack",
        {
          message: "Copied!"
        } as Snack);
    },
    sendTransaction(transaction: Transaction) {
      this.loading = true;
      this.$axios.post("/wallet/transaction/", transaction).then(
        () => this.$store.commit("snackbar/setSnack",
          {
            message: "Transaction created!"
          } as Snack)
      ).catch(() => this.$store.commit("snackbar/setSnack",
        {
          message: "Something went wrong. Please try again later."
        } as Snack)
      ).finally(() => {
        this.$store.dispatch("wallet/updateWallet");
        this.depositDialog = false;
        this.withdrawDialog = false;
        this.loading = false;
      });
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
  margin-top: calc(4rem + 25vh + 2 * 36px + 28px);
}
</style>
