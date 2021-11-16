/* eslint-disable no-unused-vars */
// noinspection ES6UnusedImports
import Vue from 'vue'
import { Decimal } from "decimal.js";

declare module 'vue/types/vue' {
    interface Vue {
        $util: {
          ConvertCurrency: (value: number | Decimal | string, from: string, to?: string) => Decimal
        }
    }
}
