import Vue from "vue";
import { Decimal } from "decimal.js";
import { formatCurrency } from "@coingecko/cryptoformat";

export default () => {
  Vue.filter("formatCurrency", (value: number | string | Decimal, symbol: string) => {
    if (typeof value == "string") {
      value = Number.parseFloat(value);
    } else if (typeof value !== "number") {
      value = value.toNumber();
    }

    // const formatter = new Intl.NumberFormat("en-US", {
    //   style: "currency",
    //   currency: symbol,
    //   minimumFractionDigits: 4,
    //   maximumFractionDigits: 8
    // });

    if (value === 0) {
      return "0";
    }

    return formatCurrency(value, symbol, 'en-US');
  });
}
