import { GetterTree, MutationTree, ActionTree } from "vuex";
import { Coin, Localization, MarketData } from "~/types/coingecko";
import Vue from "vue";
import moment from "moment";

const CoinGecko = require("coingecko-api");
const CoinGeckoClient = new CoinGecko();

export const state = () => ({
  coins: [] as Coin[]
});

export const initialStateValue = state();
export type State = typeof initialStateValue

export const getters: GetterTree<State, State> = {
  coins: (state: State) => state.coins
};

export const mutations: MutationTree<State> = {
  setCoins(state: State, coins: Coin[]) {
    Vue.set(state, "coins", coins);
  }
};

export const actions: ActionTree<State, State> = {
  fetchCoins(context) {
    return new Promise((resolve, reject) => {
      CoinGeckoClient.coins.all()
        .then((value: { data: Coin[] }) => {
          value.data.push({
            symbol: 'eur',
            image: {
              large: '/crypto-icons/128/color/eur.png',
              small: '/crypto-icons/32/color/eur.png',
              thumb: '/crypto-icons/32/color/eur.png'
            },
            id: 'eur',
            name: 'Euro',
            market_data: null as unknown as MarketData,
            block_time_in_minutes: '0',
            last_updated: moment().toDate(),
            localization: (() => 'Euro') as unknown as Localization
          })
          value.data.push({
            symbol: 'xaf',
            image: {
              large: '/crypto-icons/128/color/xaf.png',
              small: '/crypto-icons/32/color/xaf.png',
              thumb: '/crypto-icons/32/color/xaf.png'
            },
            id: 'xaf',
            name: 'FCFA',
            market_data: null as unknown as MarketData,
            block_time_in_minutes: '0',
            last_updated: moment().toDate(),
            localization: (() => 'FCFA') as unknown as Localization
          })
          context.commit("setCoins", value.data);
          resolve(value.data);
        })
        .catch((e: Error) => reject(e));
    });
  },
  fetchCoinPrices(
    context,
    args: { symbol: string; days: number }
  ): Promise<number[][]> {
    return new Promise((resolve) => {
      return CoinGeckoClient.coins
        .fetchMarketChart(args.symbol, {
          days: args.days,
          vs_currency: context.getters["settings/currency"]
        })
        .then((value: { data: { prices: number[][] } }) => {
          resolve(value.data.prices);
        });
    });
  }
};
