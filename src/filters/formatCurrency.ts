import Vue from "vue";
import { Decimal } from "decimal.js";
import { formatCurrency } from "@coingecko/cryptoformat";
import { Context } from "@nuxt/types";

export default ({}: Context) => {
  Vue.filter("formatCurrency", (value: number | string | Decimal, symbol: string) => {
    if (typeof value === "string") {
      value = new Decimal(value);
    } else if (typeof value === "number") {
      value = new Decimal(value);
    }

    return formatCurrency(value.toNumber(), symbol.toUpperCase());
  });
}
