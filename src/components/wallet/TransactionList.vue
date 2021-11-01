<template>
  <v-list two-line dense>
    <template v-for="item in items">
      <v-subheader
        v-if="item.header"
        :key="item.id"
        v-text="$options.filters.date(item.header)"
      ></v-subheader>

      <!--      <v-divider-->
      <!--        v-else-if="item.divider"-->
      <!--        :key="index"-->
      <!--        :inset="item.inset"-->
      <!--      ></v-divider>-->

      <v-list-item v-else :key="item.id">
        <v-list-item-avatar>
          <v-icon v-if="item.direction === 'out'" color="red"
            >mdi-arrow-up</v-icon
          >
          <v-icon v-else-if="item.direction === 'in'" color="blue"
            >mdi-arrow-down</v-icon
          >
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-html="item.amount"></v-list-item-title>
          <v-list-item-subtitle
            v-html="item.timestamp.format('LLL')"
          ></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue'
import { Coin } from '~/types/coingecko'
import { Transaction } from '~/types/interfaces'
import { Moment } from 'moment'
import moment from 'moment'

export default Vue.extend({
  props: {
    coin: {
      type: Object as () => Coin,
      required: true,
    },
    transactions: {
      type: Array as () => Transaction[],
      default: () =>
        [
          {
            id: 0,
            currency: 'bitcoin',
            direction: 'in',
            amount: 0.003,
            timestamp: moment(),
          },
          {
            id: 1,
            currency: 'bitcoin',
            direction: 'in',
            amount: 0.003,
            timestamp: moment().minutes(-123),
          },
          {
            id: 2,
            currency: 'bitcoin',
            direction: 'out',
            amount: 0.0013,
            timestamp: moment().days(-1.2),
          },
          {
            id: 3,
            currency: 'bitcoin',
            direction: 'out',
            amount: 0.0011,
            timestamp: moment().days(-7),
          },
        ] as Transaction[],
    },
  },
  computed: {
    items(): ({ header: Moment } | Transaction)[] {
      let oldDate = this.transactions.sort((a: Transaction, b: Transaction) =>
        b.timestamp.diff(a.timestamp)
      )[0].timestamp
      let items = [{ header: oldDate }] as ({ header: Moment } | Transaction)[]

      this.transactions?.forEach((transaction) => {
        if (!transaction.timestamp.isSame(oldDate, 'days')) {
          items.push({ header: transaction.timestamp })
          oldDate = transaction.timestamp
        }
        items.push(transaction)
      })
      return items
    },
  },
})
</script>
