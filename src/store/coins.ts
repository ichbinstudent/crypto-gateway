import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { Coin } from '~/types/coingecko'

const CoinGecko = require('coingecko-api')
const CoinGeckoClient = new CoinGecko()

export const state = () => ({
  coins: [] as Coin[],
})

export const initialStateValue = state()
export type State = typeof initialStateValue

export const getters: GetterTree<State, State> = {
  coins: (state: State) => state.coins,
}

export const mutations: MutationTree<State> = {
  setCoins(state: State, coins: Coin[]) {
    state.coins = coins
  },
}

export const actions: ActionTree<State, State> = {
  fetchCoins(context) {
    return new Promise((resolve) => {
      return CoinGeckoClient.coins.all().then((value: { data: Coin[] }) => {
        context.commit('setCoins', value.data)
        resolve(value.data)
      })
    }).catch(() => {
      return new Promise((resolve) => {
        return CoinGeckoClient.coins.all().then((value: { data: Coin[] }) => {
          context.commit('setCoins', value.data)
          resolve(value.data)
        })
      })
    })
  },
  fetchCoinPrices(
    context,
    args: { symbol: string; days: number }
  ): Promise<number[][]> {
    return new Promise((resolve) => {
      return CoinGeckoClient.coins
        .fetchMarketChart(args.symbol, {
          days: args.days,
          vs_currency: context.getters['settings/currency'],
        })
        .then((value: { data: { prices: number[][] } }) => {
          resolve(value.data.prices)
        })
    })
  },
}
