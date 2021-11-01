import Vue from 'vue'
import { Coin } from '~/types/coingecko'

export default ({ store }: any) => {
  Vue.filter(
    'convertCurrency',
    (
      value: number | string,
      from: string,
      to: string = store.state.settings.currency
    ) => {
      if (typeof value == 'string') {
        value = Number.parseFloat(value)
      }

      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: to,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })

      if (to === 'xaf') {
        value *= 655.29
        to = 'eur'
      }

      if (from === 'xaf' && to === 'eur') {
        value /= 655.29
      } else if (!['eur', 'usd', 'xaf'].includes(from)) {
        const price = store.getters['coins/coins'].filter(
          (coin: Coin) => coin.symbol === from.toLowerCase()
          // @ts-ignore
        )[0]?.market_data.current_price[to.toLowerCase()]
        value *= price
      }
      return formatter.format(value)
    }
  )
}
