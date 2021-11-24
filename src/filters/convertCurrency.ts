import Vue from "vue";
import { Coin } from "~/types/coingecko";
import { Decimal } from "decimal.js";
import { formatCurrency } from "@coingecko/cryptoformat";
import { Context } from "@nuxt/types";

export default ({ store }: Context) => {
  Vue.filter(
    "convertCurrency",
    (
      value: number | string | Decimal,
      from: string,
      to: string = store.state.settings.currency
    ) => {

      if (typeof value === "string") {
        value = new Decimal(value);
      } else if (typeof value === "number") {
        value = new Decimal(value);
      }

      const originalTo = to;
      if (to === "xaf") {
        value = value.mul(655.29);
        to = "eur";
      }

      if (from === "xaf" && to === "eur") {
        value = value.div(655.29);
      } else if (!["eur", "usd", "xaf"].includes(from)) {
        const price = store.getters["coins/coins"].filter(
          (coin: Coin) => coin.symbol === from.toLowerCase()
          // @ts-ignore
        )[0]?.market_data.current_price[to.toLowerCase()];
        value = value.mul(price);
      }

      return formatCurrency(value.toNumber(), originalTo.toUpperCase());
    }
  );
}
