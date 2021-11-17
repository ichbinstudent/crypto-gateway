import { Decimal } from "decimal.js";
import { Coin } from "~/types/coingecko";
import { Context } from "@nuxt/types";

export default (context: Context, inject: any) => {

  const ConvertCurrency = function(value: number | Decimal | string, from: string, to?: string): Decimal {
    if (!to) {
      to = context.store.state.settings.currency;
    }
    value = new Decimal(value);

    if (to === "xaf") {
      value = value.mul(655.29);
      to = "eur";
    }

    if (from === "xaf" && to === "eur") {
      value = value.div(655.29);
    } else if (!["eur", "usd", "xaf"].includes(from)) {
      let price = 0;
      if (["eur", "usd", "xaf"].includes(to ?? '')) {
        price = context.store.getters["coins/coins"].filter(
          (coin: Coin) => coin.id === from.toLowerCase()
          // @ts-ignore
        )[0]?.market_data.current_price[to.toLowerCase()];
      } else {
        price = context.store.getters["coins/coins"].filter(
          (coin: Coin) => coin.id === from.toLowerCase()
          // @ts-ignore
        )[0]?.market_data.current_price['usd'];
        const price2 = context.store.getters["coins/coins"].filter(
          (coin: Coin) => coin.id === to?.toLowerCase()
          // @ts-ignore
        )[0]?.market_data.current_price['usd'];
        price = price / price2
      }
      value = value.mul(price);
    } else {
      const price = context.store.getters["coins/coins"].filter(
        (coin: Coin) => coin.id === to?.toLowerCase()
        // @ts-ignore
      )[0]?.market_data.current_price[from.toLowerCase()];
      value = value.div(price);
    }
    return value
  };


  inject("util", {
    ConvertCurrency
  });
}
