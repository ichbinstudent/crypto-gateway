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
      const price = context.store.getters["coins/coins"].filter(
        (coin: Coin) => coin.id === from.toLowerCase()
        // @ts-ignore
      )[0]?.market_data.current_price[to.toLowerCase()];
      value = value.mul(price);
    }
    return value
  };


  inject("util", {
    ConvertCurrency
  });
}
