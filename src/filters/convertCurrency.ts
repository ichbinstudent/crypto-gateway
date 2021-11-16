import Vue from 'vue'
import { Coin } from '~/types/coingecko'
import { Decimal } from "decimal.js";

export default ({ store }: any) => {
  Vue.filter(
    'convertCurrency',
    (
      value: number | string | Decimal,
      from: string,
      to: string = store.state.settings.currency
    ) => {
      if (typeof value === 'string') {
        value = new Decimal(value)
      } else if (typeof value === 'number') {
        value = new Decimal(value)
      }

      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: to,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })

      if (to === 'xaf') {
        value = value.mul(655.29)
        to = 'eur'
      }

      if (from === 'xaf' && to === 'eur') {
        value = value.div(655.29)
      } else if (!['eur', 'usd', 'xaf'].includes(from)) {
        const price = store.getters['coins/coins'].filter(
          (coin: Coin) => coin.symbol === from.toLowerCase()
          // @ts-ignore
        )[0]?.market_data.current_price[to.toLowerCase()]
        value = value.mul(price)
      }
      return formatter.format(value.toNumber())
    }
  )
}
