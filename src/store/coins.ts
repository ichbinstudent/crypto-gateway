import { GetterTree, MutationTree, ActionTree } from "vuex";
import { Coin, Localization, MarketData } from "~/types/coingecko";
import Vue from "vue";
import moment from "moment";
import CoinGecko from "coingecko-api";

const CoinGeckoClient = new CoinGecko();
const CoinGeckoApiKey = 'CG-E6TNwDjPScbypAGGk9JpQdPQ';

const CoinList = ["cardano", "ripple", "ethereum", "tether", "bitcoin", "solana"];

export const state = () => ({
  coins: [] as Coin[],
  availableForTrading: ["eur", "xaf", "cardano", "ripple", "ethereum", "tether", "bitcoin", "solana"],
  networks: ["Binance Smart Chain", "Cardano", "Ethereum", "Ripple", "Luna", "Bitcoin", "MTN", "Orange"]
});

export const initialStateValue = state();
export type State = typeof initialStateValue

export const getters: GetterTree<State, State> = {
  coins: (state: State) => state.coins,
  availableForTrading: (state: State) => state.availableForTrading,
  networks: (state: State) => state.networks
};

export const mutations: MutationTree<State> = {
  setCoins(state: State, coins: Coin[]) {
    Vue.set(state, "coins", coins);
  }
};

export const actions: ActionTree<State, State> = {
  fetchCoins(context) {
    context.commit("addFetching", "fetchCoins", { root: true });
    return new Promise(async (resolve, reject) => {
      const data: Coin[] = [];

      CoinList.forEach(async coinId => {
        data.push((await CoinGeckoClient.coins.fetch(coinId, {x_cg_demo_api_key: CoinGeckoApiKey})).data);
      });
      data.push({
        symbol: "eur",
        image: {
          large: "/crypto-icons/128/color/eur.png",
          small: "/crypto-icons/32/color/eur.png",
          thumb: "/crypto-icons/32/color/eur.png"
        },
        id: "eur",
        name: "Euro",
        market_data: null as unknown as MarketData,
        block_time_in_minutes: "0",
        last_updated: moment().toDate(),
        localization: (() => "Euro") as unknown as Localization
      });
      data.push({
        symbol: "xaf",
        image: {
          large: "/crypto-icons/128/color/xaf.png",
          small: "/crypto-icons/32/color/xaf.png",
          thumb: "/crypto-icons/32/color/xaf.png"
        },
        id: "xaf",
        name: "FCFA",
        market_data: null as unknown as MarketData,
        block_time_in_minutes: "0",
        last_updated: moment().toDate(),
        localization: (() => "FCFA") as unknown as Localization
      });

      context.commit("setCoins", data.filter((coin: Coin) => context.state.availableForTrading.includes(coin.id)));
      resolve(data);
      context.commit("removeFetching", "fetchCoins", { root: true });
    });
  },
  fetchCoinPrices(
    context,
    args: { symbol: string; days: number }
  ): Promise<number[][]> {
    context.commit("addFetching", "fetchCoinPrices", { root: true });
    return new Promise((resolve) => {
      return CoinGeckoClient.coins
        .fetchMarketChartRange(args.symbol, {
          from: moment().subtract(args.days, "days").unix(),
          to: moment().unix(),
          vs_currency: context.getters["settings/currency"],
          x_cg_demo_api_key: CoinGeckoApiKey
        })
        .then((value: { data: { prices: number[][] } }) => {
          resolve(value.data.prices);
        })
        .finally(() => context.commit("removeFetching", "fetchCoinPrices", { root: true }));
    });
  }
};
