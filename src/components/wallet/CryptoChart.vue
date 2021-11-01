<template>
  <div>
    <div class="absolute top-0 right-1">
      <v-btn-toggle
        background-color="transparent"
        borderless
        v-model="selectedDays"
      >
        <v-btn text :value="1" small class="chart-button">1D</v-btn>
        <v-btn text :value="7" small class="chart-button">7D</v-btn>
        <v-btn text :value="30" small class="chart-button">30D</v-btn>
        <v-btn text :value="365" small class="chart-button">1Y</v-btn>
      </v-btn-toggle>
    </div>
    <client-only v-if="values.length > 0 && !loading">
      <v-sparkline
        :value="values"
        :height="vh * 25"
        :width="vw * 100"
        smooth="20"
        line-width="3"
        class="chart"
      />
    </client-only>
    <div
      style="height: 25vh"
      v-else
      class="chart flex align-middle justify-center"
    >
      <div class="lds-facebook m-auto">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      coinPrices: [] as number[][],
      loading: false,
      selectedDays: this.days,
    }
  },
  created() {
    this.$store
      .dispatch('coins/fetchCoinPrices', {
        symbol: this.symbol,
        days: this.selectedDays,
      })
      .then((value: number[][]) => {
        this.coinPrices = value
      })
  },
  props: {
    symbol: {
      required: true,
      type: String,
    },
    days: {
      required: false,
      type: Number,
      default: 1,
    },
  },
  computed: {
    values(): number[] {
      return this.coinPrices.map((p: number[]) => p[1])
    },
    vh(): number {
      if (this.$nuxt.$isServer) return 0
      else
        return (
          Math.max(
            document.documentElement.clientHeight || 0,
            window.innerHeight || 0
          ) / 100
        )
    },
    vw(): number {
      if (this.$nuxt.$isServer) return 0
      else
        return (
          Math.max(
            document.documentElement.clientWidth || 0,
            window.innerWidth || 0
          ) / 100
        )
    },
  },
  watch: {
    selectedDays: function (val) {
      this.loading = true
      this.$store
        .dispatch('coins/fetchCoinPrices', {
          symbol: this.symbol,
          days: val,
        })
        .then((value: number[][]) => {
          this.coinPrices = value
        })
        .finally(() => (this.loading = false))
    },
  },
})
</script>

<style lang="scss">
.chart {
  margin-top: 28px;
  height: 25vh;
  width: 100vw;
}

.chart-button {
  min-width: 0 !important;
}

.lds-facebook {
  display: inline-block;
  position: relative;
  width: 40px;
  height: 40px;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 4px;
  width: 8px;
  background: #fff;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 4px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 16px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 28px;
  animation-delay: 0s;
}
@keyframes lds-facebook {
  0% {
    top: 4px;
    height: 32px;
  }
  50%,
  100% {
    top: 12px;
    height: 16px;
  }
}
</style>
