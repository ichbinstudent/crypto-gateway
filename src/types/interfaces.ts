import { Moment } from 'moment'
import { Coin } from "~/types/coingecko";
import { Decimal } from 'decimal.js';
import { TransactionTypes } from "~/types/ctypes";

export interface Transaction {
  id: number
  // currency: string
  // direction: 'in' | 'out'
  // amount: string

  timestamp: Moment
  amount_in: string
  amount_out: string
  currency_in: string
  currency_out: string
  status: 'PENDING' | 'COMPLETED' | 'ERROR'
  polymorphic_ctype: TransactionTypes
}

export interface WalletEntry {
  coin: Coin,
  amount: Decimal
}

export interface Wallet {
  [key: string]: WalletEntry
}

export interface Snack {
  show: boolean,
  top: boolean,
  message: string,
  color: string,
  timeout: number
}
