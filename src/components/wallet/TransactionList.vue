<template>
  <v-list two-line dense>
    <template v-for="item in items">
      <v-subheader
        v-if="item.header"
        :key="item.id"
        v-text="$options.filters.date(item.header)"
      ></v-subheader>

      <v-list-item v-else :key="item.id">
        <v-list-item-avatar>
          <v-icon
            v-if="item.polymorphic_ctype === TransactionTypes.Withdrawal"
            color="red"
          >mdi-arrow-up</v-icon>
          <v-icon
            v-else-if="item.polymorphic_ctype === TransactionTypes.Deposit"
            color="blue"
          >mdi-arrow-down</v-icon>
          <v-icon
            v-else-if="item.polymorphic_ctype === TransactionTypes.Swap"
            color="blue"
          >mdi-swap-horizontal</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            {{ item.polymorphic_ctype === TransactionTypes.Swap && item.currency_in === coin.id ? '-' : '+' }}
            {{item.amount_out | formatCurrency(coin.symbol) }}
          </v-list-item-title>
          <v-list-item-subtitle
            v-html="item.timestamp.format('LLL')"
          ></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
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
        .filter((value: Transaction) => value.currency_out === this.coin.id || value.currency_in === this.coin.id);
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
  data: () => ({ TransactionTypes })
});
</script>
