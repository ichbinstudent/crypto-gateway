<template>
  <v-list two-line dense class="pa-0" v-if="items.length > 0">
    <template v-for="item in items">
      <v-subheader
        v-if="item.header"
        :key="item.id"
        v-text="$options.filters.date(item.header)"
      />

      <v-list-item :key="item.id" class="px-1" v-else>
        <v-list-item-avatar class="my-0 mr-1" color="surface">
          <v-icon
            v-if="item.resourcetype === 'Withdrawal'"
            color="red"
          >mdi-arrow-up
          </v-icon>
          <v-icon
            v-else-if="item.resourcetype === 'Deposit'"
            color="blue"
          >mdi-arrow-down
          </v-icon>
          <v-icon
            v-else-if="item.resourcetype === 'Swap'"
            color="blue"
          >mdi-swap-horizontal
          </v-icon>
        </v-list-item-avatar>

        <v-list-item-content class="py-0">
          <v-list-item-title class="flex flex-row">
            <span>
            {{ item.resourcetype === "Swap" && item.currency_in === coin.id ? "-" : "+" }}
            {{
                (item.resourcetype === "Swap" && item.currency_in === coin.id ? item.amount_in : item.amount_out) | formatCurrency(coin.symbol)
              }}
            </span>
          </v-list-item-title>
          <v-list-item-subtitle>
            <span class="text-sm">
            {{ item.timestamp.format("lll") }}
            </span>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-chip outlined :color="colors[item.status]" x-small class="absolute right-0 flex-shrink">
          {{ item.status }}
        </v-chip>
      </v-list-item>
      <v-divider />
    </template>
  </v-list>
  <div v-else class="w-full text-center pt-4">
    <span>{{ $t('components.wallet.TransactionList.NoTransactions') }}</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Coin } from "~/types/coingecko";
import { Transaction } from "~/types/interfaces";
import { Moment } from "moment";
import { TransactionTypes } from "~/types/ctypes";

export default Vue.extend({
  props: {
    coin: {
      type: Object as () => Coin,
      required: true
    }
  },
  computed: {
    transactions(): Transaction[] {
      return this.$store.getters["wallet/transactions"]
        .filter((value: Transaction) => (value.currency_out === this.coin.id || value.currency_in === this.coin.id) &&
          (value.resourcetype !== "Swap" || value.status !== "PENDING"));
    },
    items(): ({ header: Moment } | Transaction)[] {
      if (this.transactions.length === 0) return [];

      let oldDate = this.transactions.sort((a: Transaction, b: Transaction) =>
        b.timestamp.diff(a.timestamp)
      )[0].timestamp;
      let items = [{ header: oldDate }] as ({ header: Moment } | Transaction)[];

      this.transactions?.forEach((transaction) => {
        if (!transaction.timestamp.isSame(oldDate, "days")) {
          items.push({ header: transaction.timestamp });
          oldDate = transaction.timestamp;
        }
        items.push(transaction);
      });
      return items;
    }
  },
  data: () => ({
    TransactionTypes,
    colors: {
      PENDING: "orange",
      ERROR: "red",
      COMPLETED: "green"
    }
  })
});
</script>
