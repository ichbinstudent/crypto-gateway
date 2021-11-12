import { ActionTree, GetterTree, MutationTree } from "vuex";
import { Transaction, Wallet } from "~/types/interfaces";
import Vue from "vue";
import { Decimal } from "decimal.js";
import { Coin } from "~/types/coingecko";
import moment from "moment";
import { TransactionTypes } from "~/types/ctypes";


export const state = () => ({
  wallet: {} as Wallet,
  transactions: [] as Transaction[]
});

export const initialStateValue = state();
export type State = typeof initialStateValue

export const getters: GetterTree<State, State> = {
  wallet: (state: State): Wallet => state.wallet,
  transactions: (state: State): Transaction[] => state.transactions
};

export const mutations: MutationTree<State> = {
  setWallet(state: State, newWallet: Wallet) {
    Vue.set(state, "wallet", newWallet);
  },
  setTransactions(state: State, transactions: Transaction[]) {
    Vue.set(state, "transactions", transactions);
  }
};

function addIfMissing(wallet: Wallet, transaction: Transaction, coin_in: Coin, coin_out: Coin) {
  console.log(transaction.polymorphic_ctype);
  switch (transaction.polymorphic_ctype) {
    case TransactionTypes.Deposit:
      if (!wallet[transaction.currency_out]) {
        wallet[transaction.currency_out] = {
          amount: new Decimal(transaction.amount_out),
          coin: coin_out
        };
      } else {
        wallet[transaction.currency_out].amount =
          wallet[transaction.currency_out].amount.add(new Decimal(transaction.amount_out));
      }
      break;
    case TransactionTypes.Withdrawal:
      if (!wallet[transaction.currency_in]) {
        wallet[transaction.currency_in] = {
          amount: new Decimal(transaction.amount_in).neg(),
          coin: coin_in
        };
      } else {
        wallet[transaction.currency_in].amount =
          wallet[transaction.currency_in].amount.sub(new Decimal(transaction.amount_in));
      }
      break;
    case TransactionTypes.Swap:
      wallet[transaction.currency_in].amount =
        wallet[transaction.currency_in].amount.sub(new Decimal(transaction.amount_in));

      if (!wallet[transaction.currency_out]) {
        wallet[transaction.currency_out] = {
          amount: new Decimal(transaction.amount_out),
          coin: coin_out
        };
      } else {
        wallet[transaction.currency_out].amount =
          wallet[transaction.currency_out].amount.add(new Decimal(transaction.amount_out));
      }
      break;
    default:
  }
}

export const actions: ActionTree<State, State> = {
  updateWallet(context): Promise<Wallet> {
    return new Promise<Wallet>((resolve, reject) => {
      this.$axios.get("/wallet/transaction/")
        .then(({ data }: { data: Transaction[] }) => {
          const transactions = data.map((element: Transaction) => {
            element.timestamp = moment(element.timestamp as unknown as string);
            return element;
          });
          context.commit("setTransactions", transactions);

          let wallet = {} as Wallet;
          transactions.forEach((transaction: Transaction) => {
            addIfMissing(wallet,
              transaction,
              context.rootGetters["coins/coins"].find((coin: Coin) => coin.id === transaction.currency_in),
              context.rootGetters["coins/coins"].find((coin: Coin) => coin.id === transaction.currency_out)
            );

            // if (!!wallet[transaction.currency_in]) {
            //   wallet[transaction.currency_in].amount.add(new Decimal(transaction.amount_in));
            // } else {
            //   wallet[transaction.currency_in] = {
            //     amount: new Decimal(transaction.amount_in),
            //     coin: context.rootGetters["coins/coins"].find((coin: Coin) => coin.id === transaction.currency_in)
            //   };
            // }
            // if (!!wallet[transaction.currency_out]) {
            //   wallet[transaction.currency_out].amount.add(new Decimal(transaction.amount_out));
            // } else {
            //   wallet[transaction.currency_out] = {
            //     amount: new Decimal(transaction.amount_out),
            //     coin: context.rootGetters["coins/coins"].find((coin: Coin) => coin.id === transaction.currency_out)
            //   };
            // }
          });
          context.commit("setWallet", wallet);
          console.log(wallet);
          return resolve(wallet);
        })
        .catch(e => reject(e));
    });
  }
};
