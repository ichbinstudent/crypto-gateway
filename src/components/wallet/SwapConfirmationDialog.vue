<template>
  <v-dialog
    :value="localShow"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    :ontransitionend="$parent.$emit('dialog:show', localShow)"
  >
    <v-sheet color="surface" class="w-screen h-screen">
      <v-toolbar dark color="primary">
        <v-toolbar-title>{{ $t('components.wallet.SwapConfirmationDialog.title') }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon dark @click="localShow = false" class="p-1">mdi-close</v-icon>
      </v-toolbar>

      <v-list color="transparent">
        <v-list-item>
          <span>{{ $t('components.wallet.SwapConfirmationDialog.swapAmount') }}</span>
          <v-spacer />
          <span>{{ transaction.amount_in | formatCurrency(coin_in.symbol) }}</span>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <span>{{ $t('components.wallet.SwapConfirmationDialog.fees') }}</span>
          <v-spacer />
          <span>{{ transaction.fees | formatCurrency(coin_out.symbol) }}</span>
        </v-list-item>
        <v-divider />
        <v-list-item class="text-lg">
          <span>{{ $t('components.wallet.SwapConfirmationDialog.totalReceived') }}</span>
          <v-spacer />
          <span>{{ transaction.amount_out | formatCurrency(coin_out.symbol) }}</span>
        </v-list-item>
      </v-list>
    </v-sheet>


    <div class="fixed bottom-4 w-screen px-4 text-center">
      <span v-if="timeLeft > 0">
        {{ $t('components.wallet.SwapConfirmationDialog.offerValid', {seconds: timeLeft.toFixed(1)}) }}
      </span>
      <span v-else>{{ $t('components.wallet.SwapConfirmationDialog.offerExpired') }}</span>
      <v-btn block large color="primary" @click="confirmTransaction" :disabled="timeLeft <= 0">
        {{ $t('components.wallet.SwapConfirmationDialog.confirm') }}
      </v-btn>
    </div>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { Transaction } from "~/types/interfaces";
import { Coin } from "~/types/coingecko";
import moment from "moment";

export default Vue.extend({
  props: {
    transaction: {
      required: true,
      type: Object as () => Transaction
    },
    show: Boolean
  },
  watch: {
    show(newVal: boolean) {
      if (newVal) {
        this.timeLeft = moment(this.transaction.timestamp).add(30, "seconds").diff(moment().utc()) / 1000;
        this.registerTimer();
      } else {
        clearInterval(this.intervalId);
        this.intervalId = 0;
      }
      this.localShow = newVal;
    }
  },
  data() {
    return {
      localShow: true,
      timeLeft: moment(this.transaction.timestamp).add(30, "seconds").diff(moment().utc()) / 1000,
      intervalId: 0 as number
    };
  },
  methods: {
    confirmTransaction() {
      this.$parent.$emit("transactionConfirmed", this.transaction);
    },
    registerTimer() {
      if (this.intervalId === 0) {
        this.intervalId = setInterval(() => {
          this.timeLeft = moment(this.transaction.timestamp).add(30, "seconds").diff(moment().utc()) / 1000;
        }, 100) as unknown as number;
      }
    }
  },
  computed: {
    coin_out() {
      return this.$store.getters["coins/coins"].find((value: Coin) => this.transaction.currency_out === value.id);
    },
    coin_in() {
      return this.$store.getters["coins/coins"].find((value: Coin) => this.transaction.currency_in === value.id);
    }
  },
  mounted() {
    this.registerTimer();
  }
});
</script>
